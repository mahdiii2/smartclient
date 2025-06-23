/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ComboBoxItem, DynamicForm, HeaderItem, SubmitItem, TextAreaItem, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm dataSource="velocity_orderForm">
        <fields>
            <HeaderItem defaultValue="Add an item to your Order"/>
            <ComboBoxItem optionDataSource="StockItem" valueField="id" displayField="description" name="itemId" title="Item"/>
            <TextItem name="quantity" validateOnExit="true"/>
            <TextAreaItem name="instructions"/>
            <SubmitItem title="Submit Order"/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
