
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, VLayout, DynamicForm, FormItem, RadioGroupItem, ListGrid, LGField, HLayout, IButton, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onListGridFieldChanged = function() { this.grid.clearEditValue(this.rowNum, 'itemName'); };
let onIButtonClick = function() { orderItemsList.startEditingNew({quantity:1}) };
let onSaveButtonClick = function() {
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
    };


// ---------------------------------------------------------------------------------------
// The code that follows is just to illustrate when SmartClient has contacted the server,
// to underline the point about queuing. It is not part of the example.

let serverCount = isc.Label.create({
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

let origBGColor,
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

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <Canvas>
            <childComponents>
                <VLayout membersMargin="20">
                    <members>
                        <DynamicForm ID="radioGroupForm" wrapItemTitles="false">
                            <values chainingApproach="server-driven"/>
                            <fields>
                                <RadioGroupItem vertical="false" editorType="radioGroup" name="chainingApproach" title="Transaction Chaining approach" wrap="false">
                                    <valueMap>
                                            <value>server-driven</value>
                                            <value>client-driven</value>
                                    </valueMap>
                                </RadioGroupItem>
                            </fields>
                        </DynamicForm>
                        <DynamicForm ID="orderForm" dataSource="queuedAdd_order" wrapItemTitles="false" useAllDataSourceFields="true"/>
                        <ListGrid ID="orderItemsList" dataSource="queuedAdd_orderItem" autoSaveEdits="false" canEdit="true" width="500" height="224">
                            <fields>
                                <LGField name="quantity" type="integer" title="Qty" width="50"/>
                                <LGField name="categoryName" title="Category" editorType="SelectItem" changed={onListGridFieldChanged}
                                    editorProperties={ {optionDataSource:"supplyCategory"} }/>
                                <LGField name="itemID" title="Item" optionDataSource="supplyItem" valueField="itemID" displayField="itemName" 
                                    editorType="SelectItem"
                                    editorProperties={{
                                         getPickListFilterCriteria : function () {
                                            var category = this.grid.getEditedCell(this.rowNum, "categoryName");
                                            return {category:category};
                                         }
                                     }}/>
                            </fields>
                        </ListGrid>
                        <HLayout membersMargin="10">
                            <members>
                                <IButton autoFit="true" title="Add Order Line" ID="addButton" minWidth="110" click={onIButtonClick}/>
                                <IButton title="Save Order" ID="saveButton" width="100" click={onSaveButtonClick}/>
                            </members>
                        </HLayout>
                    </members>
                </VLayout>
            </childComponents>
        </Canvas>

    </>,
    document.getElementById(target)
);

stopTracking();



