<!--------------------------------------------------------------------
    SmartClient SDK
    Component Data Binding example

    Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HEAD><TITLE>
        SmartClient SDK - Component Data Binding example
</TITLE></HEAD><isomorphic:loadISC skin="SmartClient"/>
<BODY BGCOLOR=#D3D3D3><SCRIPT>


// load datasources
<isomorphic:loadDS ID="supplyItem" />
<isomorphic:loadDS ID="employees" />
<isomorphic:loadDS ID="animals" />


// create clickable list of datasources
//    This is a good example of a small, read-only list of data for which
//    it is appropriate to set the listGrid.data property directly.
ListGrid.create({
    ID:"dsList",
    left:20, top:75, width:130,
    leaveScrollbarGap:false,
    showSortArrow:"none",
    canSort:false,
    fields:[
        {title:"Select a DataSource", name:"dsTitle"}
    ],
    data:[
        {dsTitle:"Animals", dsName:"animals"},
        {dsTitle:"Office Supplies", dsName:"supplyItem"},
        {dsTitle:"Employees", dsName:"employees"}
    ],
    selectionType:"single",
    recordClick:"bindComponents(record.dsName)"
});


// bind components to the selected datasource, and execute
// a fetch operation with no criteria to populate the boundList
function bindComponents(ds) {
    boundList.setDataSource(ds);
    boundViewer.setDataSource(ds);
    boundForm.setDataSource(ds);
    boundList.fetchData();
    newBtn.enable(); // can't create a new record until a datasource is selected
    saveBtn.disable(); // no record selected for editing, so disable save button
}

// use the text-based date item so we can clear it for filtering purposes
isc.DateItem.addProperties({
    useTextField:true,
    allowNullValue:true
});


// create ListGrid, DetailViewer, & DynamicForm components to bind to datasources
// (nested inside a VStack to manage layout)
VStack.create({
    left:170, top:75,
    width:"70%",
    membersMargin:20,
    members:[

        Label.create({
            ID:"helpText",
            contents:"<ul>" +
                "<li>select a datasource from the list at left to bind to these components</li>" +
                "<li>click a record in the grid to view and edit that record in the form</li>" +
                "<li>click <b>New</b> to start editing a new record in the form</li>" +
                "<li>click <b>Save</b> to save changes to a new or edited record in the form</li>" +
                "<li>click <b>Clear</b> to clear all fields in the form</li>" +
                "<li>click <b>Filter</b> to filter (substring match) the grid based on form values</li>" +
                "<li>click <b>Fetch</b> to fetch records (exact match) for the grid based on form values</li>" +
                "<li>double-click a record in the grid to edit inline (press Return, or arrow/tab to another record, to save)</li>" +
                "</ul>"
        }),

        // databound ListGrid
        //   * click records to edit in boundForm and view in boundViewer
        //   * double-click record to edit inline (Return or arrow/tab off current row to save)
        ListGrid.create({
            ID:"boundList",
            height:200,
            canEdit:true,
            recordClick:"boundForm.editRecord(record); saveBtn.enable(); boundViewer.viewSelectedData(boundList)",
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
                // click can be defined as a function or a string of script to execute.
                {title:"Save", click: function () {
                                    boundForm.saveData(
                                        function (dsResponse, data, dsRequest) {
                                            if (dsResponse.status == 0) {
                                                boundForm.clearValues();
                                                saveBtn.disable();
                                            }
                                        }
                                    );
                                }, 
                 ID:"saveBtn", disabled:true},
                {title:"New", click:"boundForm.editNewRecord(); saveBtn.enable()", ID:"newBtn", disabled:true},
                {title:"Clear", click:"boundForm.clearValues(); saveBtn.disable()"},
                {title:"Filter", click:"boundList.filterData(boundForm.getValuesAsCriteria()); saveBtn.disable()"},
                {title:"Fetch", click:"boundList.fetchData(boundForm.getValuesAsCriteria()); saveBtn.disable()"}
            ]
        }),
        
        // databound DetailViewer
        //   * click boundList records to display
        DetailViewer.create({
            ID:"boundViewer"
        })
    ]
});



</SCRIPT>
</BODY></HTML>
