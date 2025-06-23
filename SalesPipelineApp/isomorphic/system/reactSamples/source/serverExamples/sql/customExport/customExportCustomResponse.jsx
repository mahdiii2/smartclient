/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onExportButtonClick = function () {
    supplyItemExport.exportData(null, {
        exportAs: 'custom',
        exportFilename: 'filename.abc',
        operationId: 'customExport'
    });
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <IButton autoFit="true" title="Do Custom Export" ID="exportButton" left="20" top="20" click={onExportButtonClick}/>,
    document.getElementById(target)
);
