/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

isc.RPCManager.cacheScreens('Chart Placeholder');
var listGrid, chartPlaceholderLayout;
function updateChart(chartType, stacked) {
    if (chartType)
        listGrid.chartType = chartType;
    else if (listGrid.lastChart)
        listGrid.chartType = listGrid.lastChart.chartType;
    listGrid.lastChart = listGrid.chartData('Product', [
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ], listGrid.getSelectedRecords(), { stacked: !!stacked });
    chartPlaceholderLayout.replaceMember(chartPlaceholderLayout.getMember(1), listGrid.lastChart);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" ID="container" width="100%" height="100%"/>,
    document.getElementById(target)
);

isc.Reify.loadProject('Chart Placeholder', function (project, projects, rpcResponse) {
    var screen = project.createScreen(project.screens[0].ID), chartTypeMenu = screen.getByLocalId('chartTypeMenu'), stackedSelectionForm = screen.getByLocalId('StackedSelectionForm'), placeholderImg = screen.getByLocalId('placeholder');
    chartPlaceholderLayout = screen.getByLocalId('chartPlaceholderLayout');
    listGrid = screen.getByLocalId('sampleChartDataGrid');
    var facetChartForm = isc.DynamicForm.create({
        items: [{
                name: 'placeholderCB',
                type: 'CheckboxItem',
                title: 'Replace placeholder',
                changed: function (form, item, value) {
                    if (value) {
                        updateChart('Area', stackedSelectionForm.getValue('Stacked'));
                    } else {
                        chartPlaceholderLayout.replaceMember(chartPlaceholderLayout.getMember(1), placeholderImg);
                    }
                }
            }]
    });
    isc.observe(listGrid, 'dataArrived', function (startRow, endRow) {
        listGrid.selectRecords([
            0,
            1,
            2
        ]);
        isc.observe(listGrid, 'selectionUpdated', function (record, recordList) {
            if (facetChartForm.getValue('placeholderCB'))
                updateChart('Area', stackedSelectionForm.getValue('Stacked'));
        });
    });
    isc.observe(stackedSelectionForm.getField('Stacked'), 'changed', function (form, item, value) {
        if (facetChartForm.getValue('placeholderCB'))
            updateChart(null, value);
    });
    isc.observe(chartTypeMenu, 'itemClick', function (item, colNum) {
        if (facetChartForm.getValue('placeholderCB'))
            updateChart(item.title, stackedSelectionForm.getValue('Stacked'));
    });
    container.addMember(facetChartForm);
    container.addMember(screen);
}, {
    userName: 'reifySample',
    password: 'tryReify',
    serverURL: 'https://create.reify.com'
});
