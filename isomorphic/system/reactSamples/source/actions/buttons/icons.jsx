/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, HLayout, IButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDisableSaveClick = function () {
    if (saveButton.isDisabled()) {
        saveButton.enable();
        this.setTitle('Disable Save');
    } else {
        saveButton.disable();
        this.setTitle('Enable Save');
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HLayout membersMargin="20">
            <members>
                <IButton icon="[SAMPLE]icons/16/find.png" title="Find Related" ID="findButton" width="120"/>
                <Button icon="[SAMPLE]icons/16/icon_add_files.png" iconOrientation="right" showDownIcon="true" title="Save" ID="saveButton"/>
            </members>
        </HLayout>

        <Button title="Disable Save" width="120" left="60" top="45" click={onDisableSaveClick}/>
    </>,
    document.getElementById(target)
);
