/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, IButton, Img } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onHideClick = function() {return starsLayout.hideMember(greenStar)};
let onShowClick = function() {return starsLayout.showMember(greenStar)};

const StarImg = SC.defineClass('StarImg', Img);
isc.StarImg.addProperties({
    width: 48,
    height: 48,
    layoutAlign: 'center',
    appImgDir: 'pieces/48/'
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HStack animateMembers="true" layoutMargin="10" membersMargin="10" ID="starsLayout" top="50" showEdges="true">
            <members>
                <StarImg src="star_blue.png"/>
                <StarImg src="star_green.png" title="greenStar" ID="greenStar"/>
                <StarImg src="star_yellow.png"/>
            </members>
        </HStack>

        <IButton icon="pieces/16/star_green.png" iconOrientation="right" title="Hide" click={onHideClick}/>

        <IButton icon="pieces/16/star_green.png" iconOrientation="right" title="Show" left="120" click={onShowClick}/>
    </>,
    document.getElementById(target)
);
