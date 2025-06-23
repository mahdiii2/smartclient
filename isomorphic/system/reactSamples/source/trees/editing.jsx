import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TreeGrid, LGField, SearchForm, PickTreeItem, ListGrid, VStack, LayoutSpacer } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <TreeGrid ID="employeeTree" width="500" height="250" dataSource="employees" autoFetchData="true" canEdit="true"
                    canReorderRecords="true" canAcceptDroppedRecords="true" nodeIcon="[SAMPLE]icons/16/person.png"
                    folderIcon="[SAMPLE]icons/16/person.png" showOpenIcons="false" showDropIcons="false"
                    showSelectedIcons="true" closedIconSuffix="">
            <fields>
                <LGField name="Name"/>
                <LGField name="Job"/>
                <LGField name="Salary" formatCellValue="isc.NumberUtil.format(value, '\u00A4,0.00')"/>
            </fields>
        </TreeGrid>
    
        <SearchForm ID="employeeSearchForm" width="200" height="30">
            <fields>
                <PickTreeItem name="employee" showTitle="false" dataSource="employees"
                        displayField="Name" valueField="EmployeeId" change="employeeGrid.fetchData({ReportsTo: value})"
                        canSelectParentItems="true"/>
            </fields>        
        </SearchForm>
    
        <ListGrid ID="employeeGrid" width="500" height="250" dataSource="employees" canEdit="true">
            <fields>
                <LGField name="Name"/>
                <LGField name="Job"/>
                <LGField name="Salary" formatCellValue="isc.NumberUtil.format(value, '\u00A4,0.00')"/>
            </fields>
        </ListGrid>
    
        <VStack membersMargin="5">
            <members>
                <value>employeeTree</value>
                <LayoutSpacer height="10"/>
                <value>employeeSearchForm</value>
                <value>employeeGrid</value>
            </members>
        </VStack>
    </>, 
    document.getElementById(target)
);
