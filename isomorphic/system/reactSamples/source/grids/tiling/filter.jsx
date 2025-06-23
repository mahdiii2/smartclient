/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, DVField, DynamicForm, HLayout, IButton, SelectItem, SliderItem, TextItem, TileGrid, TileGridField, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

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
let onBoundFormItemChanged = function(item,newValue) {return boundList.fetchData(this.getValuesAsCriteria());};
let onSortFormItemChanged = function (item, newValue, oldValue) {
    var sortVal = this.getValue('sortBy');
    var sortDir = this.getValue('chkSortDir');
    if (sortVal)
        boundList.data.sortByProperty(sortVal, sortDir);
};
let onFilterClick = function() {return boundList.fetchData(boundForm.getValuesAsCriteria());};
let onClearClick = function() {boundList.fetchData();boundForm.clearValues();sortForm.clearValues();};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="20" width="100%">
        <members>
            <TileGrid ID="boundList" dataSource="animals" showAllRecords="true" animateTileChange="true" canReorderTiles="true" tileWidth="158" tileHeight="225" height="400" autoFetchData="true" autoDraw="false">
                <fields>
                    <DVField name="picture" title="picture" cellStyle="animalImage"/>
                    <DVField name="commonName" title="commonName" cellStyle="commonName"/>
                    <DVField name="lifeSpan" title="lifeSpan" cellStyle="animalText" formatCellValue={onLifeSpanFormatCellValue}/>
                    <DVField name="status" title="status" getCellStyle={onStatusGetCellStyle}/>
                </fields>
                <detailViewerProperties rowHeight="22"/>
            </TileGrid>
            <DynamicForm ID="boundForm" dataSource="animals" numCols="6" autoFocus="false" groupTitle="Search" isGroup="true" autoDraw="false" itemChanged={onBoundFormItemChanged}>
                <fields>
                    <TextItem name="commonName"/>
                    <SliderItem minValue="1" maxValue="60" defaultValue="60" name="lifeSpan" title="Max Life Span" wrapTitle="false" operator="lessThan"/>
                    <SelectItem allowEmptyValue="true" name="status" operator="equals" emptyDisplayValue="(Any)"/>
                </fields>
            </DynamicForm>
            <DynamicForm ID="sortForm" numCols="6" autoFocus="false" groupTitle="Sort" isGroup="true" autoDraw="false" itemChanged={onSortFormItemChanged}>
                <fields>
                    <SelectItem name="sortBy" title="Sort by">
                        <valueMap commonName="Animal" lifeSpan="Life Span" status="Endangered Status"/>
                    </SelectItem>
                    <CheckboxItem name="chkSortDir" title="Ascending"/>
                </fields>
            </DynamicForm>
            <HLayout membersMargin="10" height="22" autoDraw="false">
                <members>
                    <IButton autoFit="true" title="Filter" click={onFilterClick}/>
                    <IButton autoFit="true" title="Clear" click={onClearClick}/>
                </members>
            </HLayout>
        </members>
    </VStack>,
    document.getElementById(target)
);
