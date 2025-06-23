isc.ListGrid.create({
    ID: "countryList",
    width:750, height:250,
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
        {name:"paymentDate", title:"Order Date", width: 250,
            formatCellValue: function (value, record) {
                if (!value || !isc.isA.Date(value)) return value;
                var month = value.getMonth();
                if (month >= 0 && month <=2) return "Q1-"+value.getFullYear();
                else if (month >= 3 && month <=5) return "Q2-"+value.getFullYear();
                else if (month >= 6 && month <=8) return "Q3-"+value.getFullYear();
                else return "Q4-"+value.getFullYear();
            }
        },
        {name:"amount", title:"Amount", 
            formatCellValue: function (value, record) {
                return isc.NumberUtil.toUSCurrencyString(record.amount);
            }
        }
    ],
    showFilterEditor: true
});

isc.DynamicForm.create({
    ID: "exportForm",
    width:300, 
    fields: [
        { name: "exportType", title: "Export Type", type:"select", width:"*", wrapTitle: false,
            defaultToFirstOption: true,
            redrawOnChange:true,
            valueMap: { 
                "csv" : "CSV" , 
                "xml" : "XML", 
                "json" : "JSON",
                "xls" : "XLS",
                "ooxml" : "XLSX"
            }
        },
        { name: "exportFormatted", 
          title: "Export dates as formatted strings", type: "boolean", 
          defaultValue:true, 
          showIf:"values.exportType == 'xls' || values.exportType == 'ooxml'",
          align:"left" },
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
   left: 320, top: 2,
   click: function () {
       var exportAs = exportForm.getField("exportType").getValue(),
           showInWindow = exportForm.getField("showInWindow").getValue();
       if (exportAs == "json") {
           // JSON exports are server-side only
           isc.say("For security reasons, client-sourced requests for JSON exports are not " +
                   "allowed.  Please use a different format.");
       } else {
           var config = {
                exportAs: exportAs,
                exportDisplay: showInWindow ? "window" : "download", lineBreakStyle: "dos"
           };
           if (exportAs == "xls" || exportAs == "ooxml") {
                config.exportDatesAsFormattedString = exportForm.getField("exportFormatted").getValue();
           }
           countryList.exportClientData(config);
       }
   }
});

