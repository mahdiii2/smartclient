/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ImgButton, ToolStrip } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ToolStrip width="140">
        <members>
            <ImgButton size="24" src="[SAMPLE]icons/24/text_bold.png" title="bold" showRollOver="false" showFocused="false" actionType="checkbox" ID="bold"/>
            <ImgButton size="24" src="[SAMPLE]icons/24/text_italics.png" title="italics" showRollOver="false" showFocused="false" actionType="checkbox" ID="italics"/>
            <ImgButton size="24" src="[SAMPLE]icons/24/text_underlined.png" title="underlined" showRollOver="false" showFocused="false" actionType="checkbox" ID="underlined"/>
            <ImgButton size="24" src="[SAMPLE]icons/24/text_align_left.png" title="alignLeft" showRollOver="false" showFocused="false" radioGroup="textAlign" actionType="radio" ID="alignLeft"/>
            <ImgButton size="24" src="[SAMPLE]icons/24/text_align_right.png" title="alignRight" showRollOver="false" showFocused="false" radioGroup="textAlign" actionType="radio" ID="alignRight"/>
            <ImgButton size="24" src="[SAMPLE]icons/24/text_align_center.png" title="alignCenter" showRollOver="false" showFocused="false" radioGroup="textAlign" actionType="radio" ID="alignCenter"/>
        </members>
    </ToolStrip>,
    document.getElementById(target)
);
