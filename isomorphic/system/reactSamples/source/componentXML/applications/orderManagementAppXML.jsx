/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Canvas ID="container" width="100%" height="100%"/>,
    document.getElementById(target)
);

isc.RPCManager.loadScreen('orderManagementApp', function (screen) {
    container.addChild(orderManagementApp);
    isc.RPCManager.cacheScreens('orderLinesSubset');
}, isc.RPCManager.ALL_GLOBALS);
