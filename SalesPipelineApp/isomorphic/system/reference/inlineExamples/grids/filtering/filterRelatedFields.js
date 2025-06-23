var sc1 = {
    summary: "All Employees who report to 'mpatterso@classicmodelcars.com'",
    description: "Reports To equals the value retrieved from the CM_Employee data source where Email equals 'mpatterso@classicmodelcars.com'",
    criteria: {
        fieldName: "CM_Employee.email", 
        operator: "equals",
        value: 'mpatterso@classicmodelcars.com'
    }
};
var sc2 = {
    summary: "Orders that include a particular high-value item",
    description: "Orders that include a particular high-value item (the item with product code 'S10_4962')",
    criteria: {
        _constructor: "AdvancedCriteria", 
        operator: "and", 
        criteria: [   
            {
                fieldName: "orderNumber",
                operator: "equals",
                valueQuery: {
                    dataSource: "CM_OrderLine",
                    queryOutput: "orderNumber",
                    criteria: { 
                            fieldName: "productCode",
                            operator: "equals",
                            value: 'S10_4962'
                    }
                }
            }
        ]   
    }
};

var sc3 = {
    summary: "Products that have never been ordered",
    description: "Products that do not appear on any CM_OrderLine record",
    criteria: {
        _constructor: "AdvancedCriteria", 
        operator: "and", 
        criteria: [    
            {
                fieldName: "productCode",
                operator: "notInSet", 
                valueQuery: {
                    dataSource: "CM_OrderLine",
                    queryFK: "*none*",
                    queryOutput: "productCode"
                }
            }
        ]
    }
}

var sc4 = {
    summary: "Orders that were processed by Leslie Thompson",
    description: "CM_Order records for any Customer whose Sales Rep is Leslie Thompson (employee number 1166)",
    criteria: {
        _constructor: "AdvancedCriteria", 
        operator: "and", 
        criteria: {
            fieldName: "CM_Customer.salesRepEmployeeNumber",
            operator: "equals",
            value: "1166"
        }
    }
}


var valueMap = {
    "sc1" : "All Employees who report to 'mpatterso@classicmodelcars.com'",
    "sc2" : "Orders that include a particular high-value item",
    "sc3" : "Products that have never been ordered",
    "sc4" : "Orders that were processed by Leslie Thompson",
    "sc5" : "Custom..."
}

var filter = isc.FilterBuilder.create({
    ID:"advancedFilter",
    allowAggregates: true
});

var criteriaForm = isc.DynamicForm.create({
    ID: "criteriaForm",
    width: "100%",
    titleOrientation: "top",
    isGroup: true, groupTitle: "Criteria in natural language",
    numCols: 1,
    colWidths: ["*"],
    fields: [
        { name: "description", type: "TextArea", showTitle: false, width: "*",
            canEdit: false, readOnlyDisplay: "static", escapeHTML: false }
    ]
});

var form = isc.DynamicForm.create({
    width: 560,
    fields: [
        {
            name: "selectItem", title: "Select Scenario", wrapTitle: false,
            editorType: "SelectItem", width:"*",
            valueMap : valueMap,
            changed: function(form, item, value) {
                if (value == "sc1") {
                    listGrid.setDataSource("CM_Employee");
                    advancedFilter.setDataSource("CM_Employee");
                    advancedFilter.setCriteria(sc1.criteria);
                } else if (value == "sc2") {
                    listGrid.setDataSource("CM_Order");
                    advancedFilter.setDataSource("CM_Order");
                    advancedFilter.setCriteria(sc2.criteria);
                } else if (value == "sc3") {
                    listGrid.setDataSource("CM_Product");
                    advancedFilter.setDataSource("CM_Product");
                    advancedFilter.setCriteria(sc3.criteria);
                } else if (value == "sc4") {
                    listGrid.setDataSource("CM_Order");
                    advancedFilter.setDataSource("CM_Order");
                    advancedFilter.setCriteria(sc4.criteria);
                }                
                                
                if (value == "sc5") {
                    listGrid.setData([]);
                    advancedFilter.clearCriteria();
                } else {
                    var criteria = advancedFilter.getCriteria(),
                        description = "<ul>" + isc.DataSource.getAdvancedCriteriaDescription(criteria, advancedFilter.getDataSource(), 
                                                                                             {prefix: "<li>", suffix: "</li>"}) + "</ul>"; 

                    criteriaForm.setValue("description", description);
                    listGrid.filterData(criteria);
                }
            }
        }
    ]
});

var filterButton = isc.Button.create({
    width: 100,
    title: "Apply Filter",
    click : function() {
        listGrid.invalidateCache();
        listGrid.filterData(advancedFilter.getCriteria());
    }
});

var clearButton = isc.Button.create({
    width: 100,
    title: "Clear Filter",
    click : function() {
        listGrid.setData([]);
        advancedFilter.clearCriteria();
        form.setValue("selectItem", "sc5");
    }
});

var listGrid = isc.ListGrid.create({
    ID: "listGrid",
    width: "100%",
    height: "100%",
    isGroup: true, groupTitle: "Query results",
    autoFetchData: false,
    showAllRecords: true,
    useAllDataSourceFields: true
});

isc.VStack.create({
    width: "100%",
    height: "300",
    membersMargin: 10,
    members: [
        form,
        filter,
        isc.HLayout.create({height: 40, membersMargin: 5, members: [clearButton, filterButton]}),
        listGrid,
        criteriaForm     
    ]
});