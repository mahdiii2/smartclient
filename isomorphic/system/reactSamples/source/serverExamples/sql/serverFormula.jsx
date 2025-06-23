/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, LGField, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onOrderGridSelectionChanged = function (record, state) {
    orderLineGrid.fetchData({ orderNumber: record.orderNumber });
    orderLineGrid.setGroupTitle('Items in Order #' + record.orderNumber);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" ID="testLayout" width="500" height="100%">
        <members>
            <ListGrid ID="orderLineGrid" dataSource="OrderLine_FormulaField" autoFetchData="false" width="700" height="224" isGroup="true" groupTitle="Items in Order #">
                <fields>
                    <LGField name="orderNumber"/>
                    <LGField name="productName"/>
                    <LGField name="orderLineNumber"/>
                    <LGField name="quantityOrdered"/>
                    <LGField name="priceEach"/>
                    <LGField name="totalCost"/>
                </fields>
            </ListGrid>
            <ListGrid ID="orderGrid" dataSource="Order_AggregatedField" selectionType="single" autoFetchData="false" width="700" height="224" isGroup="true" groupTitle="Orders showing total cost" selectionChanged={onOrderGridSelectionChanged}>
                <fields>
                    <LGField name="orderNumber"/>
                    <LGField name="orderDate"/>
                    <LGField name="requiredDate"/>
                    <LGField name="status"/>
                    <LGField name="comments"/>
                    <LGField name="orderTotal"/>
                </fields>
            </ListGrid>
        </members>
    </VLayout>,
    document.getElementById(target)
);

orderGrid.fetchData(null, function (data) {
    orderGrid.selectRecord(0);
    var orderNumber = orderGrid.getSelectedRecord().orderNumber;
    orderLineGrid.fetchData({ 'orderNumber': orderNumber });
    orderLineGrid.setGroupTitle('Items in Order #' + orderNumber);
});
