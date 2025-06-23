isc.VStack.create({
    membersMargin: 10,
    members: [
        isc.FilterBuilder.create({
            ID:"advancedFilter",
            dataSource:"worldDS",
            topOperatorAppearance: "radio"
        }),
        isc.IButton.create({
            ID:"filterButton",
            title:"Filter",
            click : function () {
                countryList.filterData(advancedFilter.getCriteria());
            }
        }),
        isc.ListGrid.create({
            ID: "countryList",
            width:700, height:224,  
            dataSource: worldDS,
            fields:[
                {name:"countryName"},
                {name:"continent"},
                {name:"population"},
                {name:"area"},
                {name:"gdp"},
                {name:"independence", width:125}
            ],
            autoFetchData: true
        })
    ]
});

