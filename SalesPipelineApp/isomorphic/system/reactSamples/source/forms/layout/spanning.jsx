import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TextItem, TextAreaItem, DynamicForm } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm width="300" numCols="2" colWidths={[60, "*"]} border="1px solid blue" padding="5"
            canDragResize="true" resizeFrom={["R"]} >
            <TextItem name="subject" title="Subject" width="*" />
            <TextAreaItem name="message" length="5000"
             showTitle="false" colSpan="2" width="*" />
        </DynamicForm>
    </>, 
    document.getElementById(target)
);
