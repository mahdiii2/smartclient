/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, IButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCreateMouseUp = function () {
    isc.Img.create({
        left: isc.Math.random(340),
        top: isc.Math.random(240),
        width: 48,
        height: 48,
        parentElement: cubeBin,
        src: 'pieces/48/cube_blue.png',
        click: 'this.destroy()'
    });
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Canvas ID="cubeBin" width="400" height="300" top="40" showEdges="true"/>

        <IButton icon="pieces/16/cube_blue.png" title="Create" mouseUp={onCreateMouseUp}/>
    </>,
    document.getElementById(target)
);
