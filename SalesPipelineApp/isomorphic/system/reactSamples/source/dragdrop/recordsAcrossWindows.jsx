/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, Img, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onMyList1DragStart = function () {
    var dragData = this.getDragData();
    if (dragData.length != 0) {
        var record = dragData[0];
        isc.EventHandler.setDragTrackerImage('pieces/16/' + record.partSrc, 12, 12);
    }
};
let onImgClick = function() {return myList2.transferSelectedData(myList1)};

var exampleData = [
    {
        partName: 'Blue',
        partSrc: 'cube_blue.png',
        partNum: 1
    },
    {
        partName: 'Yellow',
        partSrc: 'cube_yellow.png',
        partNum: 2
    },
    {
        partName: 'Green',
        partSrc: 'cube_green.png',
        partNum: 3
    },
    {
        partName: 'Blue',
        partSrc: 'cube_blue.png',
        partNum: 4
    },
    {
        partName: 'Yellow',
        partSrc: 'cube_yellow.png',
        partNum: 5
    },
    {
        partName: 'Green',
        partSrc: 'cube_green.png',
        partNum: 6
    },
    {
        partName: 'Blue',
        partSrc: 'cube_blue.png',
        partNum: 7
    },
    {
        partName: 'Yellow',
        partSrc: 'cube_yellow.png',
        partNum: 8
    },
    {
        partName: 'Green',
        partSrc: 'cube_green.png',
        partNum: 9
    }
];
const PartsListGrid = SC.defineClass('PartsListGrid', ListGrid);
isc.PartsListGrid.addProperties({
    width: 150,
    cellHeight: 24,
    imageSize: 16,
    showEdges: true,
    border: '0px',
    bodyStyleName: 'normal',
    showHeader: false,
    leaveScrollbarGap: false,
    emptyMessage: 'Drag &amp; drop parts here',
    defaultFields: [
        {
            name: 'partSrc',
            type: 'image',
            width: 24,
            imageURLPrefix: 'pieces/16/'
        },
        { name: 'partName' },
        {
            name: 'partNum',
            width: 20
        }
    ],
    trackerImage: {
        src: 'pieces/24/cubes_all.png',
        width: 24,
        height: 24
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack membersMargin="10" height="160">
        <members>
            <PartsListGrid ID="myList1" data={exampleData} canDragRecordsOut="true" canReorderRecords="true" dragDataAction="copy" dragType="partsListRecords" useNativeDrag="true" dragStart={onMyList1DragStart}/>
            <Img src="[SAMPLE]icons/32/arrow_right.png" width="32" height="32" layoutAlign="center" click={onImgClick}/>
            <PartsListGrid ID="myList2" canAcceptDroppedRecords="true" canReorderRecords="true" left="300"/>
        </members>
    </HStack>,
    document.getElementById(target)
);
