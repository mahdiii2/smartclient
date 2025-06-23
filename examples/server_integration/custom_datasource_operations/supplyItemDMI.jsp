<!--------------------------------------------------------------------
	SmartClient SDK
	Custom DataSource Operations Remoting Example

	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HEAD><TITLE>
		SmartClient SDK - Custom DataSource Operations Remoting example
</TITLE></HEAD><isomorphic:loadISC skin="SmartClient"/>
<BODY BGCOLOR=#D3D3D3><SCRIPT>

<isomorphic:loadDS ID="supplyItemDMI"/>

VStack.create({
	left:50, top:75,
	width:"70%",
	membersMargin:20,
	members:[

		Label.create({
			ID:"helpText",
              autoDraw: false,
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
            autoDraw: false,
            dataSource: supplyItemDMI,
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
		SearchForm.create({
			ID:"boundForm",
              autoDraw: false,
              dataSource: supplyItemDMI,
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
              autoDraw: false,
              dataSource: supplyItemDMI
		})
	]
});

boundList.filterData();

</SCRIPT></BODY>
</HTML>
