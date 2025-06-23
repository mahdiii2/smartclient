/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, Img } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onShowClick = function() {return myImage.setSrc('star_blue.png')};
let onShowClick1 = function() {return myImage.setSrc('star_yellow.png')};
let onShowClick2 = function() {return myImage.setSrc('star_green.png')};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Img src="star_grey.png" title="myImage" width="48" height="48" ID="myImage" left="120" top="20" appImgDir="pieces/48/"/>

        <IButton icon="pieces/16/star_blue.png" iconOrientation="right" title="Show" width="80" left="10" top="100" click={onShowClick}/>

        <IButton icon="pieces/16/star_yellow.png" iconOrientation="right" title="Show" width="80" left="100" top="100" click={onShowClick1}/>

        <IButton icon="pieces/16/star_green.png" iconOrientation="right" title="Show" width="80" left="190" top="100" click={onShowClick2}/>
    </>,
    document.getElementById(target)
);
