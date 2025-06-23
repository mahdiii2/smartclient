/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSelectedRegionClick = function () {
    if (this.contents != 'All') {
        createChart();
    }
};

var ds = isc.DataSource.get('productRevenue');
function createChart(region, time) {
    var dynamicChart = isc.Canvas.getById('dynamicChart');
    var swapFacets = false;
    if (dynamicChart) {
        swapFacets = time || dynamicChart.facets[0].id == 'Regions';
        dynamicChart.destroy();
    }
    var facets;
    var timeFacet = {
        id: 'Time',
        title: 'Time'
    };
    var regionsFacet = {
        id: 'Regions',
        title: 'Region',
        values: [
            {
                id: 'North',
                title: 'North'
            },
            {
                id: 'South',
                title: 'South'
            },
            {
                id: 'East',
                title: 'East'
            },
            {
                id: 'West',
                title: 'West'
            }
        ]
    };
    if (!region && !time) {
        if (swapFacets) {
            facets = [
                regionsFacet,
                timeFacet
            ];
            selectedRegion.setContents('Selected Region: All');
        } else {
            facets = [
                timeFacet,
                regionsFacet
            ];
            selectedRegion.setContents('Selected Time: All');
        }
        selectedRegion.setIcon(null);
    } else {
        if (region) {
            facets = [timeFacet];
            selectedRegion.setContents('Selected Region: ' + region);
        } else {
            facets = [regionsFacet];
            selectedRegion.setContents('Selected Time: ' + time);
        }
        selectedRegion.setIcon('[SKIN]/DynamicForm/Remove_icon.png');
    }
    dynamicChart = isc.FacetChart.create({
        ID: 'dynamicChart',
        title: 'Revenue',
        facets: facets,
        chartType: 'Column',
        stacked: true,
        valueProperty: 'value',
        valueClick: function (drawnValue) {
            if (this.facets[0].id == 'Time') {
                createChart(drawnValue.facetValues.Regions);
            } else {
                createChart(null, drawnValue.facetValues.Time);
            }
        },
        legendClick: function (facetValue, metricFacetValue) {
            if (!facetValue)
                return;
            if (this.facets[0].id == 'Time') {
                createChart(facetValue.id);
            } else {
                createChart(null, facetValue.id);
            }
        },
        dataLabelClick: function (facetValue) {
            if (!facetValue)
                return;
            if (this.facets[0].id == 'Time') {
                createChart(null, facetValue.id);
            } else {
                createChart(facetValue.id);
            }
        },
        getDataLabelHoverHTML: function (facetValue) {
            return 'Click to show only data from ' + facetValue.id;
        },
        getLegendHoverHTML: function (facetValue, metricFacetValue) {
            return 'Click to show only data from ' + facetValue.title;
        }
    });
    var criteria = [
        {
            fieldName: 'Time',
            operator: 'startsWith',
            value: 'Q'
        },
        {
            fieldName: 'Scenarios',
            operator: 'equals',
            value: 'Actual'
        },
        {
            fieldName: 'Products',
            operator: 'equals',
            value: 'Prod01'
        }
    ];
    if (region) {
        criteria.add({
            fieldName: 'Regions',
            operator: 'equals',
            value: region
        });
    } else if (time) {
        criteria.add({
            fieldName: 'Time',
            operator: 'equals',
            value: time
        });
    }
    ds.fetchData({
        _constructor: 'AdvancedCriteria',
        operator: 'and',
        criteria: criteria
    }, function (dsResponse, data, dsRequest) {
        dynamicChart.setData(data);
    });
    dynamicChartLayout.addMember(dynamicChart);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" ID="dynamicChartLayout" width="100%" height="100%">
        <members>
            <Label padding="10" title="selectedRegion" showRollOver="true" iconOrientation="right" showRollOverIcon="true" ID="selectedRegion" height="5" cursor="hand" click={onSelectedRegionClick}/>
        </members>
    </VLayout>,
    document.getElementById(target)
);

createChart();
