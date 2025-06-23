
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout, CellRecord, DynamicForm, Facet, FacetChart, FacetValue, SelectItem, valueMap } from 'smartclient-eval/react';

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
                        <SelectItem name="chartType" title="Chart Type" defaultValue="Bar" changed={onChartTypeChanged}>
                            <valueMap>
                                    <value>Column</value>
                                    <value>Bar</value>
                            </valueMap>
                        </SelectItem>
                    </items>
                </DynamicForm>
                <FacetChart chartType="Bar" title="Sales by Region, Fuel, and Product" valueProperty="sales" ID="simpleChart">
                    <data>
                        <CellRecord fuel="Gas" region="West" product="Cars" sales="37"/>
                        <CellRecord fuel="Gas" region="North" product="Cars" sales="29"/>
                        <CellRecord fuel="Gas" region="East" product="Cars" sales="80"/>
                        <CellRecord fuel="Gas" region="South" product="Cars" sales="87"/>
                        <CellRecord fuel="Gas" region="West" product="Trucks" sales="23"/>
                        <CellRecord fuel="Gas" region="North" product="Trucks" sales="45"/>
                        <CellRecord fuel="Gas" region="East" product="Trucks" sales="32"/>
                        <CellRecord fuel="Gas" region="South" product="Trucks" sales="67"/>
                        <CellRecord fuel="Gas" region="West" product="Motorcycles" sales="12"/>
                        <CellRecord fuel="Gas" region="North" product="Motorcycles" sales="4"/>
                        <CellRecord fuel="Gas" region="East" product="Motorcycles" sales="23"/>
                        <CellRecord fuel="Gas" region="South" product="Motorcycles" sales="45"/>
                        <CellRecord fuel="Electric" region="West" product="Cars" sales="52"/>
                        <CellRecord fuel="Electric" region="North" product="Cars" sales="92"/>
                        <CellRecord fuel="Electric" region="East" product="Cars" sales="40"/>
                        <CellRecord fuel="Electric" region="South" product="Cars" sales="12"/>
                        <CellRecord fuel="Electric" region="West" product="Trucks" sales="43"/>
                        <CellRecord fuel="Electric" region="North" product="Trucks" sales="25"/>
                        <CellRecord fuel="Electric" region="East" product="Trucks" sales="52"/>
                        <CellRecord fuel="Electric" region="South" product="Trucks" sales="7"/>
                        <CellRecord fuel="Electric" region="West" product="Motorcycles" sales="22"/>
                        <CellRecord fuel="Electric" region="North" product="Motorcycles" sales="60"/>
                        <CellRecord fuel="Electric" region="East" product="Motorcycles" sales="33"/>
                        <CellRecord fuel="Electric" region="South" product="Motorcycles" sales="81"/>
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
                        <Facet id="fuel" title="Fuel" autoDerived="true">
                            <values>
                                <FacetValue id="Gas" title="Gas"/>
                                <FacetValue id="Electric" title="Electric"/>
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
                    <allowedChartTypes>
                        <value>Column</value>
                        <value>Bar</value>
                    </allowedChartTypes>
                </FacetChart>
            </members>
        </VLayout>

    </>,
    document.getElementById(target)
);

// Have the chartSelector update itself if the context menu is used to change chartType
chartSelector.observe(simpleChart, "setChartType", "chartSelector.getItem('chartType').setValue(simpleChart.chartType)");
