
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout, DynamicForm, FormItem, TextItem, FloatItem, ButtonItem, ListGrid, LGField, SortSpecifier } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFilterButtonClick = function() {
                var criteria = {
                    _constructor: "AdvancedCriteria",
                    operator: "and",
                    criteria: [
                        {fieldName: "itemDescription", operator: "contains", value: orderItemCriteriaForm.getValue("itemDescription")},
                        {fieldName: "quantity", operator: "greaterThan", value: orderItemCriteriaForm.getValue("quantity")},
                        {fieldName: "amount", operator: "greaterThan", value: orderItemCriteriaForm.getValue("amount")}
                    ]
                };
                orderList.setData([]);
                orderList.filterData(criteria);
            };

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <VLayout membersMargin="20">
            <members>
                <DynamicForm ID="orderItemCriteriaForm" numCols="2" width="300">
                    <fields>
                        <TextItem defaultValue="widget" type="text" name="itemDescription" title="Item"/>
                        <TextItem defaultValue="4" type="integer" name="quantity" title="Quantity"/>
                        <FloatItem defaultValue="10" type="float" name="amount" title="Amount"/>
                        <ButtonItem type="button" name="filterButton" title="Filter" startRow="false" endRow="false" click={onFilterButtonClick}/>
                    </fields>
                </DynamicForm>
                <ListGrid ID="orderList" dataSource="aggregationCustomSQL2_orderItem" showFilterEditor="false" canEdit="false" alternateRecordStyles="true" autoFetchData="false" canRemoveRecords="false" width="300" height="200">
                    <fields>
                        <LGField name="orderCustomerName" title="Customer" width="200"/>
                        <LGField name="amount" title="Amount"/>
                    </fields>
                    <initialSort>
                        <SortSpecifier direction="ascending" property="orderCustomerName" normalizer="text"/>
                    </initialSort>
                </ListGrid>
            </members>
        </VLayout>

    </>,
    document.getElementById(target)
);

orderItemCriteriaForm.getItem("filterButton").click();
