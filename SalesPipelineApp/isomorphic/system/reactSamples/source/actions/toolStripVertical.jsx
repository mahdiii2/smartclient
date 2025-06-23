/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ToolStrip, ToolStripButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ToolStrip vertical="true" width="30" height="160">
        <members>
            <ToolStripButton icon="[SKIN]/RichTextEditor/print.png" showRollOverIcon="false" title="printButton" ID="printButton"/>
            <ToolStripButton showFocused="false" actionType="checkbox" icon="[SKIN]/RichTextEditor/text_bold.png" title="bold" ID="bold" showFocusOutline="true"/>
            <ToolStripButton showFocused="false" actionType="checkbox" icon="[SKIN]/RichTextEditor/text_italic.png" title="italics" ID="italics" showFocusOutline="true"/>
            <ToolStripButton showFocused="false" actionType="checkbox" icon="[SKIN]/RichTextEditor/text_underline.png" title="underlined" ID="underlined" showFocusOutline="true"/>
            <ToolStripButton radioGroup="textAlign" actionType="radio" icon="[SKIN]/RichTextEditor/text_align_left.png" title="alignLeft" ID="alignLeft"/>
            <ToolStripButton radioGroup="textAlign" actionType="radio" icon="[SKIN]/RichTextEditor/text_align_right.png" title="alignRight" ID="alignRight"/>
            <ToolStripButton radioGroup="textAlign" actionType="radio" icon="[SKIN]/RichTextEditor/text_align_center.png" title="alignCenter" ID="alignCenter"/>
        </members>
    </ToolStrip>,
    document.getElementById(target)
);
