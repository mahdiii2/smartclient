isc.ListGrid.create({
    ID: "categoryList",
    width:850, height:300, 
    
    dataSource: supplyCategory,
    expansionFieldImageShowSelected:true,
    autoFetchData: true,
    canExpandRecords: true,
    expansionMode: "related",
    detailDS:"supplyItem",
    expansionRelatedProperties: {
        border: "1px solid inherit"
    }
});

