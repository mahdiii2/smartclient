/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ColorItem, DrawCurve, DrawOval, DrawPane, DrawRect, DrawTriangle, DynamicForm, HStack, Point, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDataFormItemChanged = function updateGradient() {
    mainPane.removeGradient('myLinearGradient');
    var slidersFormValues = slidersForm.getValues(), dataFormValues = dataForm.getValues();
    var x1 = slidersFormValues.x1, x2 = slidersFormValues.x2, y1 = slidersFormValues.y1, y2 = slidersFormValues.y2;
    if (x1 == x2 && y1 == y2)
        return;
    var linearGradient = {
        id: 'myLinearGradient',
        x1: x1 + '%',
        y1: y1 + '%',
        x2: x2 + '%',
        y2: y2 + '%',
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
    drawTriangle.setFillGradient(linearGradient);
    drawCurve.setFillGradient(linearGradient);
    drawOval.setFillGradient(linearGradient);
    drawRect.setFillGradient(linearGradient);
};
let onSlidersFormItemChanged = function updateGradient() {
    mainPane.removeGradient('myLinearGradient');
    var slidersFormValues = slidersForm.getValues(), dataFormValues = dataForm.getValues();
    var x1 = slidersFormValues.x1, x2 = slidersFormValues.x2, y1 = slidersFormValues.y1, y2 = slidersFormValues.y2;
    if (x1 == x2 && y1 == y2)
        return;
    var linearGradient = {
        id: 'myLinearGradient',
        x1: x1 + '%',
        y1: y1 + '%',
        x2: x2 + '%',
        y2: y2 + '%',
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
    drawTriangle.setFillGradient(linearGradient);
    drawCurve.setFillGradient(linearGradient);
    drawOval.setFillGradient(linearGradient);
    drawRect.setFillGradient(linearGradient);
};

var fieldProps = {
    type: 'slider',
    min: 0,
    max: 100,
    step: 1,
    validators: [{
            dependentFields: [
                'x1',
                'x2',
                'y1',
                'y2'
            ],
            type: 'custom',
            condition: 'record.x1 != record.x2 || record.y1 != record.y2',
            errorMessage: 'please select x1\xA0!=\xA0x2 or y1\xA0!=\xA0y2 to avoid a singular gradient'
        }]
};
function updateGradient() {
    mainPane.removeGradient('myLinearGradient');
    var slidersFormValues = slidersForm.getValues(), dataFormValues = dataForm.getValues();
    var x1 = slidersFormValues.x1, x2 = slidersFormValues.x2, y1 = slidersFormValues.y1, y2 = slidersFormValues.y2;
    if (x1 == x2 && y1 == y2)
        return;
    var linearGradient = {
        id: 'myLinearGradient',
        x1: x1 + '%',
        y1: y1 + '%',
        x2: x2 + '%',
        y2: y2 + '%',
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
    drawTriangle.setFillGradient(linearGradient);
    drawCurve.setFillGradient(linearGradient);
    drawOval.setFillGradient(linearGradient);
    drawRect.setFillGradient(linearGradient);
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
                        <DynamicForm ID="dataForm" width="250" itemChanged={onDataFormItemChanged}>
                            <fields>
                                <ColorItem defaultValue="#FF6600" name="startColor" title="Start Color"/>
                                <ColorItem defaultValue="#FFFF99" name="stop1Color" title="First Stop Color" wrapTitle="false"/>
                                <ColorItem defaultValue="#CCFFCC" name="stop2Color" title="Second Stop Color"/>
                                <ColorItem defaultValue="#33CCCC" name="endColor" title="End Color"/>
                            </fields>
                        </DynamicForm>
                        <DynamicForm ID="slidersForm" fields={[
    isc.addProperties({
        name: 'x1',
        defaultValue: 85
    }, fieldProps),
    isc.addProperties({
        name: 'y1',
        defaultValue: 0
    }, fieldProps),
    isc.addProperties({
        name: 'x2',
        defaultValue: 0
    }, fieldProps),
    isc.addProperties({
        name: 'y2',
        defaultValue: 100
    }, fieldProps)
]} titleWidth="30" validateOnChange="true" errorOrientation="right" width="290" itemChanged={onSlidersFormItemChanged}/>
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
