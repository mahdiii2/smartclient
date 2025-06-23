/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DynamicForm, Facet, FacetChart, HStack, SelectItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onChartTypeChanged = function(form,item,value) {return randomDataChart.setChartType(value)};
let onRegenerateButtonClick = function() {return randomDataChart.setData(randomDataChart.generateRandomData())};
let onRandomDataChartGenerateRandomData = function () {
    var length = labels.length, newChartData = new Array(length), min = 0, max = 25;
    for (var i = 0; i < length; ++i) {
        newChartData[i] = {
            label: labels[i],
            _value: min + (max - min) * Math.random()
        };
    }
    return newChartData;
};
let onRandomDataChartInitWidget = function () {
    this.data = this.generateRandomData();
    this.Super('initWidget', arguments);
};

var labels = 'ABCDEFGHIJKLMNO'.split('');

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" width="100%" height="100%">
        <members>
            <HStack height="30">
                <members>
                    <DynamicForm ID="chartSelector" width="30%" autoDraw="false">
                        <items>
                            <SelectItem name="chartType" title="Chart Type" changed={onChartTypeChanged}>
                                <valueMap>
                                        <value>Area</value>
                                        <value>Column</value>
                                        <value>Bar</value>
                                        <value>Line</value>
                                        <value>Radar</value>
                                </valueMap>
                            </SelectItem>
                        </items>
                    </DynamicForm>
                    <Button autoFit="true" title="Regenerate Random Data" ID="regenerateButton" width="30%" padding="5" autoDraw="false" click={onRegenerateButtonClick}/>
                </members>
            </HStack>
            <FacetChart chartType="Column" title="Random Data Chart" showDataAxisLabel="false" valueTitle="Random Values" chartRectMargin="15" showStandardDeviationLines="true" ID="randomDataChart" autoDraw="false" showExpectedValueLine="true" generateRandomData={onRandomDataChartGenerateRandomData} initWidget={onRandomDataChartInitWidget}>
                <facets>
                    <Facet id="label" title="Label"/>
                </facets>
                <standardDeviationLineProperties lineWidth="2" lineColor="#0000EE"/>
                <expectedValueLineProperties>
                	<lineWidth>2</lineWidth>
                	<lineColor>#00EE00</lineColor>
                </expectedValueLineProperties>
            </FacetChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);

chartSelector.getItem('chartType').setDefaultValue(randomDataChart.chartType);
chartSelector.observe(randomDataChart, 'setChartType', 'chartSelector.getItem(\'chartType\').setValue(randomDataChart.chartType)');
