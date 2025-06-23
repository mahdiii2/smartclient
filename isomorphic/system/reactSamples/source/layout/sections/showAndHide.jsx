/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HTMLFlow, IButton, Img, SectionStack, SectionStackSection, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onShowSectionClick = function() {return sectionStack.showSection(3)};
let onHideSectionClick = function() {return sectionStack.hideSection(3)};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <SectionStack visibilityMode="multiple" ID="sectionStack" width="300" height="350" border="1px solid blue">
            <sections>
                <SectionStackSection title="Blue Pawn" expanded="true">
                    <items>
                        <Img src="pieces/48/pawn_blue.png" width="48" height="48" autoDraw="false"/>
                    </items>
                </SectionStackSection>
                <SectionStackSection title="HTMLFlow" expanded="true" canCollapse="true">
                    <items>
                        <HTMLFlow contents={'<b>Severity 1</b> - Critical problem<br>System is unavailable in production or ' + 'is corrupting data, and the error severely impacts the user\'s operations.' + '<br><br><b>Severity 2</b> - Major problem<br>An important function of the system ' + 'is not available in production, and the user\'s operations are restricted.' + '<br><br><b>Severity 3</b> - Minor problem<br>Inability to use a function of the ' + 'system occurs, but it does not seriously affect the user\'s operations.'} ID="htmlFlow" padding="10" overflow="auto"/>
                    </items>
                </SectionStackSection>
                <SectionStackSection title="Green Cube" expanded="true" canCollapse="false">
                    <items>
                        <Img src="pieces/48/cube_green.png" width="48" height="48" autoDraw="false"/>
                    </items>
                </SectionStackSection>
                <SectionStackSection title="Yellow Piece" hidden="true">
                    <items>
                        <Img src="pieces/48/piece_yellow.png" width="48" height="48" autoDraw="false"/>
                    </items>
                </SectionStackSection>
            </sections>
        </SectionStack>

        <VLayout membersMargin="10" ID="layoutButtons" left="320">
            <members>
                <IButton title="Show Section" width="150" left="325" click={onShowSectionClick}/>
                <IButton title="Hide Section" width="150" left="325" top="30" click={onHideSectionClick}/>
            </members>
        </VLayout>
    </>,
    document.getElementById(target)
);
