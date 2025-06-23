/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DrawCurve, DrawLine, DrawLinePath, DrawOval, DrawPane, DrawPath, DrawRect, DrawSector, DrawTriangle, HStack, Point } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var commonProps = {
    autoDraw: true,
    drawPane: mainPane,
    canDrag: true,
    titleRotationMode: 'neverRotate'
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DrawTriangle title="Triangle" {...commonProps}>
            <points>
                <Point x="100" y="50"/>
                <Point x="150" y="150"/>
                <Point x="50" y="150"/>
            </points>
        </DrawTriangle>

        <DrawCurve lineCap="round" title="Curve" {...commonProps}>
            <startPoint x="200" y="50"/>
            <endPoint x="300" y="150"/>
            <controlPoint1 x="250" y="0"/>
            <controlPoint2 x="250" y="200"/>
        </DrawCurve>

        <DrawLinePath title="LinePath" {...commonProps}>
            <startPoint x="350" y="50"/>
            <endPoint x="450" y="150"/>
        </DrawLinePath>

        <DrawPath title="Path" {...commonProps}>
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
        </DrawPath>

        <DrawOval left="50" top="300" width="100" height="100" title="Oval" {...commonProps}/>

        <DrawRect left="200" top="300" width="150" height="100" title="Rectangle" {...commonProps}/>

        <DrawLine title="Line" {...commonProps}>
            <startPoint x="400" y="300"/>
            <endPoint x="500" y="400"/>
        </DrawLine>

        <DrawSector startAngle="0" endAngle="90" radius="100" title="Sector" {...commonProps}>
            <centerPoint x="550" y="300"/>
        </DrawSector>

        <HStack width="100%">
            <members>
                <DrawPane width="720" height="475" showEdges="true" autoDraw="false"/>
            </members>
        </HStack>
    </>,
    document.getElementById(target)
);
