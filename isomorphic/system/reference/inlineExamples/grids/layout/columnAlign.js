isc.ListGrid.create({
    ID: "countryList",
    width:500, height:224, top:100, 
    data: countryData,
    fields:[
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName", title:"Country"},
        {name:"capital", title:"Capital"},
        {name:"continent", title:"Continent"}
    ]
})


isc.FormLayout.create({
    items:[{
        name:"alignment", type:"radioGroup", showTitle:false,
        valueMap:["left","center","right"], defaultValue:"left",
        change:"countryList.getField('countryCode').align = value; countryList.markForRedraw()"
    }]
})
