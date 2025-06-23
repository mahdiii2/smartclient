/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, HTMLFlow, Slider, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onMarginSliderValueChanged = function(value) {textBox.setMargin(value); textBox.markForRedraw();};
let onPaddingSliderValueChanged = function(value) {textBox.setPadding(value); textBox.markForRedraw();};
let onBorderSliderValueChanged = function () {
    textBox.setBorder(this.value + 'px solid slateblue');
    textBox.markForRedraw();
};

var exampleText = 'When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature\'s God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.';

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout layoutLeftMargin="15" membersMargin="20" height="220">
        <members>
            <Slider title="Margin" showRange="false" labelWidth="35" value="4" minValue="0" maxValue="10" ID="marginSlider" valueChanged={onMarginSliderValueChanged}/>
            <Slider title="Padding" showRange="false" labelWidth="35" value="10" minValue="0" maxValue="10" ID="paddingSlider" valueChanged={onPaddingSliderValueChanged}/>
            <Slider title="Border" showRange="false" labelWidth="35" value="8" minValue="0" maxValue="10" ID="borderSlider" valueChanged={onBorderSliderValueChanged}/>
            <VStack ID="outerBox" top="20" margin="25" border="4px solid gray">
                <members>
                    <HTMLFlow contents={exampleText} ID="textBox" width="240" margin="4" padding="10" border="8px solid slateblue"/>
                </members>
            </VStack>
        </members>
    </HLayout>,
    document.getElementById(target)
);
