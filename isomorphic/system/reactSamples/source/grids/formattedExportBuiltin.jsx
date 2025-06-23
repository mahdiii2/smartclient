/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, CheckboxItem, Criterion, DynamicForm, LGField, ListGrid, SelectItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onExportButtonClick = function () {
    var exportAs = exportForm.getField('exportType').getValue();
    var showInWindow = exportForm.getField('showInWindow').getValue();
    if (exportAs == 'json') {
        isc.say('For security reasons, client-sourced requests for JSON exports are not ' + 'allowed.  Please use a different format.');
    } else {
        countryList.exportClientData({
            exportAs: exportAs,
            exportDisplay: showInWindow ? 'window' : 'download',
            lineBreakStyle: 'dos'
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
                            <valueMap csv="CSV" xml="XML" json="JSON" xls="XLS" ooxml="XLSX"/>
                        </SelectItem>
                        <CheckboxItem name="showInWindow" title="Show in Window" align="left"/>
                    </fields>
                </DynamicForm>
                <ListGrid ID="countryList" dataSource="CM_Payment" showFilterEditor="true" autoFetchData="true" width="850" height="250">
                    <initialCriteria operator="and">
                        <criteria>
                            <Criterion fieldName="amount" operator="greaterThan" value="45000"/>
                        </criteria>
                    </initialCriteria>
                    <fields>
                        <LGField name="customerName" title="Customer Name" width="200"/>
                        <LGField name="checkNumber" title="Check Number" width="150"/>
                        <LGField name="paymentDate" title="Order Date" width="250" format="ddd MMMM dd yyyy"/>
                        <LGField name="amount" title="Amount" format=",0.00"/>
                    </fields>
                </ListGrid>
            </members>
        </VLayout>

        <Button title="Export" ID="exportButton" left="320" click={onExportButtonClick}/>
    </>,
    document.getElementById(target)
);
