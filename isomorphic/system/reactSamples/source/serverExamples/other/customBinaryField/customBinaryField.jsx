/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DynamicForm, FileItem, HLayout, IButton, LGField, Label, ListGrid, TextItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onListGridRecordClick = function (viewer, record, recordNum, field, fieldNum, value, rawValue) {
    formEdit.editSelectedData(listGrid);
    formView.editSelectedData(listGrid);
};
let onUploadButtonClick = function () {
    formEdit.saveData('if(dsResponse.status>=0) formEdit.editNewRecord()');
};
let onButtonDownloadClick = function () {
    var selectedRecord = listGrid.getSelectedRecord();
    if (selectedRecord == null) {
        isc.say('You must select one record');
        return;
    }
    customBinaryField.downloadFile(selectedRecord);
};
let onButtonViewClick = function () {
    var selectedRecord = listGrid.getSelectedRecord();
    if (selectedRecord == null) {
        isc.say('You must select one record');
        return;
    }
    customBinaryField.viewFile(selectedRecord);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout ID="vLayout" width="300">
        <members>
            <HLayout layoutMargin="10" membersMargin="10" ID="hLayoutTop" width="700">
                <members>
                    <ListGrid ID="listGrid" dataSource="customBinaryField" selectionType="single" autoFetchData="true" width="500" height="224" recordClick={onListGridRecordClick}>
                        <fields>
                            <LGField name="id" width="100"/>
                            <LGField name="file" width="380"/>
                        </fields>
                    </ListGrid>
                    <VLayout ID="vLayoutForms" width="100">
                        <members>
                            <Label contents="Editor" baseStyle="exampleSeparator" width="50" height="25" autoDraw="true"/>
                            <DynamicForm ID="formEdit" dataSource="customBinaryField" width="100">
                                <fields>
                                    <TextItem name="id" width="150" required="true"/>
                                    <FileItem name="file" required="true"/>
                                </fields>
                            </DynamicForm>
                            <IButton title="Upload" ID="uploadButton" width="100" click={onUploadButtonClick}/>
                            <Label contents="View" baseStyle="exampleSeparator" width="50" height="25" autoDraw="true"/>
                            <DynamicForm ID="formView" dataSource="customBinaryField" width="100%">
                                <fields>
                                    <TextItem name="id" canEdit="false" width="150"/>
                                    <FileItem name="file" canEdit="false"/>
                                </fields>
                            </DynamicForm>
                        </members>
                    </VLayout>
                </members>
            </HLayout>
            <HLayout layoutMargin="10" membersMargin="10" ID="hLayoutButtons" width="500">
                <members>
                    <Button title="Download Selected File" ID="buttonDownload" width="200" click={onButtonDownloadClick}/>
                    <Button title="View Selected File" ID="buttonView" width="200" click={onButtonViewClick}/>
                </members>
            </HLayout>
        </members>
    </VLayout>,
    document.getElementById(target)
);
