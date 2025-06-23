/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ComboBoxItem, DropDownField, DynamicForm, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onEmployeeNameFormatValue = function (value, record, form, item) {
    var selectedRecord = item.getSelectedRecord();
    if (selectedRecord != null) {
        return selectedRecord.Name + ' (' + selectedRecord.Email + ')';
    } else {
        return value;
    }
};
let onOtherEmployeeNameFormatValue = function (value, record, form, item) {
    var selectedRecord = item.getSelectedRecord();
    if (selectedRecord != null) {
        return selectedRecord.Name + ' (' + selectedRecord.Email + ')';
    } else {
        return value;
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm>
        <items>
            <SelectItem optionDataSource="employees" valueField="EmployeeId" displayField="Name" name="employeeName" title="Employee" width="250" pickListWidth="350" formatValue={onEmployeeNameFormatValue}>
                <pickListFields>
                    <DropDownField name="Name"/>
                    <DropDownField name="Email"/>
                </pickListFields>
            </SelectItem>
            <ComboBoxItem formatOnBlur="true" optionDataSource="employees" valueField="EmployeeId" displayField="Name" name="otherEmployeeName" title="Employee" width="250" pickListWidth="350" formatValue={onOtherEmployeeNameFormatValue}>
                <pickListFields>
                    <DropDownField name="Name"/>
                    <DropDownField name="Email"/>
                </pickListFields>
            </ComboBoxItem>
        </items>
    </DynamicForm>,
    document.getElementById(target)
);
