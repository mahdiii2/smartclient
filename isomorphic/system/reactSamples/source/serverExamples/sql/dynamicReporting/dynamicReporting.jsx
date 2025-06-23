/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DateItem, DynamicForm, IButton, LGField, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFilterButtonClick = function () {
    var criteria = orderItemSummaryList.getFilterEditorCriteria(true);
    if (!criteria)
        criteria = {};
    criteria = isc.DataSource.combineCriteria(criteria, orderItemCriteriaForm.getValuesAsCriteria());
    orderItemSummaryList.filterData(criteria);
};
let onOrderItemExportButtonClick = function() {return orderItemSummaryList.exportData({operationId: 'summary'});};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20">
        <members>
            <DynamicForm ID="orderItemCriteriaForm" numCols="2" width="400" autoDraw="false">
                <fields>
                    <DateItem defaultValue={new Date(2019, 1, 1)} name="startDate" title="Start&amp;nbsp;Date"/>
                    <DateItem defaultValue={new Date(2020, 1, 31)} name="endDate" title="End&amp;nbsp;Date"/>
                    <ButtonItem name="filterButton" title="Filter" startRow="false" endRow="false" click={onFilterButtonClick}/>
                </fields>
            </DynamicForm>
            <ListGrid ID="orderItemSummaryList" dataSource="dynamicReporting_orderItem" showFilterEditor="true" fetchOperation="summary" width="650" height="184" autoDraw="false">
                <dataProperties useClientFiltering="false"/>
                <fields>
                    <LGField name="itemID" title="Item Name" width="50%" align="left" displayField="itemName" filterEditorType="TextItem">
                        <filterEditorProperties fetchMissingValues="false"/>
                    </LGField>
                    <LGField name="SKU"/>
                    <LGField name="unitCost"/>
                    <LGField name="quantity" title="Total qty" canFilter="false"/>
                    <LGField name="totalSales" width="100" canFilter="false"/>
                </fields>
            </ListGrid>
            <IButton title="Export Data" ID="orderItemExportButton" click={onOrderItemExportButtonClick}/>
        </members>
    </VLayout>,
    document.getElementById(target)
);

orderItemSummaryList.fetchData(orderItemCriteriaForm);
