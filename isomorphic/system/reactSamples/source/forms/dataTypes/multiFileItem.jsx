/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DynamicForm, ListGrid, MultiFileItem, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onUploadLGRecordClick = function (viewer, record) {
    uploadForm.editSelectedData(uploadLG);
};
let onDeleteRowClick = function() {uploadLG.removeSelectedData(); uploadForm.editNewRecord()};
let onSaveFormClick = function() {return uploadForm.save()};
let onClearFormClick = function() {return uploadForm.editNewRecord()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="uploadLG" dataSource="uploadTest" width="500" height="200" left="20" top="20" recordClick={onUploadLGRecordClick}/>

        <Button title="Delete Row" left="20" top="240" click={onDeleteRowClick}/>

        <DynamicForm ID="uploadForm" dataSource="uploadTest" width="400" height="100" left="20" top="300">
            <items>
                <TextItem name="title"/>
                <MultiFileItem name="file" title="Files" height="50" dataSource="uploadedFiles"/>
            </items>
        </DynamicForm>

        <Button title="Save Form" left="20" top="400" click={onSaveFormClick}/>

        <Button title="Clear Form" left="200" top="400" click={onClearFormClick}/>
    </>,
    document.getElementById(target)
);

uploadLG.filterData({});
