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
        listGrid.setDataSource('CM_Product');
        advancedFilter.setDataSource('CM_Product');
        advancedFilter.setCriteria(sc1.criteria);
    } else if (value == 'sc2') {
        listGrid.setDataSource('CM_Order');
        advancedFilter.setDataSource('CM_Order');
        advancedFilter.setCriteria(sc2.criteria);
    } else if (value == 'sc3') {
        listGrid.setDataSource('CM_Customer');
        advancedFilter.setDataSource('CM_Customer');
        advancedFilter.setCriteria(sc3.criteria);
    }
    if (value == 'sc4') {
        listGrid.setData([]);
        advancedFilter.clearCriteria();
    } else {
        var criteria = advancedFilter.getCriteria(), description = '<ul>' + isc.DataSource.getAdvancedCriteriaDescription(criteria, filter.getDataSource(), {
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
    form.setValue('selectItem', 'sc4');
};
let onApplyFilterClick = function () {
    listGrid.invalidateCache();
    listGrid.filterData(advancedFilter.getCriteria());
};

var sc1 = {
    summary: 'Best-sellers',
    description: 'All products that have sold at least 1000 units',
    criteria: {
        _constructor: 'AdvancedCriteria',
        operator: 'and',
        criteria: [{
                fieldQuery: {
                    dataSource: 'CM_OrderLine',
                    summaryFunctions: { 'quantityOrdered': 'sum' }
                },
                operator: 'greaterOrEqual',
                value: 1000
            }]
    }
};
var sc2 = {
    summary: 'All \'In Process\' orders where the customer has spent at least $20,000',
    description: 'Orders where status equals \'In Process\' and total payments for the ordering customer are at least $20,000',
    criteria: {
        '_constructor': 'AdvancedCriteria',
        'operator': 'and',
        'criteria': [
            {
                'fieldName': 'status',
                'operator': 'equals',
                'value': 'In Process'
            },
            {
                'operator': 'greaterOrEqual',
                'value': '20000',
                'fieldQuery': {
                    'groupBy': ['customerNumber'],
                    'summaryFunctions': { 'amount': 'sum' },
                    'dataSource': 'CM_Payment'
                }
            }
        ]
    }
};
var sc3 = {
    summary: 'All customers in the USA who placed fewer orders in 2021 than they did in 2022',
    description: 'All customers located in the USA who placed a lower number of orders in the year 2021 than they placed in 2022.',
    criteria: {
        _constructor: 'AdvancedCriteria',
        operator: 'and',
        criteria: [
            {
                fieldName: 'country',
                operator: 'equals',
                value: 'USA'
            },
            {
                fieldQuery: {
                    dataSource: 'CM_Order',
                    summaryFunctions: { orderNumber: 'count' },
                    criteria: {
                        fieldName: 'orderDate',
                        operator: 'iBetweenInclusive',
                        start: new Date('2021-01-01'),
                        end: new Date('2021-12-31')
                    }
                },
                operator: 'lessThan',
                valueQuery: {
                    dataSource: 'CM_Order',
                    summaryFunctions: { orderNumber: 'count' },
                    criteria: {
                        fieldName: 'orderDate',
                        operator: 'iBetweenInclusive',
                        start: new Date('2022-01-01'),
                        end: new Date('2022-12-31')
                    }
                }
            }
        ]
    }
};
var valueMap = {
    'sc1': 'Best-sellers',
    'sc2': 'All \'In Process\' orders where the customer has spent at least $20,000',
    'sc3': 'All customers in the USA who placed fewer orders in 2021 than they did in 2022',
    'sc4': 'Custom...'
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10" width="100%" height="300">
        <members>
            <DynamicForm width="660">
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
            <DynamicForm numCols="1" colWidths="*" titleOrientation="top" groupTitle="Criteria in natural language" width="100%" isGroup="true">
                <fields>
                    <TextAreaItem escapeHTML="false" name="description" canEdit="false" readOnlyDisplay="static" showTitle="false" width="*"/>
                </fields>
            </DynamicForm>
        </members>
    </VStack>,
    document.getElementById(target)
);
