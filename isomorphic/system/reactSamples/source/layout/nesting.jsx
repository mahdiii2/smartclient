/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, Label, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout width="100%" height="100%">
        <members>
            <Label contents="Navigation" align="center" width="30%" border="1px solid blue" showResizeBar="true" overflow="hidden"/>
            <VLayout width="70%">
                <members>
                    <Label contents="Listing" align="center" height="30%" border="1px solid blue" showResizeBar="true" overflow="hidden"/>
                    <Label contents="Details" align="center" height="70%" border="1px solid blue" overflow="hidden"/>
                </members>
            </VLayout>
        </members>
    </HLayout>,
    document.getElementById(target)
);
