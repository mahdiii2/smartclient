//----------------------------------------------------------------------
// Isomorphic SmartClient
//
// Example of a custom DataSource implementation.  This class demonstrates 
// how to write an adapter to plug support for an ORM system (Hibernate, in
// this case) into SmartClient Server.  Note that this is just an example to 
// demonstrate the principles involved - SmartClient Server already has 
// considerably more sophisticated Hibernate support than this, built-in
//
// NOTE: In the interests of clarity and brevity, this example intentionally 
// omits exception handling
//
//----------------------------------------------------------------------

package com.isomorphic.examples.server.reusableORMDataSource;


import com.isomorphic.base.Reflection;
import java.io.*;
import java.util.*;

import org.hibernate.*;
import org.hibernate.cfg.Configuration;

import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.Metamodel;

import com.isomorphic.datasource.*;
import com.isomorphic.util.DataTools;

public class ReusableORMDataSource extends BasicDataSource {

    protected String entityName;
    protected Session currentSession;

    protected static Configuration hibernateConfig;
    protected static SessionFactory sessionFactory;

    // We are only overriding execute() to provide a central point for initialization and 
    // session/transaction management - for actual data operations, it is more appropriate to 
    // override executeFetch(), et al, as we do further down in this class
    public DSResponse execute(DSRequest req) throws Exception {
        
        // Initialize the Hibernate Configuration if necessary
        if (hibernateConfig == null) {
            createConfig();
        }

        this.currentSession = sessionFactory.openSession();

        if (entityName == null) {
            // Pick up the fully-qualified class name from the DataSource definition. The property 
            // can be called anything you like - here, we are expecting to find a "mappedBeanClass" 
            // property in the DataSource definition
            entityName = getProperty("mappedBeanClass");

            // Use the Metamodel to check if the entity is mapped
            Metamodel metamodel = this.currentSession.getMetamodel();
            boolean isEntityMapped = metamodel.getEntities().stream().map(EntityType::getName)
                .anyMatch(entityName::equals);

            if (!isEntityMapped) {
                // Config problem - the bean named in the .ds.xml file is not mapped in Hibernate
            }
        }

        Transaction tx = currentSession.beginTransaction();
        
        try {
            return super.execute(req);
        } finally {
            tx.commit();
            currentSession.close();
        }
    }

	// Implementation of basic DataSource operations 
	// --------------------------------------------------------------------------------------------
	public DSResponse executeFetch(DSRequest req) throws Exception {

        DSResponse dsResponse = new DSResponse();
        dsResponse.setSuccess();

        CriteriaBuilder cb = currentSession.getCriteriaBuilder();
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Class<?> entityClass = currentSession.getMetamodel()
                .entity(Class.forName(entityName)).getJavaType();
        CriteriaQuery<?> criteriaQuery = cb.createQuery(entityClass);
        Root<?> root = criteriaQuery.from(entityClass);
        Root<?> countRoot = countQuery.from(entityClass);

        // Hibernate 6 prohibits predicates being shared across different CriteriaQuery 
        // instances, so thie apparent duplication is required
        List<Predicate> criterions = new ArrayList();
        List<Predicate> countCriterions = new ArrayList();

        // Implement simple filter criteria
        Map rCriteria = req.getCriteria();
        if (rCriteria != null) {
            boolean isFilter = "substring".equals(req.getOperationProperty("textMatchStyle"));
            for (Iterator i = rCriteria.keySet().iterator(); i.hasNext();) {
                String fieldName = (String) i.next();
                Object value = rCriteria.get(fieldName);
                String fieldType = getField(fieldName).getType();

                Predicate criterion;

                // Support OR on multiple values
                if (value instanceof List) {
                    List<Predicate> orPredicates = new ArrayList<>();
                    for (Object val : (List<?>) value) {
                        orPredicates.add(cb.equal(root.get(fieldName), val));
                    }
                    criterion = cb.or(orPredicates.toArray(new Predicate[0]));
                } else {
                    if (isFilter && ("text".equals(fieldType) || "string".equals(fieldType))) {
                        // Handle substring matching
                        criterion = cb.like(root.get(fieldName).as(String.class), "%" + value + "%");
                    } else {
                        // Handle exact equality
                        criterion = cb.equal(root.get(fieldName), value);
                    }
                }
                
                criterions.add(criterion);

                // Count query predicates
                if (value instanceof List) {
                    List<Predicate> orPredicates = new ArrayList<>();
                    for (Object val : (List<?>) value) {
                        orPredicates.add(cb.equal(countRoot.get(fieldName), val));
                    }
                    criterion = cb.or(orPredicates.toArray(new Predicate[0]));
                } else {
                    if (isFilter && ("text".equals(fieldType) || "string".equals(fieldType))) {
                        // Handle substring matching
                        criterion = cb.like(countRoot.get(fieldName).as(String.class), "%" + value + "%");
                    } else {
                        // Handle exact equality
                        criterion = cb.equal(countRoot.get(fieldName), value);
                    }
                }
                countCriterions.add(criterion);
            }
        }
        
        addAllCriterions(cb, countQuery, countCriterions);

        // Implement data paging
        long totalRows = -1;
        if (req.isPaged()) {
            if (req.getEndRow() != DSRequest.ENDROW_UNSET) {
                // if specified, endRow overrides batchSize
                if (req.getEndRow() - req.getStartRow() > req.getBatchSize()) {
                    req.setBatchSize(req.getEndRow() - req.getStartRow());
                }
            }

            countQuery.select(cb.count(countRoot));
            Long rowCount = currentSession.createQuery(countQuery).getSingleResult();
            totalRows = rowCount != null ? rowCount : 0;
        }
        // build criteria for the actual query
        addAllCriterions(cb, criteriaQuery, criterions);

        List sortBy = req.getSortByFields();
        List<Order> orderList = new ArrayList<>();

        for (Iterator i = sortBy.iterator(); i.hasNext();) {
            String sortByField = (String) i.next();

            if (sortByField.startsWith("-")) {
                // Leading minus means descending order
                orderList.add(cb.desc(root.get(sortByField.substring(1))));
            } else {
                // Ascending order
                orderList.add(cb.asc(root.get(sortByField)));
            }
        }
        criteriaQuery.orderBy(orderList);

        TypedQuery<?> query = currentSession.createQuery(criteriaQuery);

        // Set pagination parameters
        if (req.isPaged()) {
            query.setFirstResult((int) req.getStartRow());
            query.setMaxResults((int) req.getBatchSize());
        }

        // Run the query
        List results = query.getResultList();

        // if we're not paged, we're returning all rows
        if (totalRows == -1) totalRows = results.size();
        dsResponse.setTotalRows(totalRows);
        
        // set startRow/endRow
        long startRow = 0;
        long endRow = 0;
        if (totalRows != 0) {
            startRow = req.getStartRow();
            endRow = startRow + results.size();
        }
        dsResponse.setStartRow(startRow);
        dsResponse.setEndRow(endRow);
        
        // DataSource protocol: return list of matching records
        dsResponse.setData(results);
        return dsResponse;
    }

    public DSResponse executeAdd(DSRequest req) throws Exception {

        DSResponse dsResponse = new DSResponse();
        dsResponse.setSuccess();
        
        Object record = Reflection.classForName(entityName).newInstance();
        // populate the record from the submitted values
        DataTools.setProperties(req.getValues(), record);

        currentSession.saveOrUpdate(entityName, record);
        
        // DataSource protocol: return the committed bean to the client for cache update
        dsResponse.setData(record);
        return dsResponse;
    }
    
    public DSResponse executeRemove(DSRequest req) throws Exception {

        DSResponse dsResponse = new DSResponse();
        dsResponse.setSuccess();
        
        String primaryKey = getPrimaryKey();
        
        Serializable id = (Serializable)req.getFieldValue(primaryKey);
        Object record = currentSession.get(entityName, id);
        currentSession.delete(entityName, record);
        
        // DataSource protocol: return the primary key of the deleted record to the client for
        // cache update    
        dsResponse.setData(req.getCriteria());
        return dsResponse;
    }

    public DSResponse executeUpdate(DSRequest req) throws Exception {

        DSResponse dsResponse = new DSResponse();
        dsResponse.setSuccess();

        String primaryKey = getPrimaryKey();
        
        Serializable id = (Serializable)req.getFieldValue(primaryKey);
        Object record = null;
        if (id != null) {
            record = currentSession.get(entityName, id);
        } else {
            // Error: the primary key value was not supplied in the update request
        }
        
        // populate the record from the submitted values
        DataTools.setProperties(req.getValues(), record);
        currentSession.saveOrUpdate(entityName, record);

        // DataSource protocol: return the committed bean to the client for cache update
        dsResponse.setData(record);
        return dsResponse;
    } 

    private CriteriaQuery<?> addAllCriterions(CriteriaBuilder cb, CriteriaQuery<?> criteriaQuery,
                                              List<Predicate> criterions)
    {
        return criteriaQuery.where(cb.and(criterions.toArray(new Predicate[0])));
    }

    // This method is static and synchronized to avoid threading issues when multiple requests
    // are sent during server startup
    private static synchronized void createConfig() {
        hibernateConfig = new Configuration();
        sessionFactory = hibernateConfig.configure().buildSessionFactory();
    }

}
