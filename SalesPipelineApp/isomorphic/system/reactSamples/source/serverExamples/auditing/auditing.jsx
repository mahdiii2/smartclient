
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout, ListGrid, Label, DynamicForm, FormItem, RadioGroupItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onAuditedListRecordClick = function(viewer, record) {
    if (auditForm.getField("auditFor").getValue() != "Selected Record") {
        auditForm.getField("auditFor").setValue("Selected Record");
    }

    auditList.fetchData({itemID:record.itemID});
};

let onAuditedListRemoveRecordClick = function() {
    this.removeSelectedData(function() {
        if (auditForm.getField("auditFor").getValue() == "Selected Record") {
            auditForm.getField("auditFor").setValue("All Records");
            auditList.clearCriteria();
        } else {
            auditList.invalidateCache();
        }
    });
};

let onAuditedListEditComplete = function() {
    auditList.invalidateCache();
};

let onAuditForChanged = function(form, item, value) {
    if (value == "All Records") {
        auditList.clearCriteria();
    } else {
        var record = auditedList.getSelectedRecord();
        if (record != null) {
            auditList.fetchData({itemID:record.itemID});
        } else {
            auditList.fetchData({itemID:-1});
        }
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <VLayout ID="tstLayout" width="100%" height="100%">
            <members>
                <ListGrid ID="auditedList" dataSource="supplyItemAudited" canEdit="true" autoFetchData="true" canRemoveRecords="true" width="100%" height="250" recordClick={onAuditedListRecordClick} removeRecordClick={onAuditedListRemoveRecordClick} editComplete={onAuditedListEditComplete}/>
                <Label contents="Browse Audit Data" title="Label1" baseStyle="exampleSeparator" width="100%" height="25" autoDraw="true"/>
                <DynamicForm ID="auditForm" titleWidth="140">
                    <fields>
                        <RadioGroupItem vertical="false" type="radioGroup" name="auditFor" title="Show Audit Trail for" defaultValue="Selected Record" changed={onAuditForChanged}>
                            <valueMap>
                                    <value>Selected Record</value>
                                    <value>All Records</value>
                            </valueMap>
                        </RadioGroupItem>
                    </fields>
                </DynamicForm>
                <ListGrid ID="auditList" showFilterEditor="true" wrapHeaderTitles="true" sortField="audit_revision" sortDirection="descending" autoFetchData="false" width="100%" height="200" />
            </members>
        </VLayout>

    </>,
    document.getElementById(target)
);

isc.DataSource.load("audit_supplyItemAudited", function() {
    auditList.setDataSource("audit_supplyItemAudited");
});