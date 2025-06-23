/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, FormItemIcon, TextItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onClearClick = function (form, item, icon) {
    item.clearValue();
    item.focusInItem();
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack width="100%">
        <members>
            <DynamicForm autoDraw="false">
                <items>
                    <TextItem name="search" title="Search Term" iconHeight="16" iconWidth="16" width="200" suppressBrowserClearIcon="true">
                        <icons>
                            <FormItemIcon name="view" src="[SKINIMG]actions/view.png" inline="true" hspace="5" baseStyle="roundedTextItemIcon" showRTL="true" tabIndex="-1"/>
                            <FormItemIcon name="clear" src="[SKINIMG]actions/close.png" width="10" height="10" inline="true" prompt="Clear this field" click={onClearClick}/>
                        </icons>
                    </TextItem>
                </items>
            </DynamicForm>
        </members>
    </VStack>,
    document.getElementById(target)
);
