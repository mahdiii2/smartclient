/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, CheckboxItem, DynamicForm, Label, RadioGroupItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSnapDragChanged = function(form,item,value) {return gridCanvas.setProperty('childrenSnapToGrid', !gridCanvas.childrenSnapToGrid)};
let onSnapResizeChanged = function(form,item,value) {return gridCanvas.setProperty('childrenSnapResizeToGrid', !gridCanvas.childrenSnapResizeToGrid)};
let onHgapChanged = function(form,item,value) {return gridCanvas.setProperty('snapHGap', Number(this.getValue()))};
let onVgapChanged = function(form,item,value) {return gridCanvas.setProperty('snapVGap', Number(this.getValue()))};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10">
        <members>
            <Canvas ID="gridCanvas" width="400" height="300" border="1px solid blue" overflow="hidden" autoDraw="false" childrenSnapToGrid="true" childrenSnapResizeToGrid="true" showSnapGrid="true">
                <childComponents>
                    <Label contents="Drag or Resize me" align="center" width="80" height="40" backgroundColor="white" canDragReposition="true" canDragResize="true" showEdges="true" dragAppearance="target" keepInParentRect="true"/>
                </childComponents>
            </Canvas>
            <DynamicForm ID="gridForm" numCols="4" width="400">
                <values snapDrag="true" snapResize="true" hgap="20" vgap="20"/>
                <fields>
                    <CheckboxItem name="snapDrag" title="Enable Snap-To-Grid Move" changed={onSnapDragChanged}/>
                    <CheckboxItem name="snapResize" title="Enable Snap To Grid Resize" changed={onSnapResizeChanged}/>
                    <RadioGroupItem name="hgap" title="Horizontal snap-to gap" changed={onHgapChanged}>
                        <valueMap>
                                <value id="10">10 pixels</value>
                                <value id="20">20 pixels</value>
                                <value id="50">50 pixels</value>
                        </valueMap>
                    </RadioGroupItem>
                    <RadioGroupItem name="vgap" title="Vertical snap-to gap" changed={onVgapChanged}>
                        <valueMap>
                                <value id="10">10 pixels</value>
                                <value id="20">20 pixels</value>
                                <value id="50">50 pixels</value>
                        </valueMap>
                    </RadioGroupItem>
                </fields>
            </DynamicForm>
        </members>
    </VLayout>,
    document.getElementById(target)
);
