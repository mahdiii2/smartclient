/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TGField, TreeGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSalaryFormatCellValue = function(value,record,rowNum,colNum,grid) {return isc.NumberUtil.format(value, '¤,0.00')};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TreeGrid ID="employeeTree" dataSource="employees" autoOpenTree="all" nodeIcon="[SAMPLE]icons/16/person.png" folderIcon="[SAMPLE]icons/16/person.png" closedIconSuffix="" showOpenIcons="false" showDropIcons="false" autoFetchData="true" width="500" height="400" showSelectedIcons="true">
        <fields>
            <TGField name="Name"/>
            <TGField name="Job"/>
            <TGField name="Salary" formatCellValue={onSalaryFormatCellValue}/>
        </fields>
        <dataProperties loadDataOnDemand="false"/>
    </TreeGrid>,
    document.getElementById(target)
);
