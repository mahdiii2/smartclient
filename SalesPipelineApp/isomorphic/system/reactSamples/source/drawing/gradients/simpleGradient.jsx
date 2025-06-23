/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ColorItem, DrawCurve, DrawOval, DrawPane, DrawRect, DrawTriangle, DynamicForm, Point, SpinnerItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDataFormItemChanged = function updateGradient() {
    mainPane.removeGradient('mySimpleGradient');
    var dataFormValues = dataForm.getValues();
    var simpleGradient = {
        id: 'mySimpleGradient',
        direction: dataFormValues.direction == null ? DEFAULT_DIRECTION : dataFormValues.direction,
        startColor: dataFormValues.startColor,
        endColor: dataFormValues.endColor
    };
    drawTriangle.setFillGradient(simpleGradient);
    drawCurve.setFillGradient(simpleGradient);
    drawOval.setFillGradient(simpleGradient);
    drawRect.setFillGradient(simpleGradient);
};

var DEFAULT_DIRECTION = 45;
function updateGradient() {
    mainPane.removeGradient('mySimpleGradient');
    var dataFormValues = dataForm.getValues();
    var simpleGradient = {
        id: 'mySimpleGradient',
        direction: dataFormValues.direction == null ? DEFAULT_DIRECTION : dataFormValues.direction,
        startColor: dataFormValues.startColor,
        endColor: dataFormValues.endColor
    };
    drawTriangle.setFillGradient(simpleGradient);
    drawCurve.setFillGradient(simpleGradient);
    drawOval.setFillGradient(simpleGradient);
    drawRect.setFillGradient(simpleGradient);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm ID="dataForm" width="250" left="420" itemChanged={onDataFormItemChanged}>
            <fields>
                <ColorItem defaultValue="#33CCCC" name="startColor" title="Start Color"/>
                <ColorItem defaultValue="#3366FF" name="endColor" title="End Color"/>
                <SpinnerItem step="1" max="360" min="0" defaultValue={DEFAULT_DIRECTION} name="direction" title="Direction"/>
            </fields>
        </DynamicForm>

        <DrawTriangle autoDraw="true">
            <points>
                <Point x="100" y="50"/>
                <Point x="150" y="150"/>
                <Point x="50" y="150"/>
            </points>
            <drawPane ID="mainPane" width="400" height="400" cursor="auto" overflow="hidden" showEdges="true" autoDraw="true"/>
        </DrawTriangle>

        <DrawCurve autoDraw="true">
            <startPoint x="200" y="50"/>
            <endPoint x="340" y="150"/>
            <controlPoint1 x="270" y="0"/>
            <controlPoint2 x="270" y="200"/>
            <drawPane ID="mainPane" width="400" height="400" cursor="auto" overflow="hidden" showEdges="true" autoDraw="true"/>
        </DrawCurve>

        <DrawOval left="50" top="200" width="100" height="150" autoDraw="true">
            <drawPane ID="mainPane" width="400" height="400" cursor="auto" overflow="hidden" showEdges="true" autoDraw="true"/>
        </DrawOval>

        <DrawRect left="200" top="225" width="150" height="100" autoDraw="true">
            <drawPane ID="mainPane" width="400" height="400" cursor="auto" overflow="hidden" showEdges="true" autoDraw="true"/>
        </DrawRect>
    </>,
    document.getElementById(target)
);

updateGradient();
