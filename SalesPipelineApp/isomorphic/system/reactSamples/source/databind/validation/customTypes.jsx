/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DynamicForm, SimpleType, Validator } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onValidateClick = function() {return boundForm.validate()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <SimpleType inheritsFrom="text" name="zipCodeUS">
            <validators>
                <Validator type="regexp" errorMessage="Zip Codes should be in the format ##### or #####-####." expression="^\d{5}(-\d{4})?$"/>
            </validators>
        </SimpleType>

        <DynamicForm ID="boundForm" dataSource="customTypes" width="300"/>

        <Button title="Validate" top="60" click={onValidateClick}/>
    </>,
    document.getElementById(target)
);
