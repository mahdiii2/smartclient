isc.defineClass("CountryListGrid", "ListGrid").addProperties({
    width:500, height:184,
     alternateFieldStyles: false, 
    canDragSelect: true,
    data: countryData,
    defaultFields:[
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName", title:"Country"},
        {name:"capital", title:"Capital"},
        {name:"continent", title:"Continent"}
    ]
})

isc.CountryListGrid.create({
    ID: "countryList1",
    baseStyle: "myBoxedGridCell"
})

isc.CountryListGrid.create({
    ID: "countryList2",
    top: 220,
    baseStyle: "myOtherGridCell"
})
