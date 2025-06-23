/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Criterion, DynamicForm, FilterBuilder, IButton, LGField, ListGrid, SelectItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFilterButtonClick = function () {
    orderList.setData([]);
    orderList.fetchData(advancedFilter.getCriteria(), null, { operationId: operationForm.getValue('operationId') });
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10" width="100%">
        <members>
            <DynamicForm ID="operationForm" width="550">
                <fields>
                    <SelectItem defaultToFirstOption="true" name="operationId" title="Filter" width="100%">
                        <valueMap orderAmount="Exclude entire orders with total value greater than" itemAmount="Exclude individual items within an order with value greater than"/>
                    </SelectItem>
                </fields>
            </DynamicForm>
            <FilterBuilder dataSource="aggregationCustomSQL_orderItem" ID="advancedFilter">
                <criteria operator="and">
                    <criteria>
                        <Criterion fieldName="amount" operator="greaterThan" value="30"/>
                        <Criterion fieldName="quantity" operator="greaterThan" value="3"/>
                    </criteria>
                </criteria>
            </FilterBuilder>
            <IButton title="Filter" ID="filterButton" click={onFilterButtonClick}/>
            <ListGrid ID="orderList" dataSource="aggregationCustomSQL_orderItem" showFilterEditor="false" canEdit="false" autoFetchData="false" canRemoveRecords="false" width="550" height="300">
                <fields>
                    <LGField name="orderCustomerName" title="Customer name"/>
                    <LGField name="itemDescription"/>
                    <LGField name="amount"/>
                    <LGField name="quantity"/>
                </fields>
            </ListGrid>
        </members>
    </VStack>,
    document.getElementById(target)
);

filterButton.click();
