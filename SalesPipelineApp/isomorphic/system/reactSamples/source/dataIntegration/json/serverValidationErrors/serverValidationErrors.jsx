/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, DynamicForm, IButton, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onUsersTransformResponse = function (dsResponse, dsRequest, jsonData) {
    var status = isc.XMLTools.selectObjects(jsonData, '/response/status');
    if (status != 'success') {
        dsResponse.status = isc.RPCResponse.STATUS_VALIDATION_ERROR;
        var errors = isc.XMLTools.selectObjects(jsonData, '/response/errors');
        dsResponse.errors = errors;
    }
};
let onSaveClick = function () {
    if (boundForm.validate())
        boundForm.saveData();
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="users" dataFormat="json" dataURL="[ISOMORPHIC]/system/reference/inlineExamples/dataIntegration/json/serverValidationErrors/serverResponse.js" title="users" transformResponse={onUsersTransformResponse}>
            <fields>
                <DSField name="userName" type="text" required="true" length="50" title="Username"/>
                <DSField name="firstName" type="text" required="true" length="50" title="First Name"/>
                <DSField name="lastName" type="text" required="true" length="50" title="Last Name"/>
                <DSField name="email" type="text" required="true" length="100" title="Email"/>
                <DSField name="password" type="password" required="true" length="20" title="Password"/>
            </fields>
        </DataSource>

        <VLayout>
            <members>
                <DynamicForm ID="boundForm" dataSource="users">
                    <values userName="bsmith" firstName="Bob" lastName="Smith" email="bob@smith.com" password="sekrit"/>
                </DynamicForm>
                <IButton title="Save" click={onSaveClick}/>
            </members>
        </VLayout>
    </>,
    document.getElementById(target)
);
