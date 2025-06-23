/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm>
        <fields>
            <TextItem name="fromDate" title="From" width="100" hint="MM/YYYY"/>
            <TextItem showHintInField="true" name="toDate" title="To" width="100" hint="MM/YYYY"/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
