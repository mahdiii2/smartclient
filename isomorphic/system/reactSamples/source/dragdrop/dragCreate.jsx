/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, HStack, Img, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const DragPiece = SC.defineClass('DragPiece', Img);
isc.DragPiece.addProperties({
    width: 48,
    height: 48,
    cursor: 'move',
    appImgDir: 'pieces/48/',
    canDrag: true,
    canDrop: true,
    dragAppearance: 'tracker',
    setDragTracker: 'isc.EventHandler.setDragTracker(isc.Canvas.imgHTML(\'pieces/24/\'+this.src,24,24),24,24,15,15)'
});
const DroppedPiece = SC.defineClass('DroppedPiece', Img);
isc.DroppedPiece.addProperties({
    width: 24,
    height: 24,
    appImgDir: 'pieces/24/',
    canDragReposition: true,
    keepInParentRect: true,
    dragAppearance: 'target',
    showContextMenu: 'this.destroy(); return false;'
});
const PieceBin = SC.defineClass('PieceBin', Canvas);
isc.PieceBin.addProperties({
    width: 100,
    height: 100,
    overflow: 'hidden',
    showEdges: true,
    edgeSize: 6,
    showContextMenu: 'return false',
    canAcceptDrop: true,
    dropOver: 'if (this.willAcceptDrop()) this.setBackgroundColor(\'#ffff80\')',
    dropOut: 'this.setBackgroundColor(\'#ffffff\')',
    drop: function () {
        this.addChild(isc.DroppedPiece.create({
            src: isc.EventHandler.getDragTarget().src,
            left: this.getOffsetX() - 15 - this.edgeSize,
            top: this.getOffsetY() - 15 - this.edgeSize
        }));
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack>
        <members>
            <HStack layoutMargin="20" membersMargin="40" layoutAlign="center">
                <members>
                    <DragPiece src="cube_blue.png" dragType="b"/>
                    <DragPiece src="cube_yellow.png" dragType="y"/>
                    <DragPiece src="cube_green.png" dragType="g"/>
                </members>
            </HStack>
            <HStack membersMargin="20">
                <members>
                    <PieceBin edgeImage="edges/blue/6.png" dropTypes="b"/>
                    <PieceBin edgeImage="edges/yellow/6.png" dropTypes="y"/>
                    <PieceBin edgeImage="edges/green/6.png" dropTypes="g"/>
                    <PieceBin edgeImage="edges/gray/6.png">
                        <dropTypes>
                            <value>b</value>
                            <value>y</value>
                            <value>g</value>
                        </dropTypes>
                    </PieceBin>
                </members>
            </HStack>
        </members>
    </VStack>,
    document.getElementById(target)
);
