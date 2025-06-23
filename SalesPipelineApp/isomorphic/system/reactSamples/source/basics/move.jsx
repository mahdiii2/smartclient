/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Img } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onImgClick = function() {return van.moveTo(50,50)};
let onImgMouseStillDown = function() {return van.moveBy(20,20)};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Img src="[SAMPLE]other/van.png" title="van" width="96" height="96" ID="van" left="50" top="50"/>

        <Img src="[SAMPLE]icons/48/reset.png" width="48" height="48" showRollOver="true" click={onImgClick}/>

        <Img src="[SAMPLE]icons/48/downright.png" width="48" height="48" showRollOver="true" left="50" mouseStillDown={onImgMouseStillDown}/>
    </>,
    document.getElementById(target)
);
