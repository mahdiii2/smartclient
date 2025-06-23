/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Facet, FacetChart } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onBodePlotInitWidget = function () {
    var kHz = 1000;
    var n = 4, f = 10 * kHz, w0 = 2 * Math.PI * f;
    var wdw0Min = 0, wdw0Max = 2;
    var data = [];
    for (var i = 0, len = 800; i < len; ++i) {
        var lambda = i / (len - 1), wdw0 = (1 - lambda) * wdw0Min + lambda * wdw0Max, w = wdw0 * w0;
        data.push({
            frequency: wdw0,
            rippleFactor: 'Ripple Factor 2.0',
            gain: this.calculate_dB(this.calculate_gain(n, 2, w0, w))
        });
        data.push({
            frequency: wdw0,
            rippleFactor: 'Ripple Factor 10.0',
            gain: this.calculate_dB(this.calculate_gain(n, 10, w0, w))
        });
    }
    this.data = data;
    return this.Super('initWidget', arguments);
};
let onBodePlotCalculate_dB = function (x) {
    return 20 * Math.log(x) / Math.LN10;
};
let onBodePlotCalculate_gain = function (n, e, w0, w) {
    var tn = this.createChebyshevPolynomial(n), e2 = e * e, wdw0 = w / w0, tnwdw0 = tn(wdw0), tnwdw02 = tnwdw0 * tnwdw0;
    return 1 / Math.sqrt(1 + e2 * tnwdw02);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <FacetChart chartType="Line" title="bodePlot" showTitle="false" decimalPrecision="6" valueTitle="Gain (in decibels)" rotateLabels="never" minLabelGap="5" canZoom="true" labelCollapseMode="numeric" zoomShowSelection="false" zoomLogScale="false" valueProperty="gain" ID="bodePlot" width="100%" height="100%" margin="5" createChebyshevPolynomial={function () {
    var expMemo = [], fnMemo = [];
    var expression = function (n) {
        if (expMemo[n] != null) {
            return expMemo[n];
        } else {
            var exp;
            if (n == 0) {
                exp = '1.0';
            } else if (n == 1) {
                exp = 'x';
            } else {
                exp = '2.0*x*(' + expression(n - 1) + ')-(' + expression(n - 2) + ')';
            }
            expMemo[n] = exp;
            return exp;
        }
    };
    return function (n) {
        if (fnMemo[n] != null) {
            return fnMemo[n];
        } else {
            return fnMemo[n] = eval('0, (function (x) {return ' + expression(n) + ';})');
        }
        ;
    };
}()} initWidget={onBodePlotInitWidget} calculate_dB={onBodePlotCalculate_dB} calculate_gain={onBodePlotCalculate_gain}>
        <facets>
            <Facet id="frequency" title="Frequency / Cutoff Frequency"/>
            <Facet id="rippleFactor"/>
        </facets>
        <allowedChartTypes>
            <value>Area</value>
            <value>Line</value>
        </allowedChartTypes>
    </FacetChart>,
    document.getElementById(target)
);
