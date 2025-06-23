/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onAddButtonClick = function() {return countryList.startEditingNew();};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" dataSource="ormDataSource_country" canEdit="true" autoFetchData="true" canRemoveRecords="true" width="600" height="224" useAllDataSourceFields="true" dataFetchMode="local"/>

        <IButton title="Create Country" ID="addButton" width="110" top="240" click={onAddButtonClick}/>
    </>,
    document.getElementById(target)
);
