/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Img, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onGreenPieceSetDragTracker = function() {return isc.EventHandler.setDragTracker(isc.Canvas.imgHTML('pieces/24/pawn_green.png',24,24))};
let onLabelInitWidget = function () {
    this.Super('initWidget', arguments);
    var props = {
        autoDraw: false,
        width: this.getWidth() + 2,
        height: this.getHeight() + 2,
        border: '1px solid black',
        visibility: 'hidden'
    };
    this.crossHairX = isc.Canvas.create(props);
    this.crossHairY = isc.Canvas.create(props);
    this.addChild(this.crossHairX);
    this.addChild(this.crossHairY);
};
let onLabelDropOver = function () {
    this.crossHairX.show();
    this.crossHairY.show();
    this.updateCrossHairs();
};
let onLabelDropMove = function () {
    this.updateCrossHairs();
};
let onLabelDropOut = function () {
    this.crossHairX.hide();
    this.crossHairY.hide();
};
let onLabelUpdateCrossHairs = function () {
    var x = this.getOffsetX();
    var y = this.getOffsetY();
    this.crossHairX.setLeft(x - this.getWidth() - 1);
    this.crossHairX.setTop(y - this.getHeight() - 1);
    this.crossHairY.setLeft(x);
    this.crossHairY.setTop(y);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Img src="pieces/48/pawn_green.png" title="greenPiece" width="48" height="48" ID="greenPiece" canDrag="true" dragAppearance="tracker" canDrop="true" setDragTracker={onGreenPieceSetDragTracker}/>

        <Label contents="Show Drop Reticle" align="center" width="300" height="300" left="100" styleName="blackText" backgroundColor="lightblue" overflow="hidden" canAcceptDrop="true" initWidget={onLabelInitWidget} dropOver={onLabelDropOver} dropMove={onLabelDropMove} dropOut={onLabelDropOut} updateCrossHairs={onLabelUpdateCrossHairs}/>
    </>,
    document.getElementById(target)
);
