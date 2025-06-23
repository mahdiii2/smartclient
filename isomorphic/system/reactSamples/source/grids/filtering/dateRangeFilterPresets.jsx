/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, Criterion, DSField, DataSource, FilterBuilder, LGField, Label, ListGrid, PresetDateRangeItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSearchButtonClick = function () {
    var criteria = filterBuilder.getCriteria();
    grid2.fetchData(criteria);
};

const RecentDateRangeItem = SC.defineClass('RecentDateRangeItem', PresetDateRangeItem);
isc.RecentDateRangeItem.addProperties({
    showCustomOption: true,
    options: {
        'Previous Month': {
            _constructor: 'AdvancedCriteria',
            operator: 'and',
            criteria: [
                {
                    fieldName: 'orderDate',
                    operator: 'greaterThan',
                    value: {
                        _constructor: 'RelativeDate',
                        value: '-1M'
                    }
                },
                {
                    fieldName: 'orderDate',
                    operator: 'lessOrEqual',
                    value: {
                        _constructor: 'RelativeDate',
                        value: '$today'
                    }
                }
            ]
        },
        'Previous Week': {
            _constructor: 'AdvancedCriteria',
            operator: 'and',
            criteria: [
                {
                    fieldName: 'orderDate',
                    operator: 'greaterThan',
                    value: {
                        _constructor: 'RelativeDate',
                        value: '-1W'
                    }
                },
                {
                    fieldName: 'orderDate',
                    operator: 'lessOrEqual',
                    value: {
                        _constructor: 'RelativeDate',
                        value: '$today'
                    }
                }
            ]
        },
        'Yesterday': {
            fieldName: 'orderDate',
            operator: 'equals',
            value: {
                _constructor: 'RelativeDate',
                value: '$yesterday'
            }
        },
        'Today': {
            fieldName: 'orderDate',
            operator: 'equals',
            value: {
                _constructor: 'RelativeDate',
                value: '$today'
            }
        }
    }
});
var _today = new Date();
var _start = _today.getDate();
var _month = _today.getMonth();
var _year = _today.getFullYear();
var presetDateRangeData = [
    {
        customerID: 'C000001',
        customerName: 'Bobs Tools Inc',
        orderID: '1108776',
        orderDate: new Date(_year, _month, _start),
        orderDescription: 'Self Adhesive A4 address labels',
        orderQty: '10000'
    },
    {
        customerID: 'C000001',
        customerName: 'Bobs Tools Inc',
        orderID: '1108777',
        orderDate: new Date(_year, _month, _start - 1),
        orderDescription: 'A3/A4/A5 stationary pack',
        orderQty: '2000'
    },
    {
        customerID: 'C000001',
        customerName: 'Bobs Tools Inc',
        orderID: '1108778',
        orderDate: new Date(_year, _month, _start - 3),
        orderDescription: 'multi-coloured ringbinder pack',
        orderQty: '150'
    },
    {
        customerID: 'C000002',
        customerName: 'The Finance Shop',
        orderID: '1108779',
        orderDate: new Date(_year, _month, _start - 6),
        orderDescription: '5 X standard black A4 binder pack',
        orderQty: '250'
    },
    {
        customerID: 'C000002',
        customerName: 'The Finance Shop',
        orderID: '1108780',
        orderDate: new Date(_year, _month, _start - 9),
        orderDescription: '100 page A4 lined pads',
        orderQty: '500'
    },
    {
        customerID: 'C000002',
        customerName: 'The Finance Shop',
        orderID: '1108781',
        orderDate: new Date(_year, _month, _start - 16),
        orderDescription: 'Magenta Printer cartridges for HPO230',
        orderQty: '50'
    },
    {
        customerID: 'C000003',
        customerName: 'The Office at Home Ltd',
        orderID: '1108782',
        orderDate: new Date(_year, _month, _start - 21),
        orderDescription: 'Yellow Printer cartridges for HPO230',
        orderQty: '50'
    },
    {
        customerID: 'C000003',
        customerName: 'The Office at Home Ltd',
        orderID: '1108783',
        orderDate: new Date(_year, _month, _start - 60),
        orderDescription: 'Black Printer cartridges for HPO230',
        orderQty: '50000'
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="presetDateRangeDS" title="presetDateRangeDS" clientOnly="true" testData={presetDateRangeData}>
            <fields>
                <DSField name="customerID"/>
                <DSField name="customerName"/>
                <DSField name="orderID" width="80"/>
                <DSField name="orderDate" type="date" width="100"/>
                <DSField name="orderDescription"/>
                <DSField name="orderQty"/>
            </fields>
        </DataSource>

        <VLayout membersMargin="10" width="100%" height="100%">
            <members>
                <Label contents="RecentDateRangeItem (ListGrid FilterEditor)" title="recentDateLabel1" baseStyle="exampleSeparator" ID="recentDateLabel1" width="750" height="25" autoDraw="true"/>
                <ListGrid ID="grid1" dataSource="presetDateRangeDS" showFilterEditor="true" canGroupBy="true" autoFetchData="true" width="750" height="150" useAllDataSourceFields="true">
                    <fields>
                        <LGField name="orderDate" filterEditorType="RecentDateRangeItem"/>
                    </fields>
                </ListGrid>
                <Label contents="RecentDateRangeItem (FilterBuilder)" title="recentDateLabel2" baseStyle="exampleSeparator" ID="recentDateLabel2" width="750" height="25" autoDraw="true"/>
                <FilterBuilder dataSource="presetDateRangeDS" ID="filterBuilder" width="750">
                    <criteria operator="and">
                        <criteria>
                            <Criterion fieldName="orderDate" operator="recentDateRange"/>
                        </criteria>
                    </criteria>
                </FilterBuilder>
                <Button autoFit="true" title="Filter" ID="searchButton" click={onSearchButtonClick}/>
                <ListGrid ID="grid2" dataSource="presetDateRangeDS" showFilterEditor="false" autoFetchData="true" width="750" height="150" useAllDataSourceFields="true"/>
            </members>
        </VLayout>
    </>,
    document.getElementById(target)
);

presetDateRangeDS.addSearchOperator({
    ID: 'recentDateRange',
    title: 'in recent date range',
    valueType: 'custom',
    editorType: 'RecentDateRangeItem'
}, ['date']);
