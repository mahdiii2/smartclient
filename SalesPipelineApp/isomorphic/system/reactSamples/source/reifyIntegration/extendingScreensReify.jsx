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
    <Canvas ID="container" width="600" height="300"/>,
    document.getElementById(target)
);

isc.Reify.loadProject('Simple Form', function (project, projects, rpcResponse) {
    var screen = project.createScreen(project.screens[0].ID), saveForm = screen.getByLocalId('simpleForm'), values = saveForm.getValues();
    isc.observe(saveForm.getField('saveDataButton'), 'click', function () {
        if (values.inStock != true && values.nextShipment == null) {
            isc.warn('New stock items which are not already stocked must have a Stock Date');
        }
    });
    container.addChild(screen);
}, {
    userName: 'reifySample',
    password: 'tryReify',
    serverURL: 'https://create.reify.com'
});
