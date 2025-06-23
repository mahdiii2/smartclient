/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DynamicForm, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onHelloClick = function(form,item) {return isc.say('Hello ' + form.getValue('you') + '!')};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm numCols="3" autoFocus="true">
        <items>
            <TextItem defaultValue="my friend" name="you" title="Enter your name" wrapTitle="false" selectOnFocus="true"/>
            <ButtonItem icon="[SAMPLE]icons/16/message.png" autoFit="true" title="Hello" startRow="false" click={onHelloClick}/>
        </items>
    </DynamicForm>,
    document.getElementById(target)
);
