/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Criterion, FilterBuilder, IButton, LGField, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFilterButtonClick = function () {
    orderItemSummaryList.fetchData(advancedFilter.getCriteria());
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20">
        <members>
            <FilterBuilder dataSource="filteredAggregation_orderItem" ID="advancedFilter">
                <criteria operator="and">
                    <criteria>
                        <Criterion fieldName="unitCost" operator="greaterThan" value="25"/>
                        <Criterion fieldName="quantity" operator="greaterThan" value="10"/>
                        <Criterion fieldName="totalSales" operator="greaterThan" value="30"/>
                    </criteria>
                </criteria>
            </FilterBuilder>
            <IButton title="Filter" ID="filterButton" click={onFilterButtonClick}/>
            <ListGrid ID="orderItemSummaryList" dataSource="filteredAggregation_orderItem" showAllRecords="true" fetchOperation="summary" autoFetchData="false" width="800" height="400" dataFetchMode="basic">
                <fields>
                    <LGField name="itemName" width="400"/>
                    <LGField name="SKU"/>
                    <LGField name="unitCost"/>
                    <LGField name="quantity" title="Total qty"/>
                    <LGField name="totalSales" width="100"/>
                </fields>
            </ListGrid>
        </members>
    </VLayout>,
    document.getElementById(target)
);

filterButton.click();
