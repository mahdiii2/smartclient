
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout, FacetChart, Facet, DynamicForm, FormItem, ComboBoxItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// this sample uses previously captured responses from Yahoo finance so that if Yahoo is unavailable, the sample still works.
// at the point the Yahoo web service originally used to build this sample appears to be permanently unavailable, so setting
// this variable to true definitely will not work.
let USE_YAHOO_FINANCE = false;

let onStockChart_showMessage = function (message, alignCenter) {
    var label = this._label;
    if (label == null) {
        label = this._label = isc.Label.create({
            autoDraw: false,
            contents: "",
            valign: "center",
            wrap: true,
            showEdges: false
        });
        stockChart.addChild(label);
    }
    label.setContents(message);
    var alignment = (alignCenter ? "center" : "left");
    label.setAlign(alignment);

    var widthRatio = 0.6, heightRatio = 0.6;
    var width = this.getWidth(), height = this.getHeight();
    label.setTop(Math.round((1 - heightRatio) / 2 * height));
    label.setLeft(Math.round((1 - widthRatio) / 2 * width));
    label.setHeight(Math.round(heightRatio * height));
    label.setWidth(Math.round(widthRatio * width));
    label.show();
};

let onStockChart_hideMessage = function () {
    if (this._label != null) {
        this._label.hide();
    }
};

let onStockChart_updateData = function (symbol, name) {
    // Clear the chart and display a loading message.
    this.destroyItems();
    this._showMessage(this._loadingMessage, true);

    var stockDs = isc.DataSource.get(USE_YAHOO_FINANCE ? "stockData" : "staticStockData");
    stockDs.fetchData({ symbol: symbol }, function (dsResponse, data, dsRequest) {
        if (isc.isAn.Array(data) && data.length > 0) {
            stockChart._hideMessage();
            stockChart.title = name;
            stockChart.setData(data.sortByProperty("date", Date.compareDates));
        } else {
            stockChart._showMessage(stockChart._errorMessage, false);
            stockChart.title = null;
            stockChart.setData([]);
        }
    }, { willHandleError : true });
};

let onSymbolChanged = function (form, self, symbol) {
    if (!symbol) {
        stockChart.setData([]);
    } else {
        stockChart._updateData(symbol, this.getDisplayValue(symbol));
    }
};

let _errorMessage = 
        (USE_YAHOO_FINANCE
         ? "This test uses sample data provided by Yahoo&trade; Finance, " +
           "but Yahoo data is not currently available.  Refresh the sample to " +
           "try again.  You may need to wait a while for the Yahoo service to " +
           "become available again."
         : "Data is not currently available.  Please make sure that you are connected " +
           "to the Internet and then refresh the sample to try again.");
            
// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <VLayout width="100%" height="100%" margin="5" membersMargin="20">
            <members>
                <DynamicForm ID="symbolForm">
                    <items>
                        <ComboBoxItem valueField="symbol" displayField="name" name="symbol" 
                            title="Stock Symbol" canEdit="false" changeOnKeypress="false" autoFetchData="false" 
                            pickListWidth="450" sortField="symbol" changed={onSymbolChanged} optionDataSource="nasdaqSymbols"
                            pickListFields={[{ name: "symbol"}, { name: "name" }]}>
                        </ComboBoxItem>
                    </items>
                </DynamicForm>
                <FacetChart chartType="Area" title="stockChart" showTitle="false" showDataAxisLabel="false" rotateLabels="never" 
                    minLabelGap="4" canZoom="true" labelCollapseMode="time" valueProperty="close" ID="stockChart" 
                    _errorMessage={_errorMessage} _loadingMessage="Loading data ..." _showMessage={onStockChart_showMessage}
                    _hideMessage={onStockChart_hideMessage} _updateData={onStockChart_updateData} 
                    allowedChartTypes={["Area", "Line"]}>
                    <facets>
                        <Facet id="date" title="Day"/>
                    </facets>
                </FacetChart>
            </members>
        </VLayout>

    </>,
    document.getElementById(target)
);

let symbolItem = symbolForm.getItem("symbol");

symbolItem.fetchData(function (symbolItem, dsResponse, data, dsRequest) {
    if (!(dsResponse.status < 0) && isc.isAn.Array(data) && data.length > 0) {
        symbolItem.setCanEdit(true);
        var symbol = data[0].symbol;
        symbolItem.setValue(symbol);
        stockChart._updateData(symbol, symbolItem.getDisplayValue(symbol));
    }
});


