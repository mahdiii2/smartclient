/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Criterion, DSField, DataSource, FilterBuilder } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var testData = [];
for (var i = 0; i <= 200; i++) {
    testData[i] = {
        name: 'field' + i,
        title: 'Field ' + i,
        type: 'text'
    };
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="bigFilterDS" title="bigFilterDS" clientOnly="true" testData={testData}>
            <fields>
                <DSField name="name" type="text"/>
                <DSField name="title" type="text"/>
                <DSField name="type" type="text"/>
            </fields>
        </DataSource>

        <FilterBuilder ID="advancedFilter" fieldDataSource="bigFilterDS">
            <criteria operator="and">
                <criteria>
                    <Criterion fieldName="field2" operator="iStartsWith" value="C"/>
                    <Criterion operator="or">
                        <criteria>
                            <Criterion fieldName="field73" operator="notEqualField" value="field191"/>
                            <Criterion fieldName="field130" operator="iContains" value="B"/>
                        </criteria>
                    </Criterion>
                </criteria>
            </criteria>
        </FilterBuilder>
    </>,
    document.getElementById(target)
);
