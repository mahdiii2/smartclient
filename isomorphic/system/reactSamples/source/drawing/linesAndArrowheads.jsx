/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ColorItem, DrawCurve, DrawLine, DrawLinePath, DrawPane, DrawPath, DynamicForm, Point, SelectItem, SpinnerItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onLineWidthChanged = function (form, self, value) {
    drawItems.callMethod('setLineWidth', value);
};
let onLinePatternChanged = function (form, self, value) {
    drawItems.callMethod('setLinePattern', value);
};
let onLineCapChanged = function (form, self, value) {
    drawItems.callMethod('setLineCap', value);
};
let onLineColorChanged = function (form, self, value) {
    drawItems.callMethod('setLineColor', value);
};
let onArrowHeadStyleChanged = function (form, self, value) {
    drawItems.callMethod('setStartArrow', value);
    drawItems.callMethod('setEndArrow', value);
};

var DEFAULT_LINE_WIDTH = 5;
var DEFAULT_LINE_PATTERN = 'solid';
var DEFAULT_LINE_CAP = 'round';
var DEFAULT_LINE_COLOR = '#993366';
var DEFAULT_ARROW_HEAD_STYLE = 'open';
var drawItems = [
    drawLine,
    drawLinePath,
    drawPath,
    drawCurve
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DrawLine lineWidth={DEFAULT_LINE_WIDTH} lineColor={DEFAULT_LINE_COLOR} linePattern={DEFAULT_LINE_PATTERN} lineCap={DEFAULT_LINE_CAP} startArrow={DEFAULT_ARROW_HEAD_STYLE} endArrow={DEFAULT_ARROW_HEAD_STYLE} autoDraw="true">
            <startPoint x="20" y="30"/>
            <endPoint x="180" y="190"/>
            <drawPane ID="mainPane" width="800" height="340" top="110" overflow="hidden" showEdges="true" autoDraw="false"/>
        </DrawLine>

        <DrawLinePath lineWidth={DEFAULT_LINE_WIDTH} lineColor={DEFAULT_LINE_COLOR} linePattern={DEFAULT_LINE_PATTERN} lineCap={DEFAULT_LINE_CAP} startArrow={DEFAULT_ARROW_HEAD_STYLE} endArrow={DEFAULT_ARROW_HEAD_STYLE} autoDraw="true">
            <startPoint x="190" y="40"/>
            <endPoint x="340" y="190"/>
            <drawPane ID="mainPane" width="800" height="340" top="110" overflow="hidden" showEdges="true" autoDraw="false"/>
        </DrawLinePath>

        <DrawPath lineWidth={DEFAULT_LINE_WIDTH} lineColor={DEFAULT_LINE_COLOR} linePattern={DEFAULT_LINE_PATTERN} lineCap={DEFAULT_LINE_CAP} startArrow={DEFAULT_ARROW_HEAD_STYLE} endArrow={DEFAULT_ARROW_HEAD_STYLE} autoDraw="true">
            <points>
                <Point x="400" y="25"/>
                <Point x="425" y="50"/>
                <Point x="450" y="75"/>
                <Point x="475" y="75"/>
                <Point x="500" y="75"/>
                <Point x="500" y="125"/>
                <Point x="475" y="125"/>
                <Point x="450" y="125"/>
                <Point x="425" y="150"/>
                <Point x="500" y="175"/>
            </points>
            <drawPane ID="mainPane" width="800" height="340" top="110" overflow="hidden" showEdges="true" autoDraw="false"/>
        </DrawPath>

        <DrawCurve lineCap={DEFAULT_LINE_CAP} lineWidth={DEFAULT_LINE_WIDTH} lineColor={DEFAULT_LINE_COLOR} linePattern={DEFAULT_LINE_PATTERN} startArrow={DEFAULT_ARROW_HEAD_STYLE} endArrow={DEFAULT_ARROW_HEAD_STYLE} autoDraw="true">
            <startPoint x="600" y="50"/>
            <endPoint x="700" y="200"/>
            <controlPoint1 x="680" y="-10"/>
            <controlPoint2 x="620" y="260"/>
            <drawPane ID="mainPane" width="800" height="340" top="110" overflow="hidden" showEdges="true" autoDraw="false"/>
        </DrawCurve>

        <VStack membersMargin="10">
            <members>
                <DynamicForm ID="dataForm" colWidths="150,*" wrapItemTitles="false" width="300" height="140" autoDraw="false">
                    <items>
                        <SpinnerItem step="1" max="10" min="1" defaultValue="5" name="lineWidth" title="Line Width" width="150" changed={onLineWidthChanged}/>
                        <SelectItem name="linePattern" title="Line Pattern" defaultValue={DEFAULT_LINE_PATTERN} changed={onLinePatternChanged}>
                            <valueMap solid="Solid" dot="Dot" dash="Dash" shortdot="Short dot" shortdash="Short dash" longdash="Long dash"/>
                        </SelectItem>
                        <SelectItem name="lineCap" title="Line Cap" defaultValue={DEFAULT_LINE_CAP} changed={onLineCapChanged}>
                            <valueMap round="Round" square="Square" butt="Butt"/>
                        </SelectItem>
                        <ColorItem defaultValue={DEFAULT_LINE_COLOR} name="lineColor" title="Line Color" changed={onLineColorChanged}/>
                        <SelectItem name="arrowHeadStyle" title="Arrow Head Style" defaultValue={DEFAULT_ARROW_HEAD_STYLE} changed={onArrowHeadStyleChanged}>
                            <valueMap open="Open" block="Block"/>
                        </SelectItem>
                    </items>
                </DynamicForm>
                <DrawPane ID="mainPane" width="800" height="340" top="110" overflow="hidden" showEdges="true" autoDraw="false"/>
            </members>
        </VStack>
    </>,
    document.getElementById(target)
);
