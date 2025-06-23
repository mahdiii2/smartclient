/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDrawClick = function() {return label2.draw()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Label contents="autoDraw:true" title="label1" ID="label1" left="50" top="50" showEdges="true" autoDraw="true"/>

        <Label contents="autoDraw:false" title="label2" ID="label2" left="200" top="50" showEdges="true" autoDraw="false"/>

        <IButton title="Draw" left="200" click={onDrawClick}/>
    </>,
    document.getElementById(target)
);
