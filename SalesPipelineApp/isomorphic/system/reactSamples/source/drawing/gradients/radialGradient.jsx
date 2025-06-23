/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ColorItem, DrawCurve, DrawOval, DrawPane, DrawRect, DrawTriangle, DynamicForm, HStack, Point, SliderItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDataFormItemChanged = function updateGradient() {
    mainPane.removeGradient('myRadialGradient');
    var dataFormValues = dataForm.getValues();
    var radialGradient = {
        id: 'myRadialGradient',
        cx: 0,
        cy: 0,
        r: slidersForm.getValues().r + '%',
        fx: 0,
        fy: 0,
        colorStops: [
            {
                color: dataFormValues.startColor,
                offset: 0
            },
            {
                color: dataFormValues.stop1Color,
                offset: 0.33
            },
            {
                color: dataFormValues.stop2Color,
                offset: 0.66
            },
            {
                color: dataFormValues.endColor,
                offset: 1
            }
        ]
    };
    drawTriangle.setFillGradient(radialGradient);
    drawCurve.setFillGradient(radialGradient);
    drawOval.setFillGradient(radialGradient);
    drawRect.setFillGradient(radialGradient);
};
let onSlidersFormItemChanged = function updateGradient() {
    mainPane.removeGradient('myRadialGradient');
    var dataFormValues = dataForm.getValues();
    var radialGradient = {
        id: 'myRadialGradient',
        cx: 0,
        cy: 0,
        r: slidersForm.getValues().r + '%',
        fx: 0,
        fy: 0,
        colorStops: [
            {
                color: dataFormValues.startColor,
                offset: 0
            },
            {
                color: dataFormValues.stop1Color,
                offset: 0.33
            },
            {
                color: dataFormValues.stop2Color,
                offset: 0.66
            },
            {
                color: dataFormValues.endColor,
                offset: 1
            }
        ]
    };
    drawTriangle.setFillGradient(radialGradient);
    drawCurve.setFillGradient(radialGradient);
    drawOval.setFillGradient(radialGradient);
    drawRect.setFillGradient(radialGradient);
};

function updateGradient() {
    mainPane.removeGradient('myRadialGradient');
    var dataFormValues = dataForm.getValues();
    var radialGradient = {
        id: 'myRadialGradient',
        cx: 0,
        cy: 0,
        r: slidersForm.getValues().r + '%',
        fx: 0,
        fy: 0,
        colorStops: [
            {
                color: dataFormValues.startColor,
                offset: 0
            },
            {
                color: dataFormValues.stop1Color,
                offset: 0.33
            },
            {
                color: dataFormValues.stop2Color,
                offset: 0.66
            },
            {
                color: dataFormValues.endColor,
                offset: 1
            }
        ]
    };
    drawTriangle.setFillGradient(radialGradient);
    drawCurve.setFillGradient(radialGradient);
    drawOval.setFillGradient(radialGradient);
    drawRect.setFillGradient(radialGradient);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HStack membersMargin="20">
            <members>
                <DrawPane ID="mainPane" width="400" height="400" cursor="auto" overflow="hidden" showEdges="true" autoDraw="true"/>
                <VStack membersMargin="15" ID="vStack">
                    <members>
                        <DynamicForm ID="dataForm" width="270" itemChanged={onDataFormItemChanged}>
                            <fields>
                                <ColorItem defaultValue="#ff0000" name="startColor" title="Start Color"/>
                                <ColorItem defaultValue="#ffff00" name="stop1Color" title="First Stop Color" wrapTitle="false"/>
                                <ColorItem defaultValue="#00ff00" name="stop2Color" title="Second Stop Color"/>
                                <ColorItem defaultValue="#0000ff" name="endColor" title="End Color"/>
                            </fields>
                        </DynamicForm>
                        <DynamicForm ID="slidersForm" titleWidth="20" width="290" itemChanged={onSlidersFormItemChanged}>
                            <fields>
                                <SliderItem defaultValue="100" name="r" min="0" max="100" step="1"/>
                            </fields>
                        </DynamicForm>
                    </members>
                </VStack>
            </members>
        </HStack>

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
