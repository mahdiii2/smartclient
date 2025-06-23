/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, Img, ListGrid, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onImgClick = function() {return list2.transferSelectedData(list1)};
let onImgClick1 = function() {return list1.transferSelectedData(list2)};

const ItemsListGrid = SC.defineClass('ItemsListGrid', ListGrid);
isc.ItemsListGrid.addProperties({
    autoDraw: false,
    leaveScrollbarGap: false,
    dataSource: supplyItem,
    autoFetchData: false,
    dragDataAction: 'move',
    defaultFields: [
        { name: 'itemName' },
        { name: 'SKU' },
        { name: 'category' }
    ]
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout membersMargin="10" width="800" height="224">
        <members>
            <ItemsListGrid ID="list1" canDragRecordsOut="true" canAcceptDroppedRecords="true" canReorderRecords="true"/>
            <VStack membersMargin="10" width="32" height="74" layoutAlign="center">
                <members>
                    <Img src="[SAMPLE]icons/32/arrow_right.png" width="32" height="32" click={onImgClick}/>
                    <Img src="[SAMPLE]icons/32/arrow_left.png" width="32" height="32" click={onImgClick1}/>
                </members>
            </VStack>
            <ItemsListGrid ID="list2" canDragRecordsOut="true" canAcceptDroppedRecords="true" canReorderRecords="true"/>
        </members>
    </HLayout>,
    document.getElementById(target)
);

list1.fetchData({ category: 'Manilla Folders' });
list2.fetchData({ category: 'Lever Arch Files' });
