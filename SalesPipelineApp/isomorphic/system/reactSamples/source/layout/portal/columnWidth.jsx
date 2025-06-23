/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, DynamicForm, PortalColumn, PortalLayout, Portlet, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onPreventUnderflowChanged = function (form, item, value) {
    portalLayout.setPreventUnderflow(value);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <VLayout membersMargin="10" width="100%" height="100%">
            <members>
                <DynamicForm ID="form">
                    <fields>
                        <CheckboxItem defaultValue="true" title="Prevent Underflow" changed={onPreventUnderflowChanged}/>
                    </fields>
                </DynamicForm>
                <PortalLayout canResizeColumns="true" numColumns="0" ID="portalLayout">
                    <portalColumns>
                        <PortalColumn>
                            <portlets>
                                <Portlet title="Portlet 4"/>
                            </portlets>
                        </PortalColumn>
                        <PortalColumn/>
                    </portalColumns>
                </PortalLayout>
            </members>
        </VLayout>

        <Portlet title="Portlet 1"/>

        <Portlet title="Portlet 2"/>

        <Portlet title="Portlet 3"/>
    </>,
    document.getElementById(target)
);
