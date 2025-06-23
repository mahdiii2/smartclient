/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HTMLFlow, IButton, LayoutSpacer, RichTextEditor, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSetCanvasHTMLClick = function() {return htmlCanvas.setContents(contentEditor.getValue())};

var ajaxDefinition = '<span style=\'font-size:22px;\'>Ajax</span> ' + '<b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML (AJAX) is a ' + 'Web development technique for creating interactive <b>web applications</b>. ' + 'The intent is to make web pages feel more responsive by exchanging small ' + 'amounts of data with the server behind the scenes, so that the entire Web ' + 'page does not have to be reloaded each time the user makes a change. ' + 'This is meant to increase the Web page\'s <b>interactivity</b>, <b>speed</b>, ' + 'and <b>usability</b>.<br>' + '(Source: <a href=\'http://www.wikipedia.org\' title=\'Wikipedia\' target=\'_blank\'>Wikipedia</a>)';

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="5" width="100%">
        <members>
            <RichTextEditor value={ajaxDefinition} ID="contentEditor" height="155" canDragResize="true" autoDraw="false">
                <controlGroups>
                    <value>fontControls</value>
                    <value>formatControls</value>
                    <value>styleControls</value>
                    <value>colorControls</value>
                    <value>bulletControls</value>
                </controlGroups>
            </RichTextEditor>
            <IButton title="Set Canvas HTML" width="150" autoDraw="false" click={onSetCanvasHTMLClick}/>
            <LayoutSpacer height="10"/>
            <HTMLFlow contents="Click &lt;b&gt;Set Canvas HTML&lt;/b&gt; to display edited content." ID="htmlCanvas" height="130" padding="2" overflow="auto" canDragResize="true" showEdges="true" autoDraw="false"/>
        </members>
    </VLayout>,
    document.getElementById(target)
);
