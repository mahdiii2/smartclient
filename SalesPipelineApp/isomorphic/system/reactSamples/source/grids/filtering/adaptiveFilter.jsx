/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, LGField, Label, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onServerCountIncrementAndUpdate = function (totalRows, startRow, endRow) {
    this.count++;
    this.setContents('<b>Number of server trips: ' + this.count + '<br/>Total rows in this filter set: ' + totalRows + '<br/>Last range of records returned: ' + startRow + ' to ' + endRow + '</b>');
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="supplyList" dataSource="supplyItem" showFilterEditor="true" filterOnKeypress="true" autoFetchData="true" fetchDelay="500" width="500" height="300">
            <fields>
                <LGField name="SKU"/>
                <LGField name="itemName"/>
                <LGField name="description"/>
                <LGField name="category"/>
            </fields>
        </ListGrid>

        <Label contents="&lt;b&gt;Number of server trips: 0&lt;/b&gt;" padding="10" title="serverCount" ID="serverCount" width="500" height="40" top="320" border="1px solid grey" count="0" incrementAndUpdate={onServerCountIncrementAndUpdate}/>
    </>,
    document.getElementById(target)
);

var origBGColor, restoreBGColorTimerID;
supplyItem.addProperties({
    transformResponse: function (dsResponse) {
        if (this.dataFormat == 'iscServer')
            this.updateRowCountLabel(dsResponse);
    },
    getClientOnlyResponse: function (dsRequest) {
        var dsResponse = this.Super('getClientOnlyResponse', arguments);
        this.updateRowCountLabel(dsResponse);
        return dsResponse;
    },
    updateRowCountLabel: function (dsResponse) {
        serverCount.incrementAndUpdate(dsResponse.totalRows, dsResponse.startRow, dsResponse.endRow);
        if (restoreBGColorTimerID == null)
            origBGColor = serverCount.backgroundColor;
        else
            isc.Timer.clear(restoreBGColorTimerID);
        serverCount.setBackgroundColor('#ffff77');
        restoreBGColorTimerID = isc.Timer.setTimeout(function () {
            restoreBGColorTimerID = null;
            serverCount.setBackgroundColor(origBGColor);
        }, 500);
    }
});
