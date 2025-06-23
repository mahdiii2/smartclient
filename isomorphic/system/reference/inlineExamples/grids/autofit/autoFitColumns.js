isc.ListGrid.create({
    ID: "countryList",
    height:224, width:100, 
    data: countryData,
    fields:[
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName", title:"Country", width:100},
        {name:"capital", title:"Capital", width:100},
        {name:"continent", title:"Continent", width:100}
    ],
    autoFitData: "horizontal",
    autoFitMaxWidth: "100%",
    leaveScrollbarGap: false
})

