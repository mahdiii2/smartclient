isc.ListGrid.create({
    ID:"teamsGrid",
    width:"100%", height:"100%",
    dataSource:"teams_relation",
    autoFetchData:true,
    canEdit:true,
    fields:[
        {name:"TeamName"},
        {name:"EmployeeId", 
            canEdit:true, 
            editorProperties:{
                selectionStyle:"shuttle"
            },
         editorType:"MultiPickerItem"}
    ]
});