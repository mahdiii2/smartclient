/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CellRecord, DynamicForm, Facet, FacetChart, FacetValue, SelectItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onShowLinesChanged = function () {
    if (this.getValue() == 'None') {
        multiScatterChart.setShowScatterLines(false);
    } else {
        if (this.getValue() == 'Smooth') {
            multiScatterChart.setDataLineType('smooth');
        } else {
            multiScatterChart.setDataLineType('straight');
        }
        multiScatterChart.setShowScatterLines(true);
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" width="100%" height="100%">
        <members>
            <DynamicForm ID="multiScatterForm" titleWidth="120" width="220">
                <items>
                    <SelectItem title="Show Lines" defaultValue="Smooth" wrapTitle="false" autoDraw="true" changed={onShowLinesChanged}>
                        <valueMap>
                                <value>None</value>
                                <value>Straight</value>
                                <value>Smooth</value>
                        </valueMap>
                    </SelectItem>
                </items>
            </DynamicForm>
            <FacetChart chartType="Scatter" title="Multi Scatter" valueProperty="value" ID="multiScatterChart" width="100%" showScatterDataLabels="true" showScatterLines="true" dataLineType="smooth">
                <data>
                    <CellRecord Time="0.033" value="0.02" animal="Moose"/>
                    <CellRecord Time="0.083" value="0.15" animal="Moose"/>
                    <CellRecord Time="0.25" value="0.77" animal="Moose"/>
                    <CellRecord Time="0.5" value="0.87" animal="Moose"/>
                    <CellRecord Time="1" value="1.15" animal="Moose"/>
                    <CellRecord Time="2" value="1.15" animal="Moose"/>
                    <CellRecord Time="4" value="0.71" animal="Moose"/>
                    <CellRecord Time="5" value="0.67" animal="Moose"/>
                    <CellRecord Time="6" value="0.61" animal="Moose"/>
                    <CellRecord Time="7" value="0.41" animal="Moose"/>
                    <CellRecord Time="8" value="0.22" animal="Moose"/>
                    <CellRecord Time="0.033" value="0.02" animal="Platypus"/>
                    <CellRecord Time="0.083" value="0.28" animal="Platypus"/>
                    <CellRecord Time="0.25" value="0.71" animal="Platypus"/>
                    <CellRecord Time="0.5" value="0.81" animal="Platypus"/>
                    <CellRecord Time="1" value="1.06" animal="Platypus"/>
                    <CellRecord Time="2" value="1.06" animal="Platypus"/>
                    <CellRecord Time="4" value="0.52" animal="Platypus"/>
                    <CellRecord Time="8" value="0.1" animal="Platypus"/>
                </data>
                <facets>
                    <Facet id="metric" inlinedValues="true">
                        <values>
                            <FacetValue id="value"/>
                            <FacetValue id="Time"/>
                        </values>
                    </Facet>
                    <Facet id="animal"/>
                </facets>
            </FacetChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);
