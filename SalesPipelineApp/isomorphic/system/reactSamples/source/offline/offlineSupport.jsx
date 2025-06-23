/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, LGField, ListGrid, TreeGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCategoryTreeRecordClick = function(viewer,record,recordNum,field,fieldNum,value,rawValue,editedRecord) {return itemList.filterData({category: record.categoryName});};
let onGoOfflineClick = function () {
    if (this.title == 'Go offline') {
        this.setTitle('Go online');
        isc.Offline.goOffline();
    } else {
        this.setTitle('Go offline');
        isc.Offline.goOnline();
    }
};

supplyCategory.addProperties({ useOfflineStorage: true });
supplyItem.addProperties({ useOfflineStorage: true });

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <TreeGrid ID="categoryTree" dataSource="supplyCategory" autoFetchData="true" width="250" height="224" loadOnDemand="true" recordClick={onCategoryTreeRecordClick}/>

        <ListGrid ID="itemList" dataSource="supplyItem" width="350" height="224" left="270">
            <fields>
                <LGField name="itemID"/>
                <LGField name="itemName"/>
                <LGField name="unitCost"/>
                <LGField name="category"/>
            </fields>
        </ListGrid>

        <Button title="Go offline" width="100" top="240" click={onGoOfflineClick}/>
    </>,
    document.getElementById(target)
);
