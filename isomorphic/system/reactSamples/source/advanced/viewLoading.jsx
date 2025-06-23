/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, Tab, TabSet, ViewLoader } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TabSet width="400" height="250" top="40">
        <tabs>
            <Tab title="Tab1">
                <pane>
                    <Canvas contents="Contents of Tab1" autoDraw="false"/>
                </pane>
            </Tab>
            <Tab title="Tab2">
                <pane>
                    <ViewLoader viewURL={isc.Page.getIsomorphicDocsDir() + 'inlineExamples/advanced/loadedView.js'} loadingMessage="Loading Grid.." autoDraw="false"/>
                </pane>
            </Tab>
        </tabs>
    </TabSet>,
    document.getElementById(target)
);
