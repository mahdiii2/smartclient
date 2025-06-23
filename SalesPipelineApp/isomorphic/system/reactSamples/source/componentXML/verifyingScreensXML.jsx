/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onLoadProjectClick = function () {
    isc.RPCManager.loadScreen('verifyingScreensXML', function (screen, response) {
        var saveForm = screen.getByLocalId('simpleForm'), values = saveForm.getValues();
        isc.observe(saveForm.getField('saveDataButton'), 'click', function () {
            if (values.inStock != true && values.nextShipment == null) {
                isc.warn('New stock items which are not already stocked must have a Stock Date');
            }
        });
        var target = container.getMember(1);
        if (target) {
            container.replaceMember(target, screen);
        } else {
            container.addMember(screen);
        }
    }, {
        verifyAsError: true,
        verifyComponents: { 'simpleForm.saveDataButton': 'ButtonItem' },
        willHandleError: false
    });
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" ID="container" width="100%" height="100%">
        <members>
            <IButton title="Load Project" click={onLoadProjectClick}/>
        </members>
    </VLayout>,
    document.getElementById(target)
);
