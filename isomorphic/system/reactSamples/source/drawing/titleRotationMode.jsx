/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DrawPane, DynamicForm, SelectItem, SliderItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onTitleRotationModeChanged = function (configForm, self, value) {
    createItems();
};
let onRotationChanged = function (configForm, self, value) {
    mainItems.callMethod('rotateTo', value);
};

var mainItems = [];
function createItems() {
    mainPane.destroyItems();
    var commonProps = {
        autoDraw: true,
        drawPane: mainPane,
        canDrag: false,
        titleRotationMode: configForm.getValue('titleRotationMode')
    };
    var drawTriangle = isc.DrawTriangle.create({
        points: [
            [
                100,
                50
            ],
            [
                150,
                150
            ],
            [
                50,
                150
            ]
        ],
        title: 'Triangle'
    }, commonProps);
    var drawCurve = isc.DrawCurve.create({
        startPoint: [
            225,
            50
        ],
        endPoint: [
            325,
            150
        ],
        controlPoint1: [
            275,
            0
        ],
        controlPoint2: [
            275,
            200
        ],
        lineCap: 'round',
        title: 'Curve'
    }, commonProps);
    var drawLinePath = isc.DrawLinePath.create({
        startPoint: [
            495,
            150
        ],
        endPoint: [
            395,
            50
        ],
        title: 'LinePath'
    }, commonProps);
    var drawLine = isc.DrawLine.create({
        startPoint: [
            550,
            50
        ],
        endPoint: [
            650,
            150
        ],
        endArrow: 'block',
        title: 'Line'
    }, commonProps);
    mainItems = [
        drawTriangle,
        drawCurve,
        drawLinePath,
        drawLine
    ];
    mainItems.callMethod('rotateTo', configForm.getValue('rotation'));
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10" width="100%">
        <members>
            <DrawPane width="720" height="220" showEdges="true" autoDraw="false"/>
            <DynamicForm colWidths="150,*" width="500" autoDraw="false">
                <items>
                    <SelectItem name="titleRotationMode" title="Title Rotation Mode" defaultValue="neverRotate" changed={onTitleRotationModeChanged}>
                        <valueMap>
                                <value>neverRotate</value>
                                <value>withItem</value>
                                <value>withItemAlwaysUp</value>
                                <value>withLine</value>
                                <value>withLineAlwaysUp</value>
                        </valueMap>
                    </SelectItem>
                    <SliderItem minValue="0" maxValue="360" numValues="361" defaultValue="0" name="rotation" title="Rotate Shapes" changed={onRotationChanged}/>
                </items>
            </DynamicForm>
        </members>
    </VStack>,
    document.getElementById(target)
);

createItems();
