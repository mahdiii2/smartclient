isc.ListGrid.create({
    ID: "countryList",
    width:522, height:300,
     
    dataSource: countryDS,
    // display a subset of fields from the datasource
    fields:[
        {name:"countryName"},
        {name:"government"},
        {name:"continent"},
        {name:"countryCode", title:"Flag", width:40, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png", canEdit:false}
    ],
    groupStartOpen:"all",
    groupByField: 'continent',
    autoFetchData: true
})

