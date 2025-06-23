import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, VLayout, Canvas, Label, LayoutSpacer } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// There are 3 HLayout examples and 3 VLayout examples
//
// 1. HLayout with layout.align = 'center'
// 2. HLayout with member.layoutAlign = 'center' (or layout.defaultLayoutAlign = 'center')
// 3. HLayout with LayoutSpacers
// 4. VLayout with layout.align = 'center'
// 5. VLayout with member.layoutAlign = 'center' (or layout.defaultLayoutAlign = 'center')
// 6. VLayout with LayoutSpacers

const LayoutAlignCenterExample = SC.defineClass("LayoutAlignCenterExample", VLayout);

isc.LayoutAlignCenterExample.addProperties({
    title: "",
    example: null,
    autoDraw: false,
    border:"1px solid #CCCCCC",
    layoutMargin: 3,
    membersMargin: 2,
    initWidget : function() {
        this.Super("initWidget", arguments);
        this.addMembers([
          isc.Label.create({
              autoDraw: false,
              width: "100%",
              autoFit: true,
              padding: 6,
              contents: this.title
          }),
          this.example
        ]);
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
    {/* // 1. HLayout with layout.align = 'center'
        //
        // This centers the members along the horizontal axis of the HLayout.
        // Note that the members have a specified width that is less than the
        // width of the HLayout -- otherwise, you would not see the centering
        // visually!
        */}
        <HLayout ID="hLayoutAlignCenter" autoDraw="false"
            // Specifying the width creates space within which to center the members.
            width="100%" height="100%" layoutMargin="6" membersMargin="6" border="1px dashed blue" align="center" >
            <members>
                <Canvas height="40" width="40" backgroundColor="red"/>
                <Canvas height="40" width="40" backgroundColor="green"/>
                <Canvas height="40" width="40" backgroundColor="blue"/>
            </members>
        </HLayout>
    
    {/* // 2. HLayout with member.layoutAlign = 'center' (or layout.defaultLayoutAlign = 'center')
        //
        // This centers every member along the vertical axis of the HLayout.
        // If you don't want to center *every* member vertically, you can
        // instead specify the layoutAlign property on individual members.
        // Note that the height of the members is fixed -- if they filled
        // the layout, you wouldn't see the centering.
        */}
        <HLayout ID="hLayoutDefaultLayoutAlign" autoDraw="false"
            // Specifying the height creates space within which to center the members.
            height="100%" width="100%" layoutMargin="6" membersMargin="6" border="1px dashed blue" defaultLayoutAlign="center">
            <members>
                <Canvas height="40" width="40" backgroundColor="red"/>
                <Canvas height="40" width="40" backgroundColor="green"/>
                <Canvas height="40" width="40" backgroundColor="blue"/>
            </members>
        </HLayout>
    
    {/* // 3. HLayout with LayoutSpacers
        //
        // This example uses LayoutSpacers as members to center one member in the space
        // remaining after the first member is drawn. Note that it is the positioning
        // of the two LayoutSpacer members that creates the centering ... no alignment
        // property is used.
        */}
        <HLayout ID="hLayoutLayoutSpacers" autoDraw="false"
            // Specifying the width creates space for the LayoutSpacers to distribute.
            width="100%" height="100%" layoutMargin="6" membersMargin="6" border="1px dashed blue"
            // Note no alignment property! It's all done with LayoutSpacers
            >
            <members>
                <Label height="40" width="33%" padding="10" backgroundColor="red" contents="<b>No alignment</b>"/>
                {/* Note the use of the LayoutSpacer */}
                <LayoutSpacer />
                <Label height="40" width="33%" padding="10" backgroundColor="green" contents="<b>Centered in remaning space</b>"/>
                {/*} And another layout spacer */}
                <LayoutSpacer />
            </members>
        </HLayout>
    
    {/*    // 4. VLayout with layout.align = 'center'
        //
        // This centers the members along the vertical axis of the VLayout.
        // Note that the members have a specified height that is less than the
        // height of the VLayout -- otherwise, you would not see the centering
        // visually!
        */}
        <VLayout ID="vLayoutAlignCenter" autoDraw="false"
            // Specifying the height creates space within which to center the members.
            height="100%" width="100%" layoutMargin="6" membersMargin="6" border="1px dashed blue" align="center">
            <members>
                <Canvas height="40" width="40" backgroundColor="red"/>
                <Canvas height="40" width="40" backgroundColor="green"/>
                <Canvas height="40" width="40" backgroundColor="blue"/>
            </members>
        </VLayout>
    
    {/* // 5. VLayout with member.layoutAlign = 'center' (or layout.defaultLayoutAlign = 'center')
        //
        // This centers every member along the horizontal axis of the VLayout.
        // If you don't want to center *every* member horizontally, you can
        // instead specify the layoutAlign property on individual members.
        // Note that the width of the members is fixed -- if they filled
        // the layout, you wouldn't see the centering.
        */}
        <VLayout ID="vLayoutDefaultLayoutAlign" autoDraw="false"
            // Specifying the width creates space within which to center the members.
            width="100%" height="100%" layoutMargin="6" membersMargin="6" border="1px dashed blue" defaultLayoutAlign="center">
            <members>
                <Canvas height="40" width="40" backgroundColor="red"/>
                <Canvas height="40" width="40" backgroundColor="green"/>
                <Canvas height="40" width="40" backgroundColor="blue"/>
            </members>
        </VLayout>
        
    {/* // 6. VLayout with LayoutSpacers
        //
        // This example uses LayoutSpacers as members to center one member in the space
        // remaining after the first member is drawn. Note that it is the positioning
        // of the two LayoutSpacer members that creates the centering ... no alignment
        // property is used.
        */}
        <VLayout ID="vLayoutLayoutSpacers" autoDraw="false"
            // Specifying the height creates space which the LayoutSpacers can distribute.
            height="100%" width="100%" layoutMargin="6" membersMargin="6" border="1px dashed blue"
            // Note no alignment property! It's all done with LayoutSpacers.
            >
            <members>
                <Label width="100%" height="33%" padding="10" backgroundColor="red" contents="<b>No alignment</b>"/>
                {/*} Note the use of the LayoutSpacer */}
                <LayoutSpacer />
                <Label width="100%" height="33%" padding="10" backgroundColor="green" contents="<b>Centered in remaning space</b>"/>
                {/*} And another layout spacer */}
                <LayoutSpacer />
            </members>
        </VLayout>
    
       {/* The rest of the code is merely to organize the examples visually. */}
        <HLayout width="100%" height="100%">
            <members>
                <VLayout width="40%" autoDraw="false">
                    <members>
                        <LayoutAlignCenterExample title="HLayout with layout.align = 'center'" example="hLayoutAlignCenter"/>
                        <LayoutAlignCenterExample title="HLayout with member.layoutAlign = 'center' (or layout.defaultLayoutAlign = 'center')"
                            example="hLayoutDefaultLayoutAlign"/>
                        <LayoutAlignCenterExample title="HLayout with LayoutSpacers" example="hLayoutLayoutSpacers"/>
                    </members>
                </VLayout>
                <LayoutAlignCenterExample title="VLayout with layout.align = 'center'" example="vLayoutAlignCenter"/>
                <LayoutAlignCenterExample title="VLayout with member.layoutAlign = 'center' (or layout.defaultLayoutAlign = 'center')"
                    example="vLayoutDefaultLayoutAlign"/>
                <LayoutAlignCenterExample title="VLayout with LayoutSpacers" example="vLayoutLayoutSpacers"/>
            </members>
        </HLayout>
    
        
    </>,
    document.getElementById(target)
);
