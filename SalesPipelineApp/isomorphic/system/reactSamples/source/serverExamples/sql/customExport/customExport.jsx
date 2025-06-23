/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, CheckboxItem, DynamicForm, LGField, ListGrid, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onExportButtonClick = function () {
    var exportAs = exportForm.getField('exportType').getValue();
    var showInWindow = exportForm.getField('showInWindow').getValue();
    if (exportAs == 'json') {
        countryList.exportData({
            operationId: 'customJSONExport',
            exportDisplay: showInWindow ? 'window' : 'download'
        });
    } else {
        countryList.exportData({
            operationId: 'customExport',
            exportAs: exportAs,
            exportDisplay: showInWindow ? 'window' : 'download'
        });
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" dataSource="worldDSExportCustom" showFilterEditor="true" autoFetchData="true" width="600" height="250" top="70">
            <fields>
                <LGField name="countryName" title="Country"/>
                <LGField name="capital" title="Capital"/>
                <LGField name="continent" title="Continent"/>
                <LGField name="independence" title="Nationhood" width="100"/>
                <LGField name="population" title="Population" format=",0"/>
            </fields>
        </ListGrid>

        <DynamicForm ID="exportForm" width="300">
            <fields>
                <SelectItem defaultToFirstOption="true" name="exportType" title="Export Type" width="*">
                    <valueMap csv="CSV (Excel)" xml="XML" json="JSON" xls="XLS (Excel97)" ooxml="OOXML (Excel2007)"/>
                </SelectItem>
                <CheckboxItem name="showInWindow" title="Show in Window" align="left"/>
            </fields>
        </DynamicForm>

        <Button title="Export" ID="exportButton" left="320" click={onExportButtonClick}/>
    </>,
    document.getElementById(target)
);
