isc.ListGrid.create({
    ID: "countryList",
    width:600, height:224,  
    fields:[
        {name:"countryCode", title:"Code"},
        {name:"countryName", title:"Country"},
        {name:"independence", title:"Nationhood", type:"date", width:150},
        {name:"population", title:"Population", type:"integer"},
        {name:"gdp", title:"GDP", type:"float"}
    ],
    data: countryData
})
