/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onItemListGetExpansionComponent = function (record, rowNum, colNum) {
    var component = isc.DetailViewer.create({ dataSource: supplyItemWithOps });
    component.fetchData({ itemID: record.itemID });
    return component;
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid ID="itemList" dataSource="supplyItemWithOps" fetchOperation="outputsLimitedFetch" autoFetchData="true" canExpandRecords="true" canExpandMultipleRecords="true" width="500" height="300" expansionFieldImageShowSelected="true" maxExpandedRecords="3" getExpansionComponent={onItemListGetExpansionComponent}>
        <fields>
            <LGField name="itemName"/>
            <LGField name="SKU"/>
            <LGField name="category"/>
        </fields>
    </ListGrid>,
    document.getElementById(target)
);
