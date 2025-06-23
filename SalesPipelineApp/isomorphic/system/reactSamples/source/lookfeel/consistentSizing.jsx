/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HTMLPane, Slider } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onResizeValueChanged = function (value) {
    box1.setWidth(value);
    box1.setHeight(value);
    box2.setWidth(value);
    box2.setHeight(value);
    box3.setWidth(value);
    box3.setHeight(value);
};

var exampleText = '<b>A</b>synchronous J</b>avaScript <b>A</b>nd <b>X</b>ML (AJAX) is a Web development technique for creating interactive web applications.';

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HTMLPane contents={exampleText} ID="box1" left="20" top="100" styleName="padding5" overflow="hidden" showEdges="true"/>

        <HTMLPane contents={exampleText} ID="box2" left="240" top="100" styleName="padding10border5" overflow="hidden"/>

        <HTMLPane contents={exampleText} ID="box3" left="460" top="100" styleName="padding5border5" overflow="hidden" showEdges="true"/>

        <Slider title="Resize" vertical="false" showRange="false" value="140" minValue="140" maxValue="200" valueChanged={onResizeValueChanged}/>
    </>,
    document.getElementById(target)
);
