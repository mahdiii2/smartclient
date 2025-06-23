import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, FilterBuilder, VStack, IButton, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var criteria = { _constructor: "AdvancedCriteria",
    operator: "and", criteria: [
        {fieldName: "continent", operator: "equals", value: "Europe"},
        {operator: "or", criteria: [
            {fieldName: "countryName", operator: "iEndsWith", value: "land"},
            {fieldName: "population", operator: "lessThan", value: 3000000}
        ]}
    ]
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <FilterBuilder ID="advancedFilter" dataSource="worldDS" criteria={criteria}/>

        <ListGrid ID="countryList" width="700" height="224" alternateRecordStyles="true" dataSource="worldDS">
            <fields>
                <LGField name="countryName"/>
                <LGField name="continent"/>
                <LGField name="population"/>
                <LGField name="area"/>
                <LGField name="gdp"/>
                <LGField name="independence" width="100"/>
            </fields>
        </ListGrid>
    
        <IButton ID="filterButton" title="Filter" click="countryList.filterData(advancedFilter.getCriteria());"/>
    
        <VStack width="32" height="74" layoutAlign="center" membersMargin="5">
            <members>
                <value>advancedFilter</value>
                <value>filterButton</value>
                <value>countryList</value>
            </members>
        </VStack>
    </>, 
    document.getElementById(target)
);

// Perform the initial filter
filterButton.click();


