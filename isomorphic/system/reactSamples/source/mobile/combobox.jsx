/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ComboBoxItem, DropDownField, DynamicForm } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm ID="testForm" width="500">
        <fields>
            <ComboBoxItem addUnknownValues="false" optionDataSource="supplyItem" valueField="SKU" displayField="itemName" name="filteredCombo" title="Select Item" pickListPlacement="fillScreen" pickListWidth="300">
                <pickListFields>
                    <DropDownField name="SKU"/>
                    <DropDownField name="itemName"/>
                </pickListFields>
                <filterFields>
                    <value>SKU</value>
                    <value>itemName</value>
                </filterFields>
            </ComboBoxItem>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
