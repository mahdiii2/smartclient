/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DSField, DataSource, DateItem, DynamicForm, ListGrid, Object, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onEmployeeGridRecordClick = function(viewer,record,recordNum,field,fieldNum,value,rawValue,editedRecord) {return employeeForm.editRecord(record)};
let onEmployeeGridDateFormatter = function dateFormatFunction() {
    return this.getDate() + '.' + (this.getMonth() + 1) + '.' + this.getShortYear();
};
let onHireDateDisplayFormat = function dateFormatFunction() {
    return this.getDate() + '.' + (this.getMonth() + 1) + '.' + this.getShortYear();
};
let onSaveEditsClick = function(form,item) {return form.saveData()};

function dateFormatFunction() {
    return this.getDate() + '.' + (this.getMonth() + 1) + '.' + this.getShortYear();
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="employees" title="employees" clientOnly="true">
            <fields>
                <DSField name="employeeID" type="sequence" hidden="true" primaryKey="true"/>
                <DSField name="name" title="Name"/>
                <DSField name="hireDate" type="date" title="Hiring Date"/>
            </fields>
            <testData>
                <Object employeeID="452" name="Gene Porter">
                    <hireDate>2005-02-04T06:00:00.000</hireDate>
                </Object>
                <Object employeeID="782" name="Cheryl Pearson">
                    <hireDate>2007-12-06T06:00:00.000</hireDate>
                </Object>
                <Object employeeID="751" name="Rogine Leger">
                    <hireDate>2007-11-22T06:00:00.000</hireDate>
                </Object>
            </testData>
        </DataSource>

        <ListGrid ID="employeeGrid" dataSource="employees" canEdit="true" dateFormatter={onEmployeeGridDateFormatter} dateInputFormat="DMY" autoFetchData="true" width="250" height="100" recordClick={onEmployeeGridRecordClick}/>

        <DynamicForm ID="employeeForm" dataSource="employees" top="150">
            <fields>
                <TextItem name="name"/>
                <DateItem useTextField="true" inputFormat="DMY" displayFormat={onHireDateDisplayFormat} name="hireDate" wrapTitle="false"/>
                <ButtonItem title="Save Edits" click={onSaveEditsClick}/>
            </fields>
        </DynamicForm>
    </>,
    document.getElementById(target)
);
