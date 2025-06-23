/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Slider } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onVSliderValueChanged = function (value) {
    if (!window.hSlider)
        return;
    if (hSlider.getValue() != value)
        hSlider.setValue(value);
};
let onHSliderValueChanged = function (value) {
    if (!window.vSlider)
        return;
    if (vSlider.getValue() != value)
        vSlider.setValue(value);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Slider title="Rating" value="330" minValue="1" maxValue="1000" numValues="50" ID="vSlider" valueChanged={onVSliderValueChanged}/>

        <Slider title="Rating" vertical="false" value="330" minValue="1" maxValue="1000" numValues="50" ID="hSlider" left="100" top="240" valueChanged={onHSliderValueChanged}/>
    </>,
    document.getElementById(target)
);
