/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DateItem, DetailViewer, Label, ListGrid, SearchForm, Toolbar, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onBoundListSelectionChanged = function (record, state) {
    if (this.selection.anySelected()) {
        deleteBtn.enable();
        saveBtn.setDisabled(this.selection.multipleSelected());
        boundForm.editRecord(record);
        boundViewer.viewSelectedData(this);
    } else {
        deleteBtn.disable();
        saveBtn.disable();
    }
};
let onSaveBtnClick = function() {return boundForm.saveData()};
let onClearClick = function() {boundForm.clearValues();boundForm.editNewRecord();saveBtn.enable()};
let onFilterClick = function() {return boundList.filterData(boundForm.getValuesAsCriteria());};
let onFetchClick = function() {return boundList.fetchData(boundForm.getValuesAsCriteria());};
let onDeleteBtnClick = function() {boundList.removeSelectedData();boundList.deselectAllRecords()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="20" width="100%">
        <members>
            <Label contents={'<ul>' + '<li>click a record in the grid to view and edit that record in the form</li>' + '<li>click <b>Save</b> to save changes to an edited record in the form</li>' + '<li>click <b>Clear</b> to clear all fields in the form</li>' + '<li>click <b>Filter</b> to filter (substring match) the grid based on the value of the \'Item\' form value only.</li>' + '<li>click <b>Fetch</b> to fetch records (exact match) for the grid based on the value of the \'Item\' form value only.</li>' + '<li>click <b>Delete</b> to delete all selected records</li>' + '</ul>'} title="helpText" ID="helpText"/>
            <ListGrid ID="boundList" dataSource="supplyItemDMI" height="200" selectionChanged={onBoundListSelectionChanged}/>
            <SearchForm ID="boundForm" dataSource="supplyItemDMI" numCols="6" autoFocus="false" useAllDataSourceFields="true">
                <fields>
                    <DateItem name="nextShipment" wrapTitle="false"/>
                </fields>
            </SearchForm>
            <Toolbar buttonConstructor="IButton" ID="boundFormToolbar" height="22" membersMargin="10">
                <buttons>
                    <Button title="Save" ID="saveBtn" click={onSaveBtnClick}/>
                    <Button title="Clear" click={onClearClick}/>
                    <Button title="Filter" click={onFilterClick}/>
                    <Button title="Fetch" click={onFetchClick}/>
                    <Button title="Delete" ID="deleteBtn" disabled="true" click={onDeleteBtnClick}/>
                </buttons>
            </Toolbar>
            <DetailViewer ID="boundViewer" dataSource="supplyItemDMI"/>
        </members>
    </VStack>,
    document.getElementById(target)
);

boundList.filterData();
