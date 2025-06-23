/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var exampleText = 'When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature\'s God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.';
const DragText = SC.defineClass('DragText', Label);
isc.DragText.addProperties({
    contents: exampleText,
    width: 250,
    canDragReposition: true,
    dragAppearance: 'target',
    keepInParentRect: true
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DragText styleName="blackText" showEdges="true" edgeSize="30" edgeImage="corners/flat_100.png" edgeShowCenter="true" edgeOffset="14"/>

        <DragText left="100" top="80" styleName="blackText" showEdges="true" edgeSize="28" edgeImage="corners/ridge_28.png" edgeShowCenter="true" edgeOffset="18"/>

        <DragText width="270" left="200" top="160" styleName="blackText" showEdges="true" edgeSize="35" edgeImage="corners/glow_35.png" edgeShowCenter="true" edgeOffset="25"/>
    </>,
    document.getElementById(target)
);
