/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onContinent_EuropeClick = function () {
    if (!countryList.getSelectedRecord())
        return;
    var updatedRecord = isc.addProperties(countryList.getSelectedRecord(), { continent: 'Europe' });
    countryList.updateData(updatedRecord);
};
let onContinent_AsiaClick = function () {
    if (!countryList.getSelectedRecord())
        return;
    var updatedRecord = isc.addProperties(countryList.getSelectedRecord(), { continent: 'Asia' });
    countryList.updateData(updatedRecord);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" dataSource="worldDS" dataPageSize="50" selectionType="single" sortField="1" autoFetchData="true" width="500" height="224">
            <fields>
                <LGField name="countryCode"/>
                <LGField name="countryName"/>
                <LGField name="capital"/>
                <LGField name="continent"/>
            </fields>
        </ListGrid>

        <IButton title="Continent &gt; Europe" width="150" left="0" top="240" click={onContinent_EuropeClick}/>

        <IButton title="Continent &gt; Asia" width="150" left="170" top="240" click={onContinent_AsiaClick}/>
    </>,
    document.getElementById(target)
);
