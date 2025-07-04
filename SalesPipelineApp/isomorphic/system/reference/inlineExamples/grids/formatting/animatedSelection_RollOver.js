isc.ListGrid.create({
    ID:"countryList",
    width:500, height:224,
    data: countryData,
    alternateFieldStyles: false,
    selectionType:"single",
    fields:[
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName", title:"Country"},
        {name:"capital", title:"Capital"},
        {name:"continent", title:"Continent"}
    ],
    baseStyle:"simpleCell",
    alternateRecordStyles: false,

    showSelectionUnderCanvas:true,
    animateSelectionUnder:true,
    selectionUnderCanvasProperties:{
        animateShowEffect:"fade",
        animateFadeTime:1000,
        backgroundColor:"#ffff40"
    },

    showRollUnderCanvas:true,
    animateRollUnder:true,
    rollUnderCanvasProperties:{
        animateShowEffect:"fade",
        animateFadeTime:1000,
        backgroundColor:"#00ffff",
        opacity:50
    }
});
