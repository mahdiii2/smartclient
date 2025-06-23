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
    <ListGrid ID="orderItemList" dataSource="aggregationCustom_orderItem" cellHeight="40" wrapCells="true" showFilterEditor="true" canEdit="false" headerHeight="65" wrapHeaderTitles="true" sortField="0" autoFetchData="false" canRemoveRecords="false" width="700" height="300">
        <fields>
            <LGField name="orderCustomerName" title="Customer Name" width="180"/>
            <LGField name="pk" title="Count" width="100" align="center"/>
            <LGField name="itemDescription" title="Items Description" width="420"/>
        </fields>
        <headerSpans>
            <HeaderSpan title="Aggregated items data">
                <fields>
                    <value>pk</value>
                    <value>itemDescription</value>
                </fields>
            </HeaderSpan>
        </headerSpans>
    </ListGrid>,
    document.getElementById(target)
);

orderItemList.fetchData({}, null, {
    operationId: 'customAggregation',
    groupBy: 'orderCustomerName',
    summaryFunctions: {
        pk: 'count',
        itemDescription: 'concatDistinct'
    }
});
