/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ComboBoxItem, DynamicForm } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm numCols="4" wrapItemTitles="false" groupTitle="List - ComboBox" width="500" isGroup="true">
        <fields>
            <ComboBoxItem name="bugStatus" title="Bug Status">
                <valueMap new="New" active="Active" revisit="Revisit" fixed="Fixed" delivered="Delivered" resolved="Resolved" reopened="Reopened"/>
            </ComboBoxItem>
            <ComboBoxItem optionDataSource="supplyItem" name="itemName" title="Item Name" pickListWidth="250"/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
