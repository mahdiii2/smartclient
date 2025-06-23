/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, CheckboxItem, DynamicForm, LGField, ListGrid, SelectItem, VLayout } from 'smartclient-eval/react';

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
            exportAs: exportAs,
            exportDisplay: showInWindow ? 'window' : 'download'
        });
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <VLayout>
            <members>
                <DynamicForm ID="exportForm" width="300">
                    <fields>
                        <SelectItem defaultToFirstOption="true" name="exportType" title="Export Type" width="*">
                            <valueMap csv="CSV" xml="XML" json="JSON" xls="XLS (Excel97)" ooxml="OOXML (Excel2007)"/>
                        </SelectItem>
                        <CheckboxItem name="showInWindow" title="Show in Window" align="left"/>
                    </fields>
                </DynamicForm>
                <ListGrid ID="countryList" dataSource="worldDSExport" showFilterEditor="true" autoFetchData="true" width="500" height="250">
                    <fields>
                        <LGField name="countryName" title="Country"/>
                        <LGField name="capital" title="Capital"/>
                        <LGField name="continent" title="Continent"/>
                        <LGField name="independence" title="Nationhood" width="100"/>
                        <LGField name="population" title="Population"/>
                    </fields>
                </ListGrid>
            </members>
        </VLayout>

        <Button title="Export" ID="exportButton" left="320" top="2" click={onExportButtonClick}/>
    </>,
    document.getElementById(target)
);
