/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Label contents="Hello world!" align="center" valign="center" padding="4" wrap="false" icon="[SAMPLE]icons/16/world.png" height="50" styleName="helloWorldText" backgroundColor="#ffffd0" showEdges="true" showShadow="true"/>,
    document.getElementById(target)
);
