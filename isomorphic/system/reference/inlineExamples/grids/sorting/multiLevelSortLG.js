isc.ListGrid.create({
    ID: "supplyList",
    top: 30, width:700, height:300, 
    
    dataSource: supplyItem,
    autoFetchData: true,
    canMultiSort: true,
    initialSort: [
        {property: "category", direction: "ascending"},
        {property: "itemName", direction: "descending"}
    ]
})

