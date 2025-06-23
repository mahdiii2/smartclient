/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, ListGrid, PortalColumn, PortalLayout, PortalRow, Portlet } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="newsFeed" dataURL="http://rss.slashdot.org/Slashdot/slashdot" recordXPath="//item | //default:item" title="newsFeed">
            <fields>
                <DSField name="title"/>
                <DSField name="link" type="link"/>
            </fields>
        </DataSource>

        <PortalLayout numColumns="0" width="100%" height="100%">
            <portalColumns>
                <PortalColumn>
                    <portalRows>
                        <PortalRow>
                            <portlets>
                                <Portlet src="http://en.wikipedia.org/wiki/Ajax_(mythology)" title="src: &apos;http://www.wikipedia.com&apos;"/>
                            </portlets>
                        </PortalRow>
                        <PortalRow>
                            <portlets>
                                <Portlet src="http://www.smartclient.com/" title="src: &apos;http://www.smartclient.com&apos;"/>
                            </portlets>
                        </PortalRow>
                    </portalRows>
                </PortalColumn>
                <PortalColumn>
                    <portalRows>
                        <PortalRow>
                            <portlets>
                                <Portlet title="items">
                                    <items>
                                        <ListGrid ID="newsViewer" dataSource="newsFeed" autoFetchData="true"/>
                                    </items>
                                </Portlet>
                            </portlets>
                        </PortalRow>
                    </portalRows>
                </PortalColumn>
            </portalColumns>
        </PortalLayout>
    </>,
    document.getElementById(target)
);
