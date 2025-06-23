/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, IButton, Img, SectionStack, SectionStackSection } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onResizeHelp1Click = function() {return help1.setHeight(200)};

const HelpCanvas = SC.defineClass('HelpCanvas', Canvas);
isc.HelpCanvas.addProperties({
    autoDraw: false,
    padding: 10,
    overflow: 'auto',
    contents: '<b>Severity 1</b> - Critical problem<br>System is unavailable in production or ' + 'is corrupting data, and the error severely impacts the user\'s operations.' + '<br><br><b>Severity 2</b> - Major problem<br>An important function of the system ' + 'is not available in production, and the user\'s operations are restricted.' + '<br><br><b>Severity 3</b> - Minor problem<br>Inability to use a function of the ' + 'system occurs, but it does not seriously affect the user\'s operations.'
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <SectionStack visibilityMode="multiple" ID="sectionStack" width="300" height="450" border="1px solid blue">
            <sections>
                <SectionStackSection title="Blue Pawn" expanded="true" resizeable="false">
                    <items>
                        <Img src="pieces/48/pawn_blue.png" width="48" height="48" autoDraw="false"/>
                    </items>
                </SectionStackSection>
                <SectionStackSection title="Help 1" expanded="true" canCollapse="true">
                    <items>
                        <HelpCanvas ID="help1" autoDraw="false"/>
                    </items>
                </SectionStackSection>
                <SectionStackSection title="Help 2" expanded="true" canCollapse="true">
                    <items>
                        <HelpCanvas ID="help2" autoDraw="false"/>
                    </items>
                </SectionStackSection>
            </sections>
        </SectionStack>

        <IButton title="Resize Help 1" width="150" left="325" click={onResizeHelp1Click}/>
    </>,
    document.getElementById(target)
);
