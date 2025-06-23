/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Img, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onBluePieceSetDragTracker = function() {return isc.EventHandler.setDragTracker('Blue Piece')};
let onGreenPieceSetDragTracker = function() {return isc.EventHandler.setDragTracker(isc.Canvas.imgHTML('pieces/24/pawn_green.png',24,24))};
let onLabelDropOver = function() {return this.setBackgroundColor('#ffff80')};
let onLabelDropOut = function() {return this.setBackgroundColor('#ffffff')};
let onLabelDrop = function() {return isc.say('You dropped the '+isc.EventHandler.getDragTarget().getID())};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Img src="pieces/48/pawn_blue.png" title="bluePiece" width="48" height="48" ID="bluePiece" left="50" top="50" canDrag="true" dragAppearance="tracker" canDrop="true" setDragTracker={onBluePieceSetDragTracker}/>

        <Img src="pieces/48/pawn_green.png" title="greenPiece" width="48" height="48" ID="greenPiece" left="150" top="50" canDrag="true" dragAppearance="tracker" canDrop="true" setDragTracker={onGreenPieceSetDragTracker}/>

        <Label contents="Drop Here" align="center" left="250" top="50" showEdges="true" canAcceptDrop="true" dropOver={onLabelDropOver} dropOut={onLabelDropOut} drop={onLabelDrop}/>
    </>,
    document.getElementById(target)
);
