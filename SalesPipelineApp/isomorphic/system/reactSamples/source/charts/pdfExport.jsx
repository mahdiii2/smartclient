/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, IButton, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSalesDataGridCellChanged = function(record,newValue,oldValue,rowNum,colNum,grid) {return salesDataGrid.updateChart()};
let onSalesDataGridUpdateChart = function (chartType) {
    if (chartType)
        this.chartType = chartType;
    else if (this.lastChart)
        this.chartType = this.lastChart.chartType;
    if (this.lastChart)
        this.lastChart.destroy();
    this.lastChart = this.chartData('product');
    theLayout.addMember(this.lastChart, 1);
};
let onSalesDataGridGetCellStyle = function (record, rowNum, colNum) {
    var styleName = this.Super('getCellStyle', arguments);
    if (this.getFieldName(colNum) == 'product')
        styleName += 'Dark';
    return styleName;
};
let onViewAsPDFClick = function () {
    isc.RPCManager.exportContent(theLayout, {
        skinName: 'Enterprise',
        exportDisplay: 'window'
    });
};
let onDownloadAsPDFClick = function () {
    isc.RPCManager.exportContent(theLayout, {
        skinName: 'Enterprise',
        exportDisplay: 'download'
    });
};

var months = [
    {
        name: 'jun',
        title: 'Jun',
        longTitle: 'June'
    },
    {
        name: 'jul',
        title: 'Jul',
        longTitle: 'July'
    },
    {
        name: 'aug',
        title: 'Aug',
        longTitle: 'August'
    },
    {
        name: 'sep',
        title: 'Sep',
        longTitle: 'September'
    },
    {
        name: 'oct',
        title: 'Oct',
        longTitle: 'October'
    },
    {
        name: 'nov',
        title: 'Nov',
        longTitle: 'November'
    },
    {
        name: 'dec',
        title: 'Dec',
        longTitle: 'December'
    }
];
var salesData = [], numProducts = 4;
for (var i = 0; i < numProducts; i++) {
    salesData[i] = { product: 'Product ' + String.fromCharCode(65 + i) };
    var minSales = Math.round(Math.random() * 8000) + 2000, maxVariance = minSales / 3;
    for (var j = 0; j < months.length; j++) {
        salesData[i][months[j].name] = Math.round(Math.random() * maxVariance) + minSales;
    }
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" ID="theLayout" width="100%" height="100%">
        <members>
            <ListGrid ID="salesDataGrid" data={salesData} fields={[{
        name: 'product',
        title: 'Product',
        canEdit: false
    }].concat(months)} leaveScrollbarGap="false" canEdit="true" editEvent="click" alternateRecordStyles="false" autoFitData="vertical" width="100%" cellChanged={onSalesDataGridCellChanged} chartType="Area" updateChart={onSalesDataGridUpdateChart} getCellStyle={onSalesDataGridGetCellStyle}>
                <chartProperties>
                	<height>100%</height>
                </chartProperties>
            </ListGrid>
            <HLayout membersMargin="20" ID="buttonsLayout" width="100%" margin="5">
                <members>
                    <IButton title="View as PDF" width="50%" click={onViewAsPDFClick}/>
                    <IButton title="Download as PDF" width="50%" click={onDownloadAsPDFClick}/>
                </members>
            </HLayout>
        </members>
    </VLayout>,
    document.getElementById(target)
);

salesDataGrid.updateChart();
