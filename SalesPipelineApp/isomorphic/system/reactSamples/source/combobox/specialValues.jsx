/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ComboBoxItem, DropDownField, DynamicForm, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm wrapItemTitles="false" width="500">
        <fields>
            <SelectItem optionDataSource="supplyItem" valueField="itemID" displayField="itemName" name="filteredSelect" title="Choose an item (Select)" pickListWidth="300" separateSpecialValues="true">
                <pickListFields>
                    <DropDownField name="SKU"/>
                    <DropDownField name="itemName"/>
                </pickListFields>
                <pickListProperties showFilterEditor="true"/>
                <specialValues>
                        <value id="**emptyValue**">None</value>
                        <value id="-1">Not Applicable</value>
                </specialValues>
            </SelectItem>
            <ComboBoxItem addUnknownValues="false" optionDataSource="supplyItem" valueField="itemID" displayField="itemName" name="filteredCombo" title="Choose an item (ComboBox)" pickListWidth="300" separateSpecialValues="true">
                <pickListFields>
                    <DropDownField name="SKU"/>
                    <DropDownField name="itemName"/>
                </pickListFields>
                <filterFields>
                    <value>SKU</value>
                    <value>itemName</value>
                </filterFields>

                <specialValues>
                        <value id="**emptyValue**">None</value>
                        <value id="-1">Not Applicable</value>
                </specialValues>
            </ComboBoxItem>
            <SelectItem multiple="true" optionDataSource="supplyItem" valueField="itemID" displayField="SKU" name="multipleSelect" title="Select all items" pickListWidth="400" separateSpecialValues="true">
                <pickListFields>
                    <DropDownField name="SKU"/>
                    <DropDownField name="itemName"/>
                </pickListFields>
                <optionCriteria units="Ream"/>
                <specialValues>
                        <value id="**emptyValue**">Select None</value>
                        <value id="**selectAllValues**">Select All</value>
                </specialValues>
            </SelectItem>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
