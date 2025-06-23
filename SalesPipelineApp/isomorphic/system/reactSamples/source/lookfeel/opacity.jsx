/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Img, Slider } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSliderValueChanged = function(value) {return eyesImg.setOpacity(value)};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Img src="[SAMPLE]other/eyes.jpg" title="eyesImg" width="360" height="188" ID="eyesImg" showEdges="true" useOpacityFilter="true"/>

        <Slider vertical="false" showTitle="false" showRange="false" value="100" minValue="0" maxValue="100" left="80" top="200" valueChanged={onSliderValueChanged}/>
    </>,
    document.getElementById(target)
);
