/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, LGField, Label, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCountryListEditComplete = function () {
    lastUpdated.fetchData({}, function (resp, data) {
        lastUpdatedLabel.setContents(data[0].lastUpdatedTime);
    });
};
let onCountryListEditFailed = function () {
    this.editComplete();
};
let onCountrySaveClick = function () {
    isc.RPCManager.startQueue();
    countryList.saveAllEdits();
    lastUpdated.updateData({ pk: 1 }, null, { operationId: 'goodJDBCUpdate' });
    isc.RPCManager.sendQueue();
};
let onCountryBadSaveClick = function () {
    isc.RPCManager.startQueue();
    countryList.saveAllEdits();
    lastUpdated.updateData({ pk: 1 }, null, { operationId: 'badJDBCUpdate' });
    isc.RPCManager.sendQueue();
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" dataSource="countryTransactions" autoSaveEdits="false" canEdit="true" autoFetchData="true" width="530" height="224" editComplete={onCountryListEditComplete} editFailed={onCountryListEditFailed}>
            <fields>
                <LGField name="countryName"/>
                <LGField name="capital"/>
                <LGField name="continent"/>
                <LGField name="gdp"/>
            </fields>
        </ListGrid>

        <Label title="lastUpdatedLabel" ID="lastUpdatedLabel" width="300" height="20" left="600" top="102"/>

        <IButton title="Good Save" ID="countrySave" width="80" top="240" click={onCountrySaveClick}/>

        <IButton title="Bad Save" ID="countryBadSave" width="80" left="90" top="240" click={onCountryBadSaveClick}/>
    </>,
    document.getElementById(target)
);

lastUpdated.fetchData({}, function (resp, data) {
    lastUpdatedLabel.setContents(data[0].lastUpdatedTime);
});
