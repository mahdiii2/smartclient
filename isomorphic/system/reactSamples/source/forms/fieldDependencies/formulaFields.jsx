/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ComboBoxItem, DateItem, DynamicForm, FloatItem, HeaderItem, SubmitItem, TextAreaItem, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onItemIdChanged = function(form,item,value) {var record=item.getSelectedRecord(); if(record) form.setValue('price', record.price)};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm ID="order" colWidths="110,*" width="500">
        <fields>
            <HeaderItem defaultValue="Select an item for your Order"/>
            <ComboBoxItem optionDataSource="StockItem" valueField="id" displayField="description" name="itemId" title="Item" width="300" changed={onItemIdChanged}/>
            <TextItem defaultValue="1" name="quantity" title="Quantity" validateOnExit="true"/>
            <FloatItem name="price" title="Price" canEdit="false" readOnlyDisplay="static" format="$,##0.00"/>
            <FloatItem name="extended" title="Extended" canEdit="false" readOnlyDisplay="static" format="$,##0.00">
                <formula text="price*quantity"/>
            </FloatItem>
            <HeaderItem defaultValue="Enter ship to details"/>
            <TextItem name="firstName" title="First name"/>
            <TextItem name="lastName" title="Last name"/>
            <TextItem name="address" title="Address"/>
            <TextItem name="city" title="City"/>
            <TextItem length="2" name="state" title="State" width="40" characterCasing="upper"/>
            <TextItem length="5" name="zip" title="Zip code"/>
            <TextAreaItem name="label" title="Shipping label" canEdit="false" width="300">
                <textFormula text="#{firstName} #{lastName}\n#{address}\n#{city} #{state} #{zip}"/>
            </TextAreaItem>
            <HeaderItem defaultValue="Select shipping time"/>
            <TextItem defaultValue="2" name="shipDays" title="Ship days"/>
            <DateItem useTextField="true" name="estDelivery" title="Est. Delivery" canEdit="false">
                <formula text="DateAdd(new Date(),&apos;d&apos;,shipDays)"/>
            </DateItem>
            <SubmitItem title="Submit Order" width="*"/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
