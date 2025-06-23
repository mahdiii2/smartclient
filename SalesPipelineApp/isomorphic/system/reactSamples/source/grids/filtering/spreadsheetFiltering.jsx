/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, HLayout, Label, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFetchUnloadedRecordsClick = function () {
    var data = supplyList.data;
    if (!data.rangeIsLoaded(0, data.getLength())) {
        data.getRange(0, data.getLength());
    }
};
let onRecreateGridClick = function () {
    createGrid();
};
let onServerCountIncrementAndUpdate = function (dataSource, totalRows, startRow, endRow) {
    this.count++;
    this.setContents('<b>Number of server trips: ' + this.count + '<br><br>DataSource: "' + dataSource + '"' + '<br/>Total rows in this filter set: ' + totalRows + '<br/>Last range of records returned: ' + startRow + ' to ' + endRow + '</b>');
};

function createGrid() {
    mainLayout.addMember(isc.ListGrid.create({
        ID: 'supplyList',
        width: 500,
        height: 300,
        dataSource: supplyItem,
        fields: [
            { name: 'SKU' },
            {
                name: 'itemName',
                filterEditorType: 'SetFilterItem'
            },
            {
                name: 'category',
                filterEditorType: 'SetFilterItem',
                optionDataSource: 'supplyCategory',
                valueField: 'categoryName',
                filterEditorProperties: {
                    deriveUniqueValues: false,
                    expandedPickListFields: [
                        { name: 'categoryName' },
                        { name: 'parentID' }
                    ]
                }
            },
            {
                name: 'units',
                filterEditorType: 'SetFilterItem'
            }
        ],
        autoFetchData: true,
        showFilterEditor: true,
        filterOnKeypress: true,
        fetchDelay: 500
    }), 0);
}
var dataSourceCommMonitorOverrides = {
    transformResponse: function (dsResponse) {
        if (this.dataFormat == 'iscServer')
            this.updateRowCountLabel(dsResponse);
    },
    getClientOnlyResponse: function (dsRequest) {
        var dsResponse = this.Super('getClientOnlyResponse', arguments);
        this.updateRowCountLabel(dsResponse);
        return dsResponse;
    },
    updateRowCountLabel: function (dsResponse) {
        serverCount.incrementAndUpdate(this.ID, dsResponse.totalRows, dsResponse.startRow, dsResponse.endRow);
        if (restoreBGColorTimerID == null)
            origBGColor = serverCount.backgroundColor;
        else
            isc.Timer.clear(restoreBGColorTimerID);
        serverCount.setBackgroundColor('#ffff77');
        restoreBGColorTimerID = isc.Timer.setTimeout(function () {
            restoreBGColorTimerID = null;
            serverCount.setBackgroundColor(origBGColor);
        }, 500);
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HLayout membersMargin="20" ID="mainLayout">
            <members>
                <VLayout membersMargin="20">
                    <members>
                        <Button title="Fetch Unloaded Records" width="200" click={onFetchUnloadedRecordsClick}/>
                        <Button title="Recreate Grid" width="200" click={onRecreateGridClick}/>
                    </members>
                </VLayout>
            </members>
        </HLayout>

        <Label contents="&lt;b&gt;Number of server trips: 0&lt;/b&gt;" padding="10" title="serverCount" ID="serverCount" width="500" height="40" top="320" border="1px solid grey" count="0" incrementAndUpdate={onServerCountIncrementAndUpdate}/>
    </>,
    document.getElementById(target)
);

createGrid();
var origBGColor, restoreBGColorTimerID;
supplyItem.addProperties(dataSourceCommMonitorOverrides);
supplyCategory.addProperties(dataSourceCommMonitorOverrides);
