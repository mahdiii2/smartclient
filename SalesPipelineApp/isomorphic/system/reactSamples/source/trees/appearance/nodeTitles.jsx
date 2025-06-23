/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TGField, TreeGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onNameFormatCellValue = function(value,record,rowNum,colNum,grid) {return record.Job+':&nbsp;'+value};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TreeGrid ID="employeeTree" dataSource="employees" nodeIcon="[SAMPLE]icons/16/person.png" folderIcon="[SAMPLE]icons/16/person.png" closedIconSuffix="" showOpenIcons="false" showDropIcons="false" width="500" height="425" showSelectedIcons="true">
        <fields>
            <TGField name="Name" formatCellValue={onNameFormatCellValue}/>
        </fields>
    </TreeGrid>,
    document.getElementById(target)
);

employeeTree.fetchData(null, function (request, data, response) {
    employeeTree.data.openFolders(data);
});
