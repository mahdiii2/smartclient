<!--------------------------------------------------------------------
	SmartClient SDK
	Custom DataSource Operations Example

	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HEAD><TITLE>
		SmartClient SDK - Custom DataSource Operations example
</TITLE></HEAD><isomorphic:loadISC skin="SilverWave"/>
<BODY CLASS="pageBackground"><SCRIPT>

// instantiate DataSource on the client only (this example explicitly bypasses
// ISC server-side DataSource management)
isc.DataSource.create({
    ID:"supplyItem",
    fields:[
        {name:"itemID",      type:"sequence",    primaryKey:true,  hidden:true},
        {name:"itemName",    title:"Item",       length:128,       required:true},
        {name:"SKU",         title:"SKU",        canFilter:false,  length:10,        required:true},
        {name:"description", title:"Description",canFilter:false},
        {name:"category",    title:"Category",   canFilter:false,  length:128},
        {name:"units",       title:"Units",      canFilter:false,  length:5},
        {name:"unitCost",    title:"Unit Cost",  canFilter:false,  type:"float" },
        {name:"inStock",     title:"In Stock",   canFilter:false,  type:"boolean"},
        {name:"nextShipment", title:"Next Shipment", canFilter: false, type:"date"}
    ]
});

// Send all DSRequests to supplyItemOperations.jsp (in the same directory as this file) - look there
// for the server-side implementation of this example.
//
// Note: ISC provides generic APIs for processing RPC requests on the server.  You can process RPC
// requests in servlets, JSPs, and even filters.  We use a JSP here to make it easier to experiement
// with the code.
//
isc.RPCManager.actionURL = "supplyItemOperations.jsp";

// create ListGrid, DetailViewer, & DynamicForm components to bind to datasources
// (nested inside a VStack to manage layout)
isc.VStack.create({
    ID:"mainLayout",
	left:50, top:75,
	width:"70%",
    autoDraw:false,
	membersMargin:20,
	members:[

		isc.Label.create({
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
		isc.ListGrid.create({
			ID:"boundList",
			autoDraw:false,
            dataSource: supplyItem,
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
            },
            // On successful save, reset the form values to reflect the save.
            editComplete: function (rowNum, colNum, newValues, oldValues) {
                var pkField = this.getDataSource().getPrimaryKeyFieldName();
                if (boundForm.getValue(pkField) == newValues[pkField]) {
                    boundForm.editRecord(isc.addProperties(oldValues,newValues));
                }
            }

		}),

		// databound SearchForm
		//   * click boundList records to edit
		isc.SearchForm.create({
			ID:"boundForm",
			autoDraw:false,
            dataSource: supplyItem,
			numCols:"6",
			autoFocus:false
		}),

		// toolbar to perform various actions using the boundForm values (see helpText above)
		isc.Toolbar.create({
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
		isc.DetailViewer.create({
			ID:"boundViewer",
			autoDraw:false,
            dataSource: supplyItem
		})
	]
});

isc.Page.setEvent("load", function () {
    mainLayout.draw();
    boundList.filterData();
});

</SCRIPT></BODY>
</HTML>

