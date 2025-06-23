/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Criterion, FilterBuilder, IButton, LGField, ListGrid, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFilterButtonClick = function () {
    countryList.setData([]);
    countryList.filterData(countryFilter.getCriteria());
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10" width="600">
        <members>
            <FilterBuilder dataSource="worldDS" ID="countryFilter" topOperatorAppearance="radio">
                <criteria operator="and">
                    <criteria>
                        <Criterion fieldName="area" operator="greaterThan" value="50"/>
                        <Criterion fieldName="population" operator="greaterThan" value="100000"/>
                    </criteria>
                </criteria>
                <radioOperatorFormProperties>
                	<width>600</width>
                </radioOperatorFormProperties>
            </FilterBuilder>
            <IButton title="Filter" ID="filterButton" click={onFilterButtonClick}/>
            <ListGrid ID="countryList" dataSource="worldDS" fetchOperation="fetchByRequiredCriterion" height="224">
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
