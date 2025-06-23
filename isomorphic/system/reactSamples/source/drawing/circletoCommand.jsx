/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DrawLabel, DrawLine, DrawOval, DrawPane, DrawShape, DynamicForm, HLayout, SliderItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDrawOvalDragMove = function () {
    this.Super('dragMove', arguments);
    startPoint = this.centerPoint;
    updateDrawItems();
};
let onRadiusChanged = function (form, item, value) {
    radius = value;
    updateDrawItems();
};
let onStartAngleChanged = function (form, item, value) {
    startAngle = value;
    updateDrawItems();
};
let onEndAngleChanged = function (form, item, value) {
    endAngle = value;
    updateDrawItems();
};

var startPoint = [
        50,
        200
    ], centerPoint = [
        335,
        240
    ], radius = 100, startAngle = 125, endAngle = 345;
function updateDrawItems() {
    specifiedDrawCircle.setRadius(radius);
    angle0DrawLine.setEndPoint(Math.round(centerPoint[0] + radius), centerPoint[1]);
    var arcStartX = Math.round(centerPoint[0] + radius * Math.cos(startAngle * Math.PI / 180)), arcStartY = Math.round(centerPoint[1] - radius * Math.sin(-startAngle * Math.PI / 180));
    startAngleDrawLine.setEndPoint(arcStartX, arcStartY);
    endAngleDrawLine.setEndPoint(Math.round(centerPoint[0] + radius * Math.cos(endAngle * Math.PI / 180)), Math.round(centerPoint[1] - radius * Math.sin(-endAngle * Math.PI / 180)));
    initialLineSegmentDrawLine.setStartPoint(startPoint[0], startPoint[1]);
    initialLineSegmentDrawLine.setEndPoint(arcStartX, arcStartY);
    drawShape.setCommands([
        {
            type: 'moveto',
            args: startPoint
        },
        {
            type: 'circleto',
            args: [
                centerPoint,
                radius,
                startAngle,
                endAngle
            ]
        }
    ]);
    var initialLineSegmentCenterPoint = initialLineSegmentDrawLine.getCenter(), initialLineSegmentSlope = (initialLineSegmentCenterPoint[1] - startPoint[1]) / (initialLineSegmentCenterPoint[0] - startPoint[0]), isSteep = !(Math.abs(initialLineSegmentSlope) < 1.5);
    initialLineSegmentDrawLabel.setContents('initial line segment ' + (isSteep ? '\u25B6' : '\u25B2'));
    var initialLineSegmentLabelWidth = 135;
    initialLineSegmentDrawLabel.moveTo(initialLineSegmentCenterPoint[0] + (isSteep ? 0 : 5) - initialLineSegmentLabelWidth, initialLineSegmentCenterPoint[1]);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DrawOval centerPoint={centerPoint.duplicate()} radius={radius} lineWidth="1" autoDraw="true">
            <drawPane width="*" height="460" overflow="hidden" showEdges="true" autoDraw="false"/>
        </DrawOval>

        <DrawLine startLeft={centerPoint[0]} startTop={centerPoint[1]} lineWidth="1" autoDraw="true">
            <drawPane width="*" height="460" overflow="hidden" showEdges="true" autoDraw="false"/>
        </DrawLine>

        <DrawLine startLeft={centerPoint[0]} startTop={centerPoint[1]} lineWidth="1" autoDraw="true">
            <drawPane width="*" height="460" overflow="hidden" showEdges="true" autoDraw="false"/>
        </DrawLine>

        <DrawLine startLeft={centerPoint[0]} startTop={centerPoint[1]} lineWidth="1" lineColor="#0000FF" autoDraw="true">
            <drawPane width="*" height="460" overflow="hidden" showEdges="true" autoDraw="false"/>
        </DrawLine>

        <DrawLine startLeft={startPoint[0]} startTop={startPoint[1]} lineWidth="1" autoDraw="true">
            <drawPane width="*" height="460" overflow="hidden" showEdges="true" autoDraw="false"/>
        </DrawLine>

        <DrawShape lineWidth="15" lineColor="#33CCFF" lineOpacity="0.8" autoDraw="true">
            <drawPane width="*" height="460" overflow="hidden" showEdges="true" autoDraw="false"/>
        </DrawShape>

        <DrawLabel contents="initial line segment ▲" left="100" top="100" fontSize="14" fontWeight="normal" lineColor="#000000" autoDraw="true">
            <drawPane width="*" height="460" overflow="hidden" showEdges="true" autoDraw="false"/>
        </DrawLabel>

        <DrawOval centerPoint={startPoint.duplicate()} radius="10" lineWidth="1" fillColor="#eee" keepInParentRect="true" canDrag="true" autoDraw="true" dragMove={onDrawOvalDragMove}>
            <drawPane width="*" height="460" overflow="hidden" showEdges="true" autoDraw="false"/>
        </DrawOval>

        <HLayout membersMargin="15" width="100%" height="100%">
            <members>
                <DrawPane width="*" height="460" overflow="hidden" showEdges="true" autoDraw="false"/>
                <DynamicForm titleOrientation="top" groupTitle="Configure &quot;circleto&quot; Command" width="220" height="300" padding="3" isGroup="true">
                    <items>
                        <SliderItem minValue="100" maxValue="200" name="radius" title="Change radius" value={radius} colSpan="2" changed={onRadiusChanged}/>
                        <SliderItem minValue="0" maxValue="360" name="startAngle" title="Change start angle" value={startAngle} colSpan="2" changed={onStartAngleChanged}>
                            <sliderProperties minValueLabel="0&amp;deg;" maxValueLabel="360&amp;deg;"/>
                        </SliderItem>
                        <SliderItem minValue="0" maxValue="360" name="endAngle" title="Change end angle" value={endAngle} colSpan="2" changed={onEndAngleChanged}>
                            <sliderProperties minValueLabel="0&amp;deg;" maxValueLabel="360&amp;deg;"/>
                        </SliderItem>
                    </items>
                </DynamicForm>
            </members>
        </HLayout>
    </>,
    document.getElementById(target)
);

dp.draw();
updateDrawItems();
