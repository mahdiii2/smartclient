/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CellRecord, DynamicForm, Facet, FacetChart, FacetValue, SelectItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onGradationTimesChanged = function (form, item, value) {
    multiScatterChart.setOtherAxisGradationTimes(value ? [
        '1m',
        '1q',
        '1y'
    ] : [
        '1m',
        '1y'
    ]);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" minBreadthMember="multiScatterForm" width="100%" height="100%">
        <members>
            <DynamicForm ID="multiScatterForm" titleWidth="120" width="220">
                <items>
                    <SelectItem title="Gradation Times" defaultValue="0" wrapTitle="false" autoDraw="true" changed={onGradationTimesChanged}>
                        <valueMap>
                                <value id="0">Month/Year</value>
                                <value id="1">Month/Quarter/Year</value>
                        </valueMap>
                    </SelectItem>
                </items>
            </DynamicForm>
            <FacetChart chartType="Scatter" title="multiScatterChart" showXTicks="true" valueProperty="value" ID="multiScatterChart" width="100%" showScatterDataLabels="true" showScatterLines="true" dataLineType="smooth">
                <data>
                    <CellRecord time={new Date(2015, 0, 2)} value="0.02" animal="Moose"/>
                    <CellRecord time={new Date(2015, 0, 8)} value="0.15" animal="Moose"/>
                    <CellRecord time={new Date(2015, 0, 22)} value="0.77" animal="Moose"/>
                    <CellRecord time={new Date(2015, 1, 12)} value="0.87" animal="Moose"/>
                    <CellRecord time={new Date(2015, 3, 1)} value="1.15" animal="Moose"/>
                    <CellRecord time={new Date(2015, 6, 1)} value="1.15" animal="Moose"/>
                    <CellRecord time={new Date(2016, 0, 1)} value="0.71" animal="Moose"/>
                    <CellRecord time={new Date(2016, 3, 1)} value="0.67" animal="Moose"/>
                    <CellRecord time={new Date(2016, 6, 1)} value="0.61" animal="Moose"/>
                    <CellRecord time={new Date(2016, 9, 1)} value="0.41" animal="Moose"/>
                    <CellRecord time={new Date(2016, 11, 31)} value="0.22" animal="Moose"/>
                    <CellRecord time={new Date(2015, 0, 2)} value="0.02" animal="Platypus"/>
                    <CellRecord time={new Date(2015, 0, 8)} value="0.28" animal="Platypus"/>
                    <CellRecord time={new Date(2015, 0, 22)} value="0.71" animal="Platypus"/>
                    <CellRecord time={new Date(2015, 1, 12)} value="0.81" animal="Platypus"/>
                    <CellRecord time={new Date(2015, 3, 1)} value="1.06" animal="Platypus"/>
                    <CellRecord time={new Date(2015, 6, 1)} value="1.06" animal="Platypus"/>
                    <CellRecord time={new Date(2016, 0, 1)} value="0.52" animal="Platypus"/>
                    <CellRecord time={new Date(2016, 11, 31)} value="0.1" animal="Platypus"/>
                </data>
                <facets>
                    <Facet id="metric" inlinedValues="true">
                        <values>
                            <FacetValue id="value"/>
                            <FacetValue id="time"/>
                        </values>
                    </Facet>
                    <Facet id="animal"/>
                </facets>
                <majorTickTimeIntervals>
                    <value>1q</value>
                </majorTickTimeIntervals>

                <gradationGaps>
                    <value>2</value>
                </gradationGaps>

                <otherAxisGradationTimes>
                    <value>1m</value>
                    <value>1y</value>
                </otherAxisGradationTimes>
            </FacetChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);
