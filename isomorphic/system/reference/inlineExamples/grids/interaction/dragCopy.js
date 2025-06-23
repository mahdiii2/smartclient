isc.HStack.create({membersMargin:10, height:160, members:[    
    isc.ListGrid.create({
        ID: "countryList1",
        width:300, height:224, 
        data: countryData,
        fields:[
            {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
            {name:"countryName", title:"Country"},
            {name:"capital", title:"Capital"}
        ],
        canReorderRecords: true,
        canDragRecordsOut: true,
        canAcceptDroppedRecords: true,
        dragDataAction: "copy"
    }),
    isc.Img.create({src:"[SAMPLE]icons/32/arrow_right.png", width:32, height:32, layoutAlign:"center",
        click:"countryList2.transferSelectedData(countryList1)"
    }),
    isc.ListGrid.create({
        ID: "countryList2",
        width:200, height:224, left:350,  showAllRecords:true,
        fields:[
            {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/", imageURLSuffix:".png"},
            {name:"countryName", title:"Country"}
        ],
        emptyMessage: "drop rows here",
        canReorderRecords: true,
        canAcceptDroppedRecords: true
    })
]})

