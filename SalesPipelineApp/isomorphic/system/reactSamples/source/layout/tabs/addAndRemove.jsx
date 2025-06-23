/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, IButton, Img, Tab, TabSet } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onAddTabClick = function () {
    if (tabSet.tabs.length % 2 == 0) {
        tabSet.addTab({
            title: 'Yellow',
            icon: 'pieces/16/pawn_yellow.png',
            iconSize: 16,
            pane: isc.Img.create({
                autoDraw: false,
                width: 48,
                height: 48,
                src: 'pieces/48/pawn_yellow.png'
            })
        });
    } else {
        tabSet.addTab({
            title: 'Green',
            icon: 'pieces/16/cube_green.png',
            iconSize: 16,
            pane: isc.Img.create({
                autoDraw: false,
                width: 48,
                height: 48,
                src: 'pieces/48/cube_green.png'
            })
        });
    }
    if (tabSet.tabs.length == 1)
        tabSet.selectTab(0);
};
let onRemoveTabClick = function () {
    tabSet.removeTab(tabSet.tabs.length - 1);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <TabSet tabBarPosition="top" ID="tabSet" width="400" height="200">
            <tabs>
                <Tab title="Blue" icon="pieces/16/pawn_blue.png" iconSize="16">
                    <pane>
                        <Img src="pieces/48/pawn_blue.png" width="48" height="48" autoDraw="false"/>
                    </pane>
                </Tab>
                <Tab title="Green" icon="pieces/16/pawn_green.png" iconSize="16">
                    <pane>
                        <Img src="pieces/48/pawn_green.png" width="48" height="48" autoDraw="false"/>
                    </pane>
                </Tab>
            </tabs>
        </TabSet>

        <HLayout membersMargin="10" top="225">
            <members>
                <IButton title="Add Tab" click={onAddTabClick}/>
                <IButton title="Remove Tab" click={onRemoveTabClick}/>
            </members>
        </HLayout>
    </>,
    document.getElementById(target)
);
