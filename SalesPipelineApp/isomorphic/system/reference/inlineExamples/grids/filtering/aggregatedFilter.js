
var sc1 = {
    summary: "Best-sellers",
    description: "All products that have sold at least 1000 units",
    criteria: {
        _constructor: "AdvancedCriteria", 
        operator: "and", 
        criteria: [    
            {
                fieldQuery: {
                    dataSource: "CM_OrderLine",
                    summaryFunctions: {"quantityOrdered" : "sum"}
                },
                operator: "greaterOrEqual",
                value: 1000
            }
        ]
    }
};
var sc2 = {
    summary: "All 'In Process' orders where the customer has spent at least $20,000",
    description: "Orders where status equals 'In Process' and total payments for the ordering customer are at least $20,000",
    criteria: {
        "_constructor":"AdvancedCriteria",
        "operator":"and",
        "criteria":[
            {
                "fieldName":"status",
                "operator":"equals",
                "value":"In Process"
            },
            {
                "operator":"greaterOrEqual",
                "value":"20000",
                "fieldQuery":{
                    "groupBy":[
                        "customerNumber"
                    ],
                    "summaryFunctions":{
                        "amount":"sum"
                    },
                    "dataSource":"CM_Payment"
                }
            }
        ]
    }
};
var sc3 = {
    summary: "All customers in the USA who placed fewer orders in 2021 than they did in 2022",
    description: "All customers located in the USA who placed a lower number of orders in the year 2021 than they placed in 2022.",
    criteria: {
        _constructor: "AdvancedCriteria", 
        operator: "and", 
        criteria: [
            {
                fieldName: "country", 
                operator: "equals", 
                value: "USA"
            },
            {
                fieldQuery: {
                    dataSource: "CM_Order",
                    summaryFunctions : { orderNumber : "count" },
                    criteria: {
                        fieldName: "orderDate", 
                        operator: "iBetweenInclusive", 
                        start:new Date("2021-01-01"), 
                        end:new Date("2021-12-31")
                    }
                }, 
                operator: "lessThan",
                valueQuery: {
                    dataSource: "CM_Order",
                    summaryFunctions : { orderNumber : "count" },
                    criteria: {
                        fieldName: "orderDate", 
                        operator: "iBetweenInclusive", 
                        start:new Date("2022-01-01"), 
                        end:new Date("2022-12-31")
                    }
                }
            }
        ]
    }
};

var valueMap = {
    "sc1" : "Best-sellers",
    "sc2" : "All 'In Process' orders where the customer has spent at least $20,000",
    "sc3" : "All customers in the USA who placed fewer orders in 2021 than they did in 2022",
    "sc4" : "Custom..."
}

var filter = isc.FilterBuilder.create({
    ID:"advancedFilter",
    allowAggregates: true
});

var criteriaForm = isc.DynamicForm.create({
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
    width: 660,
    fields: [
        {
            name: "selectItem", title: "Select Scenario", wrapTitle: false,
            editorType: "SelectItem", width:"*",
            valueMap : valueMap,
            changed: function(form, item, value) {
                if (value == "sc1") {
                    listGrid.setDataSource("CM_Product");
                    advancedFilter.setDataSource("CM_Product");
                    advancedFilter.setCriteria(sc1.criteria);
                } else if (value == "sc2") {
                    listGrid.setDataSource("CM_Order");
                    advancedFilter.setDataSource("CM_Order");
                    advancedFilter.setCriteria(sc2.criteria);
                } else if (value == "sc3") {
                    listGrid.setDataSource("CM_Customer");
                    advancedFilter.setDataSource("CM_Customer");
                    advancedFilter.setCriteria(sc3.criteria);
                } 
                
                if (value == "sc4") {
                    listGrid.setData([]);
                    advancedFilter.clearCriteria();
                } else {
                    var criteria = advancedFilter.getCriteria(),
                        description = "<ul>" + isc.DataSource.getAdvancedCriteriaDescription(criteria, filter.getDataSource(), 
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
        form.setValue("selectItem", "sc4");
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