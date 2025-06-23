/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DynamicForm, HeaderItem, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onValidateBtnClick = function(form,item) {return form.validate()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm ID="boundForm" dataSource="queuing_userHB" wrapItemTitles="false">
        <fields>
            <HeaderItem defaultValue="Registration Form"/>
            <TextItem name="email" validateOnExit="true" required="true"/>
            <TextItem name="firstName" title="First name"/>
            <TextItem name="surname" title="Last name"/>
            <TextItem name="department" title="Department"/>
            <ButtonItem name="validateBtn" title="Validate" click={onValidateBtnClick}/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
