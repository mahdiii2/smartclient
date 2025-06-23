isc.ListGrid.create({
    ID:"countryList",
    width:500, height:224,
    data: countryData,
    selectionType:"single",
    fields:[
        {name:"countryCode", title:"Flag", width:55, align:"center",
         type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName", title:"Country"},
        {name:"capital", title:"Capital"},
        {name:"continent", title:"Continent"}
    ],
    alternateRecordStyles: false,
    baseStyle:"simpleCell",
    showRollOver:false,
    showSelectionUnderCanvas:true,
    selectionUnderCanvasConstructor:isc.StretchImg,
    selectionUnderCanvasProperties:{
        vertical:false,
        capSize:7,
        src:"[SAMPLE]other/cellSelected.png"
    }
});
