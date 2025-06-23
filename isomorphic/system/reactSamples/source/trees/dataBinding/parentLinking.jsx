/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TGField, Tree, TreeGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TreeGrid ID="employeeTree" nodeIcon="[SAMPLE]icons/16/person.png" folderIcon="[SAMPLE]icons/16/person.png" closedIconSuffix="" showOpenIcons="false" showDropIcons="false" width="500" height="400" showSelectedIcons="true">
        <fields>
            <TGField name="Name"/>
        </fields>
        <data modelType="parent" nameProperty="Name" idField="EmployeeId" parentIdField="ReportsTo">
            <data EmployeeId="4" ReportsTo="1" Name="Charles Madigen"/>
            <data EmployeeId="188" ReportsTo="4" Name="Rogine Leger"/>
            <data EmployeeId="189" ReportsTo="4" Name="Gene Porter"/>
            <data EmployeeId="265" ReportsTo="189" Name="Olivier Doucet"/>
            <data EmployeeId="264" ReportsTo="189" Name="Cheryl Pearson"/>
        </data>
    </TreeGrid>,
    document.getElementById(target)
);

employeeTree.getData().openAll();
