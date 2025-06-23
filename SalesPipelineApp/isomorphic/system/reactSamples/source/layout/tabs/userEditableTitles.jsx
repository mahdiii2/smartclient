/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Img, Tab, TabSet } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onTabSetTitleChanged = function (newTitle, oldTitle, tab) {
    if (tab.ID == 'validatedTab' && (!newTitle || newTitle.substring(0, 4) != '123-')) {
        isc.warn('Tab title must start with the prefix "123-"');
        return false;
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TabSet tabBarPosition="top" ID="tabSet" width="550" height="200" canEditTabTitles="true" titleEditEvent="doubleClick" titleEditorTopOffset="2" titleChanged={onTabSetTitleChanged}>
        <tabs>
            <Tab title="Blue" canClose="true">
                <pane>
                    <Img src="pieces/48/pawn_blue.png" width="48" height="48" autoDraw="false"/>
                </pane>
            </Tab>
            <Tab title="Green" canClose="true">
                <pane>
                    <Img src="pieces/48/pawn_green.png" width="48" height="48" autoDraw="false"/>
                </pane>
            </Tab>
            <Tab title="123-Yellow" ID="validatedTab" canClose="true">
                <pane>
                    <Img src="pieces/48/pawn_yellow.png" width="48" height="48" autoDraw="false"/>
                </pane>
            </Tab>
            <Tab title="Can&apos;t Change Me" canEditTitle="false">
                <pane>
                    <Img src="pieces/48/pawn_red.png" width="48" height="48" autoDraw="false"/>
                </pane>
            </Tab>
        </tabs>
    </TabSet>,
    document.getElementById(target)
);
