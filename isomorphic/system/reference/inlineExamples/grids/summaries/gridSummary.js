
isc.ListGrid.create({
    ID: "companyList",
    width:800, height:520,
    
    autoFetchData:true,
    dataSource:orderItemLocalDS,
    showAllRecords:true,
    groupByField:"category", groupStartOpen:"all",
    canEdit:true,
    
    showGridSummary:true,
    showGroupSummary:true,
    fields:[
        {name:"orderID", includeInRecordSummary:false, summaryFunction:"count"},
        {name:"itemDescription"},
        {name:"category", showGridSummary:true, 
            getGridSummary:function (records, summaryField) {
                var seenCategories = {};
                for (var i = 0; i < records.length; i++) {
                    seenCategories[records[i].category] = true;
                }
                var totalCategories = isc.getKeys(seenCategories).length;
                return totalCategories + " Categories";
                
            }
        },
        {name:"shipDate", showGroupSummary:true, showGridSummary:false, summaryFunction:"max"},
        
        {name:"quantity", showGroupSummary:false, showGridSummary:false, canHide:false},
        {name:"unitPrice", showGroupSummary:false, showGridSummary:false, canHide:false,
         formatCellValue:function (value) {
             if (isc.isA.Number(value)) {
                return value.toCurrencyString("$");
             }
             return value;
         }
        },
        {name:"total", title:"Total", type:"summary", canHide:false,
         recordSummaryFunction:"multiplier", summaryFunction:"sum",
         showGridSummary:true, showGroupSummary:true,
         align:"right",
         formatCellValue:function (value) {
             if (isc.isA.Number(value)) {
                return isc.NumberUtil.format(value, "$#,##0.00");
             }
             return value;
         }
        }
    ]
})
