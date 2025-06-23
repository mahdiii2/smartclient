/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, LGField, ListGrid, ListGridRecord } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid ID="countryList" width="500" height="224">
        <data>
            <ListGridRecord countryCode="US" countryName="United States" capital="Washington, DC"/>
            <ListGridRecord countryCode="CH" countryName="China" capital="Beijing"/>
            <ListGridRecord countryCode="JA" countryName="Japan" capital="Tokyo"/>
            <ListGridRecord countryCode="IN" countryName="India" capital="New Delhi"/>
            <ListGridRecord countryCode="GM" countryName="Germany" capital="Berlin"/>
            <ListGridRecord countryCode="UK" countryName="United Kingdom" capital="London"/>
            <ListGridRecord countryCode="FR" countryName="France" capital="Paris"/>
            <ListGridRecord countryCode="IT" countryName="Italy" capital="Rome"/>
            <ListGridRecord countryCode="RS" countryName="Russia" capital="Moscow"/>
            <ListGridRecord countryCode="BR" countryName="Brazil" capital="Brasilia"/>
            <ListGridRecord countryCode="CA" countryName="Canada" capital="Ottawa"/>
            <ListGridRecord countryCode="MX" countryName="Mexico" capital="Mexico (Distrito Federal)"/>
            <ListGridRecord countryCode="SP" countryName="Spain" capital="Madrid"/>
            <ListGridRecord countryCode="KS" countryName="South Korea" capital="Seoul"/>
            <ListGridRecord countryCode="ID" countryName="Indonesia" capital="Jakarta"/>
        </data>
        <fields>
            <LGField name="countryCode" title="Code"/>
            <LGField name="countryName" title="Country"/>
            <LGField name="capital" title="Capital"/>
        </fields>
    </ListGrid>,
    document.getElementById(target)
);
