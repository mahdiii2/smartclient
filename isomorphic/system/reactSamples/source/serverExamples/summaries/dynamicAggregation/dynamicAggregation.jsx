
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VStack, DynamicForm, FormItem, SelectItem, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onOperationIdChanged = function (form, item, value) {
    orderItemList.setData([]);
    if ("amountByItem" == value) {
        orderItemList.fetchData({}, null, {
            groupBy: "itemDescription",
            summaryFunctions: {
                pk: "count",
                amount: "sum"
            }
        });
    } else if ("amountByCustomer" == value) {
        orderItemList.fetchData({}, null, {
            groupBy: "orderCustomerName",
            summaryFunctions: {
                pk: "count",
                amount: "sum"
            }
        });
    } else if ("minPriceByItem" == value) {
        orderItemList.fetchData({}, null, {
            groupBy: "itemDescription",
            summaryFunctions: {
                pk: "count",
                unitPrice: "min"
            }
        });
    } else {
        orderItemList.fetchData({}, null, {
            groupBy: "itemDescription",
            summaryFunctions: {
                pk: "count",
                unitPrice: "max"
            }
        });
    }
    if (value.endsWith("ByItem")) {
        orderItemList.hideField("orderCustomerName");
        orderItemList.showField("itemDescription");
    } else {
        orderItemList.showField("orderCustomerName");
        orderItemList.hideField("itemDescription");
    }
    if (value.startsWith("amount")) {
        orderItemList.hideField("unitPrice");
        orderItemList.showField("amount");
    } else {
        orderItemList.showField("unitPrice");
        orderItemList.hideField("amount");
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <VStack membersMargin="10" width="100%">
            <members>
                <DynamicForm ID="operationForm" width="300">
                    <fields>
                        <SelectItem defaultToFirstOption="true" type="select" name="operationId" title="Aggregation" changed={onOperationIdChanged}>
                            <valueMap amountByItem="Amount by item" amountByCustomer="Amount by customer" minPriceByItem="Minimum price by item" maxPriceByItem="Maximum price by item"/>
                        </SelectItem>
                    </fields>
                </DynamicForm>
                <ListGrid ID="orderItemList" dataSource="dynamicAggregation_orderItem" showFilterEditor="true" canEdit="false" alternateRecordStyles="true" autoFetchData="false" canRemoveRecords="false" width="500" height="300">
                    <fields>
                        <LGField name="orderCustomerName" title="Customer name" hidden="true"/>
                        <LGField name="itemDescription"/>
                        <LGField name="unitPrice" hidden="true"/>
                        <LGField name="amount"/>
                        <LGField name="pk" title="Count"/>
                    </fields>
                </ListGrid>
            </members>
        </VStack>

    </>,
    document.getElementById(target)
);

orderItemList.fetchData({}, null, {
    groupBy: "itemDescription",
    summaryFunctions: {
        pk: "count",
        amount: "sum"
    }
});

