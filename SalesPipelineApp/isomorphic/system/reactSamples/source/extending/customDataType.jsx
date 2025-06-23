/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, IButton, LGField, ListGrid, SimpleType, VLayout, Validator } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSimpleTypeNormalDisplayFormatter = function (value) {
    return isc.isA.Number(value) ? value.toCurrencyString() : value;
};
let onSimpleTypeShortDisplayFormatter = function (value) {
    return isc.isA.Number(value) ? value.toCurrencyString() : value;
};
let onSimpleTypeEditFormatter = function (value) {
    return isc.isA.Number(value) ? value.toFixed(2) : value;
};
let onSimpleTypeParseInput = function (value) {
    var fVal = parseFloat(value);
    if (!isNaN(fVal))
        return fVal;
    return value;
};
let onItemGridRecordClick = function(viewer,record,recordNum,field,fieldNum,value,rawValue,editedRecord) {return itemForm.editRecord(record)};
let onSaveBtnClick = function() {return itemForm.saveData();};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <SimpleType inheritsFrom="float" name="currencyFloat" normalDisplayFormatter={onSimpleTypeNormalDisplayFormatter} shortDisplayFormatter={onSimpleTypeShortDisplayFormatter} editFormatter={onSimpleTypeEditFormatter} parseInput={onSimpleTypeParseInput}>
            <validators>
                <Validator type="floatRange" errorMessage="Please enter a valid (positive) dollar value." min="0"/>
                <Validator type="floatPrecision" precision="2" roundToPrecision="true"/>
            </validators>
        </SimpleType>

        <VLayout membersMargin="3" width="100%">
            <members>
                <ListGrid ID="itemGrid" dataSource="supplyItemCurrency" canEdit="true" autoFetchData="true" height="200" useAllDataSourceFields="true" recordClick={onItemGridRecordClick}>
                    <fields>
                        <LGField name="nextShipment" width="120"/>
                    </fields>
                </ListGrid>
                <DynamicForm ID="itemForm" dataSource="supplyItemCurrency" numCols="4"/>
                <IButton layoutAlign="center" title="Save" ID="saveBtn" click={onSaveBtnClick}/>
            </members>
        </VLayout>
    </>,
    document.getElementById(target)
);
