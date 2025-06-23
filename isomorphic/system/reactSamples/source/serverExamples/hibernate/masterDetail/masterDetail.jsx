/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DateItem, DynamicForm, IButton, LGField, Label, ListGrid, TextItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onOrdersListSelectionChanged = function (record, state) {
    if (state) {
        orderForm.editRecord(record);
        orderItemsList.setData(record.items);
    }
};
let onSaveClick = function () {
    isc.RPCManager.startQueue();
    orderItemsList.saveAllEdits();
    orderForm.setValue('items', orderItemsList.data);
    orderForm.saveData();
    isc.RPCManager.sendQueue(function () {
        orderForm.clearValues();
        ordersList.deselectAllRecords();
        orderItemsList.setData([]);
    });
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Label contents="Order" title="ordersLabel" baseStyle="exampleSeparator" ID="ordersLabel" width="90%" height="25" autoDraw="true"/>

        <ListGrid ID="ordersList" dataSource="masterDetail_orderHB" autoFetchData="true" width="500" height="170" top="40" autoDraw="true" selectionChanged={onOrdersListSelectionChanged}>
            <fields>
                <LGField name="orderID" width="25%"/>
                <LGField name="customerName"/>
                <LGField name="orderDate" width="25%"/>
            </fields>
        </ListGrid>

        <Label contents="Order Details" title="orderDetailsLabel" baseStyle="exampleSeparator" ID="orderDetailsLabel" width="90%" height="25" top="240" autoDraw="true"/>

        <VLayout membersMargin="5" width="500" top="275" autoDraw="true">
            <members>
                <DynamicForm ID="orderForm" dataSource="masterDetail_orderHB" autoDraw="false">
                    <fields>
                        <TextItem name="orderID" title="Order ID" disabled="true"/>
                        <TextItem name="customerName" title="Customer Name" wrapTitle="false"/>
                        <DateItem name="orderDate" title="Order Date"/>
                        <TextItem name="trackingNumber" title="Tracking #"/>
                    </fields>
                </DynamicForm>
                <ListGrid ID="orderItemsList" dataSource="masterDetail_orderItemHB" saveByCell="true" canEdit="true" saveLocally="true" height="130" autoDraw="false">
                    <fields>
                        <LGField name="itemDescription"/>
                        <LGField name="quantity" width="25%"/>
                        <LGField name="unitPrice" width="25%"/>
                    </fields>
                </ListGrid>
                <IButton title="Save" click={onSaveClick}/>
            </members>
        </VLayout>
    </>,
    document.getElementById(target)
);
