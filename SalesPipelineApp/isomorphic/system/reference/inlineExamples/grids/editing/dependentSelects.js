
// ---------------------------------------------------------------------------------------
// Local Data Example

isc.Label.create({
    top: 5,
    contents: "Local Data",
    width: "90%",
    height: 25,
    autoDraw: true,
    baseStyle: "exampleSeparator"
});

isc.ListGrid.create({
    top: 30,
    width: 500,
    height: 150,
    canEdit:true,
    autoDraw: true,
    extraSpace: 10,
    data:[
        {employee:"Richard Smith", division:"Marketing", department:"Community Relations"},
        {employee:"Sam Edwards", division:"Services", department:"Support"}
    ],
    fields: [
        {name:"employee", title:"Name", canEdit:false},
        {name: "division",
         title: "Division",
         editorType: "SelectItem",
         valueMap: ["Marketing", "Sales", "Manufacturing", "Services"],
         // Calling 'setValueMap()' will force the 'getEditorValueMap' method to be
         // re-evaluated for the department field
         changed:"item.grid.setValueMap('department')"
        },
        {name: "department",
         title: "Department",
         editorType: "SelectItem",
         getEditorValueMap : function (values, field, grid) {
             var division = values.division;
             return field.departments[division];
         },
         departments: {
            Marketing: ["Advertising", "Community Relations"],
            Sales: ["Channel Sales", "Direct Sales"],
            Manufacturing: ["Design", "Development", "QA"],
            Services: ["Support", "Consulting"]
         },
         editorProperties:{
             addUnknownValues:false
         }
        }
    ]

});


// ---------------------------------------------------------------------------------------
// Remote Data Example

isc.Label.create({
    top: 200,
    contents: "Remote Data",
    width: "90%",
    height: 25,
    autoDraw: true,
    baseStyle: "exampleSeparator"
});

isc.ListGrid.create({
    ID: "orderList",
    top: 225,
    width: 500,
    height:150,
    canEdit:true,
    autoDraw: true,
    modalEditing: true,
    extraSpace: 10,
    
    fields: [
        {name:"quantity", title:"Qty", type:"integer", width:60},
        {name:"categoryName", title:"Category", editorType:"SelectItem", 
         // setEditValue() explicitly to null, to override any existing
         // value in the record that was from another category
         changed:"this.grid.setEditValue(this.rowNum, 'itemName', null);",
         editorProperties : { optionDataSource:"supplyCategory" }
        },
        {name: "itemName", title:"Item", editorType: "SelectItem", 
         editorProperties:{
             optionDataSource:"supplyItem", 
             getPickListFilterCriteria : function () {
                var category = this.grid.getEditedCell(this.rowNum, "categoryName");
                return {category:category};
             }
         }
        }
        
    ]
});

isc.IButton.create({
    top: 400,
    autoFit: true,
    title:"Order New Item",
    click:"orderList.startEditingNew({quantity:1})"
});


