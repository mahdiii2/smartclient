/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, IButton, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onShowClick = function() {return messageBox.animateShow('wipe')};
let onHideClick = function() {return messageBox.animateHide('wipe')};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Label contents="Vision is the&lt;br&gt;art of seeing the invisible." align="center" valign="center" padding="10" title="messageBox" ID="messageBox" width="150" left="35" top="50" styleName="exampleTitle" backgroundColor="#ffffd0" showEdges="true" visibility="hidden" animateTime="1200"/>

        <HLayout membersMargin="10">
            <members>
                <IButton title="Show" click={onShowClick}/>
                <IButton title="Hide" click={onHideClick}/>
            </members>
        </HLayout>
    </>,
    document.getElementById(target)
);
