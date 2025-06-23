import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, SelectItem, DynamicForm } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let valueMap = {
    "US" : "<b>United States</b>",
    "CH" : "China",
    "JA" : "<b>Japan</b>",
    "IN" : "India",
    "GM" : "Germany",
    "FR" : "France",
    "IT" : "Italy",
    "RS" : "Russia",
    "BR" : "<b>Brazil</b>",
    "CA" : "Canada",
    "MX" : "Mexico",
    "SP" : "Spain"
};

let valueIcons={
    "US" : "US",
    "CH" : "CH",
    "JA" : "JA",
    "IN" : "IN",
    "GM" : "GM",
    "FR" : "FR",
    "IT" : "IT",
    "RS" : "RS",
    "BR" : "BR",
    "CA" : "CA",
    "MX" : "MX",
    "SP" : "SP"
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm width="550" wrapItemTitles="false">
            <SelectItem name="shipTo" title="Ship to"wrapHintText="false" valueMap={valueMap}
             hint="Overnight shipping available for countries in bold" 
             imageURLPrefix="flags/16/" imageURLSuffix=".png" valueIcons={valueIcons} />
        </DynamicForm>
    </>, 
    document.getElementById(target)
);
