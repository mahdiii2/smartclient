/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Facet, FacetChart, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDynamicChartUpdateData = function (title) {
    var self = this;
    ds.fetchData(isc.DataSource.combineCriteria({
        Products: 'Prod01',
        Regions: [
            'North',
            'South',
            'East',
            'West'
        ],
        Scenarios: 'budget'
    }, { Time: 'sum' }), function (dsResponse, data, dsRequest) {
        self.setProperty('title', title);
        self.setData(data);
    });
};
let onDynamicChartChartBackgroundDrawn = function () {
    var values = this.getFacetData().getProperty(['value']);
    var sum = 0;
    for (var i = 0, l = values.length; i < l; i++) {
        sum = sum + parseFloat(values[i]);
    }
    var avgLineY = this.getYCoord(sum / l);
    isc.DrawLine.create({
        drawPane: this,
        startPoint: [
            this.getChartLeft(),
            avgLineY
        ],
        endPoint: [
            this.getChartLeft() + this.getChartWidth(),
            avgLineY
        ],
        autoDraw: true
    }, {
        lineWidth: 4,
        lineColor: 'red',
        linePattern: 'dash'
    });
};

var ds = isc.DataSource.get('productRevenue');

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" ID="dynamicChartLayout" width="100%" height="100%">
        <members>
            <FacetChart chartType="Column" stacked="false" title="Revenue" valueProperty="value" ID="dynamicChart" updateData={onDynamicChartUpdateData} chartBackgroundDrawn={onDynamicChartChartBackgroundDrawn}>
                <facets>
                    <Facet id="Regions" title="Region"/>
                </facets>
            </FacetChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);

dynamicChart.updateData('Revenue for All Years');
