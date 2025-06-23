/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, CheckboxItem, DynamicForm, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onLicenseAcceptChange = function(form,item,value,oldValue) {return form.getField('proceed').setDisabled(!value)};
let onProceedClick = function(form,item) {return isc.say('OK')};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm width="300">
        <fields>
            <TextItem defaultValue="Billy Bob" name="fullName" title="Full Name"/>
            <CheckboxItem name="licenseAccept" title="I accept the agreement" change={onLicenseAcceptChange}/>
            <ButtonItem name="proceed" title="Proceed" width="100" disabled="true" click={onProceedClick}/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
