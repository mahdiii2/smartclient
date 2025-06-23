/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ComboBoxItem, DropDownField, DynamicForm, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm width="500">
        <fields>
            <ComboBoxItem autoOpenTree="all" optionDataSource="employees" valueField="EmployeeId" displayField="Name" name="manager" title="ComboBoxItem" wrapTitle="false" dataSetType="tree" pickListWidth="350">
                <pickListFields>
                    <DropDownField name="Name"/>
                    <DropDownField name="Email"/>
                </pickListFields>
                <pickListProperties autoFitFieldWidths="true"/>
            </ComboBoxItem>
            <SelectItem optionDataSource="employees" valueField="EmployeeId" displayField="Name" name="manager2" title="SelectItem" wrapTitle="false" dataSetType="tree" pickListWidth="350" autoOpenTree="all">
                <pickListFields>
                    <DropDownField name="Name"/>
                    <DropDownField name="Email"/>
                </pickListFields>
                <pickListProperties autoFitFieldWidths="true"/>
            </SelectItem>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
