/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, LGField, ListGrid, TreeGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCategoryTreeNodeClick = function(viewer,node,recordNum) {return itemList.fetchData({category: node.categoryName})};
let onCategoryTreeFolderDrop = function (dragRecords, dropFolder, index, sourceWidget) {
    if (this === sourceWidget)
        return;
    var record = itemList.getSelectedRecord();
    var newCategory = dropFolder.categoryName;
    record.category = newCategory;
    supplyItem.updateData(record);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout width="100%" height="100%">
        <members>
            <TreeGrid ID="categoryTree" dataSource="supplyCategory" selectionType="single" canAcceptDroppedRecords="true" autoFetchData="true" width="30%" showResizeBar="true" nodeClick={onCategoryTreeNodeClick} folderDrop={onCategoryTreeFolderDrop}/>
            <ListGrid ID="itemList" dataSource="supplyItem" selectionType="single" canDragRecordsOut="true">
                <fields>
                    <LGField name="itemName"/>
                    <LGField name="SKU"/>
                    <LGField name="unitCost" width="50"/>
                    <LGField name="units" width="40"/>
                </fields>
            </ListGrid>
        </members>
    </HLayout>,
    document.getElementById(target)
);
