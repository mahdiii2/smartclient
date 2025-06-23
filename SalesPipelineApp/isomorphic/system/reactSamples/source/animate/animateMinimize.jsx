/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HTMLFlow, Window } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Window title="System status - all systems: &lt;span style=&apos;color:lightgreen;font-weight:bold&apos;&gt;Normal&lt;/span&gt;" animateMinimize="true" ID="exampleWindow" width="360" height="100" canDragReposition="true">
        <items>
            <HTMLFlow contents={'Staging: <span style=\'color:green;font-weight:bold\'>Normal</span><br>' + 'Production: <span style=\'color:green;font-weight:bold\'>Normal</span><br>' + 'Development: <span style=\'color:green;font-weight:bold\'>Normal</span><br>'} width="100%" height="100%" padding="5"/>
        </items>
    </Window>,
    document.getElementById(target)
);
