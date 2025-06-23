/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ColorItem, DynamicForm, Label, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onColorPickerChange = function(form,item,value,oldValue) {return myBox.setBackgroundColor(value)};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" width="100%" height="100%">
        <members>
            <DynamicForm>
                <items>
                    <ColorItem title="Color picker" width="85" change={onColorPickerChange}/>
                </items>
            </DynamicForm>
            <Label contents="Color box" align="center" title="myBox" ID="myBox" styleName="exampleTitle" overflow="hidden" showEdges="true"/>
        </members>
    </VLayout>,
    document.getElementById(target)
);
