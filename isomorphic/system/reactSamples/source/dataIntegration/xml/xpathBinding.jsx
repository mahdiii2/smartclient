/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="contacts" dataFormat="xml" dataURL="[ISOMORPHIC]/system/reference/inlineExamples/dataIntegration/xml/contactsData.xml" recordXPath="//contact" title="contacts">
            <fields>
                <DSField name="name"/>
                <DSField name="email"/>
                <DSField name="organization"/>
                <DSField name="phone"/>
                <DSField name="street" valueXPath="address/street"/>
                <DSField name="city" valueXPath="address/city"/>
                <DSField name="state" valueXPath="address/state"/>
                <DSField name="zip" valueXPath="address/zip"/>
            </fields>
        </DataSource>

        <ListGrid ID="boundGrid" dataSource="contacts" autoFetchData="true" width="100%"/>
    </>,
    document.getElementById(target)
);
