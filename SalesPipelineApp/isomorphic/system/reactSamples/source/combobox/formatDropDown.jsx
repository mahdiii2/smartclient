/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DropDownField, DynamicForm, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onEmployeeNameFormatCellValue = function (value, record) {
    return record.Name + ' (' + record.Email + ')';
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm>
        <items>
            <SelectItem optionDataSource="employees" valueField="EmployeeId" displayField="Name" name="employeeName" title="Employee" pickListWidth="250">
                <pickListFields>
                    <DropDownField name="Name" formatCellValue={onEmployeeNameFormatCellValue}/>
                </pickListFields>
            </SelectItem>
        </items>
    </DynamicForm>,
    document.getElementById(target)
);
