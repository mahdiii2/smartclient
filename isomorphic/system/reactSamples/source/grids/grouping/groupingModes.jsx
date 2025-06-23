/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onContinentGetGroupValue = function (value, record, field, fieldname, grid) {
    if (this.groupingMode == 'continent')
        return value;
    else {
        switch (value) {
        case 'North America':
        case 'South America':
            return 'Western Hemisphere';
        default:
            return 'Eastern Hemisphere';
        }
    }
};
let onIndependenceGetGroupValue = function (value, record, field, fieldName, grid) {
    if (this.groupingMode == 'season') {
        if (value == null)
            return 'Unknown';
        var month = value.getMonth(), day = value.getDate(), shift = month % 3 == 2 && day >= 21 ? 1 : 0, season = Math.floor((month + shift) % 12 / 3);
        return this.seasons[season];
    } else {
        if (value == null)
            return 'Ancient';
        else if (value.getFullYear() < 1910)
            return 'Pre-Industrial';
        else
            return 'Post-Industrial';
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid ID="countryList" dataSource="countryDS" groupByField="continent" autoFetchData="true" width="500" height="425" groupStartOpen="all">
        <fields>
            <LGField name="countryName"/>
            <LGField name="continent" defaultGroupingMode="hemisphere" getGroupValue={onContinentGetGroupValue}>
                <groupingModes continent="Continent Name" hemisphere="Hemisphere"/>
            </LGField>
            <LGField name="independence" width="100" defaultGroupingMode="epoch" getGroupValue={onIndependenceGetGroupValue}>
                <groupingModes>
                        <value>epoch</value>
                        <value>season</value>
                </groupingModes>
                <seasons>Winter</seasons>
                <seasons>Spring</seasons>
                <seasons>Summer</seasons>
                <seasons>Fall</seasons>
            </LGField>
            <LGField name="population"/>
            <LGField name="countryCode" type="image" title="Flag" width="40" imageURLPrefix="flags/24/" imageURLSuffix=".png"/>
        </fields>
    </ListGrid>,
    document.getElementById(target)
);
