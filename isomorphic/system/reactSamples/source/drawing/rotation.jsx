/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DrawCurve, DrawLine, DrawLinePath, DrawOval, DrawPane, DrawPolygon, DrawRect, DrawTriangle, Point, Slider, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onShapesRotationValueChanged = function (value) {
    drawTriangle.rotateTo(value);
    drawCurve.rotateTo(value);
    drawLinePath.rotateTo(value);
    drawPolygon.rotateTo(value);
    drawOval.rotateTo(value);
    drawRect.rotateTo(value);
    drawLine.rotateTo(value);
};
let onPaneRotationValueChanged = function (value) {
    mainPane.rotate(value);
};

var commonProps = {
    autoDraw: true,
    drawPane: mainPane,
    canDrag: true,
    titleRotationMode: 'withItem'
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DrawTriangle title="Triangle" ID="drawTriangle" {...commonProps}>
            <points>
                <Point x="100" y="50"/>
                <Point x="150" y="150"/>
                <Point x="50" y="150"/>
            </points>
        </DrawTriangle>

        <DrawCurve title="Curve" ID="drawCurve" {...commonProps}>
            <startPoint x="200" y="50"/>
            <endPoint x="300" y="150"/>
            <controlPoint1 x="250" y="0"/>
            <controlPoint2 x="250" y="200"/>
        </DrawCurve>

        <DrawLinePath title="LinePath" ID="drawLinePath" {...commonProps}>
            <startPoint x="350" y="50"/>
            <endPoint x="450" y="150"/>
        </DrawLinePath>

        <DrawPolygon title="Polygon" ID="drawPolygon" {...commonProps}>
            <points>
                <Point x="500" y="50"/>
                <Point x="525" y="50"/>
                <Point x="550" y="75"/>
                <Point x="575" y="75"/>
                <Point x="600" y="75"/>
                <Point x="600" y="125"/>
                <Point x="575" y="125"/>
                <Point x="550" y="125"/>
                <Point x="525" y="150"/>
                <Point x="500" y="150"/>
            </points>
        </DrawPolygon>

        <DrawOval left="50" top="300" width="100" height="100" title="Oval" ID="drawOval" {...commonProps}/>

        <DrawRect left="200" top="300" width="150" height="100" title="Rect" ID="drawRect" {...commonProps}/>

        <DrawLine title="Line" ID="drawLine" {...commonProps}>
            <startPoint x="400" y="300"/>
            <endPoint x="500" y="400"/>
        </DrawLine>

        <VStack membersMargin="15" width="100%">
            <members>
                <DrawPane ID="mainPane" width="720" height="475" overflow="hidden" showEdges="true" autoDraw="false"/>
                <Slider title="Rotate Shapes" vertical="false" labelWidth="110" value="0" minValue="0" maxValue="360" numValues="361" ID="shapesRotation" width="400" autoDraw="false" valueChanged={onShapesRotationValueChanged}/>
                <Slider title="Rotate Pane" vertical="false" labelWidth="110" value={(mainPane.rotation % 360 + 360) % 360} minValue="0" maxValue="360" numValues="361" ID="paneRotation" width="400" autoDraw="false" valueChanged={onPaneRotationValueChanged}/>
            </members>
        </VStack>
    </>,
    document.getElementById(target)
);
