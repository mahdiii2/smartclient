/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, HLayout, IButton, ImgButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDisableAllClick = function () {
    if (cssButton.isDisabled()) {
        cssButton.enable();
        stretchButton.enable();
        imgButton.enable();
        this.setTitle('Disable All');
    } else {
        cssButton.disable();
        stretchButton.disable();
        imgButton.disable();
        this.setTitle('Enable All');
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HLayout membersMargin="20">
            <members>
                <IButton showRollOver="true" showDown="true" showDisabled="true" icon="[SAMPLE]icons/16/find.png" title="Stretch Button" titleStyle="stretchTitle" ID="stretchButton" width="150"/>
                <Button baseStyle="cssButton" showRollOver="true" showDown="true" showDisabled="true" icon="[SAMPLE]icons/16/icon_add_files.png" autoFit="true" title="CSS Button" ID="cssButton"/>
                <ImgButton title="imgButton" width="18" height="18" showRollOver="true" showDown="true" showDisabled="true" ID="imgButton"/>
            </members>
        </HLayout>

        <Button title="Disable All" width="120" left="190" top="45" click={onDisableAllClick}/>
    </>,
    document.getElementById(target)
);
