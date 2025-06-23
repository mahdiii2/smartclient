/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, LGField, ListGrid, SelectItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onItemDescriptionChanged = function (form, item, value) {
    orderItemList.fetchData({ itemDescription: value }, null, {
        groupBy: 'orderCustomerName',
        summaryFunctions: {
            quantity: 'sum',
            unitPrice: 'avg'
        }
    });
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10" width="100%">
        <members>
            <DynamicForm ID="itemsForm" width="300">
                <fields>
                    <SelectItem optionDataSource="distinctValues_orderItem" defaultToFirstOption="false" name="itemDescription" title="Item" autoFetchData="true" changed={onItemDescriptionChanged}>
                        <optionFilterContext>
                        	<groupBy>itemDescription</groupBy>
                        </optionFilterContext>
                    </SelectItem>
                </fields>
            </DynamicForm>
            <ListGrid ID="orderItemList" dataSource="distinctValues_orderItem" showFilterEditor="true" canEdit="false" headerHeight="45" wrapHeaderTitles="true" sortField="0" sortDirection="ascending" autoFetchData="false" canRemoveRecords="false" width="400" height="300">
                <fields>
                    <LGField name="orderCustomerName" title="Customer Name" width="*"/>
                    <LGField name="quantity" title="Total Quantity" width="100"/>
                    <LGField name="unitPrice" title="Avg Price" width="100" format="#,##0.00"/>
                </fields>
            </ListGrid>
        </members>
    </VStack>,
    document.getElementById(target)
);
