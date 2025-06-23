/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const DragLabel = SC.defineClass('DragLabel', Label);
isc.DragLabel.addProperties({
    top: 50,
    align: 'center',
    padding: 4,
    showEdges: true,
    backgroundColor: '#e0e0ff',
    keepInParentRect: true,
    canDragReposition: true
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DragLabel contents="Translucent" left="50" dragAppearance="target" dragOpacity="60"/>

        <DragLabel contents="Shadow" left="200" dragAppearance="target" showDragShadow="true" dragShadowDepth="8"/>

        <DragLabel contents="Outline" left="350" dragAppearance="outline"/>
    </>,
    document.getElementById(target)
);
