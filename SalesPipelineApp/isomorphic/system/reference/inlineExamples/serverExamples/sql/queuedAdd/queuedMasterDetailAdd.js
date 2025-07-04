isc.DynamicForm.create({
    ID: "radioGroupForm", 
    autoDraw: false,
    wrapItemTitles: false,
    fields: [{ name: "chainingApproach", title: "Transaction Chaining approach", vertical: false, wrap: false,
               editorType: "radioGroup", valueMap: ["server-driven", "client-driven"]}],
    values: {chainingApproach:"server-driven"}
});

isc.DynamicForm.create({
    ID: "orderForm",
    autoDraw: false,
    dataSource: queuedAdd_order,
    useAllDataSourceFields: true,
    wrapItemTitles: false
});

isc.ListGrid.create({
    ID: "orderItemsList",
    width: 500,
    height: 224,
    dataSource: queuedAdd_orderItem,
    canEdit: true,
    autoDraw: false,
    autoSaveEdits: false,
    fields: [
        {name:"quantity", title:"Qty", type:"integer", width:50},
        {name:"categoryName", title:"Category", editorType:"SelectItem", 
         changed:"this.grid.clearEditValue(this.rowNum, 'itemName');",
         editorProperties : { optionDataSource:"supplyCategory" }
        },
        {name: "itemID", title:"Item", editorType: "SelectItem", 
         optionDataSource: "supplyItem", valueField: "itemID", displayField: "itemName",
         editorProperties:{
             getPickListFilterCriteria : function () {
                var category = this.grid.getEditedCell(this.rowNum, "categoryName");
                return {category:category};
             }
         }
        }
        
    ]
});

isc.IButton.create({
    ID: "addButton",
    autoDraw: false,
    minWidth: 110,
    autoFit: true,
    title: "Add Order Line",
    click: "orderItemsList.startEditingNew({quantity:1})"
});

isc.IButton.create({
    ID: "saveButton",
    autoDraw: false,
    width: 100,
    title: "Save Order",
    click: function() {
        startTracking();
        isc.RPCManager.startQueue();
        orderForm.saveData();
        if (radioGroupForm.getValue("chainingApproach") === "client-driven") {
            // don't need special server operationBinding when using client-driven Transaction Chaining (fieldValueExpressions)
            var editRows = orderItemsList.getAllEditRows();
            for (var i = 0; i < editRows.length; i++) {
                // client-driven Transaction Chaining: pass fieldValueExpressions to dynamically make the OrderItem foreignKey 
                // match the inserted Order primaryKey.
                // fieldValueExpressions are very limited for security reasons, but accomplish all the key use cases of Transaction Chaining.
                orderItemsList.addData(orderItemsList.getEditedRecord(editRows[i]), null, 
                                        {fieldValueExpressions: { orderID: "$masterId" }});
            }
        } else {
            orderItemsList.saveAllEdits();
        }
        isc.RPCManager.sendQueue(function() {
            orderForm.editNewRecord();
            orderItemsList.setData([]);
        });
        stopTracking();
    }
});

isc.VLayout.create({
    membersMargin: 20,
    members: [ 
        radioGroupForm,
        orderForm, 
        orderItemsList, 
        isc.HLayout.create({membersMargin:10, members:[addButton, saveButton]})
    ]
});

// ---------------------------------------------------------------------------------------
// The code that follows is just to illustrate when SmartClient has contacted the server,
// to underline the point about queuing. It is not part of the example.

isc.Label.create({
    ID: "serverCount",
    top: 140, padding: 10, left: 520,
    width: 260, height: 40,
    border: "1px solid grey",
    contents: "<b>Number of server saves: 0<br>No queues sent</b>",
    count: 0,
    incrementAndUpdate: function (requests) {
        this.count++;
        this.setContents("<b>Number of server saves: " + this.count + 
                         "<br>Last queue contained " + requests.length + " request(s)</b>"); 
    }
});

var origBGColor,
    restoreBGColorTimerID;
function startTracking() {
    isc.RPCManager.addClassProperties({
        queueSent: function (requests) {
            if (serverCount && !serverCount.destroyed) this.updateServerContactLabel(requests);
        },
        updateServerContactLabel: function (requests) {
            serverCount.incrementAndUpdate(requests);
            // Flash the label
            if (restoreBGColorTimerID == null) origBGColor = serverCount.backgroundColor;
            else isc.Timer.clear(restoreBGColorTimerID);
            serverCount.setBackgroundColor("#ffff77");
            restoreBGColorTimerID = isc.Timer.setTimeout(function () {
                restoreBGColorTimerID = null;
                if (serverCount && !serverCount.destroyed) serverCount.setBackgroundColor(origBGColor);
            }, 500);
        }

    });
}

function stopTracking() {
    delete isc.RPCManager.queueSent;
    delete isc.RPCManager.updateServerContactLabel;
}

stopTracking();
