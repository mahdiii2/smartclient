/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, LGField, Label, LayoutSpacer, ListGrid, TreeGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCategoryTreeFolderClick = function (viewer, folder, recordNum) {
    labelCategory.setContents('Items in Category: ' + folder.categoryName);
    itemList.fetchData({ category: folder.categoryName });
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout membersMargin="10" width="800" height="300">
        <members>
            <VLayout ID="vLayoutCategory" width="35%">
                <members>
                    <LayoutSpacer height="20"/>
                    <TreeGrid ID="categoryTree" dataSource="supplyCategory" canReparentNodes="false" canAcceptDroppedRecords="true" autoFetchData="true" autoDraw="false" folderClick={onCategoryTreeFolderClick}/>
                </members>
            </VLayout>
            <VLayout ID="vLayoutItems" width="65%">
                <members>
                    <Label contents="Items in Category: Washroom" title="labelCategory" ID="labelCategory" height="20" autoDraw="false"/>
                    <ListGrid ID="itemList" dataSource="supplyItem" canDragRecordsOut="true" autoFetchData="true" autoDraw="false">
                        <initialCriteria fieldName="category" operator="equals" value="Washroom"/>
                        <fields>
                            <LGField name="itemName" width="300"/>
                            <LGField name="SKU"/>
                            <LGField name="units"/>
                        </fields>
                    </ListGrid>
                </members>
            </VLayout>
        </members>
    </HLayout>,
    document.getElementById(target)
);
