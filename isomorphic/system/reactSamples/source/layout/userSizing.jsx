/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout overflow="hidden" layoutMargin="10" membersMargin="10" width="80%" minWidth="100" minHeight="50" canDragResize="true" showEdges="true" edgeImage="edges/custom/sharpframe_10.png" dragAppearance="target">
        <members>
            <Label contents="Member 1" align="center" overflow="hidden" canDragResize="true" showEdges="true">
                <resizeFrom>
                    <value>L</value>
                    <value>R</value>
                </resizeFrom>
            </Label>
            <Label contents="Member 2" align="center" overflow="hidden" canDragResize="true" showEdges="true">
                <resizeFrom>
                    <value>L</value>
                    <value>R</value>
                </resizeFrom>
            </Label>
        </members>
        <resizeFrom>
            <value>L</value>
            <value>R</value>
        </resizeFrom>
    </HLayout>,
    document.getElementById(target)
);
