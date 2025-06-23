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
    <>
        <ListGrid ID="supplyItemList" dataSource="supplyItem" showFilterEditor="true" canDragRecordsOut="true" dragDataAction="copy" autoFetchData="true" width="300" height="224">
            <fields>
                <LGField name="itemID"/>
                <LGField name="itemName" width="75%"/>
            </fields>
        </ListGrid>

        <ListGrid ID="cartItemList" dataSource="cartItem" showFilterEditor="true" canEdit="true" canAcceptDroppedRecords="true" autoFetchData="true" canRemoveRecords="true" width="400" height="224" left="320">
            <fields>
                <LGField name="itemID" canEdit="false"/>
                <LGField name="itemName" width="50%" canEdit="false"/>
                <LGField name="quantity" defaultValue="1"/>
            </fields>
            <dropValues>
            	<quantity>1</quantity>
            </dropValues>
        </ListGrid>
    </>,
    document.getElementById(target)
);
