/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, Label, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const BlueBox = SC.defineClass('BlueBox', Label);
isc.BlueBox.addProperties({
    align: 'center',
    border: '1px solid #808080',
    backgroundColor: 'lightblue',
    styleName: 'blackText'
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <VStack layoutMargin="10" membersMargin="5" width="150" showEdges="true">
            <members>
                <BlueBox contents="height 40" height="40"/>
                <BlueBox contents="height 80" height="80"/>
                <BlueBox contents="height 160" height="160"/>
            </members>
        </VStack>

        <HStack layoutMargin="10" membersMargin="5" height="150" left="170" showEdges="true">
            <members>
                <BlueBox contents="width 60" width="60"/>
                <BlueBox contents="width 120" width="120"/>
                <BlueBox contents="width 180" width="180"/>
            </members>
        </HStack>
    </>,
    document.getElementById(target)
);
