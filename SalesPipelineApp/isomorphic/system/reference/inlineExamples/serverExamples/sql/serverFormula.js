isc.ListGrid.create({
    ID: "orderLineGrid",
    width: 700, height: 224, 
    dataSource: OrderLine_FormulaField,
    autoFetchData: false,
    isGroup: true,
    groupTitle: "Items in Order #",
    fields:[
        {name:"orderNumber"},
        {name:"productName"},
        {name:"orderLineNumber"},
        {name:"quantityOrdered"},
        {name:"priceEach"},
        {name:"totalCost"}
    ]
});

isc.ListGrid.create({
    ID: "orderGrid",
    width: 700, height: 224, 
    dataSource: Order_AggregatedField,
    autoFetchData: false,
    isGroup: true,
    selectionType: "single",
    groupTitle: "Orders showing total cost",
    fields:[
        {name:"orderNumber"},
        {name:"orderDate"},
        {name:"requiredDate"},
        {name:"status"},
        {name:"comments"},
        {name:"orderTotal"}
    ],
    selectionChanged: function (record, state) {
        orderLineGrid.fetchData({orderNumber:record.orderNumber});
        orderLineGrid.setGroupTitle("Items in Order #"+record.orderNumber);
    }
})

isc.VLayout.create({
    ID: "testLayout",
    height: "100%", width:500,
    membersMargin:10,
    members: [orderLineGrid, orderGrid]
});

orderGrid.fetchData(null, function (data) {
    orderGrid.selectRecord(0);
    var orderNumber = orderGrid.getSelectedRecord().orderNumber;
    orderLineGrid.fetchData({"orderNumber":orderNumber});
    orderLineGrid.setGroupTitle("Items in Order #"+orderNumber);
});
