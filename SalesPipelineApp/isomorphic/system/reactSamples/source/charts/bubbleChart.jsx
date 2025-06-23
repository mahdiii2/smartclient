
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CellRecord, CheckboxItem, DynamicForm, Facet, FacetChart, FacetValue, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onUseMultiplePointShapesChanged = function (form, item, value) {
    bubbleChart.setUseMultiplePointShapes(value);
};

let defaultUseMultiplePointShapes = true;

let chartRectProperties = {
    lineWidth: 1,
    lineColor: "#bbbbbb",
    rounding: 0.05
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <VLayout membersMargin="20" width="100%" height="100%">
            <members>
                <DynamicForm ID="options" width="50%">
                    <items>
                        <CheckboxItem defaultValue="true" name="useMultiplePointShapes" title="Use Multiple Shapes" changed={onUseMultiplePointShapesChanged}/>
                    </items>
                </DynamicForm>
                <FacetChart chartType="Bubble" title="Bubble Chart" showChartRect="true" chartRectMargin="15" pointSizeMetric="volume" minDataPointSize="10" maxDataPointSize="50" useMultiplePointShapes={defaultUseMultiplePointShapes} showValueOnHover="true" ID="bubbleChart" xAxisMetric="time" yAxisMetric="value" bandedBackground="false" data={chartData} chartRectProperties={chartRectProperties}>
                    <facets>
                        <Facet id="metric" inlinedValues="true">
                            <values>
                                <FacetValue id="value"/>
                                <FacetValue id="time"/>
                                <FacetValue id="volume" title="Volume"/>
                            </values>
                        </Facet>
                        <Facet id="series">
                            <values>
                                <FacetValue id="A" title="Series A"/>
                                <FacetValue id="B" title="Series B"/>
                            </values>
                        </Facet>
                    </facets>
                </FacetChart>
            </members>
        </VLayout>

    </>,
    document.getElementById(target)
);