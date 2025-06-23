import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HeaderItem, PasswordItem, CheckboxItem, ButtonItem, DynamicForm, DataSource,
         Validator, DSField } from 'smartclient-eval/react';
         
// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let defaultValuesDF = {
    values: {
        firstName: "Bob",
        email: "bob@.com",
        password: "sekrit",
        password2: "fatfinger"
    }
}    


// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm {...defaultValuesDF} colWidths={[100, 200]} dataSource="users" useAllDataSourceFields="true">
            <fields>
            <HeaderItem defaultValue="Registration Form" />
            <PasswordItem name="password" />
            <PasswordItem name="password2" title="Password Again" required="true"
                           wrapTitle="false" length="20">
                <validators>
                    <Validator type="matchesField" otherField="password" errorMessage="Passwords do not match"/>
                </validators>
            </PasswordItem>          
            <CheckboxItem name="acceptTerms" title="I accept the terms of use."
                           width="150" defaultValue="false">
                <validators>
                    <Validator type="custom" condition="return value == true" errorMessage="You must accept the terms of use to continue"/>
                </validators>
            </CheckboxItem>  
            <ButtonItem name="validateBtn" title="Validate" click="form.validate()" />
            </fields>
        </DynamicForm>
    </>, 
    document.getElementById(target)
);
