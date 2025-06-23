/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, HTMLPane, IButton, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onWikipedia_AjaxClick = function() {return myPane.setContentsURL('http://en.wikipedia.org/wiki/Ajax_%28programming%29')};
let onIsomorphicSoftwareBlogClick = function() {return myPane.setContentsURL('http://blog.isomorphic.com')};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout width="100%" height="100%">
        <members>
            <HStack layoutMargin="10" membersMargin="10" height="50" membersWidth="300">
                <members>
                    <IButton autoFit="true" title="Wikipedia: Ajax" click={onWikipedia_AjaxClick}/>
                    <IButton autoFit="true" title="Isomorphic Software Blog" click={onIsomorphicSoftwareBlogClick}/>
                </members>
            </HStack>
            <HTMLPane contentsURL="http://en.wikipedia.org/" contentsType="page" ID="myPane" showEdges="true"/>
        </members>
    </VLayout>,
    document.getElementById(target)
);
