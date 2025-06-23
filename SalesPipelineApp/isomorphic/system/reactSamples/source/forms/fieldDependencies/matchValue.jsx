/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DynamicForm, PasswordItem, TextItem, Validator } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCreateAccountClick = function(form,item) {return form.validate()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm width="250">
        <fields>
            <TextItem defaultValue="bob" name="username" title="Username" required="true"/>
            <TextItem defaultValue="bob@isomorphic.com" name="email" title="Email" required="true"/>
            <PasswordItem name="password" title="Password" required="true">
                <validators>
                    <Validator type="matchesField" errorMessage="Passwords do not match" otherField="password2"/>
                </validators>
            </PasswordItem>
            <PasswordItem name="password2" title="Password again" wrapTitle="false" required="true"/>
            <ButtonItem name="createAccount" title="Create Account" click={onCreateAccountClick}/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
