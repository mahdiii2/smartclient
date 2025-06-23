/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, Label, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onHighlightButtonClick = function () {
    countryList.destroy();
    recreateListGrid(true);
};
let onOutputFieldsUpdateContent = function (outputs, totalRows, startRow, endRow) {
    this.count++;
    this.setContents('Number of server trips: ' + this.count + '<br/>Total rows in this filter set: ' + totalRows + '<br/>Last range of records returned: ' + startRow + ' to ' + endRow + '<br/>Fields included in returned records: <b>' + outputs + '</b>');
};

var ds = isc.DataSource.get('countryDS');
var hiliteArray = [{
        fieldName: ['countryName'],
        cssText: 'background-color:#FFA07A;',
        criteria: {
            _constructor: 'AdvancedCriteria',
            operator: 'and',
            criteria: [{
                    fieldName: 'member_g8',
                    operator: 'equals',
                    value: true
                }]
        }
    }];
function recreateListGrid(includeHilites) {
    layout.addMember(isc.ListGrid.create({
        ID: 'countryList',
        width: '100%',
        height: 300,
        showFilterEditor: true,
        canEditHilites: true,
        canEdit: true,
        dataSource: ds,
        autoFetchData: true,
        fetchFields: ['continent'],
        fields: [
            {
                name: 'countryCode',
                title: 'Flag',
                width: 40,
                type: 'image',
                imageURLPrefix: 'flags/24/',
                imageURLSuffix: '.png',
                canEdit: false
            },
            { name: 'countryName' },
            { name: 'capital' },
            {
                name: 'population',
                title: 'Population',
                hidden: true
            }
        ],
        canEditCell: function (rowNum, colNum) {
            var record = this.getRecord(rowNum), fieldName = this.getFieldName(colNum);
            if (fieldName == 'capital' && record.continent == 'Europe') {
                return false;
            }
            return this.Super('canEditCell', arguments);
        },
        hilites: includeHilites ? hiliteArray : null
    }), 1);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="5" ID="layout" width="700" height="250">
        <members>
            <IButton autoFit="true" title="Highlight G8 Countries" ID="highlightButton" click={onHighlightButtonClick}/>
            <Label contents="&lt;b&gt;List of requested fields: NA&lt;/b&gt;" padding="10" title="outputFields" ID="outputFields" width="700" height="40" top="290" border="1px solid grey" count="0" updateContent={onOutputFieldsUpdateContent}/>
        </members>
    </VLayout>,
    document.getElementById(target)
);

recreateListGrid(false);
var origBGColor, restoreBGColorTimerID;
ds.addProperties({
    transformResponse: function (dsResponse, dsRequest) {
        if (this.dataFormat == 'iscServer')
            this.updateRowCountLabel(dsResponse, dsRequest);
    },
    getClientOnlyResponse: function (dsRequest) {
        var dsResponse = this.Super('getClientOnlyResponse', arguments);
        this.updateRowCountLabel(dsResponse, dsRequest);
        return dsResponse;
    },
    updateRowCountLabel: function (dsResponse, dsRequest) {
        outputFields.updateContent(dsRequest.outputs, dsResponse.totalRows, dsResponse.startRow, dsResponse.endRow);
        if (restoreBGColorTimerID == null)
            origBGColor = outputFields.backgroundColor;
        else
            isc.Timer.clear(restoreBGColorTimerID);
        outputFields.setBackgroundColor('#ffff77');
        restoreBGColorTimerID = isc.Timer.setTimeout(function () {
            restoreBGColorTimerID = null;
            outputFields.setBackgroundColor(origBGColor);
        }, 500);
    }
});
