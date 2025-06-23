import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, SectionItem, TextItem, TextAreaItem, FloatItem, CheckboxItem, DateItem,
         DynamicForm } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm width="350" titleWidth="120" >
            <SectionItem defaultValue="Item" sectionExpanded="true"
             itemIds={["itemName", "description", "price"]} />
            <TextItem name="itemName" title="Item" />
            <TextAreaItem name="description" title="Description" />
            <FloatItem name="price" title="Price" defaultValue="low" />
            <SectionItem defaultValue="Stock" sectionExpanded="false"
             itemIds={["inStock", "nextShipment"]} />
            <CheckboxItem name="inStock" title="In Stock" />
            <DateItem name="nextShipment" title="Next Shipment"
             useTextField="true" wrapTitle="false" />
        </DynamicForm>
    </>, 
    document.getElementById(target)
);
