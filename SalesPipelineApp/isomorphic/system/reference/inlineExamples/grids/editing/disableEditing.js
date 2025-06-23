isc.ListGrid.create({
    ID: "countryList",
    width:550, height:224, 
    dataSource: countryDS,
    fields:[
        {name:"countryCode", title:"Flag", width:40, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png", canEdit:false},
        {name:"countryName",
            canEdit:false
        },
        {name:"continent"},
        {name:"member_g8",
            canEdit:false
        },
        {name:"population"},
        {name:"independence"}
    ],
    autoFetchData: true,
    canEdit: true,
    editEvent: "click"
})
