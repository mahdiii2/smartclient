/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, DynamicForm, Facet, FacetChart, FacetValue, SelectItem, SpinnerItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onShowRegressionChanged = function(form,item,value) {return regressionChart.setShowRegressionLine(value)};
let onLineTypeChanged = function(form,item,value) {return regressionChart.setRegressionLineType(value == 'linear' ? 'line' : 'polynomial')};
let onDegreeChanged = function(form,item,value) {return regressionChart.setRegressionPolynomialDegree(value)};

var chartData = [
    {
        time: 0,
        value: 50.946
    },
    {
        time: 1,
        value: 62.544
    },
    {
        time: 2,
        value: 50.456
    },
    {
        time: 3,
        value: 70.03
    },
    {
        time: 4,
        value: 86.885
    },
    {
        time: 5,
        value: 75.987
    },
    {
        time: 6,
        value: 85.668
    },
    {
        time: 7,
        value: 115.721
    },
    {
        time: 8,
        value: 146.745
    },
    {
        time: 9,
        value: 139.255
    },
    {
        time: 10,
        value: 88.063
    },
    {
        time: 11,
        value: 91.356
    },
    {
        time: 12,
        value: 123.342
    },
    {
        time: 13,
        value: 83.71
    },
    {
        time: 14,
        value: 116.391
    },
    {
        time: 15,
        value: 116.466
    },
    {
        time: 16,
        value: 118.405
    },
    {
        time: 17,
        value: 108.053
    },
    {
        time: 18,
        value: 49.787
    },
    {
        time: 19,
        value: 99.652
    },
    {
        time: 20,
        value: 117.136
    },
    {
        time: 21,
        value: 103.006
    },
    {
        time: 22,
        value: 161.445
    },
    {
        time: 23,
        value: 130.932
    },
    {
        time: 24,
        value: 121.054
    },
    {
        time: 25,
        value: 101
    },
    {
        time: 26,
        value: 92.111
    },
    {
        time: 27,
        value: 113.217
    },
    {
        time: 28,
        value: 87.579
    },
    {
        time: 29,
        value: 69.009
    },
    {
        time: 30,
        value: 78.862
    },
    {
        time: 31,
        value: 125.02
    },
    {
        time: 32,
        value: 62.803
    },
    {
        time: 33,
        value: 75.175
    },
    {
        time: 34,
        value: 68.199
    },
    {
        time: 35,
        value: 6.682
    },
    {
        time: 36,
        value: 74.135
    },
    {
        time: 37,
        value: 49.713
    },
    {
        time: 38,
        value: 36.408
    },
    {
        time: 39,
        value: 72.511
    },
    {
        time: 40,
        value: 67.526
    },
    {
        time: 41,
        value: 90.387
    },
    {
        time: 42,
        value: 132.304
    },
    {
        time: 43,
        value: -6.353
    },
    {
        time: 44,
        value: 94.964
    },
    {
        time: 45,
        value: 24.186
    },
    {
        time: 46,
        value: 36.053
    },
    {
        time: 47,
        value: 17.861
    },
    {
        time: 48,
        value: 87.076
    },
    {
        time: 49,
        value: 66.341
    },
    {
        time: 50,
        value: -67.926
    },
    {
        time: 51,
        value: -16.69
    },
    {
        time: 52,
        value: 18.377
    },
    {
        time: 53,
        value: 21.568
    },
    {
        time: 54,
        value: -0.617
    },
    {
        time: 55,
        value: 63.388
    },
    {
        time: 56,
        value: 19.392
    },
    {
        time: 57,
        value: 51.275
    },
    {
        time: 58,
        value: 5.073
    },
    {
        time: 59,
        value: 32.559
    },
    {
        time: 60,
        value: 64.111
    },
    {
        time: 61,
        value: 70.294
    },
    {
        time: 62,
        value: 17.982
    },
    {
        time: 63,
        value: 8.482
    },
    {
        time: 64,
        value: 8.886
    },
    {
        time: 65,
        value: 35.134
    },
    {
        time: 66,
        value: 7.272
    },
    {
        time: 67,
        value: -19.783
    },
    {
        time: 68,
        value: 5.54
    },
    {
        time: 69,
        value: -20.871
    },
    {
        time: 70,
        value: 12.892
    },
    {
        time: 71,
        value: -59.146
    },
    {
        time: 72,
        value: 6.768
    },
    {
        time: 73,
        value: 8.667
    },
    {
        time: 74,
        value: 32.765
    },
    {
        time: 75,
        value: 22.658
    },
    {
        time: 76,
        value: 5.017
    },
    {
        time: 77,
        value: 6.131
    },
    {
        time: 78,
        value: -19.935
    },
    {
        time: 79,
        value: 35.189
    },
    {
        time: 80,
        value: 8.099
    },
    {
        time: 81,
        value: -1.411
    },
    {
        time: 82,
        value: 26.419
    },
    {
        time: 83,
        value: -3.264
    },
    {
        time: 84,
        value: 18.663
    },
    {
        time: 85,
        value: -0.409
    },
    {
        time: 86,
        value: -10.051
    },
    {
        time: 87,
        value: 16.232
    },
    {
        time: 88,
        value: 18.545
    },
    {
        time: 89,
        value: 67.103
    },
    {
        time: 90,
        value: 20.267
    },
    {
        time: 91,
        value: 32.747
    },
    {
        time: 92,
        value: 17.72
    },
    {
        time: 93,
        value: -2.96
    },
    {
        time: 94,
        value: 106.244
    },
    {
        time: 95,
        value: 50.582
    },
    {
        time: 96,
        value: 11.309
    },
    {
        time: 97,
        value: 21.955
    },
    {
        time: 98,
        value: 10.543
    },
    {
        time: 99,
        value: 25.291
    },
    {
        time: 100,
        value: 19.467
    },
    {
        time: 101,
        value: 113.248
    },
    {
        time: 102,
        value: -11.541
    },
    {
        time: 103,
        value: 64.764
    },
    {
        time: 104,
        value: 20.025
    },
    {
        time: 105,
        value: 47.116
    },
    {
        time: 106,
        value: 127.637
    },
    {
        time: 107,
        value: 69.623
    },
    {
        time: 108,
        value: 10.325
    },
    {
        time: 109,
        value: 24.296
    },
    {
        time: 110,
        value: 76.235
    },
    {
        time: 111,
        value: 82.936
    },
    {
        time: 112,
        value: 117.011
    },
    {
        time: 113,
        value: 122.199
    },
    {
        time: 114,
        value: 92.476
    },
    {
        time: 115,
        value: 49.542
    },
    {
        time: 116,
        value: 87.275
    },
    {
        time: 117,
        value: -1.76
    },
    {
        time: 118,
        value: 113.271
    },
    {
        time: 119,
        value: 43.854
    },
    {
        time: 120,
        value: 177.503
    },
    {
        time: 121,
        value: 139.488
    },
    {
        time: 122,
        value: 128.226
    },
    {
        time: 123,
        value: 138.834
    },
    {
        time: 124,
        value: 171.518
    },
    {
        time: 125,
        value: 48.818
    },
    {
        time: 126,
        value: 156.977
    },
    {
        time: 127,
        value: 186.456
    },
    {
        time: 128,
        value: 132.923
    },
    {
        time: 129,
        value: 32.531
    },
    {
        time: 130,
        value: 144.116
    },
    {
        time: 131,
        value: 76.287
    },
    {
        time: 132,
        value: 92.764
    },
    {
        time: 133,
        value: 127.686
    },
    {
        time: 134,
        value: 138.969
    },
    {
        time: 135,
        value: 141.198
    },
    {
        time: 136,
        value: 144.94
    },
    {
        time: 137,
        value: 108.516
    },
    {
        time: 138,
        value: 136.875
    },
    {
        time: 139,
        value: 183.533
    },
    {
        time: 140,
        value: 116.436
    },
    {
        time: 141,
        value: 114.19
    },
    {
        time: 142,
        value: 179.841
    },
    {
        time: 143,
        value: 135.828
    },
    {
        time: 144,
        value: 125.272
    },
    {
        time: 145,
        value: 150.179
    },
    {
        time: 146,
        value: 144.586
    },
    {
        time: 147,
        value: 133.862
    },
    {
        time: 148,
        value: 133.566
    },
    {
        time: 149,
        value: 135.863
    },
    {
        time: 150,
        value: 232.857
    },
    {
        time: 151,
        value: 133.586
    },
    {
        time: 152,
        value: 164.635
    },
    {
        time: 153,
        value: 113.745
    },
    {
        time: 154,
        value: 124.458
    },
    {
        time: 155,
        value: 108.725
    },
    {
        time: 156,
        value: 130.797
    },
    {
        time: 157,
        value: 132.311
    },
    {
        time: 158,
        value: 128.864
    },
    {
        time: 159,
        value: 155.064
    },
    {
        time: 160,
        value: 128.222
    },
    {
        time: 161,
        value: 116.734
    },
    {
        time: 162,
        value: 135.163
    },
    {
        time: 163,
        value: 195.442
    },
    {
        time: 164,
        value: 120.697
    },
    {
        time: 165,
        value: 123.006
    },
    {
        time: 166,
        value: 143.924
    },
    {
        time: 167,
        value: 158.569
    },
    {
        time: 168,
        value: 185.498
    },
    {
        time: 169,
        value: 130.396
    },
    {
        time: 170,
        value: 142.615
    },
    {
        time: 171,
        value: 134.389
    },
    {
        time: 172,
        value: 123.61
    },
    {
        time: 173,
        value: 90.871
    },
    {
        time: 174,
        value: 119.347
    },
    {
        time: 175,
        value: 119.404
    },
    {
        time: 176,
        value: 79.069
    },
    {
        time: 177,
        value: 136.508
    },
    {
        time: 178,
        value: 107.554
    },
    {
        time: 179,
        value: 109.108
    },
    {
        time: 180,
        value: 124.385
    },
    {
        time: 181,
        value: 152.8
    },
    {
        time: 182,
        value: 107.196
    },
    {
        time: 183,
        value: 70.563
    },
    {
        time: 184,
        value: 171.208
    },
    {
        time: 185,
        value: 108.405
    },
    {
        time: 186,
        value: 82.864
    },
    {
        time: 187,
        value: 131.686
    },
    {
        time: 188,
        value: 100.476
    },
    {
        time: 189,
        value: 93.948
    },
    {
        time: 190,
        value: 93.797
    },
    {
        time: 191,
        value: 151.537
    },
    {
        time: 192,
        value: 90.92
    },
    {
        time: 193,
        value: 126.823
    },
    {
        time: 194,
        value: 52.166
    },
    {
        time: 195,
        value: 79.562
    },
    {
        time: 196,
        value: 111.465
    },
    {
        time: 197,
        value: 107.818
    },
    {
        time: 198,
        value: 109.584
    },
    {
        time: 199,
        value: 128.689
    },
    {
        time: 200,
        value: 124.78
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" width="100%" height="100%">
        <members>
            <DynamicForm ID="options" width="50%" autoDraw="false">
                <items>
                    <CheckboxItem name="showRegression" title="Show / Hide Regression Line" changed={onShowRegressionChanged}/>
                    <SelectItem name="lineType" title="Regression Type" wrapTitle="false" width="222" changed={onLineTypeChanged}>
                        <valueMap>
                                <value>linear</value>
                                <value>curve</value>
                        </valueMap>
                    </SelectItem>
                    <SpinnerItem max="5" min="1" name="degree" title="Polynomial Degree" wrapTitle="false" changed={onDegreeChanged}/>
                </items>
            </DynamicForm>
            <FacetChart data={chartData} chartType="Scatter" title="Time Series Trend Line" chartRectMargin="15" showRegressionLine="true" regressionLineType="polynomial" regressionPolynomialDegree="3" ID="regressionChart" autoDraw="false" xAxisMetric="time" yAxisMetric="value">
                <facets>
                    <Facet id="metric" inlinedValues="true">
                        <values>
                            <FacetValue id="value"/>
                            <FacetValue id="time"/>
                        </values>
                    </Facet>
                </facets>
            </FacetChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);

options.getItem('showRegression').setDefaultValue(regressionChart.showRegressionLine);
options.getItem('lineType').setDefaultValue(regressionChart.regressionLineType == 'line' ? 'linear' : 'curve');
options.getItem('degree').setDefaultValue(regressionChart.regressionPolynomialDegree);
options.getItem('degree').setDisabled(regressionChart.regressionLineType == 'line');
options.observe(regressionChart, 'setShowRegressionLine', 'options.getItem(\'showRegression\').setValue(regressionChart.showRegressionLine)');
options.observe(regressionChart, 'setRegressionLineType', function (observed, observer, returnVal) {
    var line = regressionChart.regressionLineType == 'line';
    options.getItem('lineType').setValue(line ? 'linear' : 'curve');
    options.getItem('degree').setDisabled(line);
});
options.observe(regressionChart, 'setRegressionPolynomialDegree', 'options.getItem(\'degree\').setValue(regressionChart.regressionPolynomialDegree)');
