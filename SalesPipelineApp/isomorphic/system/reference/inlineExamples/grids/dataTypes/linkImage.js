isc.ListGrid.create({
    ID: "countryList",
    width:300, height:224, cellHeight:24,  
    data: countryData,
    fields:[
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png", canEdit:false},
        {name:"countryName", title:"Country"},
        {name:"article", title:"Info",
            type: "link",
            width:50,
            align:"center",            
            linkText:isc.Canvas.imgHTML("[SAMPLE]other/openbook.png",24,24)
        }
    ]
})
