import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, DateItem, DynamicForm } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm width="300">
            <CheckboxItem name="onOrder" title="Shipment on order"
                           width="50" redrawOnChange="true"/>
            <DateItem name="orderDate" title="Order Placed"
                       showIf="form.getValue('onOrder') == true"
                       required="true" wrapTitle="false"/>
        </DynamicForm>
    </>, 
    document.getElementById(target)
);
