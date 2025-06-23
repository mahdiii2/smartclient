/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, IButton, ListGrid, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDataSourceChange = function (form, item, value, oldValue) {
    if (!this.valueMap.contains(value))
        return false;
    else {
        list.setDataSource(value);
        list.filterData();
    }
};
let onAddButtonClick = function() {return list.startEditingNew();};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm>
            <values dataSource="Select A DataSource"/>
            <items>
                <SelectItem name="dataSource" showTitle="false" width="210" change={onDataSourceChange}>
                    <valueMap>
                            <value>reusableORMDataSource_supplyItem</value>
                            <value>reusableORMDataSource_country</value>
                    </valueMap>
                </SelectItem>
            </items>
        </DynamicForm>

        <ListGrid ID="list" dataSource="reusableORMDataSource_supplyItem" dataPageSize="25" showFilterEditor="true" canEdit="true" autoFetchData="true" canRemoveRecords="true" width="800" height="224" top="40" autoFitDateFields="both"/>

        <IButton title="Create new record" ID="addButton" width="150" top="280" click={onAddButtonClick}/>
    </>,
    document.getElementById(target)
);
