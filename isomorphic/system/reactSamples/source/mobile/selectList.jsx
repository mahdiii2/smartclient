/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DropDownField, DynamicForm, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm ID="testForm" width="500">
        <fields>
            <SelectItem optionDataSource="supplyItem" valueField="SKU" displayField="itemName" name="filteredSelect" title="Select Item" pickListPlacement="fillScreen" pickListWidth="300">
                <pickListFields>
                    <DropDownField name="SKU"/>
                    <DropDownField name="itemName"/>
                </pickListFields>
                <pickListProperties showFilterEditor="true"/>
            </SelectItem>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
