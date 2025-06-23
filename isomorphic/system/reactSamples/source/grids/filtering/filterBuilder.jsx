/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, FilterBuilder, IButton, LGField, ListGrid, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFilterButtonClick = function () {
    countryList.filterData(advancedFilter.getCriteria());
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10">
        <members>
            <FilterBuilder dataSource="worldDS" ID="advancedFilter" topOperatorAppearance="radio"/>
            <IButton title="Filter" ID="filterButton" click={onFilterButtonClick}/>
            <ListGrid ID="countryList" dataSource="worldDS" autoFetchData="true" width="600" height="224">
                <fields>
                    <LGField name="countryName"/>
                    <LGField name="continent"/>
                    <LGField name="population"/>
                    <LGField name="area"/>
                    <LGField name="gdp"/>
                    <LGField name="independence" width="100"/>
                </fields>
            </ListGrid>
        </members>
    </VStack>,
    document.getElementById(target)
);
