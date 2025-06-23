/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, IButton, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onLoadButtonClick = function () {
    isc.XMLTools.loadXMLSchema('/isomorphic/system/reference/inlineExamples/dataIntegration/xml/supplyItem.xsd', this.getID() + '.loadXMLSchemaReply(schemaSet)');
};
let onLoadButtonLoadXMLSchemaReply = function (schemaSet) {
    var schemaDS = schemaSet.getSchema('supplyItem');
    var ds = isc.DataSource.create({
        inheritsFrom: schemaDS,
        useParentFieldOrder: true,
        fields: [
            {
                name: 'itemId',
                hidden: true,
                primaryKey: true
            },
            {
                name: 'itemName',
                title: 'item name'
            },
            {
                name: 'nextShipment',
                useTextField: true,
                title: 'next shipment'
            }
        ]
    });
    listGrid.setDataSource(ds);
    dynamicForm.setDataSource(ds);
    listGrid.setData([{
            itemId: 123,
            itemName: 'Sample Item'
        }]);
    listGrid.startEditing();
    dynamicForm.setValue('unitCost', -1.234);
    dynamicForm.setValue('SKU', 'thisSkuIsWayTooLong');
    validateButton.enable();
};
let onValidateButtonClick = function() {return dynamicForm.validate()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" width="100%" height="100%">
        <members>
            <IButton title="Load Schema" ID="loadButton" click={onLoadButtonClick} loadXMLSchemaReply={onLoadButtonLoadXMLSchemaReply}/>
            <ListGrid ID="listGrid" canEdit="true"/>
            <DynamicForm ID="dynamicForm"/>
            <IButton title="Validate" ID="validateButton" top="450" disabled="true" click={onValidateButtonClick}/>
        </members>
    </VLayout>,
    document.getElementById(target)
);
