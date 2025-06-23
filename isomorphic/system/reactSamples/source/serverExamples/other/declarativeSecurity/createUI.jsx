import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout, DynamicForm, SelectItem } from 'smartclient-eval/react';

// A "render target" can be defined to allow JSX to be loaded dynamically into an existing application.
// This sample sets a different render target starting with "showcaseSample" for each JSX file so they
// can be rendered separately on the same page and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSelectRolesChanged = function (form, item, value) {
                        // setRoles() is meant to be called before application startup, and the roles should be provided by whatever system
                        // you use for authentication.  Note that you are *not* normally allowed to change roles after your application has started;
                        // this sample simulates dynamic role change by completely rebuilding the UI.
                        isc.Authentication.setRoles(value);                    
                        mainLayout.addMember(createUI());
                    };


// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <VLayout membersMargin="15" ID="mainLayout">
            <members>
                <DynamicForm ID="formRoles">
                    <fields>
                        <SelectItem multiple="true" editorType="SelectItem" name="selectRoles" title="Roles" changed={onSelectRolesChanged}>
                            <valueMap HR="HR" CEO="CEO"/>
                        </SelectItem>
                    </fields>
                </DynamicForm>
                <value>hLayout</value>
            </members>
        </VLayout>

    </>,
    document.getElementById(target)
);

