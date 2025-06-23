/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, ListGrid, ShuttleItem, SubmitItem, TextItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onTeamGridSelectionUpdated = function () {
    var selection = this.getSelectedRecord();
    if (selection == null) {
        teamForm.clearValues();
        teamForm.disable();
    } else {
        teamForm.enable();
        teamForm.editRecord(this.getSelectedRecord());
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout width="100%" height="100%" autoDraw="true">
        <members>
            <ListGrid ID="teamGrid" dataSource="teams_relation" selectionType="single" autoFetchData="true" height="200" showResizeBar="true" selectionUpdated={onTeamGridSelectionUpdated}/>
            <DynamicForm ID="teamForm" dataSource="teams_relation" disabled="true">
                <fields>
                    <TextItem name="TeamName"/>
                    <ShuttleItem name="EmployeeId" canEdit="true" displayField="Name"/>
                    <SubmitItem title="Save"/>
                </fields>
            </DynamicForm>
        </members>
    </VLayout>,
    document.getElementById(target)
);
