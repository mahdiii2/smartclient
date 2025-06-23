function createLG(altRecordStyles, altFieldStyles) {
    var lg = isc.ListGrid.create({
        width:450, height:224, 
        alternateRecordStyles: altRecordStyles,
        alternateFieldStyles: altFieldStyles,
        fields:[
            {name:"countryCode", title:"Code"},
            {name:"countryName", title:"Country"},
            {name:"capital", title:"Capital"},
            {name:"continent", title:"Continent"}
        ],
        showEmptyMessage: true,
        data: countryData
    });
    return lg;
}
isc.VLayout.create({
    ID: "vLayout",
    width: 600,
    height: "100%",
    members: [
        createLG(false, false),
        isc.DynamicForm.create({
            ID: "form1",
            width: 320, numCols: 4,
            fields: [
                {name:"recordStyle" , title: "Alternate Record Styles", 
                 type: "checkbox", height: 25,
                    changed : function (form, item, value) {
                        vLayout.removeMember(0);
                        var altFieldStyleCB = form1.getValue("fieldStyle");
                        vLayout.addMember(createLG(value, altFieldStyleCB), 0);
                    }
                },
                {name:"fieldStyle", title: "Alternate Field Styles", 
                 type: "checkbox", height: 25,
                    changed : function (form, item, value) {
                        vLayout.removeMember(0);
                        var recordStyle = form1.getValue("recordStyle");
                        vLayout.addMember(createLG(recordStyle, value), 0);
                    }}
            ]
        })
    ]
})
