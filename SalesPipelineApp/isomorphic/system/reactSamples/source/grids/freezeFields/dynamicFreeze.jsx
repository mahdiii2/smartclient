/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid ID="supplyList" dataSource="supplyItem" canFreezeFields="true" autoFetchData="true" width="550" height="224">
        <fields>
            <LGField name="itemName" width="150"/>
            <LGField name="category" width="100"/>
            <LGField name="SKU" width="100"/>
            <LGField name="units" width="80"/>
            <LGField name="description" width="250"/>
        </fields>
    </ListGrid>,
    document.getElementById(target)
);
