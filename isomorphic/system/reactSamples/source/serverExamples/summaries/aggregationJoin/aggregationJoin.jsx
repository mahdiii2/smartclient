/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HeaderSpan, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid ID="orderList" dataSource="aggregationJoin_order" cellHeight="40" wrapCells="true" showFilterEditor="true" canEdit="false" headerHeight="65" wrapHeaderTitles="true" autoFetchData="true" canRemoveRecords="false" width="720" height="300">
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
    </ListGrid>,
    document.getElementById(target)
);
