/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ColumnTree } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ColumnTree dataSource="employees" ID="employeeColTree" width="100%" height="205" autoFetchData="true" nodeIcon="[SAMPLE]icons/16/person.png" folderIcon="[SAMPLE]icons/16/person.png" showOpenIcons="false" showDropIcons="false" closedIconSuffix="" showHeaders="true" showNodeCount="true"/>,
    document.getElementById(target)
);
