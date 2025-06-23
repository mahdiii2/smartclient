isc.ListGrid.create({
    ID: "countryList",
    width:870, height:224, 
    headerHeight: 65,
    dataSource: countryDS,
    autoFetchData: true,
    fields:[
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName", title:"Country"},
        {name:"capital"},
        {name:"government", width: 120},
        {name:"independence", title:"Nationhood", width:115},
        {name:"population", title:"Population"},
        {name:"area", title:"Area (km&sup2;)"},
        {name:"gdp"}
    ],
    headerSpans: [
        {
            fields: ["countryCode", "countryName"], 
            title: "Identification"
        },
        {
            fields: ["capital", "government", "independence"], 
            title: "Government & Politics"
        },
        {
            fields: ["population", "area", "gdp"], 
            title: "Demographics"
        }
    ]
    
})
