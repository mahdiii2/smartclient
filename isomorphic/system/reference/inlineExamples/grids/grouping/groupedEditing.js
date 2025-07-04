var countryList = isc.ListGrid.create({
    ID: "countryList",
    width:522, height:224,
    
    // use server-side dataSource so edits are retained across page transitions
    dataSource: countryDS,
    // display a subset of fields from the datasource
    fields:[
        {name:"countryName"},
        {name:"government"},
        {name:"continent"},
        {name:"countryCode", title:"Flag", width:60, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"}
    ],
    canEdit: true,
    editEvent: "click",
    groupStartOpen:"all",
    groupByField: 'continent',
    autoFetchData: false
});
countryList.fetchData(null, function () {
    countryList.startEditing(1);
});
