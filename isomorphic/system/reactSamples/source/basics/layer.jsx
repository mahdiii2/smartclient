/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, Label, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFrontClick = function() {return dragWidget.bringToFront()};
let onBackClick = function() {return dragWidget.sendToBack()};
let onAboveMiddleClick = function() {return dragWidget.moveAbove(middleWidget)};
let onBelowMiddleClick = function() {return dragWidget.moveBelow(middleWidget)};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Label contents="Bottom" align="center" styleName="blackText" backgroundColor="lightblue" showEdges="true"/>

        <Label contents="Middle" align="center" title="middleWidget" ID="middleWidget" left="60" top="60" styleName="blackText" backgroundColor="lightgreen" showEdges="true"/>

        <Label contents="Top" align="center" left="120" top="120" styleName="blackText" backgroundColor="pink" showEdges="true"/>

        <Label contents="Drag Me" align="center" title="dragWidget" ID="dragWidget" left="120" top="0" styleName="blackText" backgroundColor="lightyellow" canDragReposition="true" showEdges="true" dragAppearance="target"/>

        <VStack membersMargin="10" left="250">
            <members>
                <IButton title="Front" click={onFrontClick}/>
                <IButton title="Back" click={onBackClick}/>
                <IButton title="Above Middle" click={onAboveMiddleClick}/>
                <IButton title="Below Middle" click={onBelowMiddleClick}/>
            </members>
        </VStack>
    </>,
    document.getElementById(target)
);
