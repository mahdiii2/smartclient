/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DateItem, DynamicForm, HStack, Img, Label, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onBluePawnFocusChanged = function (hasFocus) {
    focusLabel.setFocusWidget(this, hasFocus);
};
let onSimpleFormFocusChanged = function (hasFocus) {
    focusLabel.setFocusWidget(this, hasFocus);
};
let onGreenPawnFocusChanged = function (hasFocus) {
    focusLabel.setFocusWidget(this, hasFocus);
};
let onFocusLabelSetFocusWidget = function (widget, hasFocus) {
    if (hasFocus)
        this.setContents(widget.getID() + ' has focus');
    else
        this.setContents('');
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HStack animateMembers="true" dropLineThickness="4" showEdges="true" canAcceptDrop="true">
            <members>
                <Img src="pieces/48/pawn_blue.png" title="bluePawn" width="48" height="48" ID="bluePawn" layoutAlign="center" canDragReposition="true" dragAppearance="target" canDrop="true" canFocus="true" focusChanged={onBluePawnFocusChanged}/>
                <DynamicForm ID="simpleForm" height="48" layoutAlign="center" focusChanged={onSimpleFormFocusChanged}>
                    <fields>
                        <SelectItem name="field1">
                            <valueMap>
                                    <value>Option 1</value>
                                    <value>Option 2</value>
                            </valueMap>
                        </SelectItem>
                        <DateItem name="field2"/>
                    </fields>
                </DynamicForm>
                <Img src="pieces/48/pawn_green.png" title="greenPawn" width="48" height="48" ID="greenPawn" layoutAlign="center" canDragReposition="true" dragAppearance="target" canDrop="true" canFocus="true" focusChanged={onGreenPawnFocusChanged}/>
            </members>
        </HStack>

        <Label align="center" title="focusLabel" ID="focusLabel" width="300" height="50" top="150" setFocusWidget={onFocusLabelSetFocusWidget}/>
    </>,
    document.getElementById(target)
);
