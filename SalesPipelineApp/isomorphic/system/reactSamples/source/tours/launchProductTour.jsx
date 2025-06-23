/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onLaunchTourClick = function () {
    productTour.start();
};

var productTour = isc.Tour.getTour('productTour');
productTour.addMethods({
    finished: function (state) {
        featureExplorer_exampleViewer.selectTab(0);
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Button title="Launch Tour" click={onLaunchTourClick}/>,
    document.getElementById(target)
);
