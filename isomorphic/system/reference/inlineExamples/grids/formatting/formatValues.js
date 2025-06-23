isc.ListGrid.create({
    ID: "countryList",
    width:500, height:224,
    data: countryData,
    fields:[
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName", title:"Country"},
        {name:"independence", title:"Nationhood", type:"date", width: 115,
            formatCellValue: function (value) {
                if (isc.isA.Date(value)) {
                    return (new Date().getYear() - value.getYear()) + " years ago";
                }
            }
        },
        {name:"area", title:"Area", type:"number",
            formatCellValue: "isc.NumberUtil.format(value, ',0') + ' km&sup2;'"
        }
    ]
})
