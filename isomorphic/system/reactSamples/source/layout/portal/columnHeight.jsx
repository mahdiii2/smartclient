/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, PortalColumn, PortalLayout, PortalRow, Portlet, SelectItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onColumnOverflowChanged = function (form, item, value) {
    portalLayout.setColumnOverflow(value);
};
let onOverflowChanged = function (form, item, value) {
    portalLayout.setOverflow(value);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" width="100%" height="100%">
        <members>
            <DynamicForm ID="form">
                <fields>
                    <SelectItem title="columnOverflow" defaultValue="auto" changed={onColumnOverflowChanged}>
                        <valueMap>
                                <value>auto</value>
                                <value>visible</value>
                                <value>hidden</value>
                        </valueMap>
                    </SelectItem>
                    <SelectItem title="overflow" defaultValue="auto" changed={onOverflowChanged}>
                        <valueMap>
                                <value>auto</value>
                                <value>visible</value>
                                <value>hidden</value>
                        </valueMap>
                    </SelectItem>
                </fields>
            </DynamicForm>
            <PortalLayout numColumns="0" ID="portalLayout" width="100%" height="350">
                <portalColumns>
                    <PortalColumn>
                        <portalRows>
                            <PortalRow height="200">
                                <portlets>
                                    <Portlet title="Large Portlet" height="200"/>
                                </portlets>
                            </PortalRow>
                            <PortalRow height="200">
                                <portlets>
                                    <Portlet title="Large Portlet" height="200"/>
                                </portlets>
                            </PortalRow>
                        </portalRows>
                    </PortalColumn>
                    <PortalColumn>
                        <portalRows>
                            <PortalRow height="100">
                                <portlets>
                                    <Portlet title="Small Portlet" height="100"/>
                                </portlets>
                            </PortalRow>
                            <PortalRow height="100">
                                <portlets>
                                    <Portlet title="Small Portlet" height="100"/>
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
