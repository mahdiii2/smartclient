/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DateItem, DynamicForm, FilterBuilder, IButton, LGField, ListGrid, SelectItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onChangeLocaleClick = function (form, item) {
    var newUrl = window.location.href;
    var selLocale = form.getValue('locale');
    if (newUrl.indexOf('locale') > 0) {
        var regex = new RegExp('locale=[a-zA-Z_]+');
        newUrl = newUrl.replace(regex, 'locale=' + selLocale);
    } else {
        if (newUrl.indexOf('?') > 0) {
            if (newUrl.indexOf('#') > 0) {
                newUrl = newUrl.replace('#', '&locale=' + selLocale + '#');
            } else {
                newUrl += '&locale=' + selLocale;
            }
        } else {
            newUrl = newUrl.replace('#', '?locale=' + selLocale + '#');
        }
    }
    window.location.href = newUrl;
};
let onFilterButtonClick = function () {
    countryList.filterData(advancedFilter.getCriteria());
};

var myApp = {
    messages: {
        localeTitle: 'Locale',
        changeLocaleTitle: 'Change Locale',
        dateTitle: 'Date',
        filterTitle: 'Filter',
        countryTitle: 'Country',
        continentTitle: 'Continent',
        populationTitle: 'Population',
        areaTitle: 'Area (km&amp;sup2;)',
        nationhoodTitle: 'Nationhood'
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10">
        <members>
            <DynamicForm ID="localeForm">
                <fields>
                    <SelectItem name="locale" title={myApp.messages.localeTitle} defaultValue="en">
                        <valueMap en="English" cs="Czech" de="German" es="Spanish" fr="French" it="Italian" pt="Portuguese" pt_BR="Brazilian Portuguese" ru_RU="Russian"/>
                    </SelectItem>
                    <ButtonItem name="changeLocale" title={myApp.messages.changeLocaleTitle} click={onChangeLocaleClick}/>
                    <DateItem name="picklistDate" title={myApp.messages.dateTitle}/>
                </fields>
            </DynamicForm>
            <FilterBuilder dataSource="worldDS" ID="advancedFilter" topOperatorAppearance="radio">
                <radioOperatorFormProperties>
                	<width>600</width>
                </radioOperatorFormProperties>
            </FilterBuilder>
            <IButton title={myApp.messages.filterTitle} ID="filterButton" click={onFilterButtonClick}/>
            <ListGrid ID="countryList" dataSource="worldDS" autoFetchData="true" width="550" height="224">
                <fields>
                    <LGField name="countryName" title={myApp.messages.countryTitle}/>
                    <LGField name="continent" title={myApp.messages.continentTitle}/>
                    <LGField name="population" title={myApp.messages.populationTitle}/>
                    <LGField name="area" title={myApp.messages.area}/>
                    <LGField name="independence" title={myApp.messages.nationhoodTitle} width="100"/>
                </fields>
            </ListGrid>
        </members>
    </VStack>,
    document.getElementById(target)
);

if (isc.params.locale)
    localeForm.setValue('locale', isc.params.locale);
