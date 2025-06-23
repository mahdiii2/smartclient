isc.ListGrid.create({
    ID: "countryList",
    width:500, top:50, 
    dataSource: worldDS,
    autoFetchData: true,
    fields:[
        {name:"countryName", title:"Country"},
        {name:"capital", title:"Capital"},
        {name:"continent", title:"Continent"}
    ],
    autoFitData: "vertical",
    showFilterEditor: true,
    autoFitMaxRecords: 10
});
