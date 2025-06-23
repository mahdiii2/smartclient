
isc.HLayout.create({
    ID:"gridLayout",
    width:"100%",
    height:300,
    membersMargin:10,
    members:[
        isc.ListGrid.create({
            ID: "allSupplyItemsList",
            width: 500,
            height: 224,
            canDragRecordsOut: true,
            dragDataAction: "move",
            dataSource: supplyItem,
            autoFetchData: true,
            fields: [
                {name:"itemName"},
                {name:"SKU"}, 
                {name:"category"}
            ]
        }),
        isc.ListGrid.create({
            ID: "sundriesSupplyItemsList",
            width: 500,
            height: 224,
            left: 320,
            canAcceptDroppedRecords: true,
            dataSource: supplyItem,
            fields: [
                {name:"itemName"},
                {name:"SKU"}, 
                {name:"category"}
            ]
        })
    ]
});

sundriesSupplyItemsList.fetchData({category: "Office Machine Sundries"});
