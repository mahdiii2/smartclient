/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Img } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onImgClick = function() {return this.animateOrbit()};
let onImgAnimateOrbit = function () {
    isc.Animation.registerAnimation(this.animateOrbitStep, 2000, null, this);
};
let onImgAnimateOrbitStep = function (ratio) {
    var angle = Math.PI * 2 * ratio - Math.PI / 2;
    this.moveTo(Math.cos(angle) * 100 + 100, Math.sin(angle) * 100 + 100);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Img src="[SAMPLE]other/earth.png" width="48" height="48" left="100" top="0" click={onImgClick} animateOrbit={onImgAnimateOrbit} animateOrbitStep={onImgAnimateOrbitStep}/>,
    document.getElementById(target)
);
