import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VStack, IButton, DynamicForm, TextItem, BlurbItem, IntegerItem, DateItem, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var submit = function () {
    filterGrid.filterData(filterForm.getValuesAsCriteria());
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <VStack membersMargin="30">
            <members>
                <VStack membersMargin="30">
                    <members>
                        <DynamicForm ID="filterForm" width="300" operator="and" saveOnEnter="true" dataSource="worldDS"
                                    submit={submit}>
                            <fields>
                                <TextItem name="countryName" title="Country Name contains" wrapTitle="false"/>
                                <BlurbItem defaultValue="<b>AND</b>"/>
                                <IntegerItem name="population" title="Population smaller than" wrapTitle="false"
                                        operator="lessThan"/>
                                <BlurbItem defaultValue="<b>AND</b>"/>
                                <DateItem name="independence" title="Nationhood later than" wrapTitle="false"
                                        useTextField="true" operator="greaterThan"/>
                            </fields>
                        </DynamicForm>
                        <IButton title="Filter" click="filterForm.submit()"/>
                    </members>
                </VStack>                
                <ListGrid ID="filterGrid" width="850" height="300" alternateRecordStyles="true" dataSource="worldDS"
                        autoFetchData="true" useAllDataSourceFields="true">
                    <fields>
                        <LGField name="countryCode" width="60"/>
                        <LGField name="government" title="Government" width="95"/>
                        <LGField name="independence" title="Nationhood" width="100"/>
                        <LGField name="population" title="Population" width="100"/>
                        <LGField name="gdp" title="GDP ($M)" width="85"/>
                    </fields>
                </ListGrid>
                
            </members>
        </VStack>
    </>, 
    document.getElementById(target)
);
