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
    <DynamicForm ID="exampleForm" width="300">
        <fields>
            <SelectItem optionDataSource="supplyItem" valueField="SKU" displayField="itemName" name="itemID" title="Item" width="240" pickListWidth="450">
                <pickListFields>
                    <DropDownField name="itemName"/>
                    <DropDownField name="units"/>
                    <DropDownField name="unitCost"/>
                </pickListFields>
            </SelectItem>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
