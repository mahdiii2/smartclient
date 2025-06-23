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
    <DynamicForm width="500">
        <fields>
            <TextItem name="name" title="Name" width="200" hint="Mapped to uppercase" characterCasing="upper"/>
            <TextItem name="commission" title="Commission" width="100" hint="Numeric only [0-9.]" keyPressFilter="[0-9.]"/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
