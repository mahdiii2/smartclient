/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DynamicForm, HLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onValidateButtonClick = function() {return boundForm.validate()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout>
        <members>
            <DynamicForm ID="boundForm" dataSource="builtins"/>
            <Button title="Validate" ID="validateButton" height="36" margin="2" click={onValidateButtonClick}/>
        </members>
    </HLayout>,
    document.getElementById(target)
);
