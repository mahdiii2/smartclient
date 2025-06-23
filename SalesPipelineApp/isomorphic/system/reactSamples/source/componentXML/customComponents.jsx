/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const MyListGrid = SC.defineClass('MyListGrid', ListGrid);
isc.MyListGrid.addProperties({
    hilitePricesOverTen: false,
    setHilitePricesOverTen: function (hilitePricesOverTenNewValue) {
        this.hilitePricesOverTen = hilitePricesOverTenNewValue;
    },
    getCellCSSText: function (record, rowNum, colNum) {
        if (this.hilitePricesOverTen && record.unitCost > 10) {
            return 'color:red;';
        }
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Canvas ID="container"/>,
    document.getElementById(target)
);

isc.RPCManager.loadScreen('customComponents', function (screen) {
    container.addChild(screen);
});
