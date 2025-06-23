/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, Facet, FacetChart, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onGenerateUpdatesButtonClick = function () {
    this.disable();
    isc.RPCManager.sendRequest({ actionURL: isc.Page.getIsomorphicDir() + '../examples/StockQuotes/generate?sp=' + startParameter });
    isc.Timer.setTimeout('if (window.generateUpdatesButton != null) generateUpdatesButton.enable()', 90000);
};

var startParameter = isc.timestamp();
function getChart(data, initialData) {
    return isc.FacetChart.create({
        ID: 'stockQuotesChart',
        facets: [
            {
                id: 'time',
                title: 'Time'
            },
            {
                id: 'name',
                title: 'Name'
            }
        ],
        data: data,
        initialData: initialData,
        valueProperty: 'lastValue',
        chartType: 'Area',
        title: 'Portfolio Value'
    });
}
function updateStockQuotes(data) {
    if (window.stockQuotesChart == null) {
        isc.Messaging.unsubscribe('stockQuotes' + startParameter);
        return;
    }
    var newData = stockQuotesChart.data.duplicate();
    var initialData = stockQuotesChart.initialData;
    var d = new Date();
    var t = isc.Time.toShortTime(d, 'toShort24HourTime') + ':' + d.getSeconds() + '.' + d.getMilliseconds();
    for (var i = 0; i < initialData.size(); i++) {
        var record = {
            id: initialData[i].id,
            name: initialData[i].name,
            time: t,
            lastValue: initialData[i].lastValue
        };
        for (var j = 0; j < data.size(); j++) {
            if (data[j][0] == initialData[i].id) {
                if (data[j][1] != 0) {
                    record.lastValue += data[j][1] * record.lastValue / 100 * 20;
                }
                break;
            }
        }
        newData.add(record);
    }
    if (newData.size() > 20 * initialData.size()) {
        for (var i = 0; i < initialData.size(); i++) {
            newData.removeAt(0);
        }
    }
    stockQuotesChart.setData(newData);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout ID="container" width="100%" height="100%">
        <members>
            <Button title="Generate more updates" ID="generateUpdatesButton" width="200" click={onGenerateUpdatesButtonClick}/>
            <FacetChart chartType="Area" title="Portfolio Value" valueProperty="lastValue" ID="stockQuotesChart">
                <data>
                </data>
                <facets>
                    <Facet id="time" title="Time"/>
                    <Facet id="name" title="Name"/>
                </facets>
            </FacetChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);

generateUpdatesButton.click();
isc.Messaging.subscribe('stockQuotes' + startParameter, updateStockQuotes);
isc.DataSource.get('stockQuotes').fetchData(null, function (dsResponse, data) {
    var stockData = [];
    var d = new Date();
    var t = isc.Time.toShortTime(d, 'toShort24HourTime') + ':' + d.getSeconds() + '.' + d.getMilliseconds();
    for (var i = 0; i < data.size(); i++) {
        stockData.add({
            id: data[i].id,
            name: data[i].name,
            time: t,
            lastValue: data[i].lastValue
        });
    }
    stockQuotesChart.initialData = stockData;
    stockQuotesChart.setData(stockData.duplicate());
});
