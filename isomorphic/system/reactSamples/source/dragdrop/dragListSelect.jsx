/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onPartsListGridSelectionUpdated = function(record,recordList) {return mirrorSelectionList.setData(recordList)};

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
    height: 160,
    cellHeight: 24,
    imageSize: 16,
    showEdges: true,
    border: '0px',
    bodyStyleName: 'normal',
    showHeader: false,
    leaveScrollbarGap: false,
    emptyMessage: 'Nothing selected',
    defaultFields: [
        {
            name: 'partSrc',
            type: 'image',
            width: 32,
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
    <>
        <PartsListGrid data={exampleData} canDragSelect="true" selectionUpdated={onPartsListGridSelectionUpdated}/>

        <PartsListGrid ID="mirrorSelectionList" left="200"/>
    </>,
    document.getElementById(target)
);
