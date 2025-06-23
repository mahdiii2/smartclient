/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DateRangeItem, DynamicForm, LGField, Label, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSearchButtonClick = function () {
    var criteria = form.getField('independence').getCriterion();
    grid1.fetchData(criteria);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" width="100%" height="100%">
        <members>
            <Label contents="External DynamicForm (DateRangeItem)" title="externalDynamicFormLabel" baseStyle="exampleSeparator" ID="externalDynamicFormLabel" width="700" height="25"/>
            <DynamicForm ID="form" dataSource="worldDS" titleOrientation="top" width="500">
                <items>
                    <DateRangeItem name="independence" showTitle="false" allowRelativeDates="true"/>
                    <ButtonItem name="searchButton" title="Filter" click={onSearchButtonClick}/>
                </items>
            </DynamicForm>
            <ListGrid ID="grid1" dataSource="worldDS" width="850" height="150">
                <fields>
                    <LGField name="countryCode" title="Code" width="60"/>
                    <LGField name="countryName" title="Country" width="80"/>
                    <LGField name="capital" title="Capital" width="70"/>
                    <LGField name="government" title="Government" width="105"/>
                    <LGField name="continent" title="Continent" width="85"/>
                    <LGField name="independence" title="Nationhood" width="100"/>
                    <LGField name="area" title="Area (km&amp;sup2;)"/>
                    <LGField name="population" title="Population" width="95"/>
                    <LGField name="gdp" title="GDP ($M)" width="85"/>
                    <LGField name="member_g8" title="G8" width="60"/>
                </fields>
            </ListGrid>
            <Label contents="FilterEditor (MiniDateRangeItem)" title="filterEditorLabel" baseStyle="exampleSeparator" ID="filterEditorLabel" width="850" height="25"/>
            <ListGrid ID="grid2" dataSource="worldDS" showFilterEditor="true" autoFetchData="true" width="850" height="150">
                <fields>
                    <LGField name="countryCode" title="Code" width="60"/>
                    <LGField name="countryName" title="Country" width="80"/>
                    <LGField name="capital" title="Capital" width="70"/>
                    <LGField name="government" title="Government" width="105"/>
                    <LGField name="continent" title="Continent" width="85"/>
                    <LGField name="independence" title="Nationhood" width="100"/>
                    <LGField name="area" title="Area (km&amp;sup2;)"/>
                    <LGField name="population" title="Population" width="95"/>
                    <LGField name="gdp" title="GDP ($M)" width="85"/>
                    <LGField name="member_g8" title="G8" width="60"/>
                </fields>
            </ListGrid>
        </members>
    </VLayout>,
    document.getElementById(target)
);

form.getItem('independence').setValue({
    start: {
        _constructor: 'RelativeDate',
        value: '-1200m'
    },
    end: {
        _constructor: 'RelativeDate',
        value: '-600m'
    }
});
form.getItem('searchButton').click();
