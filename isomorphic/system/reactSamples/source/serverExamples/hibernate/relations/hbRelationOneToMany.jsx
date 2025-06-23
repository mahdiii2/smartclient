/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DynamicForm, IButton, Label, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCountryListSelectionChanged = function (record, state) {
    if (state) {
        countryEditLayout.setDisabled(false);
        countryForm.editRecord(record);
        cityList.setData(record.cities);
    } else {
        countryEditLayout.setDisabled(true);
    }
};
let onNewCountryButtonClick = function() {countryEditLayout.setDisabled(false);cityList.setData([]);countryForm.editNewRecord();};
let onNewCityButtonClick = function() {return cityList.startEditingNew();};
let onSaveClick = function () {
    cityList.saveAllEdits();
    countryForm.setValue('cities', cityList.data);
    countryForm.saveData();
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Label contents="Country list" title="countryListLabel" baseStyle="exampleSeparator" ID="countryListLabel" width="90%" height="25" autoDraw="true"/>

        <ListGrid ID="countryList" dataSource="countryOneToManyHB" dataPageSize="50" autoFetchData="true" canRemoveRecords="true" width="700" height="150" top="40" selectionChanged={onCountryListSelectionChanged}/>

        <Button autoFit="true" title="Add New Country" ID="newCountryButton" top="200" click={onNewCountryButtonClick}/>

        <Label contents="Country edit" title="countryLabel" baseStyle="exampleSeparator" ID="countryLabel" width="90%" height="25" top="230" autoDraw="true"/>

        <VLayout membersMargin="5" ID="countryEditLayout" width="500" top="270" autoDraw="true">
            <members>
                <DynamicForm ID="countryForm" dataSource="countryOneToManyHB" autoDraw="false"/>
                <ListGrid ID="cityList" dataSource="cityOneToManyHB" saveByCell="true" canEdit="true" editEvent="click" saveLocally="true" canRemoveRecords="true" width="700" height="150" autoDraw="false"/>
                <Button state="Disabled" title="Add New City" ID="newCityButton" autoDraw="false" click={onNewCityButtonClick}/>
                <IButton title="Save" click={onSaveClick}/>
            </members>
        </VLayout>
    </>,
    document.getElementById(target)
);

countryEditLayout.setDisabled(true);
