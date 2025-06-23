
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, VLayout, DynamicForm, FormItem, SelectItem, CheckboxItem, ListGrid, LGField, Button } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onExportButtonClick = function () {
    var exportAs = exportForm.getField("exportType").getValue();
    var showInWindow = exportForm.getField("showInWindow").getValue();
    if (exportAs == "json") {
        // JSON exports are server-side only, so use the OperationBinding on the DataSource
        countryList.exportData({ operationId: "customJSONExport", 
                                exportDisplay: showInWindow ? "window" : "download"});
    } else {
        // exportAs is not JSON, so we can set that with requestProperties
        countryList.exportData({ exportAs: exportAs,
               exportDisplay: showInWindow ? "window" : "download"
        });
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <Canvas>
            <childComponents>
                <VLayout>
                    <members>
                        <DynamicForm ID="exportForm" width="300">
                            <fields>
                                <SelectItem defaultToFirstOption="true" type="select" name="exportType" title="Export Type" width="*">
                                    <valueMap csv="CSV" xml="XML" json="JSON" xls="XLS (Excel97)" ooxml="OOXML (Excel2007)"/>
                                </SelectItem>
                                <CheckboxItem type="boolean" name="showInWindow" title="Show in Window" align="left"/>
                            </fields>
                        </DynamicForm>
                        <ListGrid ID="countryList" dataSource="worldDSExportWithFormats" showFilterEditor="true" alternateRecordStyles="true" autoFetchData="true" width="700" height="250">
                            <fields>
                                <LGField name="countryName" title="Country" width="20%"/>
                                <LGField name="capital" title="Capital" width="20%"/>
                                <LGField name="continent" title="Continent" width="20%"/>
                                <LGField name="independence" title="Nationhood" width="20%"/>
                                <LGField name="area" width="20%"/>
                            </fields>
                        </ListGrid>
                    </members>
                </VLayout>
                <Button title="Export" ID="exportButton" left="320" top="2" click={onExportButtonClick}/>
            </childComponents>
        </Canvas>

    </>,
    document.getElementById(target)
);