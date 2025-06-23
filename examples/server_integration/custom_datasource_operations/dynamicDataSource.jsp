<%@ page import="java.util.*" %>
<%@ page import="com.isomorphic.rpc.*" %>
<%@ page import="com.isomorphic.datasource.*" %>
<%@ page import="com.isomorphic.sql.*" %>
<%@ page import="com.isomorphic.util.*" %>
<%@ page import="com.isomorphic.examples.*" %>

<%
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
    // care about performing custom logic on the supplyItem datasource.  All other
    // datasource should follow the default logic.                        
    //
    String dsName = dsRequest.getDataSourceName();
    if(!"dynamicSupplyItem".equals(dsName)) {
        // a datasource request that we don't care to override, just invoke
        // default processing logic
        rpc.send(dsRequest, dsRequest.execute());
        continue;
    }

    // create the DataSource from a String.  In reality:
    //
    // 1. the String would generated on the fly from some existing source of metadata:
    //    reflection on a Java Bean, JDBC table metadata, XML schema, etc
    //
    // 2. the method that generates the DataSource - or the DataSource instance itself - would
    //    be used by both the loading .jsp and when processing RPCRequests
    //
    // 3. since most existing sources of metadata do not have presentation information (eg user
    //    visible title), schema chaining (dataSource.inheritsFrom) might be used to layer
    //    presentation-specific metadata on top of the dataSource generated from existing
    //    metadata.  Generate, this second DataSource would exist only in JavaScript.
    String xmlString =
    "<DataSource\r" +
    "    ID=\"dynamicSupplyItem\"\r" +
    "    serverType=\"sql\"\r" +
    "    tableName=\"supplyItem\"\r" +
    "    testFileName=\"supplyItem.data.xml\"\r" +
    ">\r" +
    "    <fields>\r" +
    "        <field name=\"itemID\"      type=\"sequence\" hidden=\"true\"       primaryKey=\"true\"/>\r" +
    "        <field name=\"itemName\"    type=\"text\"     title=\"Item\"        length=\"128\"       required=\"true\"/>\r" +
    "        <field name=\"SKU\"         type=\"text\"     title=\"SKU\"         length=\"10\"        required=\"true\"/>\r" +
    "        <field name=\"description\" type=\"text\"     title=\"Description\" length=\"2000\"/>\r" +
    "        <field name=\"category\"    type=\"text\"     title=\"Category\"    length=\"128\"       required=\"true\"\r" +
    "               foreignKey=\"supplyCategory.categoryName\"/>\r" +
    "        <field name=\"units\"       type=\"text\"     title=\"Units\"       length=\"5\">\r" +
    "            <valueMap>\r" +
    "                <value>Roll</value>\r" +
    "                <value>Ea</value>\r" +
    "                <value>Pkt</value>\r" +
    "                <value>Set</value>\r" +
    "                <value>Tube</value>\r" +
    "                <value>Pad</value>\r" +
    "                <value>Ream</value>\r" +
    "                <value>Tin</value>\r" +
    "                <value>Bag</value>\r" +
    "                <value>Ctn</value>\r" +
    "            </valueMap>\r" +
    "        </field>\r" +
    "        <field name=\"unitCost\"    type=\"float\"    title=\"Unit Cost\"   required=\"true\">\r" +
    "            <validators>\r" +
    "                <validator type=\"floatLimit\" precision=\"2\" min=\"0\" errorMessage=\"Please enter a valid cost\"/>\r" +
    "            </validators>\r" +
    "        </field>\r" +
    "        <field name=\"inStock\"   type=\"boolean\"  title=\"In Stock\"/>\r" +
    "        <field name=\"nextShipment\"  type=\"date\" title=\"Next Shipment\"/>\r" +
    "    </fields>\r" +
    "</DataSource>\r";

    // dynamically create the DataSource instead of asking for it from the request
    DataSource supplyItem = DataSource.fromXML(xmlString);

    DSResponse dsResponse = supplyItem.execute(dsRequest);
    rpc.send(dsRequest, dsResponse);
    
} // for(requests)

%>


