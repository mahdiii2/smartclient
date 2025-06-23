/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, HTMLFlow, IButton, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onExpandClick = function() {return ajaxDefinition.animateResize(310,195);};
let onCollapseClick = function() {return ajaxDefinition.animateResize(75,45);};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10">
        <members>
            <HLayout membersMargin="10" ID="hLayout" autoDraw="false">
                <members>
                    <IButton title="Expand" click={onExpandClick}/>
                    <IButton title="Collapse" left="120" click={onCollapseClick}/>
                </members>
            </HLayout>
            <HTMLFlow contents="&lt;span class=&apos;exampleDropTitle&apos;&gt;Ajax&amp;nbsp;&amp;nbsp;&lt;/span&gt; &lt;b&gt;A&lt;/b&gt;synchronous &lt;b&gt;J&lt;/b&gt;avaScript &lt;b&gt;A&lt;/b&gt;nd &lt;b&gt;X&lt;/b&gt;ML (AJAX) is a Web development technique for creating interactive &lt;b&gt;web applications&lt;/b&gt;. The intent is to make web pages feel more responsive by exchanging small amounts of data with the server behind the scenes, so that the entire Web page does not have to be reloaded each time the user makes a change. This is meant to increase the Web page&apos;s &lt;b&gt;interactivity&lt;/b&gt;, &lt;b&gt;speed&lt;/b&gt;, and &lt;b&gt;usability&lt;/b&gt;. (Source: &lt;a href=&apos;http://www.wikipedia.org&apos; title=&apos;Wikipedia&apos; target=&apos;_blank&apos;&gt;Wikipedia&lt;/a&gt;)" ID="ajaxDefinition" width="75" height="45" styleName="exampleTextBlock" overflow="hidden" showEdges="true" autoDraw="false" animateTime="800"/>
        </members>
    </VLayout>,
    document.getElementById(target)
);
