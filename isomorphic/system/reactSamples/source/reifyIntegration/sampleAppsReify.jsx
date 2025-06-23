/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, Tab, TabSet } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onTabSetTabSelected = function (tabNum, tabPane, ID, tab, name) {
    if (!tabPane.children) {
        this.loadSampleApp(tab.name, tabPane);
    }
};
let onTabSetLoadSampleApp = function (name, tabPane) {
    isc.Reify.loadProject(name, function (project, projects, rpcResponse) {
        var message = isc.RPCManager.getLoadProjectErrorMessage(rpcResponse);
        if (message) {
            isc.warn(message);
            return;
        }
        tabPane.addChild(project.createScreen(project.screens[0].ID));
    }, {
        userName: 'reifySample',
        password: 'tryReify',
        serverURL: 'https://create-test.reify.com',
        willHandleError: true,
        verifyAsError: true,
        verifyDataSources: true
    });
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TabSet tabBarPosition="top" ID="tabSet" width="100%" height="100%" tabSelected={onTabSetTabSelected} loadSampleApp={onTabSetLoadSampleApp}>
        <tabs>
            <Tab title="Dashboard Starter App" name="Dashboard Starter App">
                <pane>
                    <Canvas width="100%" height="100%"/>
                </pane>
            </Tab>
            <Tab title="Issue Tracking App" name="Issue Tracking App (Simple)">
                <pane>
                    <Canvas width="100%" height="100%"/>
                </pane>
            </Tab>
            <Tab title="Order Management App" name="Order Management Starter App">
                <pane>
                    <Canvas width="100%" height="100%"/>
                </pane>
            </Tab>
            <Tab title="Accounts Starter App" name="Accounts Starter App">
                <pane>
                    <Canvas width="100%" height="100%"/>
                </pane>
            </Tab>
        </tabs>
    </TabSet>,
    document.getElementById(target)
);
