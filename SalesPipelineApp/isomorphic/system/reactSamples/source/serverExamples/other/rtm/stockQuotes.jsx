/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, HLayout, Label, LayoutSpacer, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onStockQuotesGridGetCellCSSText = function (record, rowNum, colNum) {
    if (this.getField(colNum).name == 'lastValue' && record.lastUpdated != null) {
        var delta = new Date().getTime() - record.lastUpdated.getTime();
        var blinkPeriod = 2000;
        if (delta < blinkPeriod) {
            var grid = this;
            isc.Timer.setTimeout(function () {
                grid.refreshCell(rowNum, colNum);
            }, 100);
            var changeValue = record.changeValue;
            var ratio = (blinkPeriod - delta) / blinkPeriod;
            var color = 255 - Math.round(200 * ratio);
            if (changeValue > 0) {
                return 'background-color:#' + color.toString(16) + 'FF' + color.toString(16);
            } else if (changeValue < 0) {
                return 'background-color:#FF' + color.toString(16) + color.toString(16);
            }
        }
    }
    return null;
};
let onGenerateUpdatesButtonClick = function () {
    this.disable();
    isc.RPCManager.sendRequest({ actionURL: isc.Page.getIsomorphicDir() + '../examples/StockQuotes/generate?sp=' + startParameter });
    isc.Timer.setTimeout('if (window.generateUpdatesButton != null) generateUpdatesButton.enable()', 90000);
};
let onConnectionIndicatorInitWidget = function () {
    var _this = this;
    isc.Messaging.addClassMethods({
        connectionUp: function () {
            _this.setContents('Connection: UP');
            _this.setBackgroundColor('lightgreen');
        },
        connectionDown: function () {
            _this.setContents('Connection: DOWN');
            _this.setBackgroundColor('red');
        }
    });
};
let onConnectionIndicatorDestroy = function () {
    this.Super('destroy');
    isc.Messaging.addClassMethods({
        connectionUp: function () {
        },
        connectionDown: function () {
        }
    });
};

var startParameter = isc.timestamp();
function updateStockQuotes(data) {
    if (window.stockQuotesGrid == null) {
        isc.Messaging.unsubscribe('stockQuotes' + startParameter);
        return;
    }
    var newStockData = [];
    for (i = 0; i < data.size(); i++) {
        if (data[i][1] != 0) {
            var record = stockQuotesGrid.data.find({ id: data[i][0] });
            record.changeValue = Math.round(data[i][1] * record.lastValue) / 100;
            record.lastValue = Math.round((record.changeValue + record.lastValue) * 100) / 100;
            record.dayHighValue = Math.max(record.dayHighValue, record.lastValue);
            record.dayLowValue = Math.min(record.dayLowValue, record.lastValue);
            record.lastUpdated = new Date();
            newStockData.add(record);
        }
    }
    var dsResponse = {
        data: newStockData,
        startRow: 0,
        endRow: newStockData.size(),
        totalRows: newStockData.size(),
        status: 0
    };
    var dsRequest = { operationType: 'update' };
    stockQuotes.updateCaches(dsResponse, dsRequest);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout overflow="auto" membersMargin="10" width="700" height="100%" autoDraw="true">
        <members>
            <ListGrid ID="stockQuotesGrid" dataSource="stockQuotes" autoFetchData="true" height="300" getCellCSSText={onStockQuotesGridGetCellCSSText}/>
            <HLayout>
                <members>
                    <Button title="Generate more updates" ID="generateUpdatesButton" width="200" click={onGenerateUpdatesButtonClick}/>
                    <LayoutSpacer width="*"/>
                    <Label contents="Connection DOWN" title="connectionIndicator" ID="connectionIndicator" height="20" initWidget={onConnectionIndicatorInitWidget} destroy={onConnectionIndicatorDestroy}/>
                </members>
            </HLayout>
        </members>
    </VLayout>,
    document.getElementById(target)
);

generateUpdatesButton.click();
isc.Messaging.subscribe('stockQuotes' + startParameter, updateStockQuotes);
