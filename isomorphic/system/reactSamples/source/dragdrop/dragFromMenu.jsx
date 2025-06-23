/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, LGField, ListGrid, ListGridRecord, Menu, MenuButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

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

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack membersMargin="50" height="160">
        <members>
            <MenuButton title="Parts" ID="menuButton" width="100" autoDraw="false">
                <menu data={exampleData} selectionType="single" canDragRecordsOut="true" dragDataAction="move" ID="testMenu" autoDraw="false" placement="nearOrigin">
                    <fields>
                        <LGField name="partSrc" type="image" width="40" imageURLPrefix="pieces/16/"/>
                        <LGField name="partName"/>
                    </fields>
                </menu>
            </MenuButton>
            <ListGrid ID="myList" canAcceptDroppedRecords="true" canReorderRecords="true" autoDraw="false">
                <data>
                    <ListGridRecord partName="Blue" partSrc="cube_blue.png" partNum="1"/>
                    <ListGridRecord partName="Yellow" partSrc="cube_yellow.png" partNum="2"/>
                </data>
                <fields>
                    <LGField name="partSrc" type="image" title=" " width="40" imageURLPrefix="pieces/16/"/>
                    <LGField name="partName" title="Part Name"/>
                    <LGField name="partNum" title="#" width="40"/>
                </fields>
            </ListGrid>
        </members>
    </HStack>,
    document.getElementById(target)
);
