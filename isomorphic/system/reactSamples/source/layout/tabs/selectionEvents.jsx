/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label, Tab, TabSet } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onPreferencesTabSelected = function (tabSet, tabNum, tabPane, ID, tab) {
    if (tabPane == null) {
        isc.DynamicForm.create({
            ID: 'preferencesPane',
            fields: [{
                    name: 'useISCTabs',
                    title: 'Use SmartClient tabs',
                    type: 'checkbox',
                    defaultValue: false,
                    required: true
                }]
        });
        tabSet.updateTab(ID, preferencesPane);
    }
};
let onPreferencesTabDeselected = function (tabSet, tabNum, tabPane, ID, tab, newTab) {
    if (!tabPane.getValue('useISCTabs')) {
        return false;
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TabSet ID="tabSet" width="400" height="200">
        <tabs>
            <Tab title="Welcome" ID="welcome">
                <pane>
                    <Label contents="Welcome to the application" align="center" title="welcomePane" ID="welcomePane" width="100%"/>
                </pane>
            </Tab>
            <Tab title="Preferences" ID="preferences" tabSelected={onPreferencesTabSelected} tabDeselected={onPreferencesTabDeselected}/>
        </tabs>
    </TabSet>,
    document.getElementById(target)
);
