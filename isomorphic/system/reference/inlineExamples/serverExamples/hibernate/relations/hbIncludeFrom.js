
isc.ListGrid.create({
    ID:"cityList",
    dataSource:cityIncludeFromHB,
    width:700,
    height:224,
    showFilterEditor:true,
    
    autoFetchData:true,
    dataPageSize: 50,
    canEdit:true,
    editEvent:"click",
    canRemoveRecords:true,
    fields: [
        { name: "cityName"},
        { name: "country" },
        { name: "continentName" }
    ]
});


