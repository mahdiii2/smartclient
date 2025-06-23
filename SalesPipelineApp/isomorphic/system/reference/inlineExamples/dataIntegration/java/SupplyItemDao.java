//----------------------------------------------------------------------
// Isomorphic SmartClient
// Minimal Java server integration example
//
// Spring HelloWorld example
//
// Simple invocation of a spring-managed bean directly from the client via RPC DMI
//
//----------------------------------------------------------------------
package com.isomorphic.examples.spring;

import java.io.*;
import java.util.*;

import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.CriteriaBuilder;

import com.isomorphic.log.Logger;
import com.isomorphic.examples.SupplyItem;
import com.isomorphic.util.DataTools;
import com.isomorphic.datasource.*;
import com.isomorphic.util.ErrorReport;

import org.hibernate.*;

public class SupplyItemDao {

    Logger log = new Logger(SupplyItemDao.class.getName());

    // autoconfigured by Spring
    private SessionFactory sessionFactory;
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public DSResponse fetch(DSRequest dsRequest) 
        throws Exception 
    {
        log.info("procesing DMI fetch operation");
        DSResponse dsResponse = new DSResponse(dsRequest == null ? (DataSource)null :
                                                                   dsRequest.getDataSource());

        Session hibernateSession = sessionFactory.getCurrentSession();

        // DataSource protocol: get filter criteria
        String itemName = (String)dsRequest.getFieldValue("itemName");
                 
        // DataSource protocol: get requested row range
        long startRow = (int)dsRequest.getStartRow();
        long endRow = (int)dsRequest.getEndRow();

        CriteriaBuilder criteriaBuilder = hibernateSession.getCriteriaBuilder();
        CriteriaQuery<Long> countQuery = 
            criteriaBuilder.createQuery(Long.class);
        Root<SupplyItem> root = countQuery.from(SupplyItem.class);

        Predicate itemNamePredicate = null;
        if (itemName != null) {
            itemNamePredicate = criteriaBuilder.like(root.get("itemName"),
                                                     "%" + itemName + "%");
            countQuery.where(itemNamePredicate);
        }
        
        // determine total available rows 
        // this is used by e.g. the ListGrid to auto-size its scrollbar
        countQuery.select(criteriaBuilder.count(root));
        Long rowCount = hibernateSession.createQuery(countQuery).getSingleResult();
        long totalRows = rowCount != null ? rowCount : 0;

        // clamp endRow to available rows and slice out requested range
        endRow = Math.min(endRow, totalRows);
                 
        // rebuild the criteria minus the rowCount projection
        CriteriaQuery<SupplyItem> criteriaQuery = 
            criteriaBuilder.createQuery(SupplyItem.class);
        root = criteriaQuery.from(SupplyItem.class);
        if (itemName != null) criteriaQuery.where(itemNamePredicate);

        // Create TypedQuery for pagination
        TypedQuery<SupplyItem> query = hibernateSession.createQuery(criteriaQuery);

        // Set pagination parameters
        query.setFirstResult((int) startRow);
        query.setMaxResults((int) (endRow - startRow));

        // Execute query and fetch results
        List<SupplyItem> matchingItems = query.getResultList();

        // DataSource protocol: return matching item beans
        dsResponse.setData(matchingItems);
        // tell client what rows are being returned, and what's available
        dsResponse.setStartRow(startRow);
        dsResponse.setEndRow(endRow);
        dsResponse.setTotalRows(totalRows);        

        return dsResponse;
    }
 
    public DSResponse add(DSRequest dsRequest, SupplyItem item)
        throws Exception
    {
        log.info("procesing DMI add operation");

        DSResponse dsResponse = new DSResponse();

        Session hibernateSession = sessionFactory.getCurrentSession();
        hibernateSession.saveOrUpdate(item);
        dsResponse.setData(item);
        return dsResponse;
    }
    

    public DSResponse update(DSRequest dsRequest, Map newValues)
        throws Exception
    {
        log.info("procesing DMI update operation");

        DSResponse dsResponse = new DSResponse();

        // primary key
        Serializable id = (Serializable)dsRequest.getFieldValue("itemID");

        Session hibernateSession = sessionFactory.getCurrentSession();
        SupplyItem item = (SupplyItem)hibernateSession.get(SupplyItem.class, id);

        log.warn("fetched item: " + DataTools.prettyPrint(item));

        // apply new values to the as-saved bean
        DataTools.setProperties(newValues, item);

        log.warn("Saving record: " + DataTools.prettyPrint(item));

        // persist
        hibernateSession.saveOrUpdate(item);
        dsResponse.setData(item);
        return dsResponse;
    }


    public SupplyItem remove(SupplyItem item) 
        throws Exception
    {
        log.info("procesing DMI remove operation");
        
        Session hibernateSession = sessionFactory.getCurrentSession();
        hibernateSession.delete(item);

        return item;
    }
    

}
