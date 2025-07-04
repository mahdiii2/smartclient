isc.ListGrid.create({
    ID: "countryList",
    height:224, width:"100%", 
    autoFitWidthApproach:"both",
    canSort:false,
    headerAutoFitEvent:"doubleClick",
    leaveHeaderMenuButtonSpace:false,
    data: countryData,
    fields:[
        {name:"countryCode", title:"Flag Thumbnail", cellAlign:"center",
          autoFitWidth:true, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName", title:"Country", autoFitWidth:true },
        {name:"capital", title:"Capital"},
        {name:"continent", title:"Continent"}
    ]
})

