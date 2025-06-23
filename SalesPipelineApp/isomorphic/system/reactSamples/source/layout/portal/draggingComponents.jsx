import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, PortalLayout, HLayout, ListGrid, VStack, VLayout, Img } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const PartsListGrid = SC.defineClass("PartsListGrid", ListGrid);
isc.PartsListGrid.addProperties({
    cellHeight: 24, 
    imageSize: 16,
    showEdges: true,
    border: "0px",
    bodyStyleName: "normal",
    alternateRecordStyles: true, 
    showHeader: false,
    leaveScrollbarGap: false,
    defaultFields: [
        {name: "partSrc", type: "image", width: 24, imageURLPrefix: "pieces/16/"},
        {name: "partName"},
        {name: "partNum", width: 20}
    ],
    trackerImage: {src:"pieces/24/cubes_all.png", width: 24, height: 24}
});

const DragPiece = SC.defineClass("DragPiece", Img);
isc.DragPiece.addProperties({
    width: 48,
    height: 48,
    padding: 12,
    layoutAlign: "center",
    canDragReposition: true,
    canDrop: true,
    dragAppearance: "target",
    appImgDir: "pieces/48/"
});

let getDropPortlet = function (dragTarget, colNum, rowNum, rowOffset) {
    // You can use getDropPortlet to customize what happens when a component is dropped
    if (dragTarget.isA("PartsListGrid")) {
        return isc.Portlet.create({
        title: "Dragged Records",
            items: [
                isc.PartsListGrid.create({
                    data: dragTarget.getDragData()
                })
            ]
        }); 
    } else {
        // By default, the whole component is wrapped in a Portlet
        return this.Super("getDropPortlet", arguments);
    }
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <PartsListGrid ID="myList" data={exampleData} autoDraw="false" canDragRecordsOut="true" canReorderRecords="true" dragDataAction="copy"/>
    
        <PortalLayout ID="portalLayout" getDropPortlet={getDropPortlet}/>
    
        <VStack ID="myImages" membersMargin="10" layoutMargin="10" showEdges="true">
            <members>
                <DragPiece src="pawn_blue.png"/>
                <DragPiece src="pawn_green.png"/>
                <DragPiece src="pawn_yellow.png"/>
            </members>
        </VStack>
    
        <HLayout width="100%" height="100%" membersMargin="20">
            <members>
                <value>portalLayout</value>
                <VLayout width="200" membersMargin="10">
                    <members>
                        <value>myList</value>
                        <value>myImages</value>
                    </members>
                </VLayout>
            </members>
        </HLayout>
        
    </>,
    document.getElementById(target)
);
