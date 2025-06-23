<!--------------------------------------------------------------------
	SmartClient SDK
	Custom DataSource Operations Example

	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<%@ page import="com.isomorphic.datasource.*" %>
<%@ page import="com.isomorphic.js.*" %>
<HEAD><TITLE>
		SmartClient SDK - Custom DataSource Operations example
</TITLE></HEAD><isomorphic:loadISC skin="SmartClient"/>
<BODY BGCOLOR=#D3D3D3><SCRIPT>

<%

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
    out.write(JSTranslater.get().toJS(supplyItem));
%>

isc.RPCManager.actionURL = "dynamicDataSource.jsp";

// create ListGrid, DetailViewer, & DynamicForm components to bind to datasources
// (nested inside a VStack to manage layout)
VStack.create({
	left:50, top:75,
	width:"70%",
	membersMargin:20,
	members:[

		Label.create({
			ID:"helpText",
			autoDraw:false,
			contents:"<ul>" +
				"<li>click a record in the grid to view and edit that record in the form</li>" +
				"<li>click <b>Save</b> to save changes to an edited record in the form</li>" +
				"<li>click <b>Clear</b> to clear all fields in the form</li>" +
				"<li>click <b>Filter</b> to filter (substring match) the grid based on the value of the 'Item' form value only.</li>" +
				"<li>click <b>Fetch</b> to fetch records (exact match) for the grid based on the value of the 'Item' form value only.</li>" +
				"<li>click <b>Delete</b> to delete all selected records</li>" +
				"<li>double-click a record in the grid to edit inline (press Return, or arrow/tab to another record, to save)</li>" +
				"</ul>"
		}),

		// databound ListGrid
		//   * click records to edit in boundForm and view in boundViewer
		//   * double-click record to edit inline (Return or arrow/tab off current row to save)
		ListGrid.create({
			ID:"boundList",
			autoDraw:false,
            dataSource: dynamicSupplyItem,
			height:200,
			canEdit:true,
            selectionChanged : function (record, state) {
                if (this.selection.anySelected()) {
                    deleteBtn.enable();
                    saveBtn.setDisabled(this.selection.multipleSelected());
                    boundForm.editRecord(record);
                    boundViewer.viewSelectedData(this);
                } else {
                    deleteBtn.disable();
                    saveBtn.disable();
                }
            }
		}),

		// databound SearchForm
		//   * click boundList records to edit
		SearchForm.create({
			ID:"boundForm",
			autoDraw:false,
            dataSource: dynamicSupplyItem,
			numCols:"6",
			autoFocus:false
		}),

		// toolbar to perform various actions using the boundForm values (see helpText above)
		Toolbar.create({
			autoDraw:false,
			membersMargin:10,
            buttonConstructor: "IButton",
            height: 22,
			buttons:[
				{title:"Save", click:"boundForm.saveData()", ID:"saveBtn"},
				{title:"Clear", click:"boundForm.clearValues();boundForm.editNewRecord();saveBtn.enable()"},
				{title:"Filter", click:"boundList.filterData(boundForm.getValuesAsCriteria());"},
				{title:"Fetch", 
                 click:"boundList.fetchData(boundForm.getValuesAsCriteria());"},
				{title:"Delete", ID:"deleteBtn", disabled: true, 
                 click:"boundList.removeSelectedData();boundList.deselectAllRecords()"}
			]
		}),
		
		// databound DetailViewer
		//   * click boundList records to display
		DetailViewer.create({
			ID:"boundViewer",
			autoDraw:false,
            dataSource: dynamicSupplyItem
		})
	]
});

boundList.filterData();

</SCRIPT></BODY>
</HTML>

