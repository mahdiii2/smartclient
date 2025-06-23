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
        <data modelType="children" nameProperty="Name" childrenProperty="directReports">
            <root EmployeeId="1">
                <directReports>
                	<EmployeeId>4</EmployeeId>
                	<Name>Charles Madigen</Name>
                	<directReports>
                		<elem>
                			<EmployeeId>188</EmployeeId>
                			<Name>Rogine Leger</Name>
                		</elem>
                		<elem>
                			<EmployeeId>189</EmployeeId>
                			<Name>Gene Porter</Name>
                			<directReports>
                				<elem>
                					<EmployeeId>265</EmployeeId>
                					<Name>Olivier Doucet</Name>
                				</elem>
                				<elem>
                					<EmployeeId>264</EmployeeId>
                					<Name>Cheryl Pearson</Name>
                				</elem>
                			</directReports>
                		</elem>
                	</directReports>
                </directReports>
            </root>
        </data>
    </TreeGrid>,
    document.getElementById(target)
);

employeeTree.getData().openAll();
