isc.IButton.create({
    ID:"loadButton",
    title: "Load Schema",
    click : function () {
        isc.XMLTools.loadXMLSchema("[ISOMORPHIC]/system/reference/inlineExamples/dataIntegration/xml/supplyItem.xsd", 
                                   this.getID()+".loadXMLSchemaReply(schemaSet)");
    },
    loadXMLSchemaReply : function (schemaSet) {
        var ds = schemaSet.getSchema("supplyItem");
        listGrid.setDataSource(ds);
        dynamicForm.setDataSource(ds);

        // to demonstrate grid editors, add sample data and start editing
        listGrid.setData([{ itemId:123, itemName:"Sample Item" }]);        
        listGrid.startEditing();

        // to demonstrate validation, use values that will fail validation
        dynamicForm.setValue("unitCost", -1.234);
        dynamicForm.setValue("SKU", "thisSkuIsWayTooLong");
        validateButton.enable();
    }
});


isc.ListGrid.create({ ID: "listGrid", canEdit:true });

isc.DynamicForm.create({ ID: "dynamicForm" });

isc.IButton.create({
    ID: "validateButton",
    title: "Validate",
    click: "dynamicForm.validate()",
    disabled: true
});

isc.VLayout.create({
    width:"100%",
    height:"100%",
    membersMargin:10,
    members:[loadButton, listGrid, dynamicForm, validateButton]
});
