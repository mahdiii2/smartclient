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
    <Canvas ID="container"/>,
    document.getElementById(target)
);

isc.RPCManager.loadScreen('addingHandlers', function (screen) {
    saveForm = screen.getByLocalId('saveForm');
    isc.observe(screen.getByLocalId('saveButton'), 'click', function () {
        if (saveForm.getValue('inStock') == false && saveForm.getValue('nextShipment') == null) {
            isc.warn('New stock items which are not already stocked must have a Stock Date');
        }
    });
    container.addChild(screen);
});
