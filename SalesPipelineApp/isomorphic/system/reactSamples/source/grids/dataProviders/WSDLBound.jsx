/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid ID="countryList" alternateRecordStyles="true" width="100%"/>,
    document.getElementById(target)
);

isc.XMLTools.loadWSDL('../isomorphic/services/1.0/SmartClientOperations?WSDL', function () {
    if (window.countryList) {
        countryList.setDataSource(countryDS);
        countryList.fetchData();
    }
});
