/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, FormItemIcon, StaticTextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFormItemIconClick = function(form,item,icon) {return isc.say(item.helpText)};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm width="200">
        <fields>
            <StaticTextItem defaultValue="Severity 2" name="severityLevel" title="Severity Level" wrapTitle="false" helpText={'<br><b>Severity 1</b> - Critical problem<br>System is unavailable in production or ' + 'is corrupting data, and the error severely impacts the user\'s operations.' + '<br><br><b>Severity 2</b> - Major problem<br>An important function of the system ' + 'is not available in production, and the user\'s operations are restricted.' + '<br><br><b>Severity 3</b> - Minor problem<br>Inability to use a function of the ' + 'system occurs, but it does not seriously affect the user\'s operations.'}>
                <icons>
                    <FormItemIcon src="[SAMPLE]other/help.png" click={onFormItemIconClick}/>
                </icons>
            </StaticTextItem>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
