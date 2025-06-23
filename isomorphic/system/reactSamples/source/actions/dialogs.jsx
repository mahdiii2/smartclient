/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onConfirmClick = function () {
    isc.confirm('Proceed with Operation get AJAX?', 'answer.setContents(value ? \'OK\' : \'Cancel\')');
};
let onAskClick = function () {
    isc.ask('Are you going to stop writing great code?', 'answer.setContents(value ? \'Yes\' : \'No\')');
};
let onAskForValueClick = function () {
    isc.askForValue('What is your name?', 'answer.setContents(\'Your name is \' + value)');
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Button title="Confirm" click={onConfirmClick}/>

        <Button title="Ask" left="150" click={onAskClick}/>

        <Button title="Ask For Value" left="300" click={onAskForValueClick}/>

        <Label contents="Your answer here..." title="answer" ID="answer" width="300" top="50"/>
    </>,
    document.getElementById(target)
);
