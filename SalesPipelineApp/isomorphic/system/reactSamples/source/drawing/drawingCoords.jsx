/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DrawPane, DynamicForm, HLayout, Label, SliderItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDrawPaneClick = function () {
    if (currentDrawLine == null) {
        startPoint = this.getDrawingPoint();
        var r = Math.floor(255 * Math.random()), g = Math.floor(255 * Math.random()), b = Math.floor(255 * Math.random());
        currentDrawLine = isc.DrawLine.create({
            drawPane: this,
            autoDraw: true,
            lineColor: 'rgb(' + r + ', ' + g + ', ' + b + ')',
            lineWidth: 3,
            startLeft: startPoint[0],
            startTop: startPoint[1],
            endLeft: startPoint[0],
            endTop: startPoint[1]
        });
    } else {
        currentDrawLine.setEndPoint(this.getDrawingPoint());
        currentDrawLine = null;
    }
};
let onDrawPaneMouseMove = function () {
    if (currentDrawLine != null) {
        currentDrawLine.setEndPoint(this.getDrawingPoint());
    }
};
let onZoomLevelChanged = function (form, self, value) {
    drawPane.setZoomLevel(value / 100);
};
let onRotationChanged = function (form, self, value) {
    drawPane.setRotation(value);
};

var currentDrawLine = null, startPoint;

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout membersMargin="10" width="100%" height="100%">
        <members>
            <VLayout>
                <members>
                    <Label contents="Click to draw lines" align="center" height="30"/>
                    <DrawPane width="100%" height="100%" backgroundColor="#f0f0f0" autoDraw="false" click={onDrawPaneClick} mouseMove={onDrawPaneMouseMove}/>
                </members>
            </VLayout>
            <DynamicForm numCols="1" width="200" height="100%" autoDraw="false">
                <items>
                    <SliderItem minValue="10" maxValue="100" numValues="10" defaultValue="100" name="zoomLevel" title="Zoom Level" titleOrientation="top" changed={onZoomLevelChanged}>
                        <sliderProperties minValueLabel="10%" maxValueLabel="100%"/>
                    </SliderItem>
                    <SliderItem minValue="0" maxValue="360" defaultValue="0" name="rotation" title="Rotation" titleOrientation="top" changed={onRotationChanged}/>
                </items>
            </DynamicForm>
        </members>
    </HLayout>,
    document.getElementById(target)
);
