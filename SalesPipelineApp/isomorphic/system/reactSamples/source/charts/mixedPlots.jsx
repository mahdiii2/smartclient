/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Facet, FacetChart, FacetValue, HLayout, MetricSettings } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var data = [
    {
        time: '1/1/2018',
        region: 'North',
        value: 273301.3,
        avg: 252814.96
    },
    {
        time: '1/1/2018',
        region: 'South',
        value: 236640.29,
        avg: null
    },
    {
        time: '1/1/2018',
        region: 'East',
        value: 248503.3,
        avg: null
    },
    {
        time: '2/1/2018',
        region: 'North',
        value: 223927.43,
        avg: 207244.16
    },
    {
        time: '2/1/2018',
        region: 'South',
        value: 204233.69,
        avg: null
    },
    {
        time: '2/1/2018',
        region: 'East',
        value: 193571.37,
        avg: null
    },
    {
        time: '3/1/2018',
        region: 'North',
        value: 194384.87,
        avg: 195947.73
    },
    {
        time: '3/1/2018',
        region: 'South',
        value: 158575.65,
        avg: null
    },
    {
        time: '3/1/2018',
        region: 'East',
        value: 200993.35,
        avg: null
    },
    {
        time: '4/1/2018',
        region: 'North',
        value: 120787.66,
        avg: 173890.17
    },
    {
        time: '4/1/2018',
        region: 'South',
        value: 108664.38,
        avg: null
    },
    {
        time: '4/1/2018',
        region: 'East',
        value: 159873.11,
        avg: null
    },
    {
        time: '5/1/2018',
        region: 'North',
        value: 105341.85,
        avg: 140977.45
    },
    {
        time: '5/1/2018',
        region: 'South',
        value: 118100.72,
        avg: null
    },
    {
        time: '5/1/2018',
        region: 'East',
        value: 102075.45,
        avg: null
    },
    {
        time: '6/1/2018',
        region: 'North',
        value: 129535.28,
        avg: 124700.46
    },
    {
        time: '6/1/2018',
        region: 'South',
        value: 124477.2,
        avg: null
    },
    {
        time: '6/1/2018',
        region: 'East',
        value: 153448.5,
        avg: null
    },
    {
        time: '7/1/2018',
        region: 'North',
        value: 188027.83,
        avg: 145510.17
    },
    {
        time: '7/1/2018',
        region: 'South',
        value: 184790.62,
        avg: null
    },
    {
        time: '7/1/2018',
        region: 'East',
        value: 203794.04,
        avg: null
    },
    {
        time: '8/1/2018',
        region: 'North',
        value: 253405.04,
        avg: 191837.88
    },
    {
        time: '8/1/2018',
        region: 'South',
        value: 268266.22,
        avg: null
    },
    {
        time: '8/1/2018',
        region: 'East',
        value: 220796.2,
        avg: null
    },
    {
        time: '9/1/2018',
        region: 'North',
        value: 208493.32,
        avg: 210964.16
    },
    {
        time: '9/1/2018',
        region: 'South',
        value: 180585.5,
        avg: null
    },
    {
        time: '9/1/2018',
        region: 'East',
        value: 190518.7,
        avg: null
    },
    {
        time: '10/1/2018',
        region: 'North',
        value: 232447.47,
        avg: 233237.09
    },
    {
        time: '10/1/2018',
        region: 'South',
        value: 268766.1,
        avg: null
    },
    {
        time: '10/1/2018',
        region: 'East',
        value: 275855.25,
        avg: null
    },
    {
        time: '11/1/2018',
        region: 'North',
        value: 255063.17,
        avg: 238155.79
    },
    {
        time: '11/1/2018',
        region: 'South',
        value: 232309.79,
        avg: null
    },
    {
        time: '11/1/2018',
        region: 'East',
        value: 299362.79,
        avg: null
    },
    {
        time: '12/1/2018',
        region: 'North',
        value: 327862,
        avg: 271830.43
    },
    {
        time: '12/1/2018',
        region: 'South',
        value: 257422.85,
        avg: null
    },
    {
        time: '12/1/2018',
        region: 'East',
        value: 297384.45,
        avg: null
    },
    {
        time: '1/1/2019',
        region: 'North',
        value: 198744.42,
        avg: 251929.62
    },
    {
        time: '1/1/2019',
        region: 'South',
        value: 202448.27,
        avg: null
    },
    {
        time: '1/1/2019',
        region: 'East',
        value: 196768.88,
        avg: null
    },
    {
        time: '2/1/2019',
        region: 'North',
        value: 247706.63,
        avg: 250501.81
    },
    {
        time: '2/1/2019',
        region: 'South',
        value: 261700.59,
        avg: null
    },
    {
        time: '2/1/2019',
        region: 'East',
        value: 264478.17,
        avg: null
    },
    {
        time: '3/1/2019',
        region: 'North',
        value: 162535.11,
        avg: 218096.33
    },
    {
        time: '3/1/2019',
        region: 'South',
        value: 214015.47,
        avg: null
    },
    {
        time: '3/1/2019',
        region: 'East',
        value: 214469.42,
        avg: null
    },
    {
        time: '4/1/2019',
        region: 'North',
        value: 179732.18,
        avg: 206283.06
    },
    {
        time: '4/1/2019',
        region: 'South',
        value: 140931.62,
        avg: null
    },
    {
        time: '4/1/2019',
        region: 'East',
        value: 170978.35,
        avg: null
    },
    {
        time: '5/1/2019',
        region: 'North',
        value: 139900.11,
        avg: 174773.97
    },
    {
        time: '5/1/2019',
        region: 'South',
        value: 181184.74,
        avg: null
    },
    {
        time: '5/1/2019',
        region: 'East',
        value: 169218.76,
        avg: null
    },
    {
        time: '6/1/2019',
        region: 'North',
        value: 150541.13,
        avg: 158317.9
    },
    {
        time: '6/1/2019',
        region: 'South',
        value: 135382.93,
        avg: null
    },
    {
        time: '6/1/2019',
        region: 'East',
        value: 156991.25,
        avg: null
    },
    {
        time: '7/1/2019',
        region: 'North',
        value: 206302.8,
        avg: 171598.23
    },
    {
        time: '7/1/2019',
        region: 'South',
        value: 179606.25,
        avg: null
    },
    {
        time: '7/1/2019',
        region: 'East',
        value: 225256.12,
        avg: null
    },
    {
        time: '8/1/2019',
        region: 'North',
        value: 238812.8,
        avg: 195490.23
    },
    {
        time: '8/1/2019',
        region: 'South',
        value: 259538.78,
        avg: null
    },
    {
        time: '8/1/2019',
        region: 'East',
        value: 206980,
        avg: null
    },
    {
        time: '9/1/2019',
        region: 'North',
        value: 328968.24,
        avg: 250363.66
    },
    {
        time: '9/1/2019',
        region: 'South',
        value: 333338.53,
        avg: null
    },
    {
        time: '9/1/2019',
        region: 'East',
        value: 274469.39,
        avg: null
    },
    {
        time: '10/1/2019',
        region: 'North',
        value: 254834.63,
        avg: 277934.27
    },
    {
        time: '10/1/2019',
        region: 'South',
        value: 291766.69,
        avg: null
    },
    {
        time: '10/1/2019',
        region: 'East',
        value: 312699.37,
        avg: null
    },
    {
        time: '11/1/2019',
        region: 'North',
        value: 276865.79,
        avg: 292184.73
    },
    {
        time: '11/1/2019',
        region: 'South',
        value: 279437.91,
        avg: null
    },
    {
        time: '11/1/2019',
        region: 'East',
        value: 277282.05,
        avg: null
    },
    {
        time: '12/1/2019',
        region: 'North',
        value: 315322.45,
        avg: 289039.35
    },
    {
        time: '12/1/2019',
        region: 'South',
        value: 282709.72,
        avg: null
    },
    {
        time: '12/1/2019',
        region: 'East',
        value: 310435.53,
        avg: null
    },
    {
        time: '1/1/2020',
        region: 'North',
        value: 297229.72,
        avg: 288590.58
    },
    {
        time: '1/1/2020',
        region: 'South',
        value: 298069.62,
        avg: null
    },
    {
        time: '1/1/2020',
        region: 'East',
        value: 259962.44,
        avg: null
    },
    {
        time: '2/1/2020',
        region: 'North',
        value: 250639.62,
        avg: 277592.73
    },
    {
        time: '2/1/2020',
        region: 'South',
        value: 245414.34,
        avg: null
    },
    {
        time: '2/1/2020',
        region: 'East',
        value: 238551.11,
        avg: null
    },
    {
        time: '3/1/2020',
        region: 'North',
        value: 237270.12,
        avg: 250380.75
    },
    {
        time: '3/1/2020',
        region: 'South',
        value: 224388.74,
        avg: null
    },
    {
        time: '3/1/2020',
        region: 'East',
        value: 201901.06,
        avg: null
    },
    {
        time: '4/1/2020',
        region: 'North',
        value: 218251.5,
        avg: 237105.82
    },
    {
        time: '4/1/2020',
        region: 'South',
        value: 260283.96,
        avg: null
    },
    {
        time: '4/1/2020',
        region: 'East',
        value: 257251.93,
        avg: null
    },
    {
        time: '5/1/2020',
        region: 'North',
        value: 279112.79,
        avg: 251849.67
    },
    {
        time: '5/1/2020',
        region: 'South',
        value: 326799.53,
        avg: null
    },
    {
        time: '5/1/2020',
        region: 'East',
        value: 261387.39,
        avg: null
    },
    {
        time: '6/1/2020',
        region: 'North',
        value: 340678.71,
        avg: 275323.81
    },
    {
        time: '6/1/2020',
        region: 'South',
        value: 269953.2,
        avg: null
    },
    {
        time: '6/1/2020',
        region: 'East',
        value: 264195.29,
        avg: null
    },
    {
        time: '7/1/2020',
        region: 'North',
        value: 250903.88,
        avg: 282271.84
    },
    {
        time: '7/1/2020',
        region: 'South',
        value: 273476.68,
        avg: null
    },
    {
        time: '7/1/2020',
        region: 'East',
        value: 273939.08,
        avg: null
    },
    {
        time: '8/1/2020',
        region: 'North',
        value: 335509.77,
        avg: 301101.45
    },
    {
        time: '8/1/2020',
        region: 'South',
        value: 322519.62,
        avg: null
    },
    {
        time: '8/1/2020',
        region: 'East',
        value: 378736.78,
        avg: null
    },
    {
        time: '9/1/2020',
        region: 'North',
        value: 340214,
        avg: 306887.06
    },
    {
        time: '9/1/2020',
        region: 'South',
        value: 286959.27,
        avg: null
    },
    {
        time: '9/1/2020',
        region: 'East',
        value: 299724.47,
        avg: null
    },
    {
        time: '10/1/2020',
        region: 'North',
        value: 317074.09,
        avg: 323779.85
    },
    {
        time: '10/1/2020',
        region: 'South',
        value: 309380.6,
        avg: null
    },
    {
        time: '10/1/2020',
        region: 'East',
        value: 323900.04,
        avg: null
    },
    {
        time: '11/1/2020',
        region: 'North',
        value: 356229.82,
        avg: 330691.48
    },
    {
        time: '11/1/2020',
        region: 'South',
        value: 395235.13,
        avg: null
    },
    {
        time: '11/1/2020',
        region: 'East',
        value: 347505.9,
        avg: null
    },
    {
        time: '12/1/2020',
        region: 'North',
        value: 361720.95,
        avg: 348046.81
    },
    {
        time: '12/1/2020',
        region: 'South',
        value: 398000.15,
        avg: null
    },
    {
        time: '12/1/2020',
        region: 'East',
        value: 323374.59,
        avg: null
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout width="100%" height="100%">
        <members>
            <FacetChart data={data} chartType="Column" stacked="false" title="Revenue" ID="mixedPlotsChart">
                <facets>
                    <Facet id="time" title="Period"/>
                    <Facet id="region" title="Region"/>
                    <Facet id="metric" inlinedValues="true">
                        <values>
                            <FacetValue id="value" title="Value"/>
                            <FacetValue id="avg" title="Projected Average"/>
                        </values>
                    </Facet>
                </facets>
                <extraAxisMetrics>
                    <value>avg</value>
                </extraAxisMetrics>

                <extraAxisSettings>
                    <MetricSettings chartType="Line" multiFacet="false" fixedFacetValue="North" legendLabel="Projected Average" showAxis="false" matchGradations="value"/>
                </extraAxisSettings>
            </FacetChart>
        </members>
    </HLayout>,
    document.getElementById(target)
);
