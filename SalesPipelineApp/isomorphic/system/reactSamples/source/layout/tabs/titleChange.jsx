/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, DynamicForm, Tab, TabSet, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onYourNameChange = function (form, item, value) {
    if (value)
        tabSet.setTabTitle(1, value + '\'s Preferences');
    else
        tabSet.setTabTitle(1, 'Preferences');
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TabSet ID="tabSet" width="400" height="200">
        <tabs>
            <Tab title="Profile" id="profile">
                <pane>
                    <DynamicForm ID="profilePane">
                        <fields>
                            <TextItem name="yourName" title="Your Name" change={onYourNameChange}/>
                        </fields>
                    </DynamicForm>
                </pane>
            </Tab>
            <Tab title="Preferences" id="preferences">
                <pane>
                    <DynamicForm ID="preferencesPane">
                        <fields>
                            <CheckboxItem defaultValue="true" name="useISCTabs" title="Use SmartClient tabs"/>
                        </fields>
                    </DynamicForm>
                </pane>
            </Tab>
        </tabs>
    </TabSet>,
    document.getElementById(target)
);
