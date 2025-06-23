/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, ListGrid, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onButtonClick = function () {
    isc.logWarn(isc.echoAll(supplyList.getSort()));
    supplyList.askForSort();
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10">
        <members>
            <Button autoFit="true" title="Multilevel Sort" ID="button" click={onButtonClick}/>
            <ListGrid ID="supplyList" dataSource="supplyItem" autoFetchData="true" width="900" height="300"/>
        </members>
    </VStack>,
    document.getElementById(target)
);
