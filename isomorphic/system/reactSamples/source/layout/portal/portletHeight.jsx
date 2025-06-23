/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, DynamicForm, PortalColumn, PortalLayout, PortalRow, Portlet, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onPreventColumnUnderflowChanged = function (form, item, value) {
    portalLayout.setPreventColumnUnderflow(value);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" width="100%" height="100%">
        <members>
            <DynamicForm ID="form">
                <fields>
                    <CheckboxItem defaultValue="true" title="Prevent Column Underflow" changed={onPreventColumnUnderflowChanged}/>
                </fields>
            </DynamicForm>
            <PortalLayout numColumns="0" ID="portalLayout">
                <portalColumns>
                    <PortalColumn>
                        <portalRows>
                            <PortalRow height="100">
                                <portlets>
                                    <Portlet title="height: 100" height="100"/>
                                </portlets>
                            </PortalRow>
                            <PortalRow height="100">
                                <portlets>
                                    <Portlet title="height: 100" items="Notice how the PortalLayout will stretch the last Portlet to fill the vertical space, if &lt;code&gt;preventColumnUnderflow&lt;/code&gt; is set." height="100">
                                        <bodyProperties padding="10"/>
                                    </Portlet>
                                </portlets>
                            </PortalRow>
                        </portalRows>
                    </PortalColumn>
                    <PortalColumn>
                        <portalRows>
                            <PortalRow height="30%">
                                <portlets>
                                    <Portlet title="height: &quot;30%&quot;" height="30%"/>
                                </portlets>
                            </PortalRow>
                            <PortalRow height="70%">
                                <portlets>
                                    <Portlet title="height: &quot;70%&quot;" height="70%"/>
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
