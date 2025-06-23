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

let valueIcons = {
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
        <DynamicForm ID="exampleForm" width="450" wrapItemTitles="false">
            <fields>
                <SelectItem 
                    title="Select Multiple (Grid)"
                    multiple="true"
                    multipleAppearance="grid"
                    valueMap={[ "Cat", "Dog", "Giraffe", "Goat", "Marmoset", "Mouse" ]}
                />
                <SelectItem 
                    title="Select Multiple (PickList)"
                    multiple="true"
                    multipleAppearance="picklist"
                    valueMap={[ "Cat", "Dog", "Giraffe", "Goat", "Marmoset", "Mouse" ]}
                />
                <SelectItem 
                    title="Select"
                    hint="Multi Select with icons"
                    wrapHintText="false"
                    multiple="true"
                    valueMap={valueMap}
                    imageURLPrefix="flags/16/"
                    imageURLSuffix=".png"
                    valueIcons={valueIcons}
                     />
            </fields>
        </DynamicForm>
    </>, 
    document.getElementById(target)
);
