/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, IButton, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onShowClick = function() {return textbox.show();};
let onHideClick = function() {return textbox.hide();};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Label contents="The future has a way of arriving unannounced." align="center" padding="5" title="textbox" ID="textbox" width="200" left="50" top="50" showEdges="true" visibility="hidden"/>

        <HLayout membersMargin="10" left="40">
            <members>
                <IButton title="Show" click={onShowClick}/>
                <IButton title="Hide" click={onHideClick}/>
            </members>
        </HLayout>
    </>,
    document.getElementById(target)
);
