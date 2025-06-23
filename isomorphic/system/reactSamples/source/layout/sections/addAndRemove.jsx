/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, Img, SectionStack, SectionStackSection, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onAddButtonClick = function () {
    if (sectionStack.sections.length % 2 == 1) {
        sectionStack.addSection({
            title: 'Yellow Piece',
            expanded: true,
            items: [isc.Img.create({
                    autoDraw: false,
                    width: 48,
                    height: 48,
                    src: 'pieces/48/piece_yellow.png'
                })]
        });
    } else {
        sectionStack.addSection({
            title: 'Blue Cube',
            expanded: false,
            items: [isc.Img.create({
                    autoDraw: false,
                    width: 48,
                    height: 48,
                    src: 'pieces/48/cube_blue.png'
                })]
        });
    }
};
let onRemoveButtonClick = function () {
    sectionStack.removeSection(sectionStack.sections.length - 1);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <SectionStack visibilityMode="multiple" overflow="auto" ID="sectionStack" width="300" height="500">
            <sections>
                <SectionStackSection title="Blue Pawn" expanded="true">
                    <items>
                        <Img src="pieces/48/pawn_blue.png" width="48" height="48" autoDraw="false"/>
                    </items>
                </SectionStackSection>
                <SectionStackSection title="Green Cube" expanded="true" canCollapse="false">
                    <items>
                        <Img src="pieces/48/cube_green.png" width="48" height="48" autoDraw="false"/>
                    </items>
                </SectionStackSection>
                <SectionStackSection title="Blue Cube" expanded="false">
                    <items>
                        <Img src="pieces/48/cube_blue.png" width="48" height="48" autoDraw="false"/>
                    </items>
                </SectionStackSection>
            </sections>
        </SectionStack>

        <VLayout membersMargin="10" left="325">
            <members>
                <IButton title="Add Section" ID="addButton" width="150" click={onAddButtonClick}/>
                <IButton title="Remove Section" ID="removeButton" width="150" click={onRemoveButtonClick}/>
            </members>
        </VLayout>
    </>,
    document.getElementById(target)
);
