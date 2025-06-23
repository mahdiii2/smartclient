/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, HLayout, IButton, ImgButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout membersMargin="20">
        <members>
            <IButton icon="[SAMPLE]icons/16/find.png" title="Stretch Button" width="150"/>
            <Button icon="[SAMPLE]icons/16/find.png" autoFit="true" title="CSS Button"/>
            <ImgButton src="[SKIN]/ImgButton/button.png" width="18" height="18"/>
        </members>
    </HLayout>,
    document.getElementById(target)
);
