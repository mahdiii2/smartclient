isc.ListGrid.create({
    ID: "countryList",
    width:850, height:250, 
    dataSource: CM_Payment,
    autoFetchData: true,
    initialCriteria: {
        _constructor:"AdvancedCriteria",
        operator:"and",
        criteria:[
            { fieldName:"amount", operator:"greaterThan", value: 45000 }
        ]
    },
    fields:[
        {name:"customerName", title:"Customer Name", width: 200},
        {name:"checkNumber", title:"Check Number", width: 150},
        {name:"paymentDate", title:"Order Date", width: 250, format:"ddd MMMM dd yyyy"},
        {name:"amount", title:"Amount", format: ",0.00"}
    ],
    showFilterEditor: true
});

isc.DynamicForm.create({
    ID: "exportForm",
    width:300, 
    fields: [
        { name: "exportType", title: "Export Type", type:"select", width:"*",
            defaultToFirstOption: true,
            valueMap: { 
                "csv" : "CSV" , 
                "xml" : "XML", 
                "json" : "JSON",
                "xls" : "XLS",
                "ooxml" : "XLSX"
            }
        },
        { name: "showInWindow", title: "Show in Window", type: "boolean", align:"left" }
    ]
});

isc.VLayout.create({
    members: [
        exportForm, countryList
    ]
});


isc.Button.create({
   ID: "exportButton",
   title: "Export",
   left: 320, 
   click: function () {
       var exportAs = exportForm.getField("exportType").getValue();
       var showInWindow = exportForm.getField("showInWindow").getValue();
       if (exportAs == "json") {
           // JSON exports are server-side only
           isc.say("For security reasons, client-sourced requests for JSON exports are not " +
                   "allowed.  Please use a different format.");
       } else {
           countryList.exportClientData({ exportAs: exportAs,
               exportDisplay: showInWindow ? "window" : "download", lineBreakStyle: "dos"
           });
       }
   }
});

