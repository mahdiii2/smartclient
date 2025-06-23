/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HTMLFlow, IButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onAjaxClick = function() {return myTextBox.setContents(htmlFragments.ajax)};
let onRiaClick = function() {return myTextBox.setContents(htmlFragments.ria)};
let onWebAppClick = function() {return myTextBox.setContents(htmlFragments.webapp)};

var htmlFragments = {
    ajax: '<hr><span class=\'exampleDropTitle\'>Ajax&nbsp;&nbsp;</span> ' + '<b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML (AJAX) ' + 'is a Web development technique for creating interactive <b>web applications</b>.<hr>',
    ria: '<hr><span class=\'exampleDropTitle\'>RIA&nbsp;&nbsp;</span> ' + '<b>R</b>ich <b>I</b>nternet <b>A</b>pplications (or RIA) are ' + '<b>web applications</b> that have the features and functionality of ' + 'traditional <b>desktop applications</b>.<hr>',
    webapp: '<hr><span class=\'exampleDropTitle\'>Web App&nbsp;&nbsp;</span> ' + 'In software engineering, a <b>web application</b> is an application that is ' + '<b>accessed with a web browser</b> over a network such as the Internet or an intranet.<hr>'
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HTMLFlow contents={htmlFragments.ajax} ID="myTextBox" width="280" top="40" styleName="exampleTextBlock"/>

        <IButton title="Ajax" width="80" left="10" click={onAjaxClick}/>

        <IButton title="RIA" width="80" left="100" click={onRiaClick}/>

        <IButton title="Web App" width="80" left="190" click={onWebAppClick}/>
    </>,
    document.getElementById(target)
);
