/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TGField, TreeGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TreeGrid ID="employeeTree" dataSource="employees" canReparentNodes="true" canEdit="true" canFreezeFields="true" autoFetchData="true" width="550" height="224">
        <fields>
            <TGField name="Name" width="150" frozen="true"/>
            <TGField name="Job" width="150"/>
            <TGField name="EmployeeType" width="150"/>
            <TGField name="EmployeeStatus" width="150"/>
            <TGField name="Salary" width="80"/>
            <TGField name="Gender" width="80"/>
            <TGField name="MaritalStatus" width="100"/>
        </fields>
    </TreeGrid>,
    document.getElementById(target)
);
