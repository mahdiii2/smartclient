/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, Facet, FacetChart, FacetValue, SelectItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onZOrderChanged = function (form, item, value) {
    histogram.setZIndexMetric(value);
};
let onBorderColorShowIf = function () {
    return !histogram.matchBarChartDataLineColor;
};
let onBorderColorChanged = function () {
    histogram.setData(histogram.data);
};
let onHistogramGetDataColor = function (index, facetValueId) {
    return dataColors[facetValueId];
};
let onHistogramGetDataLineColor = function (index, facetValueId) {
    var item = configForm.getItem('borderColor');
    return lineColors[item.getValue()];
};

var chartData = [
    {
        water: 'Tap',
        pollutant: 'Metals',
        minValue: 10,
        maxValue: 20,
        danger: 100
    },
    {
        water: 'Tap',
        pollutant: 'Organics',
        minValue: 20,
        maxValue: 40,
        danger: 80
    },
    {
        water: 'Tap',
        pollutant: 'Pathogens',
        minValue: 3,
        maxValue: 8,
        danger: 25
    },
    {
        water: 'Lake',
        pollutant: 'Metals',
        minValue: 50,
        maxValue: 60,
        danger: 100
    },
    {
        water: 'Lake',
        pollutant: 'Organics',
        minValue: 55,
        maxValue: 80,
        danger: 80
    },
    {
        water: 'Lake',
        pollutant: 'Pathogens',
        minValue: 15,
        maxValue: 25,
        danger: 25
    },
    {
        water: 'Ocean',
        pollutant: 'Metals',
        minValue: 20,
        maxValue: 70,
        danger: 100
    },
    {
        water: 'Ocean',
        pollutant: 'Organics',
        minValue: 50,
        maxValue: 95,
        danger: 80
    },
    {
        water: 'Ocean',
        pollutant: 'Pathogens',
        minValue: 10,
        maxValue: 45,
        danger: 25
    },
    {
        water: 'Bottled',
        pollutant: 'Metals',
        minValue: 5,
        maxValue: 10,
        danger: 100
    },
    {
        water: 'Bottled',
        pollutant: 'Organics',
        minValue: 5,
        maxValue: 25,
        danger: 80
    },
    {
        water: 'Bottled',
        pollutant: 'Pathogens',
        minValue: 0,
        maxValue: 0,
        danger: 25
    }
];
var lineColors = {
    Grey: '#333333',
    Orange: '#FF8C00',
    Cyan: '#00FFFF'
};
var dataColors = {
    Metals: '#DC143C',
    Organics: '#7FFF00',
    Pathogens: '#0000FF'
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" ID="simpleChartLayout" width="100%" height="100%">
        <members>
            <DynamicForm ID="configForm" numCols="4" wrapItemTitles="false" width="500">
                <items>
                    <SelectItem allowEmptyValue="true" name="zOrder" title="Z-Ordering" emptyDisplayValue="Draw order (default)" changed={onZOrderChanged}>
                        <valueMap danger="Use &apos;danger&apos; Metric"/>
                    </SelectItem>
                    <SelectItem name="borderColor" title="Border Color" defaultValue="Grey" showIf={onBorderColorShowIf} changed={onBorderColorChanged}>
                        <valueMap>
                                <value>Grey</value>
                                <value>Orange</value>
                                <value>Cyan</value>
                        </valueMap>
                    </SelectItem>
                </items>
            </DynamicForm>
            <FacetChart data={chartData} chartType="Histogram" title="Measured Pollutant Levels" showValueOnHover="true" endValueMetric="maxValue" valueProperty="minValue" ID="histogram" width="100%" height="100%" metricFacetId="valueMetrics" getDataColor={onHistogramGetDataColor} getDataLineColor={onHistogramGetDataLineColor}>
                <facets>
                    <Facet id="water" title="Water Source"/>
                    <Facet id="pollutant" title="Pollutant"/>
                    <Facet id="valueMetrics" inlinedValues="true">
                        <values>
                            <FacetValue id="minValue"/>
                            <FacetValue id="maxValue"/>
                            <FacetValue id="danger"/>
                        </values>
                    </Facet>
                </facets>
                <allowedChartTypes>
                    <value>Bar</value>
                    <value>Column</value>
                    <value>Histogram</value>
                </allowedChartTypes>
            </FacetChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);
