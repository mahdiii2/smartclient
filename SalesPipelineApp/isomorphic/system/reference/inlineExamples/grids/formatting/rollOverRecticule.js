isc.ListGrid.create({
    ID:"countryList",
    width:500, height:224,
    data: countryData,
    selectionType:"single",
    fields:[
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName", title:"Country"},
        {name:"capital", title:"Capital"},
        {name:"continent", title:"Continent"}
    ],
    
    showRollOverCanvas:true,
    rollOverCanvasConstructor:isc.StretchImg,
    rollOverCanvasProperties:{
        vertical:false, capSize:7,
        src:"[SAMPLE]other/cellOverRecticule.png"
    }
})
