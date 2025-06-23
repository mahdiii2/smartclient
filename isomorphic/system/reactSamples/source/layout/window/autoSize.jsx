/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, Window } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const HelpCanvas = SC.defineClass('HelpCanvas', Canvas);
isc.HelpCanvas.addProperties({
    autoDraw: false,
    defaultWidth: 300,
    padding: 10,
    contents: '<b>Severity 1</b> - Critical problem<br>System is unavailable in production or ' + 'is corrupting data, and the error severely impacts the user\'s operations.' + '<br><br><b>Severity 2</b> - Major problem<br>An important function of the system ' + 'is not available in production, and the user\'s operations are restricted.' + '<br><br><b>Severity 3</b> - Minor problem<br>Inability to use a function of the ' + 'system occurs, but it does not seriously affect the user\'s operations.'
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Window autoSize="true" title="Auto-sizing window" canDragReposition="true" canDragResize="true">
            <items>
                <HelpCanvas/>
            </items>
        </Window>

        <Window title="Normal window" width="200" height="200" left="325" canDragReposition="true" canDragResize="true">
            <items>
                <HelpCanvas/>
            </items>
        </Window>
    </>,
    document.getElementById(target)
);
