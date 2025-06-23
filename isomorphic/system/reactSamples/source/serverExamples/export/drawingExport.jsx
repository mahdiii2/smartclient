/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DrawCurve, DrawImage, DrawOval, DrawPane, DrawRect, DrawTriangle, DynamicForm, HLayout, Point, SelectItem, SliderItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFormatChanged = function (form, item, value) {
    var format = value;
    var qualityItem = form.getItem('quality');
    if (format == 'jpeg')
        qualityItem.show();
    else
        qualityItem.hide();
    form.getItem('_saveButton').setTitle(format == 'pdf' ? 'Save' : 'Save Image');
};
let onQualityShowIf = function(item,value,form,values) {return form.getValue('format') == 'jpeg'};
let on_saveButtonClick = function (form) {
    var format = form.getValue('format');
    if (format == 'pdf') {
        isc.RPCManager.exportContent(mainPane, {
            exportDisplay: 'download',
            exportFilename: 'masterpiece'
        });
    } else {
        isc.RPCManager.exportImage(mainPane.getSvgString(), {
            exportDisplay: 'download',
            exportImageFormat: format,
            exportImageQuality: form.getValue('quality') / 100,
            exportFilename: 'masterpiece'
        });
    }
};

var rg = mainPane.createRadialGradient('rg', {
    cx: 0,
    cy: 0,
    r: '90%',
    fx: 0,
    fy: 0,
    colorStops: [
        {
            color: 'teal',
            offset: 0
        },
        {
            color: '#ffff00',
            offset: 0.3
        },
        {
            color: '#00ff00',
            offset: 0.8
        },
        {
            color: '#0000ff',
            offset: 1
        }
    ]
});
var lg = mainPane.createLinearGradient('lg', {
    x1: '51%',
    y1: '32%',
    x2: '80%',
    y2: '80%',
    colorStops: [
        {
            color: '#ff0000',
            offset: 0
        },
        {
            color: '#ffff00',
            offset: 0.33
        },
        {
            color: '#00ff00',
            offset: 0.66
        },
        {
            color: '#0000ff',
            offset: 1
        }
    ]
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DrawOval left="50" top="200" width="100" height="150" fillGradient={rg} canDrag="true">
            <drawPane canDrag="true" ID="mainPane" width="400" height="400" showEdges="true" autoDraw="false"/>
        </DrawOval>

        <DrawImage left="50" top="10" width="120" height="100" src="/isomorphic/system/reference/inlineExamples/tiles/images/Elephant.jpg" canDrag="true">
            <drawPane canDrag="true" ID="mainPane" width="400" height="400" showEdges="true" autoDraw="false"/>
        </DrawImage>

        <DrawTriangle lineColor="#ff8000" fillColor="#ffff00" canDrag="true">
            <points>
                <Point x="180" y="250"/>
                <Point x="150" y="150"/>
                <Point x="375" y="100"/>
            </points>
            <drawPane canDrag="true" ID="mainPane" width="400" height="400" showEdges="true" autoDraw="false"/>
        </DrawTriangle>

        <DrawCurve canDrag="true">
            <startPoint x="200" y="50"/>
            <endPoint x="300" y="150"/>
            <controlPoint1 x="250" y="0"/>
            <controlPoint2 x="250" y="200"/>
            <drawPane canDrag="true" ID="mainPane" width="400" height="400" showEdges="true" autoDraw="false"/>
        </DrawCurve>

        <DrawRect left="200" top="270" width="150" height="100" fillGradient={lg} canDrag="true">
            <drawPane canDrag="true" ID="mainPane" width="400" height="400" showEdges="true" autoDraw="false"/>
        </DrawRect>

        <HLayout membersMargin="20">
            <members>
                <DrawPane canDrag="true" ID="mainPane" width="400" height="400" showEdges="true" autoDraw="false"/>
                <DynamicForm numCols="2" width="300" autoDraw="false" topPadding="5">
                    <items>
                        <SelectItem name="format" title="Export format" defaultValue="png" wrapTitle="false" required="true" changed={onFormatChanged}>
                            <valueMap png="PNG" jpeg="JPEG" pdf="PDF"/>
                        </SelectItem>
                        <SliderItem minValue="0" maxValue="100" numValues="21" defaultValue="80" name="quality" title="JPEG quality" titleVAlign="top" colSpan="2" showIf={onQualityShowIf} required="true"/>
                        <ButtonItem name="_saveButton" title="Save" click={on_saveButtonClick}/>
                    </items>
                </DynamicForm>
            </members>
        </HLayout>
    </>,
    document.getElementById(target)
);
