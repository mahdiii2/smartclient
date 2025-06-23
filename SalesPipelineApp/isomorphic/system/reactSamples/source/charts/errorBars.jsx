/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Facet, FacetChart, FacetValue, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onErrorBarsUpdateData = function () {
    var criteria = {
        Scenarios: 'Actual',
        Products: 'sum',
        Regions: 'North'
    };
    productRevenue.fetchData(criteria, 'errorBars.setData(data)');
};
let onErrorBarsRandomErrorPercentage = function () {
    return Math.max(0.05, Math.random() * 0.15);
};
let onErrorBarsSetData = function (data) {
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            record.lowValue = record.value * (1 - this.randomErrorPercentage());
            record.highValue = record.value * (1 + this.randomErrorPercentage());
        }
    }
    return this.Super('setData', arguments);
};
let onErrorBarsInitWidget = function () {
    var timeFacet = this.facets.find('id', 'Time'), timeFacetValueIds = [
            '12/1/2020',
            '11/1/2020',
            '10/1/2020',
            '9/1/2020',
            '8/1/2020',
            '7/1/2020',
            '6/1/2020',
            '5/1/2020',
            '4/1/2020',
            '3/1/2020',
            '2/1/2020',
            '1/1/2020',
            '12/1/2019',
            '11/1/2019',
            '10/1/2019',
            '9/1/2019',
            '8/1/2019',
            '7/1/2019',
            '6/1/2019',
            '5/1/2019',
            '4/1/2019',
            '3/1/2019',
            '2/1/2019',
            '1/1/2019',
            '12/1/2018',
            '11/1/2018',
            '10/1/2018',
            '9/1/2018',
            '8/1/2018',
            '7/1/2018',
            '6/1/2018',
            '5/1/2018',
            '4/1/2018',
            '3/1/2018',
            '2/1/2018',
            '1/1/2018'
        ];
    timeFacet.values = [];
    for (var i = 0; i < timeFacetValueIds.length; ++i) {
        var valueId = timeFacetValueIds[i], year = valueId.substring(valueId.lastIndexOf('/') + 1), month = valueId.substring(0, valueId.indexOf('/')), quarter = Math.ceil(parseInt(month) / 3);
        timeFacet.values[i] = {
            id: valueId,
            title: valueId,
            parentId: 'Q' + quarter + '-' + year
        };
    }
    return this.Super('initWidget', arguments);
};

var productRevenue = isc.DataSource.get('productRevenue');

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout width="100%" height="100%">
        <members>
            <FacetChart chartType="Line" stacked="false" title="Error Bars" showLegend="false" showDataPoints="true" ID="errorBars" metricFacetId="errorMetrics" lowErrorMetric="lowValue" highErrorMetric="highValue" updateData={onErrorBarsUpdateData} randomErrorPercentage={onErrorBarsRandomErrorPercentage} setData={onErrorBarsSetData} initWidget={onErrorBarsInitWidget}>
                <facets>
                    <Facet id="Time"/>
                    <Facet id="Regions"/>
                    <Facet id="errorMetrics" inlinedValues="true">
                        <values>
                            <FacetValue id="value"/>
                            <FacetValue id="lowValue"/>
                            <FacetValue id="highValue"/>
                        </values>
                    </Facet>
                </facets>
            </FacetChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);

errorBars.updateData();
