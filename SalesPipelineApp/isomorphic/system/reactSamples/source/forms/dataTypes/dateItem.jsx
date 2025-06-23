import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label, DateItem, DynamicForm } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var afterComponentDidMount = function() {
    dateLabel.setContents(dateForm.getValue('pickListDate'));
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm ID="dateForm" numCols="4" width="650">
            <DateItem name="pickListDate" title="PickList Date"
                       change="dateLabel.setContents(value)" wrapTitle="false" />
            <DateItem name="directInputDate" title="Direct Input Date" useTextField="true"
                       wrapTitle="false" change="dateLabel.setContents(value)" />
        </DynamicForm>
        
        <Label ID="dateLabel" top="40" left="100" width="450"  afterComponentDidMount={afterComponentDidMount} />
    </>, 
    document.getElementById(target)
);
