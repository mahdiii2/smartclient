isc.ListGrid.create({
    ID: "countryList",
    width:500, height:224, 
    canEdit:true, editEvent:"click", modalEditing:true,
    data: countryData,
    fields:[
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png", canEdit:false},
        {name:"countryName", title:"Country"},
        {name:"independence", title:"Nationhood",
            type: "date"
        }
    ]
})
