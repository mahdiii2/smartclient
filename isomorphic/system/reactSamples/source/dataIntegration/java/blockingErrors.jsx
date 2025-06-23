/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DateItem, DynamicForm, HeaderItem, TextAreaItem, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSubmitBtnClick = function(form,item) {return form.validate()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm ID="boundForm" dataSource="complaint" wrapItemTitles="false">
        <fields>
            <HeaderItem defaultValue="Shipment Complaint Form"/>
            <TextItem name="trackingNumber" stopOnError="true"/>
            <DateItem useTextField="true" name="receiptDate"/>
            <TextAreaItem name="comment"/>
            <ButtonItem name="submitBtn" title="Submit" click={onSubmitBtnClick}/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
