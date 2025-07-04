/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DSField, DataSource, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onTotalFormatCellValue = function (value) {
    if (isc.isA.Number(value)) {
        return isc.NumberUtil.format(value, '$#,##0.00');
    }
    return value;
};
let onConfigureGroupingClick = function () {
    companyList.configureGrouping();
};

var testData = [
    {
        pk: 0,
        orderID: 8805,
        itemDescription: 'Anti Virus Suite',
        category: 'Software',
        shipDate: new Date(2017, 2, 5),
        quantity: 2,
        unitPrice: 50
    },
    {
        pk: 1,
        orderID: 4833,
        itemDescription: 'USB Ergonomic Keyboard',
        category: 'Hardware',
        shipDate: new Date(2016, 10, 13),
        quantity: 1,
        unitPrice: 99.99
    },
    {
        pk: 2,
        orderID: 9551,
        itemDescription: 'Lumbar Support Cushion',
        category: 'Hardware',
        shipDate: new Date(2017, 1, 2),
        quantity: 1,
        unitPrice: 75
    },
    {
        pk: 3,
        orderID: 954,
        itemDescription: 'USB Keyboard',
        category: 'Hardware',
        shipDate: new Date(2016, 10, 20),
        quantity: 12,
        unitPrice: 34.99
    },
    {
        pk: 4,
        orderID: 616,
        itemDescription: 'Consulting Services',
        category: 'Services',
        shipDate: new Date(2016, 10, 10),
        quantity: 40,
        unitPrice: 100
    },
    {
        pk: 5,
        orderID: 8357,
        itemDescription: 'Office Application Suite',
        category: 'Software',
        shipDate: new Date(2017, 2, 5),
        quantity: 14,
        unitPrice: 30
    },
    {
        pk: 6,
        orderID: 4582,
        itemDescription: 'Anti Virus Suite',
        category: 'Software',
        shipDate: new Date(2017, 1, 20),
        quantity: 22,
        unitPrice: 50
    },
    {
        pk: 7,
        orderID: 9373,
        itemDescription: 'On-site Training',
        category: 'Services',
        shipDate: new Date(2016, 10, 10),
        quantity: 20,
        unitPrice: 100
    },
    {
        pk: 8,
        orderID: 9311,
        itemDescription: 'Software Development Kit',
        category: 'Software',
        shipDate: new Date(2017, 1, 20),
        quantity: 8,
        unitPrice: 249.99
    },
    {
        pk: 9,
        orderID: 7806,
        itemDescription: '15 inch flat panel monitor',
        category: 'Hardware',
        shipDate: new Date(2016, 10, 13),
        quantity: 4,
        unitPrice: 300
    },
    {
        pk: 10,
        orderID: 8620,
        itemDescription: '18 inch flat panel monitor',
        category: 'Hardware',
        shipDate: new Date(2017, 1, 2),
        quantity: 2,
        unitPrice: 375
    },
    {
        pk: 11,
        orderID: 629,
        itemDescription: 'Office Productivity Suite',
        category: 'Software',
        shipDate: new Date(2017, 2, 5),
        quantity: 15,
        unitPrice: 64.99
    },
    {
        pk: 12,
        orderID: 1264,
        itemDescription: 'Office Productivity Suite',
        category: 'Software',
        shipDate: new Date(2017, 2, 5),
        quantity: 2,
        unitPrice: 64.99
    },
    {
        pk: 13,
        orderID: 7100,
        itemDescription: 'USB Ergonomic Keyboard',
        category: 'Hardware',
        shipDate: new Date(2016, 10, 20),
        quantity: 6,
        unitPrice: 99.99
    },
    {
        pk: 14,
        orderID: 9647,
        itemDescription: 'Consulting Services',
        category: 'Services',
        shipDate: new Date(2016, 10, 10),
        quantity: 10,
        unitPrice: 100
    },
    {
        pk: 15,
        orderID: 8468,
        itemDescription: 'USB Optical Mouse',
        category: 'Hardware',
        shipDate: new Date(2016, 10, 13),
        quantity: 5,
        unitPrice: 29.99
    },
    {
        pk: 16,
        orderID: 9496,
        itemDescription: 'Off-site Training',
        category: 'Services',
        shipDate: new Date(2016, 10, 10),
        quantity: 35,
        unitPrice: 80
    },
    {
        pk: 17,
        orderID: 5124,
        itemDescription: 'USB Stereo Headset',
        category: 'Hardware',
        shipDate: new Date(2016, 10, 20),
        quantity: 1,
        unitPrice: 69.99
    },
    {
        pk: 18,
        orderID: 1799,
        itemDescription: 'Office Application Suite',
        category: 'Software',
        shipDate: new Date(2017, 1, 20),
        quantity: 22,
        unitPrice: 30
    },
    {
        pk: 19,
        orderID: 7020,
        itemDescription: 'Consulting Services',
        category: 'Services',
        shipDate: new Date(2016, 10, 10),
        quantity: 100,
        unitPrice: 80
    },
    {
        pk: 20,
        orderID: 8653,
        itemDescription: 'Office Application Suite',
        category: 'Software',
        shipDate: new Date(2016, 7, 13),
        quantity: 12,
        unitPrice: 30
    },
    {
        pk: 21,
        orderID: 9843,
        itemDescription: 'Anti Virus Suite',
        category: 'Software',
        shipDate: new Date(2016, 7, 13),
        quantity: 3,
        unitPrice: 50
    },
    {
        pk: 22,
        orderID: 6581,
        itemDescription: 'Anti Virus Suite',
        category: 'Software',
        shipDate: new Date(2016, 7, 13),
        quantity: 22,
        unitPrice: 50
    },
    {
        pk: 23,
        orderID: 3267,
        itemDescription: 'Office Productivity Suite',
        category: 'Software',
        shipDate: new Date(2016, 12, 20),
        quantity: 2,
        unitPrice: 64.99
    },
    {
        pk: 24,
        orderID: 4631,
        itemDescription: '18 inch flat panel monitor',
        category: 'Hardware',
        shipDate: new Date(2016, 12, 2),
        quantity: 9,
        unitPrice: 375
    },
    {
        pk: 25,
        orderID: 9414,
        itemDescription: 'Software Development Kit',
        category: 'Software',
        shipDate: new Date(2016, 12, 20),
        quantity: 12,
        unitPrice: 249.99
    },
    {
        pk: 26,
        orderID: 9551,
        itemDescription: 'Lumbar Support Cushion',
        category: 'Hardware',
        shipDate: new Date(2017, 1, 2),
        quantity: 1,
        unitPrice: 75
    },
    {
        pk: 27,
        orderID: 7954,
        itemDescription: 'USB Keyboard',
        category: 'Hardware',
        shipDate: new Date(2017, 1, 20),
        quantity: 8,
        unitPrice: 34.99
    },
    {
        pk: 28,
        orderID: 9907,
        itemDescription: '15 inch flat panel monitor',
        category: 'Hardware',
        shipDate: new Date(2017, 1, 20),
        quantity: 5,
        unitPrice: 300
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="orderItemLocalDS" title="orderItemLocalDS" clientOnly="true" testData={testData}>
            <fields>
                <DSField name="pk" type="sequence" hidden="true" primaryKey="true"/>
                <DSField name="orderID" type="integer" title="Order ID" canEdit="false" pluralTitle="Orders"/>
                <DSField name="itemDescription" type="text" title="Description"/>
                <DSField name="category" type="text" title="Category"/>
                <DSField name="shipDate" type="date" title="Ship Date"/>
                <DSField name="quantity" type="integer" title="Quantity"/>
                <DSField name="unitPrice" type="float" title="Price" format="0.00"/>
            </fields>
        </DataSource>

        <ListGrid ID="companyList" dataSource="orderItemLocalDS" showAllRecords="true" canEdit="true" editEvent="click" sortField="shipDate" sortDirection="ascending" autoFetchData="true" width="600" height="525" groupStartOpen="all" canMultiGroup="true">
            <fields>
                <LGField name="orderID" includeInRecordSummary="false"/>
                <LGField name="itemDescription"/>
                <LGField name="category"/>
                <LGField name="shipDate"/>
                <LGField name="quantity"/>
                <LGField name="unitPrice"/>
                <LGField name="total" type="summary" title="Total" align="right" recordSummaryFunction="multiplier" formatCellValue={onTotalFormatCellValue}/>
            </fields>
            <groupByField>
                <value>category</value>
                <value>shipDate</value>
            </groupByField>
        </ListGrid>

        <Button title="Configure Grouping" width="150" top="550" click={onConfigureGroupingClick}/>
    </>,
    document.getElementById(target)
);
