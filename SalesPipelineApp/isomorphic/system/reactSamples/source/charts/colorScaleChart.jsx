/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, ColorItem, DynamicForm, Facet, FacetChart, FacetValue, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onOptionsSubmitValues = function (values, form) {
    form.setValues(values);
};
let onUseMultiplePointShapesChanged = function (form, item, value) {
    colorScaleChart.setUseMultiplePointShapes(value);
};
let onScaleStartColorChanged = function (form, item, value) {
    colorScaleChart.setScaleStartColor(value);
};
let onScaleEndColorChanged = function (form, item, value) {
    colorScaleChart.setScaleEndColor(value);
};

var chartData = [
    {
        series: 'B',
        time: 121.33,
        value: 1108.02,
        volume: 270.75,
        heat: 14.52
    },
    {
        series: 'A',
        time: 91.13,
        value: 808.26,
        volume: 174.3,
        heat: 112.18
    },
    {
        series: 'B',
        time: 40.59,
        value: 1343.79,
        volume: 372.61,
        heat: 100.35
    },
    {
        series: 'B',
        time: 43.26,
        value: 1669.22,
        volume: 383.46,
        heat: 217.34
    },
    {
        series: 'A',
        time: 160.12,
        value: 1252.15,
        volume: 221.53,
        heat: 23.59
    },
    {
        series: 'B',
        time: 84.16,
        value: 1225.68,
        volume: 209.86,
        heat: 41.66
    },
    {
        series: 'B',
        time: 77.49,
        value: 1070.77,
        volume: 280.73,
        heat: 12.06
    },
    {
        series: 'A',
        time: 98.58,
        value: 849.73,
        volume: 210.82,
        heat: 99.87
    },
    {
        series: 'B',
        time: 181.56,
        value: 1238.87,
        volume: 290.31,
        heat: 10.97
    },
    {
        series: 'A',
        time: 197.37,
        value: 1509.43,
        volume: 236.01,
        heat: 103.29
    },
    {
        series: 'B',
        time: 137.08,
        value: 1157.38,
        volume: 152.69,
        heat: 2.37
    },
    {
        series: 'A',
        time: 92.05,
        value: 885.46,
        volume: 180.25,
        heat: 84.54
    },
    {
        series: 'A',
        time: 104.73,
        value: 831.93,
        volume: 232.78,
        heat: 108.56
    },
    {
        series: 'A',
        time: 194.69,
        value: 1406.32,
        volume: 225.47,
        heat: 66.89
    },
    {
        series: 'A',
        time: 87.87,
        value: 879.87,
        volume: 155.13,
        heat: 85.04
    },
    {
        series: 'B',
        time: 52.27,
        value: 1402.3,
        volume: 482.11,
        heat: 117.3
    },
    {
        series: 'A',
        time: 193.7,
        value: 1571.23,
        volume: 219.45,
        heat: 127.02
    },
    {
        series: 'A',
        time: 131.35,
        value: 1161.24,
        volume: 123.79,
        heat: 1.12
    },
    {
        series: 'A',
        time: 3.6,
        value: 553.28,
        volume: 449.69,
        heat: 172.73
    },
    {
        series: 'A',
        time: 54.11,
        value: 725.29,
        volume: 358.03,
        heat: 128.78
    },
    {
        series: 'A',
        time: 26.21,
        value: 867.39,
        volume: 200.06,
        heat: 67.11
    },
    {
        series: 'B',
        time: 137.87,
        value: 1165.61,
        volume: 152.19,
        heat: 0.33
    },
    {
        series: 'A',
        time: 119.94,
        value: 1139.37,
        volume: 204.71,
        heat: 2.65
    },
    {
        series: 'A',
        time: 74.47,
        value: 905.56,
        volume: 228.56,
        heat: 70.85
    },
    {
        series: 'A',
        time: 42.99,
        value: 596.3,
        volume: 273.07,
        heat: 171.48
    },
    {
        series: 'A',
        time: 149.48,
        value: 1082.28,
        volume: 143.72,
        heat: 34.11
    },
    {
        series: 'B',
        time: 122.86,
        value: 976.88,
        volume: 253.24,
        heat: 62.62
    },
    {
        series: 'B',
        time: 108.43,
        value: 1328.97,
        volume: 344.17,
        heat: 70.27
    },
    {
        series: 'A',
        time: 151.42,
        value: 1158.54,
        volume: 158.97,
        heat: 7.17
    },
    {
        series: 'A',
        time: 199.35,
        value: 1392.55,
        volume: 237.92,
        heat: 60.2
    },
    {
        series: 'A',
        time: 54.33,
        value: 813.15,
        volume: 359.18,
        heat: 97.01
    },
    {
        series: 'B',
        time: 155.06,
        value: 1542.14,
        volume: 267.23,
        heat: 130.55
    },
    {
        series: 'A',
        time: 93.08,
        value: 791.92,
        volume: 186.6,
        heat: 118.82
    },
    {
        series: 'B',
        time: 169.81,
        value: 1443.66,
        volume: 315.8,
        heat: 89.48
    },
    {
        series: 'B',
        time: 83.2,
        value: 1115.06,
        volume: 214.21,
        heat: 1.92
    },
    {
        series: 'B',
        time: 16.94,
        value: 1041.48,
        volume: 446.34,
        heat: 0.62
    },
    {
        series: 'A',
        time: 95.29,
        value: 832.98,
        volume: 198.3,
        heat: 104.74
    },
    {
        series: 'A',
        time: 151.94,
        value: 1105.88,
        volume: 163.43,
        heat: 26.45
    },
    {
        series: 'B',
        time: 152.93,
        value: 1574.95,
        volume: 241.01,
        heat: 143.22
    },
    {
        series: 'B',
        time: 33.78,
        value: 1257.78,
        volume: 304.3,
        heat: 71.65
    },
    {
        series: 'A',
        time: 67.42,
        value: 943.87,
        volume: 272.6,
        heat: 54.39
    },
    {
        series: 'B',
        time: 183.59,
        value: 1354.74,
        volume: 273.41,
        heat: 52.23
    },
    {
        series: 'B',
        time: 54.46,
        value: 1346.56,
        volume: 503.73,
        heat: 96.3
    },
    {
        series: 'B',
        time: 119.28,
        value: 1117.24,
        volume: 293.94,
        heat: 10.44
    },
    {
        series: 'B',
        time: 90.32,
        value: 1492.93,
        volume: 236.66,
        heat: 136.3
    },
    {
        series: 'B',
        time: 182.89,
        value: 1237.01,
        volume: 278.86,
        heat: 9.81
    },
    {
        series: 'A',
        time: 172.44,
        value: 1438.14,
        volume: 229.65,
        heat: 86.52
    },
    {
        series: 'B',
        time: 0.96,
        value: 871.81,
        volume: 657.88,
        heat: 56.31
    },
    {
        series: 'A',
        time: 137.14,
        value: 1191.7,
        volume: 109.02,
        heat: 10.05
    },
    {
        series: 'B',
        time: 69.8,
        value: 922.65,
        volume: 361.29,
        heat: 62.95
    }
];
var defaultUseMultiplePointShapes = true, defaultStartColor = '#0000FF', defaultEndColor = '#FF0000';

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" width="100%" height="100%">
        <members>
            <DynamicForm ID="options" numCols="6" colWidths="20,*,90,*,80,*" saveOnEnter="true" width="600" autoDraw="false" submitValues={onOptionsSubmitValues}>
                <items>
                    <CheckboxItem defaultValue={defaultUseMultiplePointShapes} name="useMultiplePointShapes" title="Use Multiple Shapes" changed={onUseMultiplePointShapesChanged}/>
                    <ColorItem defaultValue={defaultStartColor} name="scaleStartColor" title="Start Color" width="100" keyPressFilter="[0-9a-fA-F#]" changed={onScaleStartColorChanged}/>
                    <ColorItem defaultValue={defaultEndColor} name="scaleEndColor" title="End Color" width="100" keyPressFilter="[0-9a-fA-F#]" changed={onScaleEndColorChanged}/>
                </items>
            </DynamicForm>
            <FacetChart data={chartData} chartType="Bubble" title="colorScaleChart" showTitle="false" showChartRect="true" chartRectMargin="15" showBubbleLegendPerShape="true" pointSizeMetric="volume" minDataPointSize="10" maxDataPointSize="50" useMultiplePointShapes={defaultUseMultiplePointShapes} scaleStartColor={defaultStartColor} scaleEndColor={defaultEndColor} showValueOnHover="true" ID="colorScaleChart" autoDraw="false" xAxisMetric="time" yAxisMetric="value" colorScaleMetric="heat" bandedBackground="false">
                <facets>
                    <Facet id="metric" inlinedValues="true">
                        <values>
                            <FacetValue id="value"/>
                            <FacetValue id="time"/>
                            <FacetValue id="volume" title="Volume"/>
                            <FacetValue id="heat" title="Heat"/>
                        </values>
                    </Facet>
                    <Facet id="series">
                        <values>
                            <FacetValue id="A" title="Series A"/>
                            <FacetValue id="B" title="Series B"/>
                        </values>
                    </Facet>
                </facets>
                <chartRectProperties rounding="0.05" lineWidth="1" lineColor="#bbbbbb"/>
                <dataColors>
                    <value>#ffffff</value>
                </dataColors>

                <bubbleProperties lineWidth="1" lineColor="#000000"/>
            </FacetChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);
