/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onIndependenceGetGroupValue = function (value, record, field, fieldName, grid) {
    if (value == null)
        return 'Ancient';
    else if (value.getFullYear() < 1910)
        return 'Pre-Industrial';
    else
        return 'Post-Industrial';
};
let onPopulationGetGroupValue = function (value, record, field, fieldName, grid) {
    if (value < 100000000)
        return this.GROUP_SMALL;
    else if (value < 1000000000)
        return this.GROUP_MED;
    else
        return this.GROUP_LARGE;
};
let onPopulationGetGroupTitle = function (groupValue, groupNode, field, fieldName, grid) {
    var baseTitle;
    switch (groupValue) {
    case this.GROUP_SMALL:
        baseTitle = 'Population less than 100 million';
        break;
    case this.GROUP_MED:
        baseTitle = 'Population between 100 million-1 billion';
        break;
    case this.GROUP_LARGE:
        baseTitle = 'Population over 1 billion';
        break;
    }
    baseTitle += ' (' + groupNode.groupMembers.length + ' members)';
    return baseTitle;
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid ID="countryList" dataSource="countryDS" groupByField="population" autoFetchData="true" width="500" height="224" groupStartOpen="all">
        <fields>
            <LGField name="countryName"/>
            <LGField name="continent"/>
            <LGField name="independence" width="100" getGroupValue={onIndependenceGetGroupValue}/>
            <LGField name="population" GROUP_SMALL="1" GROUP_MED="2" GROUP_LARGE="3" getGroupValue={onPopulationGetGroupValue} getGroupTitle={onPopulationGetGroupTitle}/>
            <LGField name="countryCode" type="image" title="Flag" width="40" imageURLPrefix="flags/24/" imageURLSuffix=".png"/>
        </fields>
    </ListGrid>,
    document.getElementById(target)
);
