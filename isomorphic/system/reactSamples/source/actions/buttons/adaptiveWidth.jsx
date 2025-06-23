
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, Button, DynamicForm, FormItem, TextItem, LayoutSpacer } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onButtonClick = function () {
    var q = form.getValue("q");
    if (q) {
        isc.say("This is when the logic to search for <q>" + q.asHTML() + "</q> would run&hellip;");
    }
};

let isRTL = isc.Page.isRTL(),
    layoutRightMargin = isRTL ? 0 : 6,
    layoutLeftMargin = isRTL ? 6 : 0;
        
// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <HLayout overflow="hidden" width="100%" height="36">
            <members>
                <HLayout overflow="hidden" layoutLeftMargin={layoutLeftMargin} layoutRightMargin={layoutRightMargin} width="100%" height="100%" minWidth="250" showResizeBar="true">
                    <members>
                        <Button showFocusedAsOver="false" icon="[SAMPLE]icons/16/find.png" title="Find Related" width="140" height="100%" canAdaptWidth="true" click={onButtonClick}/>
                        <DynamicForm numCols="1" overflow="hidden" cellPadding="0" width="*" height="100%" minWidth="200">
                            <items>
                                <TextItem showHintInField="true" name="q" showTitle="false" width="100%" height="100%" hint="Related search terms"/>
                            </items>
                        </DynamicForm>
                    </members>
                </HLayout>
                <LayoutSpacer width="*"/>
            </members>
            <resizeBarProperties>
            	<canCollapse>false</canCollapse>
            	<gripLength>36</gripLength>
            </resizeBarProperties>
        </HLayout>

    </>,
    document.getElementById(target)
);