/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TGField, TreeGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TreeGrid dataSource="hugeTreeOpenNodes" showConnectors="true" nodeIcon="pieces/16/cube_blue.png" folderIcon="pieces/16/cubes_blue.png" closedIconSuffix="" showOpenIcons="false" showDropIcons="false" showFilterEditor="true" autoFetchData="true" width="500" height="400" dataFetchMode="paged" progressiveLoading="true">
        <fields>
            <TGField name="name" canFilter="true"/>
        </fields>
        <dataProperties childrenProperty="children" openProperty="isOpen" canReturnOpenFolders="true"/>
    </TreeGrid>,
    document.getElementById(target)
);
