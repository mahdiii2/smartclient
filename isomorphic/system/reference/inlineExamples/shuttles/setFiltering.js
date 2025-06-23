isc.HLayout.create({
    ID:"mainLayout",
    membersMargin:20,
    width:"100%", height:"100%", overflow:"auto",
    members:[        
        isc.VLayout.create({
            membersMargin:20,
            members:[
                isc.SearchForm.create({
                    ID:"searchForm",
                    isGroup:true, groupTitle:"Search Form",
                    fields:[
                        {name:"SKU"},
                        {name:"itemName"},
                        {name:"category"},
                        {name:"units"}
                    ],
                    dataSource:"supplyItem"
                }),
                isc.FilterBuilder.create({
                    ID:"filterBuilder",
                    isGroup:true, groupTitle:"Filter Builder",
                    dataSource:"supplyItem",
                    allowedFields:[
                        "SKU",
                        "itemName",
                        "category",
                        "units"
                    ],
                    topOperatorAppearance:"none",
                    visibility:"hidden"
                }),
                isc.HLayout.create({
                    height:1,
                    membersMargin:5,
                    members:[
                        isc.Button.create({
                            title:"Toggle Filtering Interface",
                            width:200,
                            click : function () {
                                if (searchForm.isVisible()) {
                                    searchForm.hide();
                                    filterBuilder.show();
                                } else {
                                    filterBuilder.hide();
                                    searchForm.show();
                                }
                                // reset the grid
                                supplyList.setData([]);
                            }
                        }),
                        isc.Button.create({
                            title:"Filter Grid",
                            click:function () {
                                var criteria = searchForm.isVisible() ? searchForm.getValuesAsCriteria()
                                                                      : filterBuilder.getCriteria();
                                supplyList.filterData(criteria);
                            }
                        })
                    ]
                }),
                isc.ListGrid.create({
                    ID: "supplyList",
                    width:500, height:300, 
                    dataSource: supplyItem,
                    fields:[
                        {name:"SKU"},
                        {name:"itemName"},
                        {name:"category"},
                        {name:"units"},
                    ],
                    filterOnKeypress: true,
                    fetchDelay: 500
                })
            ]
        })
    ]
})
