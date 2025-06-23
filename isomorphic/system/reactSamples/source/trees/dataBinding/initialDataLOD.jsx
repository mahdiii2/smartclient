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
    <TreeGrid ID="employeeTree" dataSource="employees" nodeIcon="[SAMPLE]icons/16/person.png" folderIcon="[SAMPLE]icons/16/person.png" closedIconSuffix="" showOpenIcons="false" showDropIcons="false" width="500" height="400" showSelectedIcons="true">
        <fields>
            <TGField name="Name"/>
            <TGField name="Job"/>
        </fields>
        <dataProperties openProperty="isOpen"/>
        <initialData EmployeeId="4" ReportsTo="1" Name="Charles Madigen" Job="Chief Operating Officer" isOpen="true"/>
        <initialData EmployeeId="192" ReportsTo="4" Name="Ralph Brogan" Job="Mgr Software Client Supp"/>
        <initialData EmployeeId="191" ReportsTo="4" Name="Tammy Plant" Job="Mgr Cap Rptg Dist"/>
        <initialData EmployeeId="190" ReportsTo="4" Name="Carol Finley" Job="Mgr Fin Rpts Budgets"/>
        <initialData EmployeeId="189" ReportsTo="4" Name="Gene Porter" Job="Mgr Tech Plng IntIS T"/>
        <initialData EmployeeId="188" ReportsTo="4" Name="Rogine Leger" Job="Mgr Syst P P"/>
        <initialData EmployeeId="187" ReportsTo="4" Name="Abigail Lippman" Job="Mgr Proj Del"/>
        <initialData EmployeeId="186" ReportsTo="4" Name="John Garrison" Job="Mgr Site Services"/>
        <initialData EmployeeId="185" ReportsTo="4" Name="Rui Shu" Job="Mgr Proj Del" Phone="x29930"/>
        <initialData EmployeeId="184" ReportsTo="4" Name="Kirill Amirov" Job="Mgr Tech Plng IntIS T"/>
        <initialData EmployeeId="183" ReportsTo="4" Name="Joan Little" Job="Mgr Ther Gen" Phone="x18451"/>
        <initialData EmployeeId="183" ReportsTo="4" Name="Joan Little" Job="Mgr Ther Gen" Phone="x18451"/>
        <initialData EmployeeId="182" ReportsTo="4" Name="Tamara Kane" Job="Mgr Site Services"/>
    </TreeGrid>,
    document.getElementById(target)
);
