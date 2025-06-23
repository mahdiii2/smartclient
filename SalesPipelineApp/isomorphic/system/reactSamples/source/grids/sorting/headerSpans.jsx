import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HeaderSpan, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" width="870" height="224" alternateRecordStyles="true"
                headerHeight="65" dataSource="countryDS" autoFetchData="true">
            <fields>
                <LGField name="countryCode" title="Flag" width="60" type="image" imageURLPrefix="flags/24/" imageURLSuffix=".png"/>
                <LGField name="countryName" title="Country"/>
                <LGField name="capital"/>
                <LGField name="government" width="120"/>
                <LGField name="independence" title="Nationhood" width="110"/>
                <LGField name="population" title="Population"/>
                <LGField name="area" title="Area (km&sup2;)"/>
                <LGField name="gdp"/>
            </fields>
            <headerSpans>
                <HeaderSpan title="Identification">
                    <fields>
                        <value>countryCode</value>
                        <value>countryName</value>
                    </fields>
                </HeaderSpan>
                <HeaderSpan title="Government &amp; Politics">
                    <fields>
                        <value>capital</value>
                        <value>government</value>
                        <value>independence</value>
                    </fields>
                </HeaderSpan>
                <HeaderSpan title="Demographics">
                    <fields>
                        <value>population</value>
                        <value>area</value>
                        <value>gdp</value>
                    </fields>
                </HeaderSpan>
            </headerSpans>
        </ListGrid>
    </>, 
    document.getElementById(target)
);
