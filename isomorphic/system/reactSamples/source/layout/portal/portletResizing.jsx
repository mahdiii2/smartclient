/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, PortalColumn, PortalLayout, PortalRow, Portlet } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <PortalLayout canResizePortlets="true" numColumns="0" width="100%" height="100%">
        <portalColumns>
            <PortalColumn>
                <portalRows>
                    <PortalRow>
                        <portlets>
                            <Portlet title="Portlet 1"/>
                        </portlets>
                    </PortalRow>
                    <PortalRow>
                        <portlets>
                            <Portlet title="Portlet 2"/>
                            <Portlet title="Portlet 3"/>
                        </portlets>
                    </PortalRow>
                </portalRows>
            </PortalColumn>
            <PortalColumn>
                <portalRows>
                    <PortalRow>
                        <portlets>
                            <Portlet title="Portlet 4"/>
                            <Portlet title="Portlet 5"/>
                        </portlets>
                    </PortalRow>
                    <PortalRow>
                        <portlets>
                            <Portlet title="Portlet 6"/>
                        </portlets>
                    </PortalRow>
                </portalRows>
            </PortalColumn>
        </portalColumns>
    </PortalLayout>,
    document.getElementById(target)
);
