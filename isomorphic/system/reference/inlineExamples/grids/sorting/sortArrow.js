isc.ListGrid.create({
    ID: "countryList",
    width:500, height:224, 
    data: countryData,
    fields:[
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName", title:"Country"},
        {name:"population", title:"Population", format:",0"},
        {name:"area", title:"Area (km&sup2;)", format:",0"}
    ],
    // initial sort on Population, high-to-low
    sortField: 2,
    sortDirection: "descending",
    showSortArrow: "corner" // other values: "field", "both", "none"
})
