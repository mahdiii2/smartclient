import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ListGrid, LGField, ToolStripButton, ToolStrip, VLayout, DynamicForm,
         SavedSearchItem, ToolStripSeparator, FormLayout, RadioGroupItem
       } from 'smartclient-eval/react';

// A "render target" can be defined to allow JSX to be loaded dynamically into an existing application.
// This sample sets a different render target starting with "showcaseSample" for each JSX file so they
// can be rendered separately on the same page and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let changeFunctionRadioGroupItem = function (form, item, value, oldValue) {
    if (value == "Normal User") isc.Auth.setRoles(null);
    else                        isc.Auth.setRoles(["admin"]);

    // Rebuild the main UI:
    // Typically Admin role would not be updated at runtime. This ensures
    // the components show the appropriate UI for the user role.
    createMainUI();
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm ID="topAdminControlForm" autoDraw="false">
            <fields>
                <RadioGroupItem name="topAlignmentRadio" showTitle="false" vertical="false"
                                wrap="false" defaultValue="Normal User" 
                                valueMap={["Normal User","Admin"]}
                                change={changeFunctionRadioGroupItem}/>
            </fields>
        </DynamicForm>
    
        <VLayout ID="testLayout" height="100%" width="500" membersMargin="10"
                 minBreadthMember="topContainer">
            <members>
                <value>topAdminControlForm</value>
                <value>topContainer</value>
                <value>bottomContainer</value>
            </members>
        </VLayout>
    </>,
    document.getElementById(target)
);
