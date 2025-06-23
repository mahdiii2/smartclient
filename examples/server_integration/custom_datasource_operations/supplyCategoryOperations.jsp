<%@ page import="java.util.*" %>
<%@ page import="com.isomorphic.rpc.*" %>
<%@ page import="com.isomorphic.datasource.*" %>
<%

// enable use of request instance in helper methods
this.request = request;

// We store the beans in the session.  To give this example some data to work with,
// we load an initial set of beans from a SQL table.  The initBeans() method does
// this and is defined further down in this file.
initBeans();


// Instantiate an RPCManager so we can get the DSRequests.
//
RPCManager rpc;
try {
    rpc = new RPCManager(request, response, out);
} catch (ClientMustResubmitException e) { 
    return; 
}


for(Iterator i = rpc.getRequests().iterator(); i.hasNext();) {

    // To be completely safe, check what kind of request we received.  As the developer
    // you have complete control over which requests go where, but if you have a single
    // request dispatcher for RPCRequests and DSRequests, you'll need this check.
    //
    Object req = i.next();
    if(req instanceof RPCRequest) 
         throw new Exception("This example expects only DSRequests");
    DSRequest dsRequest = (DSRequest)req;

    // inspect the name of the datasource for this request.  In this example, we only
    // care about performing custom logic on the supplyCategory datasource.  All other
    // datasource should follow the default logic.                        
    //
    String dsName = dsRequest.getDataSourceName();
    if(!"supplyCategory".equals(dsName)) {
        // a datasource request that we don't care to override, just invoke
        // default processing logic
        rpc.send(dsRequest, dsRequest.execute());
        continue;
    }
    DataSource supplyCategory = dsRequest.getDataSource();

    // instantiate the response object we'll send back: we'll populate it with data below.
    //
    DSResponse dsResponse = new DSResponse();

    // assume the operation will be successful.  If there's a failure, we'll override this with
    // an error code and provide the problem report as the data so the client can log it.
    dsResponse.setSuccess();

    // inspect the operation type.  We have different logic for each.
    //
    String operation = dsRequest.getOperationType();
    if(operation.equals(DataSource.OP_FETCH)) {
        // When the Tree loads the children of a node, it performs a fetch operation with
        // criteria identifying the node that is loading children.  The criteria look like:
        //     { parentID : "parentNodeId" }
        // The Tree expects the child nodes to be returned as a List of records (like any fetch
        // operation).
        // Note that "parentID" in the criteria is the field on a node that contains the
        // id of the parent.  This field is declared in the SupplyCategory DataSource 
        // via setting the "foreignKey" property.
        String parentID = (String)dsRequest.getCriteria().get("parentID");
        dsResponse.setData(getChildren(parentID));
    } else {
        throw new Exception("Operation: " + operation + " not implemented.");
    }

    // match the response to the request
    rpc.send(dsRequest, dsResponse);
        
} // for(requests)

%>

<%@ page import="jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>
<%@ page import="com.isomorphic.sql.*" %>
<%@ page import="com.isomorphic.util.*" %>
<%@ page import="com.isomorphic.examples.*" %>
<%! 

// Code from here on exists only to manage a set of sample data.  In a real application this
// code would be replaced by the data tier.

HttpServletRequest request;

public void initBeans() throws Exception {
    if (request.getSession(true).getAttribute("supplyCategoryBeans") == null) {
       // hand-construct a simple tree using the SupplyCategory bean - we'll put these in a Map
       // keyed by parentId for later lookup.  In a real-world scenario these beans would be
       // retrieved from the data tier.

       // add root category
       SupplyCategory root = new SupplyCategory();
       root.setCategoryName("root");
       storeCategory(root);       
       
       // add two categories under root
       SupplyCategory one = new SupplyCategory();
       one.setCategoryName("one");
       one.setParentID("root"); // SupplyCategories are linked by categoryName==parentID
       storeCategory(one);

       SupplyCategory two = new SupplyCategory();
       two.setCategoryName("two");
       two.setParentID("root");
       storeCategory(two);

       // add one more category nested under the "one" category
       SupplyCategory three = new SupplyCategory();
       three.setCategoryName("three");
       three.setParentID("one");
       storeCategory(three);

    }
}


private Map getCategories() throws Exception {
    Map categories = (Map) request.getSession(true).getAttribute("supplyCategoryBeans");
    if (categories == null) categories = new HashMap();
    return categories;
}

// store a category in our parentID-keyed map
private void storeCategory(SupplyCategory category) throws Exception {
    Map categories = getCategories();
    
    String parentID = category.getParentID();
    // since root doesn't have a parentID, we store it under a special token
    if (parentID == null) parentID = "_root";

    // each entry in the parentID-keyed map is a List of all categories that share the parentID
    List keyedCategories = (List)categories.get(parentID);
    if (keyedCategories == null) {
       keyedCategories = new ArrayList();
       categories.put(parentID, keyedCategories);
    }
    keyedCategories.add(category);

    // store the beans in the session
    request.getSession(true).setAttribute("supplyCategoryBeans", categories);
}

// In this example, we store beans keyed by the parentID - in a real-world scenario this can
// be whatever mechanism is used by your object model.
private List getChildren(String parentID) throws Exception {
    Map categories = getCategories();
    
    // since we store the beans keyed by parentID, to get a list of children we need only do a
    // simple hash lookup to get the children
    List children = (List)categories.get(parentID);
    
    // Tree expects to get an empty list if there are no children
    if (children == null) return new ArrayList();

    return children;
}

%>
