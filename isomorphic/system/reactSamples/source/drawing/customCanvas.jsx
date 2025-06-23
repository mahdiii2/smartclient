/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DrawOval, DrawPane, DrawRect, DrawTriangle, Point, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onShowKnobsClick = function () {
    var mainItems = mainPane.drawItems.duplicate(), showKnobs = this.showKnobs = !this.showKnobs;
    for (var i = 0; i < mainItems.length; i++) {
        var item = mainItems[i];
        if (item.masterElement)
            continue;
        if (showKnobs)
            item.showKnobs([
                'move',
                'resize'
            ]);
        else
            item.hideAllKnobs();
    }
    toggleKnobs.setTitle(showKnobs ? 'Hide Knobs' : 'Show Knobs');
};

const GameBoard = SC.defineClass('GameBoard', DrawRect);
isc.GameBoard.addProperties({
    lineOpacity: 0,
    eventOpaque: true,
    drawStart: function () {
        var context = this.drawPane.getBitmap().getContext('2d');
        var boundingBox = this.getResizeBoundingBox();
        var x1 = boundingBox[0], y1 = boundingBox[1];
        var x2 = boundingBox[2], y2 = boundingBox[3];
        var width = x2 - x1;
        var height = y2 - y1;
        context.lineWidth = 3;
        context.strokeStyle = this.cssColor;
        for (var i = 1; i < 3; i++) {
            context.beginPath();
            var xOffsetLocal = i * width / 3;
            context.moveTo(x1 + xOffsetLocal, y1);
            context.lineTo(x1 + xOffsetLocal, y2);
            var yOffsetLocal = i * height / 3;
            context.moveTo(x1, y1 + yOffsetLocal);
            context.lineTo(x2, y1 + yOffsetLocal);
            context.stroke();
        }
        var radius = (width < height ? width : height) / 10;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                context.beginPath();
                var xOffsetLocal = (i + 0.5) * width / 3;
                var yOffsetLocal = (j + 0.5) * height / 3;
                if ((i - j) % 2 == 0) {
                    context.moveTo(x1 + xOffsetLocal - radius, y1 + yOffsetLocal - radius);
                    context.lineTo(x1 + xOffsetLocal + radius, y1 + yOffsetLocal + radius);
                    context.moveTo(x1 + xOffsetLocal - radius, y1 + yOffsetLocal + radius);
                    context.lineTo(x1 + xOffsetLocal + radius, y1 + yOffsetLocal - radius);
                } else {
                    context.arc(x1 + xOffsetLocal, y1 + yOffsetLocal, radius, 0, Math.PI * 2);
                }
                context.stroke();
            }
        }
    }
});
var commonProps = {
    autoDraw: true,
    canDrag: true,
    drawPane: mainPane,
    titleRotationMode: 'neverRotate'
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DrawTriangle title="Triangle" {...commonProps}>
            <points>
                <Point x="125" y="50"/>
                <Point x="200" y="200"/>
                <Point x="50" y="200"/>
            </points>
        </DrawTriangle>

        <GameBoard left="250" top="50" width="150" height="150" cssColor="rgba(0, 0, 255, 0.75)" {...commonProps}/>

        <GameBoard left="50" top="250" width="150" height="150" cssColor="rgba(255, 0, 0, 0.75)" {...commonProps}/>

        <DrawOval left="250" top="250" width="150" height="150" title="Oval" {...commonProps}/>

        <VStack membersMargin="10" width="100%">
            <members>
                <DrawPane width="462" height="462" showEdges="true" autoDraw="true"/>
                <Button title="Show Knobs" click={onShowKnobsClick}/>
            </members>
        </VStack>
    </>,
    document.getElementById(target)
);
