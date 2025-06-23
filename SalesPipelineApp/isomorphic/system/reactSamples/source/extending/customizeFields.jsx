/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, DynamicForm, IButton, ListGrid, ListGridRecord, SectionStack, SectionStackSection, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCustomFieldsGridCellChanged = function(record,newValue,oldValue,rowNum,colNum,grid) {return bindButton.rebind()};
let onBindButtonClick = function() {return this.rebind()};
let onBindButtonRebind = function () {
    sampleView.setDataSource('supplyItem', customFieldsGrid.getData());
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="dsField" title="dsField">
            <fields>
                <DSField name="name"/>
                <DSField name="title"/>
                <DSField name="type">
                    <valueMap>
                            <value>text</value>
                            <value>boolean</value>
                            <value>date</value>
                            <value>int</value>
                            <value>decimal</value>
                            <value>link</value>
                    </valueMap>
                </DSField>
                <DSField name="required" type="boolean" title="req" width="40"/>
                <DSField name="hidden" type="boolean" title="hide" width="40"/>
            </fields>
        </DataSource>

        <SectionStack visibilityMode="multiple" membersMargin="6" width="100%" height="100%">
            <sections>
                <SectionStackSection title="Field Editing" expanded="true">
                    <items>
                        <ListGrid ID="customFieldsGrid" dataSource="dsField" modalEditing="true" listEndEditAction="next" canEdit="true" editEvent="click" canReorderRecords="true" saveLocally="true" height="130" extraSpace="7" cellChanged={onCustomFieldsGridCellChanged}>
                            <data>
                                <ListGridRecord name="nextShipment" required="true"/>
                                <ListGridRecord name="customField" title="Order Quantity" type="int"/>
                            </data>
                        </ListGrid>
                        <VLayout layoutLeftMargin="5" ID="layoutButton">
                            <members>
                                <IButton title="Try it" ID="bindButton" click={onBindButtonClick} rebind={onBindButtonRebind}/>
                            </members>
                        </VLayout>
                    </items>
                </SectionStackSection>
                <SectionStackSection title="Sample Binding" expanded="true">
                    <items>
                        <DynamicForm ID="sampleView" overflow="auto" titleWidth="150" height="78%" useAllDataSourceFields="true"/>
                    </items>
                </SectionStackSection>
            </sections>
        </SectionStack>
    </>,
    document.getElementById(target)
);

customFieldsGrid.delayCall('startEditing');
bindButton.rebind();
