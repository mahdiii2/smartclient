/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, Facet, FacetChart, HLayout, SelectItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onChartTypeChanged = function (form, item, value) {
    multiSeriesChart.setChartType(value);
};

var data = [
    {
        time: '1/1/2018',
        value: 108.88,
        region: 'North'
    },
    {
        time: '1/1/2018',
        value: 891.93,
        region: 'South'
    },
    {
        time: '1/1/2018',
        value: 715.13,
        region: 'East'
    },
    {
        time: '1/1/2018',
        value: 559.34,
        region: 'West'
    },
    {
        time: '2/1/2018',
        value: 626.63,
        region: 'North'
    },
    {
        time: '2/1/2018',
        value: 637.73,
        region: 'South'
    },
    {
        time: '2/1/2018',
        value: 976.97,
        region: 'East'
    },
    {
        time: '2/1/2018',
        value: 216.27,
        region: 'West'
    },
    {
        time: '3/1/2018',
        value: 799.18,
        region: 'North'
    },
    {
        time: '3/1/2018',
        value: 916.38,
        region: 'South'
    },
    {
        time: '3/1/2018',
        value: 853.82,
        region: 'East'
    },
    {
        time: '3/1/2018',
        value: 344.79,
        region: 'West'
    },
    {
        time: '4/1/2018',
        value: 707.1,
        region: 'North'
    },
    {
        time: '4/1/2018',
        value: 796.73,
        region: 'South'
    },
    {
        time: '4/1/2018',
        value: 590.05,
        region: 'East'
    },
    {
        time: '4/1/2018',
        value: 209.03,
        region: 'West'
    },
    {
        time: '5/1/2018',
        value: 321.58,
        region: 'North'
    },
    {
        time: '5/1/2018',
        value: 363.25,
        region: 'South'
    },
    {
        time: '5/1/2018',
        value: 446.66,
        region: 'East'
    },
    {
        time: '5/1/2018',
        value: 338.79,
        region: 'West'
    },
    {
        time: '6/1/2018',
        value: 423.43,
        region: 'North'
    },
    {
        time: '6/1/2018',
        value: 216.04,
        region: 'South'
    },
    {
        time: '6/1/2018',
        value: 511.3,
        region: 'East'
    },
    {
        time: '6/1/2018',
        value: 292.49,
        region: 'West'
    },
    {
        time: '7/1/2018',
        value: 837.1,
        region: 'North'
    },
    {
        time: '7/1/2018',
        value: 970.83,
        region: 'South'
    },
    {
        time: '7/1/2018',
        value: 888.2,
        region: 'East'
    },
    {
        time: '7/1/2018',
        value: 842.14,
        region: 'West'
    },
    {
        time: '8/1/2018',
        value: 975.65,
        region: 'North'
    },
    {
        time: '8/1/2018',
        value: 758.96,
        region: 'South'
    },
    {
        time: '8/1/2018',
        value: 853.26,
        region: 'East'
    },
    {
        time: '8/1/2018',
        value: 103.42,
        region: 'West'
    },
    {
        time: '9/1/2018',
        value: 440.78,
        region: 'North'
    },
    {
        time: '9/1/2018',
        value: 727.4,
        region: 'South'
    },
    {
        time: '9/1/2018',
        value: 822.97,
        region: 'East'
    },
    {
        time: '9/1/2018',
        value: 405.61,
        region: 'West'
    },
    {
        time: '10/1/2018',
        value: 327.79,
        region: 'North'
    },
    {
        time: '10/1/2018',
        value: 538.75,
        region: 'South'
    },
    {
        time: '10/1/2018',
        value: 854.46,
        region: 'East'
    },
    {
        time: '10/1/2018',
        value: 106.61,
        region: 'West'
    },
    {
        time: '11/1/2018',
        value: 451.64,
        region: 'North'
    },
    {
        time: '11/1/2018',
        value: 871.23,
        region: 'South'
    },
    {
        time: '11/1/2018',
        value: 145.49,
        region: 'East'
    },
    {
        time: '11/1/2018',
        value: 829.97,
        region: 'West'
    },
    {
        time: '12/1/2018',
        value: 178.88,
        region: 'North'
    },
    {
        time: '12/1/2018',
        value: 918.7,
        region: 'South'
    },
    {
        time: '12/1/2018',
        value: 534.44,
        region: 'East'
    },
    {
        time: '12/1/2018',
        value: 964.85,
        region: 'West'
    },
    {
        time: '1/1/2019',
        value: 122.72,
        region: 'North'
    },
    {
        time: '1/1/2019',
        value: 890.61,
        region: 'South'
    },
    {
        time: '1/1/2019',
        value: 234.3,
        region: 'East'
    },
    {
        time: '1/1/2019',
        value: 166.02,
        region: 'West'
    },
    {
        time: '2/1/2019',
        value: 252.96,
        region: 'North'
    },
    {
        time: '2/1/2019',
        value: 512.08,
        region: 'South'
    },
    {
        time: '2/1/2019',
        value: 162.72,
        region: 'East'
    },
    {
        time: '2/1/2019',
        value: 853.91,
        region: 'West'
    },
    {
        time: '3/1/2019',
        value: 786.04,
        region: 'North'
    },
    {
        time: '3/1/2019',
        value: 523.83,
        region: 'South'
    },
    {
        time: '3/1/2019',
        value: 781.93,
        region: 'East'
    },
    {
        time: '3/1/2019',
        value: 714.54,
        region: 'West'
    },
    {
        time: '4/1/2019',
        value: 490.04,
        region: 'North'
    },
    {
        time: '4/1/2019',
        value: 182.19,
        region: 'South'
    },
    {
        time: '4/1/2019',
        value: 258.83,
        region: 'East'
    },
    {
        time: '4/1/2019',
        value: 199.57,
        region: 'West'
    },
    {
        time: '5/1/2019',
        value: 232.65,
        region: 'North'
    },
    {
        time: '5/1/2019',
        value: 759.15,
        region: 'South'
    },
    {
        time: '5/1/2019',
        value: 134.91,
        region: 'East'
    },
    {
        time: '5/1/2019',
        value: 269.29,
        region: 'West'
    },
    {
        time: '6/1/2019',
        value: 436.18,
        region: 'North'
    },
    {
        time: '6/1/2019',
        value: 423.31,
        region: 'South'
    },
    {
        time: '6/1/2019',
        value: 592.31,
        region: 'East'
    },
    {
        time: '6/1/2019',
        value: 677.62,
        region: 'West'
    },
    {
        time: '7/1/2019',
        value: 667.57,
        region: 'North'
    },
    {
        time: '7/1/2019',
        value: 834.87,
        region: 'South'
    },
    {
        time: '7/1/2019',
        value: 953.77,
        region: 'East'
    },
    {
        time: '7/1/2019',
        value: 902.08,
        region: 'West'
    },
    {
        time: '8/1/2019',
        value: 485.39,
        region: 'North'
    },
    {
        time: '8/1/2019',
        value: 455.7,
        region: 'South'
    },
    {
        time: '8/1/2019',
        value: 182.68,
        region: 'East'
    },
    {
        time: '8/1/2019',
        value: 213.83,
        region: 'West'
    },
    {
        time: '9/1/2019',
        value: 799.83,
        region: 'North'
    },
    {
        time: '9/1/2019',
        value: 239.27,
        region: 'South'
    },
    {
        time: '9/1/2019',
        value: 383.04,
        region: 'East'
    },
    {
        time: '9/1/2019',
        value: 392.67,
        region: 'West'
    },
    {
        time: '10/1/2019',
        value: 533.71,
        region: 'North'
    },
    {
        time: '10/1/2019',
        value: 352.66,
        region: 'South'
    },
    {
        time: '10/1/2019',
        value: 299.48,
        region: 'East'
    },
    {
        time: '10/1/2019',
        value: 983.99,
        region: 'West'
    },
    {
        time: '11/1/2019',
        value: 752.46,
        region: 'North'
    },
    {
        time: '11/1/2019',
        value: 710.61,
        region: 'South'
    },
    {
        time: '11/1/2019',
        value: 817.26,
        region: 'East'
    },
    {
        time: '11/1/2019',
        value: 798.84,
        region: 'West'
    },
    {
        time: '12/1/2019',
        value: 349.16,
        region: 'North'
    },
    {
        time: '12/1/2019',
        value: 645.47,
        region: 'South'
    },
    {
        time: '12/1/2019',
        value: 462.25,
        region: 'East'
    },
    {
        time: '12/1/2019',
        value: 413.88,
        region: 'West'
    },
    {
        time: '1/1/2020',
        value: 107.5,
        region: 'North'
    },
    {
        time: '1/1/2020',
        value: 237.2,
        region: 'South'
    },
    {
        time: '1/1/2020',
        value: 900.95,
        region: 'East'
    },
    {
        time: '1/1/2020',
        value: 671.39,
        region: 'West'
    },
    {
        time: '2/1/2020',
        value: 201.79,
        region: 'North'
    },
    {
        time: '2/1/2020',
        value: 398.4,
        region: 'South'
    },
    {
        time: '2/1/2020',
        value: 440.5,
        region: 'East'
    },
    {
        time: '2/1/2020',
        value: 179.28,
        region: 'West'
    },
    {
        time: '3/1/2020',
        value: 696.97,
        region: 'North'
    },
    {
        time: '3/1/2020',
        value: 572.3,
        region: 'South'
    },
    {
        time: '3/1/2020',
        value: 528.65,
        region: 'East'
    },
    {
        time: '3/1/2020',
        value: 811.09,
        region: 'West'
    },
    {
        time: '4/1/2020',
        value: 482.62,
        region: 'North'
    },
    {
        time: '4/1/2020',
        value: 657.75,
        region: 'South'
    },
    {
        time: '4/1/2020',
        value: 253.78,
        region: 'East'
    },
    {
        time: '4/1/2020',
        value: 205.98,
        region: 'West'
    },
    {
        time: '5/1/2020',
        value: 602.92,
        region: 'North'
    },
    {
        time: '5/1/2020',
        value: 659.21,
        region: 'South'
    },
    {
        time: '5/1/2020',
        value: 844.88,
        region: 'East'
    },
    {
        time: '5/1/2020',
        value: 268.72,
        region: 'West'
    },
    {
        time: '6/1/2020',
        value: 961.68,
        region: 'North'
    },
    {
        time: '6/1/2020',
        value: 367.78,
        region: 'South'
    },
    {
        time: '6/1/2020',
        value: 171.6,
        region: 'East'
    },
    {
        time: '6/1/2020',
        value: 669.74,
        region: 'West'
    },
    {
        time: '7/1/2020',
        value: 157.36,
        region: 'North'
    },
    {
        time: '7/1/2020',
        value: 781.19,
        region: 'South'
    },
    {
        time: '7/1/2020',
        value: 244.19,
        region: 'East'
    },
    {
        time: '7/1/2020',
        value: 345.07,
        region: 'West'
    },
    {
        time: '8/1/2020',
        value: 803.01,
        region: 'North'
    },
    {
        time: '8/1/2020',
        value: 398.78,
        region: 'South'
    },
    {
        time: '8/1/2020',
        value: 713.52,
        region: 'East'
    },
    {
        time: '8/1/2020',
        value: 996.36,
        region: 'West'
    },
    {
        time: '9/1/2020',
        value: 942.33,
        region: 'North'
    },
    {
        time: '9/1/2020',
        value: 411.54,
        region: 'South'
    },
    {
        time: '9/1/2020',
        value: 371.09,
        region: 'East'
    },
    {
        time: '9/1/2020',
        value: 590.91,
        region: 'West'
    },
    {
        time: '10/1/2020',
        value: 874.63,
        region: 'North'
    },
    {
        time: '10/1/2020',
        value: 857.04,
        region: 'South'
    },
    {
        time: '10/1/2020',
        value: 649.05,
        region: 'East'
    },
    {
        time: '10/1/2020',
        value: 861.61,
        region: 'West'
    },
    {
        time: '11/1/2020',
        value: 789.86,
        region: 'North'
    },
    {
        time: '11/1/2020',
        value: 788.52,
        region: 'South'
    },
    {
        time: '11/1/2020',
        value: 120.13,
        region: 'East'
    },
    {
        time: '11/1/2020',
        value: 807.02,
        region: 'West'
    },
    {
        time: '12/1/2020',
        value: 268.58,
        region: 'North'
    },
    {
        time: '12/1/2020',
        value: 774.83,
        region: 'South'
    },
    {
        time: '12/1/2020',
        value: 997.72,
        region: 'East'
    },
    {
        time: '12/1/2020',
        value: 191.29,
        region: 'West'
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" ID="multiSeriesChartLayout" width="100%" height="100%">
        <members>
            <HLayout height="40">
                <members>
                    <DynamicForm ID="chartSelector" wrapItemTitles="false" width="25%">
                        <items>
                            <SelectItem name="chartType" title="Chart Type" defaultValue="Area" changed={onChartTypeChanged}>
                                <valueMap>
                                        <value>Area</value>
                                        <value>Column</value>
                                        <value>Bar</value>
                                        <value>Line</value>
                                        <value>Pie</value>
                                        <value>Doughnut</value>
                                        <value>Radar</value>
                                </valueMap>
                            </SelectItem>
                        </items>
                    </DynamicForm>
                </members>
            </HLayout>
            <FacetChart data={data} chartType="Area" title="Revenue" valueProperty="value" ID="multiSeriesChart">
                <facets>
                    <Facet id="time" title="Period"/>
                    <Facet id="region" title="Region"/>
                </facets>
            </FacetChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);

chartSelector.observe(multiSeriesChart, 'setChartType', 'chartSelector.getItem(\'chartType\').setValue(multiSeriesChart.chartType)');
