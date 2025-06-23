<%@ page import="java.util.*" %>
<%@ page import="jakarta.servlet.*" %>
<%@ page import="jakarta.servlet.http.*" %>

<%@ page import="org.w3c.dom.*" %>


<%@ page import="com.isomorphic.rpc.*" %>
<%@ page import="com.isomorphic.datasource.*" %>
<%@ page import="com.isomorphic.sql.*" %>
<%@ page import="com.isomorphic.util.*" %>
<%@ page import="com.isomorphic.examples.*" %>
<%@ page import="com.isomorphic.xml.*" %>
<%

try {

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
    String operation = dsRequest.getOperationType();

    DSResponse dsResponse = new DSResponse();

    if ("supplyItem".equals(dsName)) {
        if (operation.equals(DataSource.OP_FETCH)) {
            // DataSource protocol: get filter criteria
            Long itemID = (Long) dsRequest.getFieldValue("itemID");
            String itemName = (String)dsRequest.getFieldValue("itemName");
                 
            // DataSource protocol: get requested row range
            long startRow = dsRequest.getStartRow();
            long endRow = dsRequest.getEndRow();

            // We're just going to load the whole XML document into memory and do an xpath
            // select on it - in a real-world scenario, this query could, for example, be sent
            // to an XML-capable Database
            Document supplyItemXML = XML.getXMLDocument("examples/shared/ds/test_data/supplyItem.data.xml");

            String xpath = "/List/supplyItem[position() > " + startRow + " and position() < " + endRow + "]";

            List xpathSelectResult = XML.selectNodes(supplyItemXML, xpath);

            // set the result as the data
            dsResponse.setData(xpathSelectResult);
            
            // tell the client the actual start/end row.  The ListGrid makes requests based on
            // it's viewport and has no knowledge of how many rows are actually available, so
            // the total fetched rows may be less than what was requested.
            dsResponse.setStartRow(startRow);
            dsResponse.setEndRow(startRow+xpathSelectResult.size());

            // calculate total rows - very inefficient - selecting all items and just
            // outputting the size.
            dsResponse.setTotalRows(XML.selectNodes(supplyItemXML, "/List/supplyItem").size());
        } else {
            throw new Exception("Operation: " + operation + " not implemented.");
        }                   

    } else if ("supplyCategory".equals(dsName)) {
        if (operation.equals(DataSource.OP_FETCH)) {
            // When the Tree loads the children of a node, it performs a fetch operation with
            // criteria identifying the node that is loading children.  The criteria look like:
            //     { parentID : "parentNodeId" }
            // The Tree expects the child nodes to be returned as a List of records (like any
            // fetch operation).
            // Note that "parentID" in the criteria is the field on a node that contains the
            // id of the parent.  This field is declared in the SupplyCategory DataSource 
            // via setting the "foreignKey" property.
            String parentID = (String)dsRequest.getCriteria().get("parentID");
            
            Document supplyCategoryXML = XML.getXMLDocument("examples/shared/ds/test_data/supplyCategory.data.xml");

            String xpath = "//supplyCategory[parentID = \""+parentID+"\"]";
            List xpathSelectResult = XML.selectNodes(supplyCategoryXML, xpath);

            dsResponse.setData(xpathSelectResult);
        } else {
            throw new Exception("Operation: " + operation + " not implemented.");
        }                   

    } else {
        // a datasource request that we don't care to override, just invoke
        // default processing logic
        rpc.send(dsRequest, dsRequest.execute());
        continue;
    }

    rpc.send(dsRequest, dsResponse);
}


} catch (Exception topLevel) {
  topLevel.printStackTrace(System.out);
}

%>

