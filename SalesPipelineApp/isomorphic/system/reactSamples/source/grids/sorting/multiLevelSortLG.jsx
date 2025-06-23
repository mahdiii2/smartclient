/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ListGrid, SortSpecifier } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid ID="supplyList" dataSource="supplyItem" autoFetchData="true" width="700" height="300" top="30" canMultiSort="true">
        <initialSort>
            <SortSpecifier direction="ascending" property="category"/>
            <SortSpecifier direction="descending" property="itemName"/>
        </initialSort>
    </ListGrid>,
    document.getElementById(target)
);
