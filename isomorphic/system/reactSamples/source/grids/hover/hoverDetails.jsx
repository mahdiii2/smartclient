/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onItemListGetCellHoverComponent = function (record, rowNum, colNum) {
    this.rowHoverComponent = isc.DetailViewer.create({
        dataSource: supplyItemWithOps,
        width: 250
    });
    this.rowHoverComponent.fetchData({ itemID: record.itemID }, null, { showPrompt: false });
    return this.rowHoverComponent;
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid ID="itemList" dataSource="supplyItemWithOps" canHover="true" showHover="true" fetchOperation="outputsLimitedFetch" autoFetchData="true" showHoverComponents="true" width="500" height="300" getCellHoverComponent={onItemListGetCellHoverComponent}>
        <fields>
            <LGField name="itemName"/>
            <LGField name="SKU"/>
            <LGField name="category"/>
        </fields>
    </ListGrid>,
    document.getElementById(target)
);
