isc.ListGrid.create({
    ID: "countryList",
    width:500, height:224, 
    fields:[
        {name:"countryCode", title:"Code"},
        {name:"countryName", title:"Country"},
        {name:"capital", title:"Capital"}
    ],
    data: countryData
})
