isc.ListGrid.create({
    ID: "countryList",
    width:600, height:224, 
    fields:[
    // move countryCode before country name and replace with flag image/title
        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
        {name:"countryName"},
    // change title and alignment of independence date
        {name:"independence", title:"Nationhood", align:"center", width:150},
    // change format of population from the one on the DataSource
        {name:"population", format:"0.0"},
    // format GDP as $M instead of $B
        {name:"gdp", title:"GDP ($M)", formatCellValue:"isc.NumberUtil.format(value*1000, ',0')"}
    ],
    dataSource: countryDS,
    autoFetchData: true
})
