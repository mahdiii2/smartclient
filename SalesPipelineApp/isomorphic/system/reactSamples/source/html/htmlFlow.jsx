/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HTMLFlow } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HTMLFlow contents="&lt;hr&gt;&lt;span class=&apos;exampleDropTitle&apos;&gt;Ajax&amp;nbsp;&amp;nbsp;&lt;/span&gt; &lt;b&gt;A&lt;/b&gt;synchronous &lt;b&gt;J&lt;/b&gt;avaScript &lt;b&gt;A&lt;/b&gt;nd &lt;b&gt;X&lt;/b&gt;ML (AJAX) is a Web development technique for creating interactive &lt;b&gt;web applications&lt;/b&gt;.&lt;hr&gt;" width="230" styleName="exampleTextBlock"/>,
    document.getElementById(target)
);
