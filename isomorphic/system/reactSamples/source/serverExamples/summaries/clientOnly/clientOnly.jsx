/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, HeaderSpan, LGField, ListGrid, Object } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="clientOnly_order" title="clientOnly_order" clientOnly="true">
            <fields>
                <DSField name="orderID" hidden="true" primaryKey="true" foreignKey="clientOnly_orderItem.orderID"/>
                <DSField name="customerName" type="text" title="Customer Name"/>
                <DSField name="orderDate" type="date" title="Order Date"/>
                <DSField name="trackingNumber" type="integer" title="Tracking Number"/>
                <DSField name="itemCount" type="integer" includeFrom="clientOnly_orderItem.pk" includeSummaryFunction="count"/>
                <DSField name="items" type="text" includeFrom="clientOnly_orderItem.itemDescription" includeSummaryFunction="concat" joinString=", "/>
            </fields>
            <testData>
                <Object orderID="1" trackingNumber="9912315" customerName="Isomorphic Software">
                    <orderDate>2009-03-09T05:00:00.000</orderDate>
                </Object>
                <Object orderID="2" trackingNumber="4110884" customerName="Acme Widgets">
                    <orderDate>2009-03-17T05:00:00.000</orderDate>
                </Object>
                <Object orderID="3" trackingNumber="3113234" customerName="Smith, Jones and Partners">
                    <orderDate>2009-03-07T06:00:00.000</orderDate>
                </Object>
                <Object orderID="4" trackingNumber="5112901" customerName="ABC Mining">
                    <orderDate>2009-03-01T06:00:00.000</orderDate>
                </Object>
                <Object orderID="5" trackingNumber="8121042" customerName="Isomorphic Software">
                    <orderDate>2009-03-03T06:00:00.000</orderDate>
                </Object>
                <Object orderID="6" trackingNumber="2231092" customerName="Acme Widgets">
                    <orderDate>2009-03-23T05:00:00.000</orderDate>
                </Object>
                <Object orderID="7" trackingNumber="7112080" customerName="ABC Mining">
                    <orderDate>2009-03-18T05:00:00.000</orderDate>
                </Object>
                <Object orderID="8" trackingNumber="4033512" customerName="Isomorphic Software">
                    <orderDate>2009-03-14T05:00:00.000</orderDate>
                </Object>
                <Object orderID="9" trackingNumber="9631143" customerName="ABC Mining">
                    <orderDate>2009-03-10T05:00:00.000</orderDate>
                </Object>
                <Object orderID="10" trackingNumber="1022231" customerName="Isomorphic Software">
                    <orderDate>2009-03-22T05:00:00.000</orderDate>
                </Object>
                <Object orderID="11" trackingNumber="9912315" customerName="Isomorphic Software">
                    <orderDate>2009-03-09T05:00:00.000</orderDate>
                </Object>
                <Object orderID="12" trackingNumber="4110884" customerName="Acme Widgets">
                    <orderDate>2009-03-17T05:00:00.000</orderDate>
                </Object>
                <Object orderID="13" trackingNumber="3113234" customerName="Smith, Jones and Partners">
                    <orderDate>2009-03-07T06:00:00.000</orderDate>
                </Object>
                <Object orderID="14" trackingNumber="5112901" customerName="ABC Mining">
                    <orderDate>2009-03-01T06:00:00.000</orderDate>
                </Object>
                <Object orderID="15" trackingNumber="8121042" customerName="Isomorphic Software">
                    <orderDate>2009-03-03T06:00:00.000</orderDate>
                </Object>
                <Object orderID="16" trackingNumber="2231092" customerName="Acme Widgets">
                    <orderDate>2009-03-23T05:00:00.000</orderDate>
                </Object>
                <Object orderID="17" trackingNumber="7112080" customerName="ABC Mining">
                    <orderDate>2009-03-18T05:00:00.000</orderDate>
                </Object>
                <Object orderID="18" trackingNumber="4033512" customerName="Isomorphic Software">
                    <orderDate>2009-03-14T05:00:00.000</orderDate>
                </Object>
                <Object orderID="19" trackingNumber="9631143" customerName="ABC Mining">
                    <orderDate>2009-03-10T05:00:00.000</orderDate>
                </Object>
                <Object orderID="20" trackingNumber="1022231" customerName="Isomorphic Software">
                    <orderDate>2009-03-22T05:00:00.000</orderDate>
                </Object>
            </testData>
        </DataSource>

        <DataSource ID="clientOnly_orderItem" title="clientOnly_orderItem" clientOnly="true">
            <fields>
                <DSField name="pk" type="integer" hidden="true" primaryKey="true"/>
                <DSField name="orderID" type="integer" hidden="true"/>
                <DSField name="itemDescription" type="text" title="Item"/>
                <DSField name="quantity" type="integer" title="Quantity"/>
                <DSField name="unitPrice" type="float" title="Unit Price"/>
            </fields>
            <testData>
                <Object unitPrice="3.95" quantity="4" orderID="1" pk="1" itemDescription="Green widget"/>
                <Object unitPrice="3.95" quantity="2" orderID="2" pk="2" itemDescription="Green widget"/>
                <Object unitPrice="12.95" quantity="3" orderID="2" pk="3" itemDescription="Orange component"/>
                <Object unitPrice="24.95" quantity="5" orderID="3" pk="4" itemDescription="Magenta widget"/>
                <Object unitPrice="12.24" quantity="2" orderID="3" pk="5" itemDescription="Orange component"/>
                <Object unitPrice="24.95" quantity="5" orderID="3" pk="6" itemDescription="Blue gadget"/>
                <Object unitPrice="8.22" quantity="2" orderID="3" pk="7" itemDescription="Yellow item"/>
                <Object unitPrice="3.48" quantity="5" orderID="3" pk="8" itemDescription="Green widget"/>
                <Object unitPrice="8.22" quantity="24" orderID="4" pk="9" itemDescription="Yellow item"/>
                <Object unitPrice="24.95" quantity="1" orderID="5" pk="10" itemDescription="Blue gadget"/>
                <Object unitPrice="3.95" quantity="6" orderID="6" pk="11" itemDescription="Green widget"/>
                <Object unitPrice="12.95" quantity="1" orderID="6" pk="12" itemDescription="Orange component"/>
                <Object unitPrice="8.12" quantity="12" orderID="7" pk="13" itemDescription="Yellow item"/>
                <Object unitPrice="20.95" quantity="2" orderID="8" pk="14" itemDescription="Blue gadget"/>
                <Object unitPrice="3.95" quantity="16" orderID="9" pk="15" itemDescription="Green widget"/>
                <Object unitPrice="14.99" quantity="1" orderID="9" pk="16" itemDescription="Orange component"/>
                <Object unitPrice="8.12" quantity="6" orderID="9" pk="17" itemDescription="Yellow item"/>
                <Object unitPrice="21.95" quantity="3" orderID="10" pk="18" itemDescription="Blue gadget"/>
                <Object unitPrice="3.95" quantity="4" orderID="11" pk="19" itemDescription="Green widget"/>
                <Object unitPrice="3.95" quantity="2" orderID="12" pk="20" itemDescription="Green widget"/>
                <Object unitPrice="12.95" quantity="3" orderID="12" pk="21" itemDescription="Orange component"/>
                <Object unitPrice="24.95" quantity="5" orderID="13" pk="22" itemDescription="Magenta widget"/>
                <Object unitPrice="12.24" quantity="2" orderID="13" pk="23" itemDescription="Orange component"/>
                <Object unitPrice="24.95" quantity="5" orderID="13" pk="24" itemDescription="Blue gadget"/>
                <Object unitPrice="8.22" quantity="2" orderID="13" pk="25" itemDescription="Yellow item"/>
                <Object unitPrice="3.48" quantity="5" orderID="13" pk="26" itemDescription="Green widget"/>
                <Object unitPrice="8.22" quantity="24" orderID="14" pk="27" itemDescription="Yellow item"/>
                <Object unitPrice="24.95" quantity="1" orderID="15" pk="28" itemDescription="Blue gadget"/>
                <Object unitPrice="3.95" quantity="6" orderID="16" pk="29" itemDescription="Green widget"/>
                <Object unitPrice="12.95" quantity="1" orderID="16" pk="30" itemDescription="Orange component"/>
                <Object unitPrice="8.12" quantity="12" orderID="17" pk="31" itemDescription="Yellow item"/>
                <Object unitPrice="20.95" quantity="2" orderID="18" pk="32" itemDescription="Blue gadget"/>
                <Object unitPrice="3.95" quantity="16" orderID="19" pk="33" itemDescription="Green widget"/>
                <Object unitPrice="14.99" quantity="1" orderID="19" pk="34" itemDescription="Orange component"/>
                <Object unitPrice="8.12" quantity="6" orderID="19" pk="35" itemDescription="Yellow item"/>
                <Object unitPrice="21.95" quantity="3" orderID="20" pk="36" itemDescription="Blue gadget"/>
            </testData>
        </DataSource>

        <ListGrid ID="orderList" dataSource="clientOnly_order" cellHeight="40" wrapCells="true" showFilterEditor="true" canEdit="false" headerHeight="65" wrapHeaderTitles="true" autoFetchData="true" canRemoveRecords="false" width="720" height="300">
            <fields>
                <LGField name="trackingNumber" title="Number" width="90"/>
                <LGField name="orderDate" title="Date" width="100"/>
                <LGField name="customerName" title="Customer" width="180"/>
                <LGField name="itemCount" title="Count" width="80"/>
                <LGField name="items" title="Description" width="*"/>
            </fields>
            <headerSpans>
                <HeaderSpan title="Items">
                    <fields>
                        <value>itemCount</value>
                        <value>items</value>
                    </fields>
                </HeaderSpan>
            </headerSpans>
        </ListGrid>
    </>,
    document.getElementById(target)
);
