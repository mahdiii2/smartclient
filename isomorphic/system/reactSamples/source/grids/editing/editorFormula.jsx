/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, DynamicForm, FloatItem, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var testData = [
    {
        pk: 0,
        orderID: 8805,
        itemDescription: 'Anti Virus Suite',
        category: 'Software',
        shipDate: new Date(2020, 2, 5),
        quantity: 2,
        unitPrice: 50
    },
    {
        pk: 1,
        orderID: 4833,
        itemDescription: 'USB Ergonomic Keyboard',
        category: 'Hardware',
        shipDate: new Date(2019, 10, 13),
        quantity: 1,
        unitPrice: 99.99
    },
    {
        pk: 2,
        orderID: 9551,
        itemDescription: 'Lumbar Support Cushion',
        category: 'Hardware',
        shipDate: new Date(2020, 1, 2),
        quantity: 1,
        unitPrice: 75
    },
    {
        pk: 3,
        orderID: 954,
        itemDescription: 'USB Keyboard',
        category: 'Hardware',
        shipDate: new Date(2019, 10, 20),
        quantity: 12,
        unitPrice: 34.99
    },
    {
        pk: 4,
        orderID: 616,
        itemDescription: 'Consulting Services',
        category: 'Services',
        shipDate: new Date(2019, 10, 10),
        quantity: 40,
        unitPrice: 100
    },
    {
        pk: 5,
        orderID: 8357,
        itemDescription: 'Office Application Suite',
        category: 'Software',
        shipDate: new Date(2020, 2, 5),
        quantity: 14,
        unitPrice: 30
    },
    {
        pk: 6,
        orderID: 4582,
        itemDescription: 'Anti Virus Suite',
        category: 'Software',
        shipDate: new Date(2020, 1, 20),
        quantity: 22,
        unitPrice: 50
    },
    {
        pk: 7,
        orderID: 9373,
        itemDescription: 'On-site Training',
        category: 'Services',
        shipDate: new Date(2019, 10, 10),
        quantity: 20,
        unitPrice: 100
    },
    {
        pk: 8,
        orderID: 9311,
        itemDescription: 'Software Development Kit',
        category: 'Software',
        shipDate: new Date(2020, 1, 20),
        quantity: 8,
        unitPrice: 249.99
    },
    {
        pk: 9,
        orderID: 7806,
        itemDescription: '15 inch flat panel monitor',
        category: 'Hardware',
        shipDate: new Date(2019, 10, 13),
        quantity: 4,
        unitPrice: 300
    },
    {
        pk: 10,
        orderID: 8620,
        itemDescription: '18 inch flat panel monitor',
        category: 'Hardware',
        shipDate: new Date(2020, 1, 2),
        quantity: 2,
        unitPrice: 375
    },
    {
        pk: 11,
        orderID: 629,
        itemDescription: 'Office Productivity Suite',
        category: 'Software',
        shipDate: new Date(2020, 2, 5),
        quantity: 15,
        unitPrice: 64.99
    },
    {
        pk: 12,
        orderID: 1264,
        itemDescription: 'Office Productivity Suite',
        category: 'Software',
        shipDate: new Date(2020, 2, 5),
        quantity: 2,
        unitPrice: 64.99
    },
    {
        pk: 13,
        orderID: 7100,
        itemDescription: 'USB Ergonomic Keyboard',
        category: 'Hardware',
        shipDate: new Date(2019, 10, 20),
        quantity: 6,
        unitPrice: 99.99
    },
    {
        pk: 14,
        orderID: 9647,
        itemDescription: 'Consulting Services',
        category: 'Services',
        shipDate: new Date(2019, 10, 10),
        quantity: 10,
        unitPrice: 100
    },
    {
        pk: 15,
        orderID: 8468,
        itemDescription: 'USB Optical Mouse',
        category: 'Hardware',
        shipDate: new Date(2019, 10, 13),
        quantity: 5,
        unitPrice: 29.99
    },
    {
        pk: 16,
        orderID: 9496,
        itemDescription: 'Off-site Training',
        category: 'Services',
        shipDate: new Date(2019, 10, 10),
        quantity: 35,
        unitPrice: 80
    },
    {
        pk: 17,
        orderID: 5124,
        itemDescription: 'USB Stereo Headset',
        category: 'Hardware',
        shipDate: new Date(2019, 10, 20),
        quantity: 1,
        unitPrice: 69.99
    },
    {
        pk: 18,
        orderID: 1799,
        itemDescription: 'Office Application Suite',
        category: 'Software',
        shipDate: new Date(2020, 1, 20),
        quantity: 22,
        unitPrice: 30
    },
    {
        pk: 19,
        orderID: 7020,
        itemDescription: 'Consulting Services',
        category: 'Services',
        shipDate: new Date(2019, 10, 10),
        quantity: 100,
        unitPrice: 80
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm ID="header" width="500">
            <fields>
                <FloatItem defaultValue="0.1" name="markup" title="Markup percent" wrapTitle="false" format="0.0#%"/>
            </fields>
        </DynamicForm>

        <DataSource ID="itemLocalDS" title="itemLocalDS" clientOnly="true" testData={testData}>
            <fields>
                <DSField name="pk" type="sequence" hidden="true" primaryKey="true"/>
                <DSField name="orderID" type="integer" title="Order ID" canEdit="false" pluralTitle="Orders"/>
                <DSField name="itemDescription" type="text" title="Description"/>
                <DSField name="category" type="text" title="Category"/>
                <DSField name="shipDate" type="date" title="Ship Date"/>
                <DSField name="quantity" type="integer" title="Quantity"/>
                <DSField name="unitPrice" type="float" title="Price"/>
            </fields>
        </DataSource>

        <ListGrid ID="itemList" dataSource="itemLocalDS" showAllRecords="true" canEdit="true" editEvent="click" autoFetchData="true" width="600" height="525" top="50">
            <fields>
                <LGField name="orderID" includeInRecordSummary="false"/>
                <LGField name="itemDescription"/>
                <LGField name="category"/>
                <LGField name="shipDate"/>
                <LGField name="quantity"/>
                <LGField name="unitCost" type="float" title="Cost"/>
                <LGField name="unitPrice" format="¤,0.00">
                    <editorFormula text="unitCost+unitCost*header.values.markup"/>
                </LGField>
            </fields>
        </ListGrid>
    </>,
    document.getElementById(target)
);
