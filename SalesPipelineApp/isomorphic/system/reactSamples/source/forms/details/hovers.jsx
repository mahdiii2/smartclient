/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DynamicForm, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSeverityLevelItemHoverHTML = function () {
    if (this.isDisabled()) {
        return 'The severity level cannot be changed when the field is disabled.';
    }
    return this.hoverText[this.getValue()];
};
let onEnable_disableFieldClick = function () {
    var item = severityForm.getItem('severityLevel');
    item.setDisabled(!item.isDisabled());
};

var hoverTexts = {
    'Severity 1': '<b>Severity 1</b><p>Critical problem.  System is unavailable in production or ' + 'is corrupting data, and the error severely impacts the user\'s operations.',
    'Severity 2': '<b>Severity 2</b><p> Major problem.  An important function of the system ' + 'is not available in production, and the user\'s operations are restricted.',
    'Severity 3': '<b>Severity 3</b><p> Minor problem.  Inability to use a function of the ' + 'system occurs, but it does not seriously affect the user\'s operations.'
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm ID="severityForm" itemHoverWidth="200" width="200">
            <fields>
                <SelectItem name="severityLevel" title="Severity Level" defaultValue="Severity 2" wrapTitle="false" hoverText={hoverTexts} itemHoverHTML={onSeverityLevelItemHoverHTML}>
                    <valueMap>
                            <value>Severity 1</value>
                            <value>Severity 2</value>
                            <value>Severity 3</value>
                    </valueMap>
                </SelectItem>
            </fields>
        </DynamicForm>

        <Button title="Enable/disable field" width="150" top="40" click={onEnable_disableFieldClick}/>
    </>,
    document.getElementById(target)
);
