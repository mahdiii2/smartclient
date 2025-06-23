/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, IButton, Img, Tab, TabSet, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onButtonBlueClick = function () {
    topTabSet.selectTab(0);
    leftTabSet.selectTab(0);
};
let onButtonGreenClick = function () {
    topTabSet.selectTab(1);
    leftTabSet.selectTab(1);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="15">
        <members>
            <TabSet tabBarPosition="top" ID="topTabSet" width="400" height="200" autoDraw="false">
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
            <HStack membersMargin="10" ID="hStack" height="20" autoDraw="false">
                <members>
                    <IButton title="Select Blue" ID="buttonBlue" autoDraw="false" click={onButtonBlueClick}/>
                    <IButton title="Select Green" ID="buttonGreen" autoDraw="false" click={onButtonGreenClick}/>
                </members>
            </HStack>
            <TabSet tabBarPosition="left" ID="leftTabSet" width="400" height="200" autoDraw="false">
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
        </members>
    </VStack>,
    document.getElementById(target)
);
