/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Criterion, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid ID="countryList" dataSource="worldDS" showFilterEditor="true" autoFetchData="true" width="550" height="300" allowFilterOperators="true">
        <initialCriteria operator="and">
            <criteria>
                <Criterion fieldName="countryName" operator="iNotContains" value="i"/>
                <Criterion fieldName="capital" operator="iNotStartsWith" value="p"/>
            </criteria>
        </initialCriteria>
        <fields>
            <LGField name="countryCode" width="60"/>
            <LGField name="countryName"/>
            <LGField name="capital"/>
            <LGField name="continent"/>
            <LGField name="area"/>
            <LGField name="population"/>
        </fields>
    </ListGrid>,
    document.getElementById(target)
);
