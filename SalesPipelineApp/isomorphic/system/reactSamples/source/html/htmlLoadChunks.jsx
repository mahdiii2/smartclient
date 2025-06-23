/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HTMLFlow, HTMLPane, IButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onAjaxClick = function() {return myTextBox.setContentsURL(chunksPath + 'ajax.html')};
let onGuiClick = function() {return myTextBox.setContentsURL(chunksPath + 'gui.html')};
let onRiaClick = function() {return myTextBox.setContentsURL(chunksPath + 'ria.html')};

window.chunksPath = isc.Page.getIsomorphicDocsDir() + 'inlineExamples/html/chunks/';

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HTMLFlow contentsURL={chunksPath + 'ajax.html'} ID="myTextBox" width="280" top="40" styleName="exampleTextBlock"/>

        <HTMLPane contentsURL={chunksPath + 'glossary.html'} width="280" height="200" left="300" top="40" styleName="exampleTextBlock" showEdges="true" selectContentOnSelectAll="true"/>

        <IButton title="Ajax" width="80" left="10" click={onAjaxClick}/>

        <IButton title="GUI" width="80" left="100" click={onGuiClick}/>

        <IButton title="RIA" width="80" left="190" click={onRiaClick}/>
    </>,
    document.getElementById(target)
);
