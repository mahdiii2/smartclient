/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Img } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Img imageType="normal" src="[SAMPLE]other/star.gif" width="100" height="100" border="1px solid gray"/>

        <Img imageType="center" src="[SAMPLE]other/star.gif" width="100" height="100" left="120" border="1px solid gray"/>

        <Img imageType="stretch" src="[SAMPLE]other/star.gif" width="100" height="100" left="240" border="1px solid gray"/>

        <Img imageType="stretch" src="[SAMPLE]other/cpu.jpg" width="100" height="100" top="120" border="1px solid gray"/>

        <Img imageType="normal" imageHeight="536" imageWidth="446" src="[SAMPLE]other/cpu.jpg" width="220" height="220" left="120" top="120" border="1px solid gray" overflow="auto"/>
    </>,
    document.getElementById(target)
);
