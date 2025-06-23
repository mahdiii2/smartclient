
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout, ListGrid, DynamicForm, SelectItem, LGField, ListGridRecord } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSalesDataGridUpdateChart = function (chartType) {
    // store chart configuration
    if (chartType) this.chartType = chartType;
    // or pick up the (possibly changed) chartType from the last chart
    else if (this.lastChart) this.chartType = this.lastChart.chartType;

    // if there's already a chart, destroy it
    if (this.lastChart) this.lastChart.destroy();

    // generate chart
    this.lastChart = this.chartData("product");
    
    // show it
    theLayout.addMember(this.lastChart, 1);
};

let onSalesDataGridGetCellStyle = function (record, rowNum, colNum) {
    var styleName = this.Super("getCellStyle", arguments);
    if (this.getFieldName(colNum) == "product") styleName += "Dark";        
    return styleName;
};

// generate a random data set
//----------------------------------------
var months = [
    {name:"jun", title:"Jun", longTitle:"June"},
    {name:"jul", title:"Jul", longTitle:"July"},
    {name:"aug", title:"Aug", longTitle:"August"},
    {name:"sep", title:"Sep", longTitle:"September"},
    {name:"oct", title:"Oct", longTitle:"October"},
    {name:"nov", title:"Nov", longTitle:"November"},
    {name:"dec", title:"Dec", longTitle:"December"}
];
var salesData=[], numProducts = 4;
for (var i=0; i<numProducts; i++) {
    salesData[i] = {product:"Product "+(String.fromCharCode(65+i))};
    var minSales = Math.round(Math.random()*8000) + 2000, // 2k-10k
        maxVariance = minSales/3; // up to 33% of min value for this product
    for (var j=0; j<months.length; j++) {
        salesData[i][months[j].name] = Math.round(Math.random()*maxVariance) + minSales;
    }
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <VLayout membersMargin="20" ID="theLayout" width="100%" height="600">
            <members>
                <ListGrid ID="salesDataGrid" leaveScrollbarGap="false" canEdit="true" editEvent="click" alternateRecordStyles="false" height="108" cellChanged="salesDataGrid.updateChart()" chartType="Area" updateChart={onSalesDataGridUpdateChart} getCellStyle={onSalesDataGridGetCellStyle} data={salesData}>
                    <fields>
                        <LGField name="product" title="Product" canEdit="false"/>
                        <LGField name="jun" title="Jun" longTitle="June"/>
                        <LGField name="jul" title="Jul" longTitle="July"/>
                        <LGField name="aug" title="Aug" longTitle="August"/>
                        <LGField name="sep" title="Sep" longTitle="September"/>
                        <LGField name="oct" title="Oct" longTitle="October"/>
                        <LGField name="nov" title="Nov" longTitle="November"/>
                        <LGField name="dec" title="Dec" longTitle="December"/>
                    </fields>
                </ListGrid>
                <DynamicForm ID="chartSelector">
                    <items>
                        <SelectItem name="chartType" title="Chart Type" defaultValue="Area" changed="salesDataGrid.updateChart(value)">
                            <valueMap>
                                <value>Column</value>
                                <value>Area</value>
                                <value>Radar</value>
                            </valueMap>
                        </SelectItem>
                    </items>
                </DynamicForm>
            </members>
        </VLayout>

    </>,
    document.getElementById(target)
);

salesDataGrid.updateChart();
// Have the chartSelector update itself if the context menu is used to change chartType
chartSelector.observe(salesDataGrid.lastChart, "setChartType", 
                      "chartSelector.setValue('chartType', observed.chartType)");

