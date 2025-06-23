/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, IButton, Img } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onZoomClick = function() {return magnifier.animateRect(0,50,248,248)};
let onShrinkClick = function() {return magnifier.animateRect(100,125,48,48)};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Img src="[SAMPLE]other/magnifier.png" title="magnifier" width="48" height="48" ID="magnifier" left="100" top="125" animateTime="500"/>

        <HLayout membersMargin="10">
            <members>
                <IButton title="Zoom" click={onZoomClick}/>
                <IButton title="Shrink" click={onShrinkClick}/>
            </members>
        </HLayout>
    </>,
    document.getElementById(target)
);
