/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, TreeGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="employees" dataURL="[ISOMORPHIC]/system/reference/inlineExamples/trees/dataBinding/employeesDataParentLinked.xml" recordXPath="/Employees/employee" title="employees">
            <fields>
                <DSField name="Name"/>
                <DSField name="Job"/>
                <DSField name="EmployeeId" type="integer" title="Employee ID" primaryKey="true"/>
                <DSField name="ReportsTo" type="integer" title="Manager" foreignKey="employees.EmployeeId"/>
            </fields>
        </DataSource>

        <TreeGrid ID="employeeTree" dataSource="employees" loadDataOnDemand="false" nodeIcon="[SAMPLE]icons/16/person.png" folderIcon="[SAMPLE]icons/16/person.png" closedIconSuffix="" showOpenIcons="false" showDropIcons="false" autoFetchData="true" width="500" height="400" showSelectedIcons="true"/>
    </>,
    document.getElementById(target)
);
