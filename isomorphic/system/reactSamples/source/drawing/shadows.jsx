/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, ColorItem, DrawLabel, DrawLine, DrawOval, DrawPane, DrawRect, DynamicForm, HStack, SliderItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onShowShadowsChanged = function () {
    updateShadows();
};
let onBlurChanged = function () {
    updateShadows();
};
let onColorChanged = function () {
    updateShadows();
};
let onOffsetXChanged = function () {
    updateShadows();
};
let onOffsetYChanged = function () {
    updateShadows();
};

var defaultShadow = {
    blur: 10,
    color: '#00FFFF',
    offset: [
        1,
        1
    ]
};
var drawItems = [
    drawLabel,
    drawRect,
    drawLine,
    drawOval
];
function updateShadows() {
    var configValues = configForm.getValues(), shadow;
    if (!configValues.showShadows) {
        shadow = null;
    } else {
        shadow = {
            blur: configValues.blur,
            color: configValues.color,
            offset: [
                configValues.offsetX,
                configValues.offsetY
            ]
        };
    }
    drawItems.callMethod('setShadow', shadow);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DrawLabel contents="Some Text in a DrawLabel" left="115" top="40" shadow={defaultShadow}/>

        <DrawRect left="70" top="120" width="190" height="90" shadow={defaultShadow}/>

        <DrawLine shadow={defaultShadow} startArrow="open" endArrow="open">
            <startPoint x="40" y="350"/>
            <endPoint x="190" y="280"/>
        </DrawLine>

        <DrawOval left="250" top="250" shadow={defaultShadow} rx="50" ry="50"/>

        <HStack width="100%">
            <members>
                <DrawPane drawItems={drawItems} width="400" height="400" showEdges="true" autoDraw="false"/>
                <DynamicForm colWidths="150,*" width="400">
                    <items>
                        <CheckboxItem defaultValue={defaultShadow != null} labelAsTitle="true" name="showShadows" title="Show Shadows?" changed={onShowShadowsChanged}/>
                        <SliderItem minValue="0" maxValue="20" defaultValue={defaultShadow && defaultShadow.blur} name="blur" title="Blur" changed={onBlurChanged}/>
                        <ColorItem defaultValue={defaultShadow && defaultShadow.color} name="color" title="Color" changed={onColorChanged}/>
                        <SliderItem minValue="-5" maxValue="5" defaultValue={defaultShadow && defaultShadow.offset[0]} name="offsetX" title="X Offset" changed={onOffsetXChanged}/>
                        <SliderItem minValue="-5" maxValue="5" defaultValue={defaultShadow && defaultShadow.offset[1]} name="offsetY" title="Y Offset" changed={onOffsetYChanged}/>
                    </items>
                </DynamicForm>
            </members>
        </HStack>
    </>,
    document.getElementById(target)
);
