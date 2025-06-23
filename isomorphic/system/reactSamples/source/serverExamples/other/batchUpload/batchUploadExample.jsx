/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, BatchUploader, DynamicForm, Label, SelectItem, TextItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onPartialCommitsChanged = function (form, item, value) {
    uploader.partialCommit = value;
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack layoutMargin="10" membersMargin="10" width="100%">
        <members>
            <Label contents={'<ul>' + '<li>Download the example <code>supplyItemTest.csv</code> file <a href=' + isc.Page.getURL('[ISOMORPHIC]/system/reference') + '/inlineExamples/serverExamples/other/batchUpload/supplyItemTest.csv>here</a>' + '<li>Click the \'Browse\' button and use the file picker to select the ' + '<code>supplyItemTest.csv</code> file that you just downloaded (HINT: In some ' + 'browsers you can drag the file directly from the browser\'s download area onto the button)</li>' + '<li>The BatchUploader will upload and validate the contents of that CSV file against the ' + 'DataSource declared on the BatchUploader, which in this case is \'supplyItemCustom\'.</li>' + '<li>Import data can optionally be transformed during import.  In this example, the \'Units\' ' + 'field is really an integer - a foreignKey value to the supplyItemUnits DataSource - but it ' + 'declares a displayField.  SmartClient automatically recognizes this pattern, and transforms ' + 'user-visible values in the import dataset - \'Ea\', \'Roll\', etc - into the proper foreignKey ' + 'value needed for successful import</li>' + '<li>Validated data will then be streamed back down to the client and displayed in an ' + 'editable ListGrid, so you can review and correct errors.</li>' + '<li>Click \'Commit\' to save the data back to the DataSource\'s persistent store (in this ' + 'case, a database table accessed via SmartClient\'s built-in SQL engine).</li>' + '<li>Use the select box to switch the BatchUploader\'s "partial commit" mode.  ' + '"Allow" commits valid records and discards records in error, "Prevent" forbids ' + 'commit if there are any outstanding errors, and "Prompt" asks the user to choose between ' + 'those two.  "Retain" commits the valid records and retains the records in error, so you ' + 'can continue to fix errors: it allows an iterative approach</li>' + '<li>This end-to-end functionality is encapsulated by the BatchUploader, and requires ' + 'no application code.</li></ul>' + '<i>Note: The additional <b>String</b> and <b>Numeric</b> fields are not required for ' + 'the upload. These fields simply demonstrate how the upload form may be customized, ' + 'allowing the user to enter additional information. The values entered in these fields ' + 'will be sent to the server along with the upload request, and could be accessed by ' + 'custom server logic if desired.'} title="helpText" ID="helpText"/>
            <DynamicForm ID="partialCommitsForm">
                <items>
                    <SelectItem name="partialCommits" title="Partial Commit Mode" defaultValue="prompt" wrapTitle="false" changed={onPartialCommitsChanged}>
                        <valueMap allow="Allow" prevent="Prevent" prompt="Prompt" retain="Retain"/>
                    </SelectItem>
                </items>
            </DynamicForm>
            <BatchUploader ID="uploader" width="100%" height="400" uploadDataSource="withID:supplyItemCustom">
                <gridProperties height="200"/>
                <uploadFormFields>
                    <TextItem name="stringValue" title="String Value" wrapTitle="false"/>
                    <TextItem name="numericValue" title="Numeric Value" wrapTitle="false"/>
                </uploadFormFields>
                <uploadFormProperties titleWidth="110"/>
            </BatchUploader>
        </members>
    </VStack>,
    document.getElementById(target)
);
