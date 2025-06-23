import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ListGrid, Button } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let pasteText = function (text) {
    var fieldNames = [];

    var selection = countryList.selection.getSelectedCells();
    if (selection.length == 0) {
        countryList.selection.selectCell(0, 0);
        selection = countryList.selection.getSelectedCells();
    }
    var firstCol = selection[0][1];
    var fields = countryList.fields;
    for (var col = firstCol; col < fields.length; col++) {
        fieldNames.add(countryList.getFieldName(col));
    }
    var settings = {
        fieldList: fieldNames,
        fieldSeparator: "\t",
        escapingMode: "double"
    };
    var dataSource = countryList.getDataSource();
    var records = dataSource.recordsFromText(text, settings);
    countryList.applyRecordData(records);
}

let createPasteDialog = function () {
    var width = 525;
    var height = 300;

    var guidance = "Press Ctrl-V (\u2318V on Mac) or right click (Control-click on Mac) to paste values, then click \"Apply\".";

    var resultsForm = isc.DynamicForm.create({
        numCols: 1,
        width: width,
        height: height,
        autoFocus: true,
        fields: [{ type: "text", name: "guidance", showTitle: false, editorType: "StaticTextItem", value: guidance },
                 { type: "text", name: "textArea", canEdit: true, showTitle: false, height: "*", width: "*", editorType: "TextAreaItem" },
                 { type : "text", name : "apply", align: "center", editorType: "ButtonItem", title: "Apply",
                   click: function (form) { form.pasteAndClose(); }
                 }],

        pasteAndClose : function () {
            pasteText(this.textArea.getValue());
            this.dialog.hide();
            this.dialog.markForDestroy();
            this.dialog.removeItem(this);
        }
    });

    resultsForm.textArea = resultsForm.getField("textArea");

    resultsForm.dialog = isc.Dialog.create({ 
        autoSize: true,
        showToolbar: false,
        canDragReposition: true,
        title: "Paste Cells",
        items: [ resultsForm ],
        isModal: true,
        showModalMask: true
    });
}


// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" width="100%" height="288" canEdit="true" autoFetchData="true" canDragSelect="true"
                    canSelectCells="true" dataSource="countryDS" 
                    dataArrived="countryList.selection.selectCell(0, 0);"/>
    
        <Button top="300" left="10" title="Paste Cells" click={ function () { createPasteDialog(); } }/>

    </>, 
    document.getElementById(target)
);
