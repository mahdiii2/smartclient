/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Img } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var zoomedObject = null;
const ZoomImg = SC.defineClass('ZoomImg', Img);
isc.ZoomImg.addProperties({
    width: 48,
    height: 48,
    appImgDir: 'pieces/48/',
    zoomTime: 1000,
    shrinkTime: 300,
    click: function () {
        if (this.originalLeft == null)
            this.originalLeft = this.left;
        if (!zoomedObject) {
            this.zoom();
        } else if (zoomedObject == this) {
            this.shrink();
            zoomedObject = null;
        } else {
            zoomedObject.shrink(this.getID() + '.zoom()');
        }
    },
    zoom: function () {
        this.animateRect(25, 100, 200, 200, null, this.zoomTime);
        zoomedObject = this;
    },
    shrink: function (postShrinkScript) {
        this.animateRect(this.originalLeft, 0, 48, 48, postShrinkScript, this.shrinkTime);
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ZoomImg src="cube_blue.png" left="0"/>

        <ZoomImg src="pawn_yellow.png" left="100"/>

        <ZoomImg src="piece_green.png" left="200"/>
    </>,
    document.getElementById(target)
);
