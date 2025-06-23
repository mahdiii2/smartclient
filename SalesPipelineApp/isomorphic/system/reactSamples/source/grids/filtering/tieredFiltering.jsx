import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VStack, SearchForm, RadioGroupItem, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var getHemisphereCriterion = function () {
    var optionHemisphere = this.getValue(),
        criterion = {},                
        southernCountries = ["Indonesia", "Argentina", "Bolivia", "Australia", "Brasil", "Chile", "Paraguay",
                             "Ecuador","Mauritius", "Somalia", "Tanzania", "Zambia", 
                             "Peru", "Uruguay", "Angola", "Botswana", "Burundi", "Madagascar", "South Africa",
                             "Kenya", "Malawi", "Mozambique", "Namibia", "Nauru", "New Zeland", "Congo"];
                
    if (optionHemisphere && optionHemisphere != "Any") {
        if (optionHemisphere == "Northern") {
            criterion = { fieldName:"countryName", operator:"notInSet", value:southernCountries }
        } else {
            criterion = { fieldName:"countryName", operator:"inSet", value:southernCountries }
        }
    }
    return criterion;
}

var getPopulationCriterion = function () {
    var optionPopulation = this.getValue(),
        criterion = {};
                
    if (optionPopulation && optionPopulation != "Any") {
        if (optionPopulation == "Dense") {
            criterion = { fieldName:"population", operator:"lessThan", value:1000000 }
        } else if (optionPopulation == "Normal") {
            criterion = { fieldName:"population", operator:"between", start: 1000001, end:6500000 }
        } else {
            criterion = { fieldName:"population", operator:"greaterThan", value:6500001 }
        }
    }
    return criterion;
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <SearchForm ID="specializedForm" numCols="4" width="800" itemChanged="this.submit()" colWidths={[120, "*", 100]}
                values={ { hemisphereField:"Any", populationField:"Any" } }>
            <fields>
                <RadioGroupItem name="hemisphereField" title="Hemisphere" vertical="false" getCriterion={getHemisphereCriterion}>
                    <valueMap>
                        <value>Any</value>
                        <value>Northern</value>
                        <value>Southern</value>
                    </valueMap>
                </RadioGroupItem>
                <RadioGroupItem name="populationField" title="Population" vertical="false" getCriterion={getPopulationCriterion}>
                    <valueMap>
                        <value>Any</value>
                        <value>Dense</value>
                        <value>Normal</value>
                        <value>Sparse</value>
                    </valueMap>
                </RadioGroupItem>
            </fields>
        </SearchForm>
    
        <ListGrid ID="countryList" width="800" height="224" alternateRecordStyles="true" dataSource="worldDS" autoFetchData="true"
                canShowFilterEditor="true" searchForm="specializedForm" allowFilterOperators="true" alwaysShowOperatorIcon="true">
            <fields>
                <LGField name="countryName" />
                <LGField name="continent" />
                <LGField name="population" />
                <LGField name="area" />
                <LGField name="gdp" />
                <LGField name="independence" width="100"/>
            </fields>
        </ListGrid>
    
        <VStack width="100%" membersMargin="10">
            <members>
                <value>specializedForm</value>
                <value>countryList</value>
            </members>
        </VStack>
    
    </>, 
    document.getElementById(target)
);
