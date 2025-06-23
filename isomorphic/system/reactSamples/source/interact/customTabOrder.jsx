/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, Canvas, DynamicForm, SelectItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDirectionChanged = function (form, item, value) {
    customTabSequence.updateTabDirection(value);
};
let onCustomTabSequenceUpdateTabDirection = function (tabDirection) {
    if (this.tabDirection == tabDirection)
        return;
    this.tabDirection = tabDirection;
    var vertical = this.tabDirection == 'vertical';
    for (var i = 0; i < this.children.length; i++) {
        var relativeTabPosition, rowNum = this.children[i].rowNum, colNum = this.children[i].colNum;
        if (vertical) {
            relativeTabPosition = rowNum + 2 * colNum;
        } else {
            relativeTabPosition = colNum + 2 * rowNum;
        }
        this.children[i].setRelativeTabPosition(relativeTabPosition);
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout width="320">
        <members>
            <DynamicForm ID="directionForm" colWidths="*,*">
                <items>
                    <SelectItem name="direction" title="Select Tab Direction" defaultValue="vertical" wrapTitle="false" changed={onDirectionChanged}>
                        <valueMap vertical="Vertical" horizontal="Horizontal"/>
                    </SelectItem>
                </items>
            </DynamicForm>
            <Canvas ID="customTabSequence" height="140" margin="5" isGroup="true" groupTitle="Custom Tab Sequence" tabDirection="vertical" updateTabDirection={onCustomTabSequenceUpdateTabDirection}>
                <childComponents>
                    <Button title="First Child" snapOffsetLeft="10" snapOffsetTop="10" snapTo="TL" rowNum="0" colNum="0"/>
                    <Button title="Second Child" snapOffsetLeft="10" snapOffsetTop="-10" snapTo="BL" rowNum="1" colNum="0"/>
                    <Button title="Third Child" snapOffsetLeft="-10" snapOffsetTop="10" snapTo="TR" rowNum="0" colNum="1"/>
                    <Button title="Fourth Child" snapOffsetLeft="-10" snapOffsetTop="-10" snapTo="BR" rowNum="1" colNum="1"/>
                </childComponents>
            </Canvas>
        </members>
    </VLayout>,
    document.getElementById(target)
);
