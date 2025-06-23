/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, HStack, IButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onChangeTitleClick = function () {
    var title1 = button1.getTitle();
    button1.setTitle(button2.getTitle());
    button2.setTitle(title1);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HStack membersMargin="20" height="24" border="1px solid blue">
            <members>
                <Button icon="[SAMPLE]icons/16/find.png" autoFit="true" title="Find Related" ID="button1" autoDraw="false"/>
                <IButton icon="[SAMPLE]icons/16/find.png" autoFit="true" title="Search within results" ID="button2" autoDraw="false"/>
            </members>
        </HStack>

        <Button title="Change Title" left="60" top="45" click={onChangeTitleClick}/>
    </>,
    document.getElementById(target)
);
