import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TreeGrid, VStack, HStack, Img } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const PartsTreeGrid = SC.defineClass("PartsTreeGrid", TreeGrid);

isc.PartsTreeGrid.addProperties({
    width:200, height:200,
    showEdges:true, border:"0px", bodyStyleName:"normal",
    alternateRecordStyles:true, showHeader:false, leaveScrollbarGap:false,
    emptyMessage:"Drag &amp; drop parts here",
    manyItemsImage:"cubes_all.png",
    appImgDir:"pieces/16/"
});
    
// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>  
        <HStack membersMargin="10" height="160">
            <members>
                <PartsTreeGrid ID="myTree1" data={partsTree1} canReorderRecords="true" canAcceptDroppedRecords="true"
                        canDragRecordsOut="true" dragDataAction="move" />
                <VStack ID="vStack" width="32" height="74" layoutAlign="center" membersMargin="10" >
                    <members>
                        <Img ID="img1" src="[SAMPLE]icons/32/arrow_right.png" width="32" height="32" click="myTree2.transferSelectedData(myTree1)" />
                        <Img ID="img2" src="[SAMPLE]icons/32/arrow_left.png" width="32" height="32" click="myTree1.transferSelectedData(myTree2)" />
                    </members>
                </VStack>
                <PartsTreeGrid ID="myTree2" left="250" data={partsTree2} canDragRecordsOut="true" canAcceptDroppedRecords="true"
                            canReorderRecords="true" />
            </members>
        </HStack>
    
    </>, 
    document.getElementById(target)
);
