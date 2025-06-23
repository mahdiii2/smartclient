/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, Label, VLayout } from 'smartclient-eval/react';

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
    <HLayout membersMargin="20" width="100%" height="100%">
        <members>
            <VLayout layoutMargin="10" membersMargin="5" width="150" showEdges="true">
                <members>
                    <BlueBox contents="height 50" height="50"/>
                    <BlueBox contents="height *" height="*"/>
                    <BlueBox contents="height 30%" height="30%"/>
                </members>
            </VLayout>
            <HLayout layoutMargin="10" membersMargin="5" height="150" showEdges="true">
                <members>
                    <BlueBox contents="width 50" width="50"/>
                    <BlueBox contents="width *" width="*"/>
                    <BlueBox contents="width 30%" width="30%"/>
                </members>
            </HLayout>
        </members>
    </HLayout>,
    document.getElementById(target)
);
