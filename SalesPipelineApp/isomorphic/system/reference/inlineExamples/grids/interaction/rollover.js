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
    showRollOver: true
})


isc.IButton.create({
    left:0, top:240,
    title:"Rollover on",
    click:"countryList.showRollOver = true;"
})

isc.IButton.create({
    left:130, top:240,
    title:"Rollover off",
    click:"countryList.showRollOver = false;"
})
