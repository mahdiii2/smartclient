/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TGField, Tree, TreeGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onNameFormatCellValue = function(value,record,rowNum,colNum,grid) {return record.Job+':&nbsp;'+value};

var employeeData = [
    {
        EmployeeId: '4',
        ReportsTo: '1',
        Name: 'Charles Madigen',
        Job: 'Chief Operating Officer',
        Phone: 'x10962',
        Email: 'cmadigan@server.com',
        OrgUnit: 'Management',
        Salary: 26200,
        Gender: 'male',
        MaritalStatus: 'married',
        EmployeeType: 'full time',
        EmployeeStatus: 'active',
        isOpen: true
    },
    {
        EmployeeId: '189',
        ReportsTo: '4',
        Name: 'Gene Porter',
        Job: 'Mgr Tech Plng IntIS T',
        Phone: 'x30358',
        Email: 'gporter@server.com',
        OrgUnit: 'Management',
        Salary: 18100,
        Gender: 'female',
        MaritalStatus: 'married',
        EmployeeType: 'contract',
        EmployeeStatus: 'LOA'
    },
    {
        EmployeeId: '265',
        ReportsTo: '189',
        Name: 'Olivier Doucet',
        Job: 'Asset Spec Lines Stns',
        Phone: 'x22873',
        Email: 'odoucet@server.com',
        OrgUnit: 'Management',
        Salary: 5450,
        Gender: 'male',
        MaritalStatus: 'married',
        EmployeeType: 'part time',
        EmployeeStatus: 'active'
    },
    {
        EmployeeId: '264',
        ReportsTo: '189',
        Name: 'Cheryl Pearson',
        Job: 'Dsl Sys Rep',
        Phone: 'x17370',
        Email: 'cpearson@server.com',
        OrgUnit: 'Management',
        Salary: 5650,
        Gender: 'female',
        MaritalStatus: 'single',
        EmployeeType: 'full time',
        EmployeeStatus: 'active'
    },
    {
        EmployeeId: '263',
        ReportsTo: '189',
        Name: 'Priya Sambhus',
        Job: 'Line Wrker A',
        Phone: 'x21746',
        Email: 'psambhus@server.com',
        OrgUnit: 'Management',
        Salary: 6100,
        Gender: 'male',
        MaritalStatus: 'married',
        EmployeeType: 'full time',
        EmployeeStatus: 'active'
    },
    {
        EmployeeId: '188',
        ReportsTo: '4',
        Name: 'Rogine Leger',
        Job: 'Mgr Syst P P',
        Phone: 'x04145',
        Email: 'rleger@server.com',
        OrgUnit: 'Management',
        Salary: 10500,
        Gender: 'female',
        MaritalStatus: 'single',
        EmployeeType: 'contract',
        EmployeeStatus: 'LOA',
        isOpen: true
    },
    {
        EmployeeId: '262',
        ReportsTo: '188',
        Name: 'Jacques Desautels',
        Job: 'Line Wrker A',
        Phone: 'x12796',
        Email: 'jdesautels@server.com',
        OrgUnit: 'Management',
        Salary: 7950,
        Gender: 'female',
        MaritalStatus: 'married',
        EmployeeType: 'full time',
        EmployeeStatus: 'LOA'
    },
    {
        EmployeeId: '261',
        ReportsTo: '188',
        Name: 'Kay Monroe',
        Job: 'Stn Opr',
        Phone: 'x01941',
        Email: 'kmonroe@server.com',
        OrgUnit: 'Management',
        Salary: 9500,
        Gender: 'female',
        MaritalStatus: 'married',
        EmployeeType: 'full time',
        EmployeeStatus: 'active'
    },
    {
        EmployeeId: '260',
        ReportsTo: '188',
        Name: 'Francine Dugas',
        Job: 'Fire Sec Off',
        Phone: 'x13382',
        Email: 'fdugas@server.com',
        OrgUnit: 'Management',
        Salary: 8900,
        Gender: 'female',
        MaritalStatus: 'single',
        EmployeeType: 'full time',
        EmployeeStatus: 'LOA'
    },
    {
        EmployeeId: '259',
        ReportsTo: '188',
        Name: 'Jacques Leblanc',
        Job: 'Purch Clk',
        Phone: 'x30117',
        Email: 'jleblanc@server.com',
        OrgUnit: 'Management',
        Salary: 9000,
        Gender: 'female',
        MaritalStatus: 'married',
        EmployeeType: 'full time',
        EmployeeStatus: 'LOA'
    },
    {
        EmployeeId: '258',
        ReportsTo: '188',
        Name: 'Ren Xian',
        Job: 'Mobile Eq Opr',
        Phone: 'x03557',
        Email: 'rxian@server.com',
        OrgUnit: 'Management',
        Salary: 6750,
        Gender: 'male',
        MaritalStatus: 'single',
        EmployeeType: 'full time',
        EmployeeStatus: 'active'
    },
    {
        EmployeeId: '257',
        ReportsTo: '188',
        Name: 'Olivier Hebert',
        Job: 'Met Read/Coll',
        Phone: 'x21093',
        Email: 'ohebert@server.com',
        OrgUnit: 'Management',
        Salary: 7900,
        Gender: 'male',
        MaritalStatus: 'married',
        EmployeeType: 'contract',
        EmployeeStatus: 'LOA'
    },
    {
        EmployeeId: '182',
        ReportsTo: '4',
        Name: 'Tamara Kane',
        Job: 'Mgr Site Services',
        Phone: 'x14279',
        Email: 'tkane@server.com',
        OrgUnit: 'Management',
        Salary: 11900,
        Gender: 'female',
        MaritalStatus: 'single',
        EmployeeType: 'part time',
        EmployeeStatus: 'active'
    },
    {
        EmployeeId: '195',
        ReportsTo: '182',
        Name: 'Kai Kong',
        Job: 'Stores Worker',
        Phone: 'x08410',
        Email: 'kkong@server.com',
        OrgUnit: 'Management',
        Salary: 9900,
        Gender: 'female',
        MaritalStatus: 'married',
        EmployeeType: 'full time',
        EmployeeStatus: 'active'
    },
    {
        EmployeeId: '194',
        ReportsTo: '182',
        Name: 'Felicia Piper',
        Job: 'Dsl Sys Rep',
        Phone: 'x16613',
        Email: 'fpiper@server.com',
        OrgUnit: 'Management',
        Salary: 8950,
        Gender: 'female',
        MaritalStatus: 'single',
        EmployeeType: 'full time',
        EmployeeStatus: 'LOA'
    },
    {
        EmployeeId: '193',
        ReportsTo: '182',
        Name: 'Darcy Feeney',
        Job: 'Inventory Ck',
        Phone: 'x31751',
        Email: 'dfeeney@server.com',
        OrgUnit: 'Management',
        Salary: 9900,
        Gender: 'female',
        MaritalStatus: 'married',
        EmployeeType: 'full time',
        EmployeeStatus: 'LOA'
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TreeGrid ID="employeeTree" nodeIcon="[SAMPLE]icons/16/person.png" folderIcon="[SAMPLE]icons/16/person.png" dropIconSuffix="into" closedIconSuffix="" showOpenIcons="false" canAcceptDroppedRecords="true" canReorderRecords="true" width="500" height="400" showSelectedIcons="true">
        <fields>
            <TGField name="Name" formatCellValue={onNameFormatCellValue}/>
        </fields>
        <data rootValue="1" modelType="parent" nameProperty="Name" idField="EmployeeId" parentIdField="ReportsTo" openProperty="isOpen" data={employeeData}/>
    </TreeGrid>,
    document.getElementById(target)
);
