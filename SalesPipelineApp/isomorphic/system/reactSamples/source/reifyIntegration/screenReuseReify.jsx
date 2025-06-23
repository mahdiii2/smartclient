/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, ListGrid, Tab, TabSet, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSupplyGridDataArrived = function (startRow, endRow) {
    this.selectRecord(0);
};
let onEditClick = function () {
    var screen = project.createScreen(project.screens[0].ID, { suppressAutoDraw: true }), saveForm = screen.getByLocalId('simpleForm'), record = supplyGrid.getSelectedRecord();
    saveForm.editRecord(record);
    var tab = {
        name: record.itemID,
        title: record.itemName,
        canClose: true,
        pane: screen
    };
    tabSet.addTab(tab);
    tabSet.selectTab(tab);
};

var project;

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TabSet ID="tabSet" width="900" height="450">
        <tabs>
            <Tab title="Supply Items" ID="supplyTab" canClose="false">
                <pane>
                    <VLayout defaultLayoutAlign="right" membersMargin="5" ID="vLayout" width="100%">
                        <members>
                            <ListGrid ID="supplyGrid" dataSource="supplyItem" showFilterEditor="true" selectionType="single" autoFetchData="true" disabled="true" dataArrived={onSupplyGridDataArrived}/>
                            <IButton title="Edit" width="100" click={onEditClick}/>
                        </members>
                    </VLayout>
                </pane>
            </Tab>
        </tabs>
    </TabSet>,
    document.getElementById(target)
);

isc.Reify.loadProject('Simple Form', function (loadedProject, projects, rpcResponse) {
    project = loadedProject;
    supplyGrid.enable();
}, {
    userName: 'reifySample',
    password: 'tryReify',
    serverURL: 'https://create.reify.com'
});
