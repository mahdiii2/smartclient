/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onBrickClick = function() {return myBox.setBackgroundImage('brick.jpg')};
let onStoneClick = function() {return myBox.setBackgroundImage('stone.jpg')};
let onMetalClick = function() {return myBox.setBackgroundImage('metal.jpg')};
let onLeatherClick = function() {return myBox.setBackgroundImage('leather.jpg')};
let onBeadsClick = function() {return myBox.setBackgroundImage('beads.jpg')};
let onEmbossClick = function() {return myBox.setBackgroundImage('emboss.jpg')};
let onBrocadeClick = function() {return myBox.setBackgroundImage('brocade.jpg')};
let onLeavesClick = function() {return myBox.setBackgroundImage('leaves.jpg')};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack layoutMargin="20" membersMargin="10" ID="myBox" width="100%" height="100%" backgroundImage="leather.jpg" appImgDir="backgrounds/" showEdges="true">
        <members>
            <IButton title="Brick" click={onBrickClick}/>
            <IButton title="Stone" click={onStoneClick}/>
            <IButton title="Metal" click={onMetalClick}/>
            <IButton title="Leather" click={onLeatherClick}/>
            <IButton title="Beads" click={onBeadsClick}/>
            <IButton title="Emboss" click={onEmbossClick}/>
            <IButton title="Brocade" click={onBrocadeClick}/>
            <IButton title="Leaves" click={onLeavesClick}/>
        </members>
    </VStack>,
    document.getElementById(target)
);
