/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DVField, DynamicForm, HLayout, IButton, SelectItem, TextItem, TileGrid, TileGridField, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onBoundListRecordClick = function(viewer,tile,record) {boundForm.editRecord(record); return true;};
let onLifeSpanFormatCellValue = function(value,record,field,viewer) {return 'Lifespan: ' + value;};
let onStatusGetCellStyle = function (value, field, record, viewer) {
    if (value == 'Endangered')
        return 'endangered';
    else if (value == 'Threatened')
        return 'threatened';
    else if (value == 'Not Endangered')
        return 'notEndangered';
    else
        return 'animalText';
};
let onSaveClick = function() {boundForm.saveData();boundForm.clearValues();};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="20" width="100%">
        <members>
            <TileGrid ID="boundList" dataSource="animals" selectionType="single" showAllRecords="true" tileWidth="150" tileHeight="225" height="400" autoDraw="false" recordClick={onBoundListRecordClick}>
                <fields>
                    <DVField name="picture" title="picture" cellStyle="animalImage"/>
                    <DVField name="commonName" title="commonName" cellStyle="commonName"/>
                    <DVField name="lifeSpan" title="lifeSpan" cellStyle="animalText" formatCellValue={onLifeSpanFormatCellValue}/>
                    <DVField name="status" title="status" getCellStyle={onStatusGetCellStyle}/>
                </fields>
                <detailViewerProperties rowHeight="22"/>
            </TileGrid>
            <DynamicForm ID="boundForm" dataSource="animals" numCols="6" autoFocus="false" autoDraw="false">
                <fields>
                    <TextItem name="commonName"/>
                    <TextItem name="lifeSpan"/>
                    <SelectItem name="status"/>
                </fields>
            </DynamicForm>
            <HLayout membersMargin="10" height="22" autoDraw="false">
                <members>
                    <IButton autoFit="true" title="Save" click={onSaveClick}/>
                </members>
            </HLayout>
        </members>
    </VStack>,
    document.getElementById(target)
);

boundList.fetchData({}, 'boundList.data.setSort([{property: \'lifeSpan\', direction: \'ascending\'}])');
