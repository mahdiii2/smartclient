/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, DynamicForm, PortalColumn, PortalLayout, PortalRow, Portlet, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onPreventRowUnderflowChanged = function (form, item, value) {
    portalLayout.setPreventRowUnderflow(value);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" width="100%" height="100%">
        <members>
            <DynamicForm ID="form">
                <fields>
                    <CheckboxItem defaultValue="true" title="Prevent Row Underflow" changed={onPreventRowUnderflowChanged}/>
                </fields>
            </DynamicForm>
            <PortalLayout numColumns="0" ID="portalLayout">
                <portalColumns>
                    <PortalColumn>
                        <portalRows>
                            <PortalRow>
                                <portlets>
                                    <Portlet title="width: 150" width="150"/>
                                    <Portlet title="width: 200" items="Notice how the PortalLayout will stretch the last Portlet to fill the available space, if &lt;code&gt;preventRowUnderflow&lt;/code&gt; is set." width="200">
                                        <bodyProperties padding="10"/>
                                    </Portlet>
                                </portlets>
                            </PortalRow>
                            <PortalRow>
                                <portlets>
                                    <Portlet title="width: &quot;30%&quot;" width="30%"/>
                                    <Portlet title="width: &quot;70%&quot;" width="70%"/>
                                </portlets>
                            </PortalRow>
                        </portalRows>
                    </PortalColumn>
                </portalColumns>
            </PortalLayout>
        </members>
    </VLayout>,
    document.getElementById(target)
);
