/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, Img } from 'smartclient-eval/react';

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

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack animateMembers="true" membersMargin="10" dropLineThickness="4" canAcceptDrop="true">
        <members>
            <DragPiece src="pawn_blue.png"/>
            <DragPiece src="pawn_red.png"/>
            <DragPiece src="pawn_green.png"/>
            <DragPiece src="pawn_yellow.png"/>
            <DragPiece src="pawn_white.png"/>
        </members>
    </HStack>,
    document.getElementById(target)
);
