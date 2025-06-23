isc.ListGrid.create({
    ID: "orderItemList",
    width:700, height:224,  
    dataSource: largeValueMap_orderItem,
    fields:[
        {name: "orderID"},
        {name: "itemID", title: "Item Name", align: "left", width: "50%",  
         displayField: "itemName", editorType: "SelectItem", filterEditorType: "ComboBoxItem",
         filterEditorProperties: { optionDataSource: "supplyItem" } },
        {name: "quantity"},
        {name: "unitPrice"}
    ],
    autoFetchData: true,
    canEdit: true,
    showFilterEditor: true
});
