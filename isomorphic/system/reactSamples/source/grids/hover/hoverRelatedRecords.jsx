/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var customerOrders = [
    {
        customerID: 'C000001',
        customerName: 'Bobs Tools Inc',
        orderID: '1108776',
        orderDate: '15th September 2020',
        orderDescription: 'Self Adhesive A4 address labels',
        orderQty: '10000'
    },
    {
        customerID: 'C000001',
        customerName: 'Bobs Tools Inc',
        orderID: '1108777',
        orderDate: '15th September 2020',
        orderDescription: 'A3/A4/A5 stationary pack',
        orderQty: '2000'
    },
    {
        customerID: 'C000001',
        customerName: 'Bobs Tools Inc',
        orderID: '1108778',
        orderDate: '15th September 2020',
        orderDescription: 'multi-coloured ringbinder pack',
        orderQty: '150'
    },
    {
        customerID: 'C000002',
        customerName: 'The Finance Shop',
        orderID: '1108779',
        orderDate: '15th September 2020',
        orderDescription: '5 X standard black A4 binder pack',
        orderQty: '250'
    },
    {
        customerID: 'C000002',
        customerName: 'The Finance Shop',
        orderID: '1108780',
        orderDate: '15th September 2020',
        orderDescription: '100 page A4 lined pads',
        orderQty: '500'
    },
    {
        customerID: 'C000002',
        customerName: 'The Finance Shop',
        orderID: '1108781',
        orderDate: '15th September 2020',
        orderDescription: 'Magenta Printer cartridges for HPO230',
        orderQty: '50'
    },
    {
        customerID: 'C000003',
        customerName: 'The Office at Home Ltd',
        orderID: '1108782',
        orderDate: '15th September 2020',
        orderDescription: 'Yellow Printer cartridges for HPO230',
        orderQty: '50'
    },
    {
        customerID: 'C000003',
        customerName: 'The Office at Home Ltd',
        orderID: '1108783',
        orderDate: '15th September 2020',
        orderDescription: 'Black Printer cartridges for HPO230',
        orderQty: '50000'
    }
];
var customerOrderMessages = [
    {
        orderID: '1108776',
        loggedBy: 'Customer Support',
        loggedDate: '17/10/2020',
        orderMessage: 'The customer has called to complain about late delivery of this order. A verbal promise was given' + ' that the goods would be shipped within 3 days of order placement. It has now been 5'
    },
    {
        orderID: '1108776',
        loggedBy: 'Sales',
        loggedDate: '19/10/2020',
        orderMessage: 'That\'s not what we promised the customer, we said 3 days to ship to us, then 5 days to them'
    },
    {
        orderID: '1108776',
        loggedBy: 'Customer Support',
        loggedDate: '19/10/2020',
        orderMessage: 'can you call the customer as they disagree with this'
    },
    {
        orderID: '1108778',
        loggedBy: 'Logistics',
        loggedDate: '14/10/2020',
        orderMessage: 'Goods have been received today will be despatched on the 21st'
    },
    {
        orderID: '1108779',
        loggedBy: 'Finance',
        loggedDate: '17/10/2020',
        orderMessage: 'This customers aged debt has now reached maximum, please contact credit control before placing any new orders'
    },
    {
        orderID: '1108779',
        loggedBy: 'Sales',
        loggedDate: '17/10/2020',
        orderMessage: 'Can we honor existing order placement?'
    },
    {
        orderID: '1108779',
        loggedBy: 'Finance',
        loggedDate: '17/10/2020',
        orderMessage: 'Yes, but please inform credit control of any changes in this account activity'
    },
    {
        orderID: '1108780',
        loggedBy: 'Logistics',
        loggedDate: '12/10/2020',
        orderMessage: 'Customer has been informed of a 3 week delay in receiving goods'
    },
    {
        orderID: '1108781',
        loggedBy: 'Logistics',
        loggedDate: '12/10/2020',
        orderMessage: 'Please delay shipping this order until atleast the 15th November, Customer Request'
    },
    {
        orderID: '1108782',
        loggedBy: 'Finance',
        loggedDate: '10/10/2020',
        orderMessage: 'Customer is disputing this order, please advise contact type and order acknowledgment'
    },
    {
        orderID: '1108782',
        loggedBy: 'Sales',
        loggedDate: '14/10/2020',
        orderMessage: 'Customer ordered via fax. Fax has been scanned and lodged in Sales order respository'
    },
    {
        orderID: '1108783',
        loggedBy: 'Sales',
        loggedDate: '22/10/2020',
        orderMessage: 'Customer order Quantity seems very high. Can you please confirm the numbers with the Customer'
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="orderMessagesDS" title="orderMessagesDS" clientOnly="true" testData={customerOrderMessages}>
            <fields>
                <DSField name="orderID" title="Order Number" hidden="true" primaryKey="true" foreignKey="orderDS.orderID"/>
                <DSField name="loggedBy" title="Logged By" width="70"/>
                <DSField name="loggedDate" title="Message Date" width="80"/>
                <DSField name="orderMessage" title="Message"/>
            </fields>
        </DataSource>

        <DataSource ID="orderDS" title="orderDS" clientOnly="true" testData={customerOrders}>
            <fields>
                <DSField name="customerID" title="Customer" hidden="true"/>
                <DSField name="customerName" title="Name"/>
                <DSField name="orderID" title="Order Number"/>
                <DSField name="orderDate" title="Date"/>
                <DSField name="orderDescription" title="Description"/>
                <DSField name="orderQty" title="Quantity"/>
            </fields>
        </DataSource>

        <ListGrid ID="orderList" dataSource="orderDS" canHover="true" showHover="true" autoFetchData="true" detailDS="orderMessagesDS" hoverMode="related" showHoverComponents="true" width="700" height="240" hoverWidth="590">
            <expansionRelatedProperties fixedRecordHeights="false" wrapCells="true">
                <fields>
                    <LGField name="loggedBy" width="100"/>
                    <LGField name="loggedDate" width="100"/>
                    <LGField name="orderMessage" width="*"/>
                </fields>
            </expansionRelatedProperties>
        </ListGrid>
    </>,
    document.getElementById(target)
);
