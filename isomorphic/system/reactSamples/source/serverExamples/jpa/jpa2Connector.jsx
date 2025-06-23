/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, FilterBuilder, IButton, LGField, ListGrid, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFilterButtonClick = function () {
    worldList.filterData(advancedFilter.getCriteria());
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10">
        <members>
            <FilterBuilder dataSource="worldJPA2" ID="advancedFilter"/>
            <IButton title="Filter" ID="filterButton" click={onFilterButtonClick}/>
            <ListGrid ID="worldList" dataSource="worldJPA2" dataPageSize="50" autoFetchData="true" width="1000" height="224" autoFitDateFields="both">
                <fields>
                    <LGField name="countryCode" title="Code" width="50"/>
                    <LGField name="countryName" title="Country"/>
                    <LGField name="capital" title="Capital"/>
                    <LGField name="government" title="Government" width="100"/>
                    <LGField name="continent" title="Continent"/>
                    <LGField name="independence" title="Nationhood" width="100"/>
                    <LGField name="area"/>
                    <LGField name="population" title="Population"/>
                    <LGField name="gdp" title="GDP ($M)"/>
                    <LGField name="member_g8" title="Member of G8"/>
                </fields>
            </ListGrid>
        </members>
    </VStack>,
    document.getElementById(target)
);
