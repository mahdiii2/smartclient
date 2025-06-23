isc.ListGrid.create({
    ID: "countryList",
    width:500, height:300, 
    dataSource: worldDS,
    fields:[
        {name:"countryCode", title:"Code", width:70},
        {name:"countryName", title:"Country"},
        {name:"capital", title:"Capital"},
        {name:"continent", title:"Continent"}
    ],
    autoFetchData: true,
    showFilterEditor: true
})
