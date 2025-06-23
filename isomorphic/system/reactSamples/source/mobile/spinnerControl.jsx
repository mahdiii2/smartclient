/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, SpinnerItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm width="400">
        <fields>
            <SpinnerItem step="0.5" max="10" min="0" defaultValue="5" writeStackedIcons="false" title="Unstacked Spinner" shouldSaveValue="false"/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
