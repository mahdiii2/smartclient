/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Img, Tab, TabSet } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <TabSet tabBarPosition="top" tabBarAlign="right" ID="tabSet" width="300" height="200">
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

        <TabSet tabBarPosition="left" tabBarAlign="bottom" width="200" height="300" left="350">
            <tabs>
                <Tab title="" icon="pieces/16/pawn_blue.png" iconSize="16">
                    <pane>
                        <Img src="pieces/48/pawn_blue.png" width="48" height="48" autoDraw="false"/>
                    </pane>
                </Tab>
                <Tab title="" icon="pieces/16/pawn_green.png" iconSize="16">
                    <pane>
                        <Img src="pieces/48/pawn_green.png" width="48" height="48" autoDraw="false"/>
                    </pane>
                </Tab>
            </tabs>
        </TabSet>
    </>,
    document.getElementById(target)
);
