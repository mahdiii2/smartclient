
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout, FacetChart, DynamicForm, FormItem, SelectItem, CellRecord, Facet, FacetValue } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onChartTypeChanged = function (form, item, value) {
    simpleChart.setChartType(value)
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <VLayout ID="simpleChartLayout" width="100%" height="100%" membersMargin="20">
            <members>
                <DynamicForm ID="chartSelector">
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
                <FacetChart chartType="Area" title="Sales by Product and Region" valueProperty="sales" ID="simpleChart">
                    <data>
                        <CellRecord region="West" product="Cars" sales="37"/>
                        <CellRecord region="North" product="Cars" sales="29"/>
                        <CellRecord region="East" product="Cars" sales="80"/>
                        <CellRecord region="South" product="Cars" sales="87"/>
                        <CellRecord region="West" product="Trucks" sales="23"/>
                        <CellRecord region="North" product="Trucks" sales="45"/>
                        <CellRecord region="East" product="Trucks" sales="32"/>
                        <CellRecord region="South" product="Trucks" sales="67"/>
                        <CellRecord region="West" product="Motorcycles" sales="12"/>
                        <CellRecord region="North" product="Motorcycles" sales="4"/>
                        <CellRecord region="East" product="Motorcycles" sales="23"/>
                        <CellRecord region="South" product="Motorcycles" sales="45"/>
                    </data>
                    <facets>
                        <Facet id="region" title="Region" autoDerived="true">
                            <values>
                                <FacetValue id="West" title="West"/>
                                <FacetValue id="North" title="North"/>
                                <FacetValue id="East" title="East"/>
                                <FacetValue id="South" title="South"/>
                            </values>
                        </Facet>
                        <Facet id="product" title="Product" autoDerived="true">
                            <values>
                                <FacetValue id="Cars" title="Cars"/>
                                <FacetValue id="Trucks" title="Trucks"/>
                                <FacetValue id="Motorcycles" title="Motorcycles"/>
                            </values>
                        </Facet>
                    </facets>
                </FacetChart>
            </members>
        </VLayout>

    </>,
    document.getElementById(target)
);

// Have the chartSelector update itself if the context menu is used to change chartType
chartSelector.observe(simpleChart, "setChartType", "chartSelector.getItem('chartType').setValue(simpleChart.chartType)");
