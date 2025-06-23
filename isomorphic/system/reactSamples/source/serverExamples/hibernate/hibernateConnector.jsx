/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onWorldListRowEditorExit = function (event, record, newValues, rowNum) {
    return this.validateRow(rowNum);
};
let onNewButtonClick = function() {return worldList.startEditingNew();};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="worldList" dataSource="worldHB" showFilterEditor="true" canEdit="true" editEvent="click" autoFetchData="true" canRemoveRecords="true" width="1000" height="224" rowEditorExit={onWorldListRowEditorExit}/>

        <Button title="Add New" ID="newButton" top="230" click={onNewButtonClick}/>
    </>,
    document.getElementById(target)
);
