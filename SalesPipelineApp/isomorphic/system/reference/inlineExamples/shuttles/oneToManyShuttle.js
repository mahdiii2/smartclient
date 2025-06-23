isc.VLayout.create({
    autoDraw:true,
    width:"100%",
    height:"100%",
    members:[
        isc.ListGrid.create({
            ID:"countriesGrid",
            dataSource:"countrySQL_oneToManySample",
            autoFetchData:true,
            height:200, showResizeBar:true,
            selectionType:"single",
            selectionUpdated:function () {
                var selection = this.getSelectedRecord();
                if (selection == null) {
                    countryForm.clearValues();
                    countryForm.disable();
                } else {
                    countryForm.enable();
                    countryForm.editRecord(this.getSelectedRecord());
                }
            }
        }),
        
        isc.DynamicForm.create({
            ID:"countryForm",
            dataSource:"countrySQL_oneToManySample",
            disabled:true,
            fields:[
                {name:"countryName"},
                {name:"cities", canEdit:true, editorType:"ShuttleItem"},
                {editorType:"ButtonItem", title:"Save", 
                    click:function () {
                        countryForm.saveData("countriesGrid.invalidateCache()")
                    }
                }
            ]
        })
    ]
});
