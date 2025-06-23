/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, FacetChart, HLayout, PickTreeItem, SelectItem, Tree, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onChartTypeChanged = function (form, item, value) {
    dynamicChart.setChartType(value);
};
let onTimePeriodChanged = function (form, item, value) {
    dynamicChart.fetchData({
        Products: 'Prod01',
        Regions: [
            'North',
            'South',
            'East',
            'West'
        ],
        Time: value
    }, function (dsResponse, data, dsRequest) {
        dynamicChart.setProperty('title', 'Revenue for ' + timeTree.findById(value).title);
    });
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" ID="chartDataBindingLayout" width="100%" height="100%">
        <members>
            <HLayout height="40">
                <members>
                    <DynamicForm ID="chartSelector" wrapItemTitles="false" width="350">
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
                    <DynamicForm ID="timeSelector" wrapItemTitles="false" width="350">
                        <items>
                            <PickTreeItem canSelectParentItems="true" valueField="id" name="timePeriod" title="Time Period" displayField="title" changed={onTimePeriodChanged}>
                                <valueTree rootValue="sum" modelType="parent" showRoot="true" ID="timeTree">
                                    <data id="sum" title="All Years" collapsed="false"/>
                                    <data id="2018" parentId="sum" title="2018"/>
                                    <data id="2019" parentId="sum" title="2019"/>
                                    <data id="2020" parentId="sum" title="2020" collapsed="false"/>
                                    <data id="Q1-2018" parentId="2018" title="Q1-2018"/>
                                    <data id="Q2-2018" parentId="2018" title="Q2-2018"/>
                                    <data id="Q3-2018" parentId="2018" title="Q3-2018"/>
                                    <data id="Q4-2018" parentId="2018" title="Q4-2018"/>
                                    <data id="Q1-2019" parentId="2019" title="Q1-2019"/>
                                    <data id="Q2-2019" parentId="2019" title="Q2-2019"/>
                                    <data id="Q3-2019" parentId="2019" title="Q3-2019"/>
                                    <data id="Q4-2019" parentId="2019" title="Q4-2019"/>
                                    <data id="Q1-2020" parentId="2020" title="Q1-2020"/>
                                    <data id="Q2-2020" parentId="2020" title="Q2-2020"/>
                                    <data id="Q3-2020" parentId="2020" title="Q3-2020"/>
                                    <data id="Q4-2020" parentId="2020" title="Q4-2020"/>
                                    <data id="1/1/2018" parentId="Q1-2018" title="1/1/2018"/>
                                    <data id="2/1/2018" parentId="Q1-2018" title="2/1/2018"/>
                                    <data id="3/1/2018" parentId="Q1-2018" title="3/1/2018"/>
                                    <data id="4/1/2018" parentId="Q2-2018" title="4/1/2018"/>
                                    <data id="5/1/2018" parentId="Q2-2018" title="5/1/2018"/>
                                    <data id="6/1/2018" parentId="Q2-2018" title="6/1/2018"/>
                                    <data id="7/1/2018" parentId="Q3-2018" title="7/1/2018"/>
                                    <data id="8/1/2018" parentId="Q3-2018" title="8/1/2018"/>
                                    <data id="9/1/2018" parentId="Q3-2018" title="9/1/2018"/>
                                    <data id="10/1/2018" parentId="Q4-2018" title="10/1/2018"/>
                                    <data id="11/1/2018" parentId="Q4-2018" title="11/1/2018"/>
                                    <data id="12/1/2018" parentId="Q4-2018" title="12/1/2018"/>
                                    <data id="1/1/2019" parentId="Q1-2019" title="1/1/2019"/>
                                    <data id="2/1/2019" parentId="Q1-2019" title="2/1/2019"/>
                                    <data id="3/1/2019" parentId="Q1-2019" title="3/1/2019"/>
                                    <data id="4/1/2019" parentId="Q2-2019" title="4/1/2019"/>
                                    <data id="5/1/2019" parentId="Q2-2019" title="5/1/2019"/>
                                    <data id="6/1/2019" parentId="Q2-2019" title="6/1/2019"/>
                                    <data id="7/1/2019" parentId="Q3-2019" title="7/1/2019"/>
                                    <data id="8/1/2019" parentId="Q3-2019" title="8/1/2019"/>
                                    <data id="9/1/2019" parentId="Q3-2019" title="9/1/2019"/>
                                    <data id="10/1/2019" parentId="Q4-2019" title="10/1/2019"/>
                                    <data id="11/1/2019" parentId="Q4-2019" title="11/1/2019"/>
                                    <data id="12/1/2019" parentId="Q4-2019" title="12/1/2019"/>
                                    <data id="1/1/2020" parentId="Q1-2020" title="1/1/2020"/>
                                    <data id="2/1/2020" parentId="Q1-2020" title="2/1/2020"/>
                                    <data id="3/1/2020" parentId="Q1-2020" title="3/1/2020"/>
                                    <data id="4/1/2020" parentId="Q2-2020" title="4/1/2020"/>
                                    <data id="5/1/2020" parentId="Q2-2020" title="5/1/2020"/>
                                    <data id="6/1/2020" parentId="Q2-2020" title="6/1/2020"/>
                                    <data id="7/1/2020" parentId="Q3-2020" title="7/1/2020"/>
                                    <data id="8/1/2020" parentId="Q3-2020" title="8/1/2020"/>
                                    <data id="9/1/2020" parentId="Q3-2020" title="9/1/2020"/>
                                    <data id="10/1/2020" parentId="Q4-2020" title="10/1/2020"/>
                                    <data id="11/1/2020" parentId="Q4-2020" title="11/1/2020"/>
                                    <data id="12/1/2020" parentId="Q4-2020" title="12/1/2020"/>
                                </valueTree>
                            </PickTreeItem>
                        </items>
                    </DynamicForm>
                </members>
            </HLayout>
            <FacetChart chartType="Area" stacked="false" title="Revenue for All Years" dataSource="productRevenue" valueProperty="value" ID="dynamicChart">
                <facetFields>
                    <value>Regions</value>
                    <value>Scenarios</value>
                </facetFields>
            </FacetChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);

dynamicChart.fetchData({
    Products: 'Prod01',
    Regions: [
        'North',
        'South',
        'East',
        'West'
    ],
    Time: 'sum'
});
chartSelector.observe(dynamicChart, 'setChartType', 'chartSelector.setValue(\'chartType\', dynamicChart.chartType)');
