isc.VLayout.create({
    autoDraw:true,
    width:"100%",
    height:"100%",
    members:[
        isc.ListGrid.create({
            ID:"teamGrid",
            dataSource:"teams_relation",
            autoFetchData:true,
            height:200, showResizeBar:true,
            selectionType:"single",
            selectionUpdated:function () {
                var selection = this.getSelectedRecord();
                if (selection == null) {
                    teamForm.clearValues();
                    teamForm.disable();
                } else {
                    teamForm.enable();
                    teamForm.editRecord(this.getSelectedRecord());
                }
            }
        }),
        isc.DynamicForm.create({
            ID:"teamForm",
            dataSource:"teams_relation",
            disabled:true,
            fields:[
                {name:"TeamName"},
                {name:"EmployeeId", displayField:"Name", canEdit:true, editorType:"ShuttleItem"},
                {editorType:"SubmitItem", title:"Save"}
            ]
        })
    ]
});