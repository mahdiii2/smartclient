isc.ListGrid.create({
    ID: "countryList",
    width:500, height:224, 
    data: countryData,
    fields:[
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName", title:"Country"},
        {name:"capital", title:"Capital"},
        {name:"continent", title:"Continent"}
    ],
    selectionType: "multiple",
    canDragSelect: true,
    selectionUpdated : "selectedCountries.setData(recordList)"
})


isc.ListGrid.create({
    ID: "selectedCountries",
    width:250, height:100, top:250,  showAllRecords:true,
    emptyMessage: "<b>nothing selected</b>",
    fields:[
        {name:"countryName", title:"Selected countries"}
    ]
})
