/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DrawCurve, DrawGroup, DrawImage, DrawLabel, DrawLine, DrawLinePath, DrawOval, DrawPane, DrawPolygon, DrawRect, DrawShape, DrawShapeCommand, DrawTriangle, DynamicForm, Point, SectionStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const DemoDrawPane = SC.defineClass('DemoDrawPane', DrawPane);
isc.DemoDrawPane.addProperties({
    autoDraw: false,
    margin: 2,
    width: '100%',
    height: '*',
    border: '1px solid #f0f0f0',
    overflow: 'hidden'
});
const DemoForm = SC.defineClass('DemoForm', DynamicForm);
isc.DemoForm.addProperties({
    addPropertiesOnCreate: false,
    init: function (drawItem, knobTypes) {
        var numKnobTypes = knobTypes.length, items = this.items = new Array(numKnobTypes), initialValues = this.values = {};
        this.numCols = numKnobTypes;
        for (var i = 0; i < numKnobTypes; i++) {
            var knobType = knobTypes[i];
            items[i] = {
                editorType: 'CheckboxItem',
                name: knobType,
                title: knobType,
                showTitle: false,
                changed: function (form, item, value) {
                    var drawItem = form.drawItem, knob = item.name;
                    drawItem[value ? 'showKnobs' : 'hideKnobs'].call(drawItem, knob);
                }
            };
            initialValues[knobType] = drawItem.knobs != null && drawItem.knobs.contains(knobType);
        }
        this.drawItem = drawItem;
        this.Super('init', arguments);
    }
});
var createSection = function (drawItem, expanded, knobTypes) {
    var title = drawItem.getClassName(), drawPane = drawItem.drawPane, knobsForm = isc.DemoForm.create(drawItem, knobTypes);
    var minValue = 0, maxValue = 360, numValues = 361, rotationSlider = isc.Slider.create({
            vertical: false,
            value: 0,
            minValue: minValue,
            maxValue: maxValue,
            numValues: numValues,
            showValue: false,
            width: 300,
            title: 'Rotation',
            previousValue: 0,
            drawItem: drawItem,
            valueChanged: function (value) {
                this.drawItem.rotateBy(value - this.previousValue);
                this.previousValue = value;
            }
        });
    return {
        title: title,
        expanded: expanded,
        controls: [knobsForm],
        items: [isc.VLayout.create({
                width: '100%',
                height: 250,
                members: [
                    drawPane,
                    rotationSlider
                ]
            })]
    };
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DrawLine keepInParentRect="true">
            <startPoint x="200" y="20"/>
            <endPoint x="400" y="70"/>
            <drawPane/>
        </DrawLine>

        <DrawRect left="160" top="30" width="50" height="120" keepInParentRect="true">
            <drawPane/>
            <knobs>
                <value>resize</value>
            </knobs>
        </DrawRect>

        <DrawOval left="450" top="10" width="70" height="140" keepInParentRect="true">
            <drawPane/>
            <knobs>
                <value>resize</value>
            </knobs>
        </DrawOval>

        <DrawTriangle keepInParentRect="true">
            <points>
                <Point x="75" y="50"/>
                <Point x="100" y="100"/>
                <Point x="50" y="100"/>
            </points>
            <drawPane/>
            <knobs>
                <value>resize</value>
            </knobs>
        </DrawTriangle>

        <DrawCurve keepInParentRect="true">
            <startPoint x="60" y="140"/>
            <endPoint x="200" y="10"/>
            <controlPoint1 x="20" y="20"/>
            <controlPoint2 x="300" y="120"/>
            <drawPane/>
        </DrawCurve>

        <DrawShape keepInParentRect="true">
            <commands>
                <DrawShapeCommand type="moveto">
                    <args>275</args>
                    <args>50</args>
                </DrawShapeCommand>
                <DrawShapeCommand type="lineto"><DrawShapeCommandArgs>287</DrawShapeCommandArgs>
<DrawShapeCommandArgs>50</DrawShapeCommandArgs><DrawShapeCommandArgs>300</DrawShapeCommandArgs>
<DrawShapeCommandArgs>62</DrawShapeCommandArgs><DrawShapeCommandArgs>312</DrawShapeCommandArgs>
<DrawShapeCommandArgs>62</DrawShapeCommandArgs><DrawShapeCommandArgs>325</DrawShapeCommandArgs>
<DrawShapeCommandArgs>62</DrawShapeCommandArgs><DrawShapeCommandArgs>325</DrawShapeCommandArgs>
<DrawShapeCommandArgs>87</DrawShapeCommandArgs><DrawShapeCommandArgs>312</DrawShapeCommandArgs>
<DrawShapeCommandArgs>87</DrawShapeCommandArgs><DrawShapeCommandArgs>300</DrawShapeCommandArgs>
<DrawShapeCommandArgs>87</DrawShapeCommandArgs><DrawShapeCommandArgs>287</DrawShapeCommandArgs>
<DrawShapeCommandArgs>100</DrawShapeCommandArgs><DrawShapeCommandArgs>275</DrawShapeCommandArgs>
<DrawShapeCommandArgs>100</DrawShapeCommandArgs>
                </DrawShapeCommand>
                <DrawShapeCommand type="close"/>
            </commands>
            <drawPane/>
            <knobs>
                <value>resize</value>
            </knobs>
        </DrawShape>

        <DrawLinePath keepInParentRect="true">
            <startPoint x="200" y="20"/>
            <endPoint x="400" y="70"/>
            <drawPane/>
        </DrawLinePath>

        <DrawImage left="250" top="30" width="48" height="48" src="/isomorphic/system/reference/exampleImages/pieces/48/piece_red.png" keepInParentRect="true" useMatrixFilter="true">
            <drawPane/>
            <knobs>
                <value>resize</value>
            </knobs>
        </DrawImage>

        <DrawLabel contents="DrawLabel" left="160" top="30" fontFamily="Times New Roman, serif" fontSize="25" fontWeight="normal" fontStyle="italic" keepInParentRect="true">
            <drawPane/>
        </DrawLabel>

        <DrawTriangle>
            <points>
                <Point x="140" y="50"/>
                <Point x="250" y="40"/>
                <Point x="260" y="100"/>
            </points>
            <drawGroup useGroupRect="true" left="130" top="40" width="120" height="120" keepInParentRect="true" canDrag="true">
                <drawPane/>
            </drawGroup>
            <fillGradient startColor="#33CCCC" endColor="#3366FF" direction="90"/>
            <lineColor></lineColor>
        </DrawTriangle>

        <DrawRect left="125" top="70" width="100" height="60" rotation="-10">
            <drawGroup useGroupRect="true" left="130" top="40" width="120" height="120" keepInParentRect="true" canDrag="true"/>
            <fillGradient startColor="#993366" endColor="#CC99FF" direction="20"/>
            <lineColor></lineColor>
        </DrawRect>

        <DrawPolygon>
            <points>
                <Point x="160" y="110"/>
                <Point x="235" y="70"/>
                <Point x="270" y="140"/>
                <Point x="200" y="160"/>
            </points>
            <drawGroup useGroupRect="true" left="130" top="40" width="120" height="120" keepInParentRect="true" canDrag="true"/>
            <fillGradient startColor="#CCFFCC" endColor="#008080" direction="50"/>
            <lineColor></lineColor>
        </DrawPolygon>

        <SectionStack sections={[
    createSection(drawLine, true, [
        'startPoint',
        'endPoint',
        'move'
    ]),
    createSection(drawRect, false, [
        'resize',
        'move'
    ]),
    createSection(drawOval, false, [
        'resize',
        'move'
    ]),
    createSection(drawTriangle, true, [
        'resize',
        'move'
    ]),
    createSection(drawCurve, false, [
        'startPoint',
        'endPoint',
        'controlPoint1',
        'controlPoint2'
    ]),
    createSection(drawShape, true, [
        'resize',
        'move'
    ]),
    createSection(drawLinePath, false, [
        'startPoint',
        'endPoint',
        'controlPoint1',
        'controlPoint2'
    ]),
    createSection(drawImage, false, [
        'resize',
        'move'
    ]),
    createSection(drawLabel, false, ['move']),
    createSection(drawGroup, true, ['move'])
]} visibilityMode="multiple" overflow="visible" width="100%"/>
    </>,
    document.getElementById(target)
);
