import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TreeGrid, DynamicForm, LGField, ButtonItem, BooleanItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let changed = function (form,item,value) {
    employeeTree.getData().setProperty("keepParentsOnFilter", value);
    // Reset filter
    var criteria = employeeTree.getCriteria();
    if (criteria != null && !isc.isAn.emptyObject(criteria)) {
        employeeTree.setCriteria(null);
        employeeTree.setCriteria(criteria);
    }
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <TreeGrid ID="employeeTree" width="525" height="400" dataSource="employees" nodeIcon="[SAMPLE]icons/16/person.png"
                    folderIcon="[SAMPLE]icons/16/person.png" showOpenIcons="false" showDropIcons="false" closedIconSuffix=""
                    autoFetchData="true" dataFetchMode="local" loadDataOnDemand="false" showSelectedIcons="true" autoOpenTree="all">
            <fields>
                <LGField name="Name" width="40%"/>
                <LGField name="Job"/>
                <LGField name="EmployeeType"/>
                <LGField name="Salary" formatCellValue="isc.NumberUtil.format(value, '\u00A4,0.00')"/>
            </fields>
        </TreeGrid>
    
        <DynamicForm ID="buttonBar" top="420" width="500" numCols="4">
            <fields>
                <ButtonItem name="all" title="Show all" startRow="false" endRow="false"
                        click="employeeTree.setCriteria(null);" />
                <ButtonItem name="fullTime" title="Show full time" startRow="false" endRow="false"
                        click="employeeTree.setCriteria({EmployeeType:'full time'});" />
                <ButtonItem name="partTime" title="Show contract" startRow="false" endRow="false"
                        click="employeeTree.setCriteria({EmployeeType:'contract'});" />
                <BooleanItem name="keepParents" title="Keep parents" showTitle="false" startRow="false" endRow="false"
                        changed={changed}/>
            </fields>
        </DynamicForm>
    </>, 
    document.getElementById(target)
);
