isc.ListGrid.create({
    ID: "countryList",
    width:500, height:224,  canDragSelect: true,
    sortField: 1,
    data: countryData,
    baseStyle:"cell",
    // turn off alternateFieldStyles so the custom styles are properly applied
    alternateFieldStyles: false,
    fields:[
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName", title:"Country"},
        {name:"capital", title:"Capital"},
        {name:"population", title:"Population", type:"number"}
    ],
    
    getBaseStyle: function (record, rowNum, colNum) {
        if (this.getFieldName(colNum) == "population") {
            if (record.population > 1000000000) {
                return "myHighGridCell";
            } else if (record.population < 50000000) {
                return "myLowGridCell";
            } else {
                return this.baseStyle;
            }
        } else {
            return this.baseStyle;
        }
    }

})
