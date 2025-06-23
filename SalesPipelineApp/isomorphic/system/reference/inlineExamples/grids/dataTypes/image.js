isc.ListGrid.create({
    ID: "countryList",
    width:200, height:224,  
    data: countryData,
    fields:[
        {name:"countryCode", title:"Flag", width:65,
            type: "image",
            imageURLPrefix: "flags/24/",
            imageURLSuffix: ".png"
        },
        {name:"countryName", title:"Country"}
    ]
})
