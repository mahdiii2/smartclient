/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, Header, LayoutSpacer, ToggleItem, ToggleSwitch, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="5">
        <members>
            <Header title="Standalone Toggle"/>
            <ToggleSwitch title="toggleSwitch" ID="toggleSwitch"/>
            <LayoutSpacer height="20"/>
            <Header title="Toggle in a form"/>
            <DynamicForm>
                <fields>
                    <ToggleItem name="toggle" title="Enable Noise Cancellation" wrapTitle="false"/>
                </fields>
            </DynamicForm>
        </members>
    </VLayout>,
    document.getElementById(target)
);
