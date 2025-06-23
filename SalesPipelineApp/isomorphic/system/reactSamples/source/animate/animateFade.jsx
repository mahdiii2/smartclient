/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, IButton, Img } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFadeInClick = function() {return eyesImg.animateFade(100)};
let onFadeOutClick = function() {return eyesImg.animateFade(0)};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Img src="[SAMPLE]other/eyes.jpg" title="eyesImg" width="360" height="188" ID="eyesImg" top="50" opacity="0" showEdges="true" animateTime="1200"/>

        <HLayout membersMargin="10">
            <members>
                <IButton title="Fade in" click={onFadeInClick}/>
                <IButton title="Fade out" click={onFadeOutClick}/>
            </members>
        </HLayout>
    </>,
    document.getElementById(target)
);
