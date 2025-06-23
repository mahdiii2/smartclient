/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DynamicForm, FilterBuilder, HLayout, ListGrid, SelectItem, TextAreaItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSelectItemChanged = function (form, item, value) {
    if (value == 'sc1') {
        listGrid.setDataSource('CM_Employee');
        advancedFilter.setDataSource('CM_Employee');
        advancedFilter.setCriteria(sc1.criteria);
    } else if (value == 'sc2') {
        listGrid.setDataSource('CM_Order');
        advancedFilter.setDataSource('CM_Order');
        advancedFilter.setCriteria(sc2.criteria);
    } else if (value == 'sc3') {
        listGrid.setDataSource('CM_Product');
        advancedFilter.setDataSource('CM_Product');
        advancedFilter.setCriteria(sc3.criteria);
    } else if (value == 'sc4') {
        listGrid.setDataSource('CM_Order');
        advancedFilter.setDataSource('CM_Order');
        advancedFilter.setCriteria(sc4.criteria);
    }
    if (value == 'sc5') {
        listGrid.setData([]);
        advancedFilter.clearCriteria();
    } else {
        var criteria = advancedFilter.getCriteria(), description = '<ul>' + isc.DataSource.getAdvancedCriteriaDescription(criteria, advancedFilter.getDataSource(), {
                prefix: '<li>',
                suffix: '</li>'
            }) + '</ul>';
        criteriaForm.setValue('description', description);
        listGrid.filterData(criteria);
    }
};
let onClearFilterClick = function () {
    listGrid.setData([]);
    advancedFilter.clearCriteria();
    form.setValue('selectItem', 'sc5');
};
let onApplyFilterClick = function () {
    listGrid.invalidateCache();
    listGrid.filterData(advancedFilter.getCriteria());
};

var sc1 = {
    summary: 'All Employees who report to \'mpatterso@classicmodelcars.com\'',
    description: 'Reports To equals the value retrieved from the CM_Employee data source where Email equals \'mpatterso@classicmodelcars.com\'',
    criteria: {
        fieldName: 'reportsTo',
        operator: 'equals',
        valueQuery: {
            dataSource: 'CM_Employee',
            queryFK: '*none*',
            criteria: {
                fieldName: 'email',
                operator: 'equals',
                value: 'mpatterso@classicmodelcars.com'
            }
        }
    }
};
var sc2 = {
    summary: 'Orders that include a particular high-value item',
    description: 'Orders that include a particular high-value item (the item with product code \'S10_4962\')',
    criteria: {
        _constructor: 'AdvancedCriteria',
        operator: 'and',
        criteria: [{
                fieldName: 'orderNumber',
                operator: 'equals',
                valueQuery: {
                    dataSource: 'CM_OrderLine',
                    queryOutput: 'orderNumber',
                    criteria: {
                        fieldName: 'productCode',
                        operator: 'equals',
                        value: 'S10_4962'
                    }
                }
            }]
    }
};
var sc3 = {
    summary: 'Products that have never been ordered',
    description: 'Products that do not appear on any CM_OrderLine record',
    criteria: {
        _constructor: 'AdvancedCriteria',
        operator: 'and',
        criteria: [{
                fieldName: 'productCode',
                operator: 'notInSet',
                valueQuery: {
                    dataSource: 'CM_OrderLine',
                    queryFK: '*none*',
                    queryOutput: 'productCode'
                }
            }]
    }
};
var sc4 = {
    summary: 'Orders that were processed by Leslie Thompson',
    description: 'CM_Order records for any Customer whose Sales Rep is Leslie Thompson (employee number 1166)',
    criteria: {
        _constructor: 'AdvancedCriteria',
        operator: 'and',
        criteria: [{
                fieldQuery: {
                    dataSource: 'CM_Customer',
                    queryOutput: 'salesRepEmployeeNumber'
                },
                operator: 'equals',
                value: '1166'
            }]
    }
};
var valueMap = {
    'sc1': 'All Employees who report to \'mpatterso@classicmodelcars.com\'',
    'sc2': 'Orders that include a particular high-value item',
    'sc3': 'Products that have never been ordered',
    'sc4': 'Orders that were processed by Leslie Thompson',
    'sc5': 'Custom...'
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10" width="100%" height="300">
        <members>
            <DynamicForm width="560">
                <fields>
                    <SelectItem valueMap={valueMap} name="selectItem" title="Select Scenario" wrapTitle="false" width="*" changed={onSelectItemChanged}/>
                </fields>
            </DynamicForm>
            <FilterBuilder ID="advancedFilter" allowAggregates="true"/>
            <HLayout membersMargin="5" height="40">
                <members>
                    <Button title="Clear Filter" width="100" click={onClearFilterClick}/>
                    <Button title="Apply Filter" width="100" click={onApplyFilterClick}/>
                </members>
            </HLayout>
            <ListGrid ID="listGrid" showAllRecords="true" autoFetchData="false" width="100%" height="100%" isGroup="true" groupTitle="Query results" useAllDataSourceFields="true"/>
            <DynamicForm ID="criteriaForm" numCols="1" colWidths="*" titleOrientation="top" groupTitle="Criteria in natural language" width="100%" isGroup="true">
                <fields>
                    <TextAreaItem escapeHTML="false" name="description" canEdit="false" readOnlyDisplay="static" showTitle="false" width="*"/>
                </fields>
            </DynamicForm>
        </members>
    </VStack>,
    document.getElementById(target)
);
