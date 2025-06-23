/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label, Window } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onLabelClick = function () {
    theWindow.setStatus('Click at: ' + isc.EventHandler.getX() + ', ' + isc.EventHandler.getY());
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Window title="Window with footer" showFooter="true" ID="theWindow" width="300" height="200" canDragResize="true">
        <items>
            <Label contents="Click me" align="center" padding="5" height="100%" click={onLabelClick}/>
        </items>
    </Window>,
    document.getElementById(target)
);
