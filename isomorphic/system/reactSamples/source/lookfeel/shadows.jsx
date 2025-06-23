/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label, Slider } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSoftnessValueChanged = function(value) {textBox.shadowSoftness = value; textBox.updateShadow();};
let onOffsetValueChanged = function(value) {textBox.shadowOffset = value; textBox.updateShadow();};

var exampleText = 'When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature\'s God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.';

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Label contents={exampleText} padding="10" title="textBox" ID="textBox" width="240" left="200" top="20" border="1px solid #c0c0c0" backgroundColor="white" canDragReposition="true" showShadow="true" shadowOffset="5" shadowSoftness="10"/>

        <Slider title="Softness" showRange="false" labelWidth="40" value="10" minValue="1" maxValue="20" numValues="21" valueChanged={onSoftnessValueChanged}/>

        <Slider title="Offset" showRange="false" labelWidth="40" value="0" minValue="-10" maxValue="10" numValues="21" left="80" valueChanged={onOffsetValueChanged}/>
    </>,
    document.getElementById(target)
);
