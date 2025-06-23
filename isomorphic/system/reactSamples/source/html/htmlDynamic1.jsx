/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HTMLFlow, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var currentUser = 'Secret Agent X';

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Label contents="Logged in as: ${currentUser}" dynamicContents="true" wrap="false" icon="[SAMPLE]icons/16/person.png"/>

        <HTMLFlow contents="&lt;hr&gt;Today&apos;s date is &lt;b&gt;${new Date().toUSShortDate()}&lt;/b&gt;&lt;hr&gt;" dynamicContents="true" top="100"/>
    </>,
    document.getElementById(target)
);
