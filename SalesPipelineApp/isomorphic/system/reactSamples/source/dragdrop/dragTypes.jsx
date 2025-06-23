/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, Img, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const DragPiece = SC.defineClass('DragPiece', Img);
isc.DragPiece.addProperties({
    width: 48,
    height: 48,
    layoutAlign: 'center',
    canDragReposition: true,
    canDrop: true,
    dragAppearance: 'target',
    appImgDir: 'pieces/48/'
});
const DropBox = SC.defineClass('DropBox', VStack);
isc.DropBox.addProperties({
    showEdges: true,
    membersMargin: 10,
    layoutMargin: 10,
    canAcceptDrop: true,
    animateMembers: true,
    dropLineThickness: 4
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack membersMargin="20">
        <members>
            <DropBox edgeImage="edges/gray/6.png">
                <members>
                    <DragPiece src="pawn_blue.png" dragType="b"/>
                    <DragPiece src="cube_green.png" dragType="g"/>
                    <DragPiece src="piece_yellow.png" dragType="y"/>
                </members>
                <dropTypes>
                    <value>b</value>
                    <value>g</value>
                    <value>y</value>
                </dropTypes>
            </DropBox>
            <DropBox edgeImage="edges/blue/6.png" dropTypes="b">
                <members>
                    <DragPiece src="pawn_blue.png" dragType="b"/>
                    <DragPiece src="cube_blue.png" dragType="b"/>
                    <DragPiece src="piece_blue.png" dragType="b"/>
                </members>
            </DropBox>
            <DropBox edgeImage="edges/green/6.png" dropTypes="g">
                <members>
                    <DragPiece src="pawn_green.png" dragType="g"/>
                    <DragPiece src="cube_green.png" dragType="g"/>
                    <DragPiece src="piece_green.png" dragType="g"/>
                </members>
            </DropBox>
        </members>
    </HStack>,
    document.getElementById(target)
);
