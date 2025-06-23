/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DynamicForm, TimeItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onShowButtonGetTime = function (itemName) {
    var item = timeForm.getItem(itemName);
    var inputTime = item.getValue();
    return isc.Time.toTime(inputTime);
};
let onShowButtonClick = function () {
    isc.say('Time #1: ' + this.getTime('textTime') + '<br>' + 'Time #2: ' + this.getTime('pickTime'));
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10">
        <members>
            <DynamicForm ID="timeForm" wrapItemTitles="false">
                <fields>
                    <TimeItem name="textTime" title="Time #1"/>
                    <TimeItem minuteIncrement="15" name="pickTime" title="Time #2" useTextField="false"/>
                </fields>
            </DynamicForm>
            <Button title="Show Time Values" ID="showButton" width="125" getTime={onShowButtonGetTime} click={onShowButtonClick}/>
        </members>
    </VStack>,
    document.getElementById(target)
);
