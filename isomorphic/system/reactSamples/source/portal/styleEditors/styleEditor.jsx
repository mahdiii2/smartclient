/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CSSEditor, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onEdValuesChanged = function () {
    var css = this.getCSSText().replaceAll(';', ';\n');
    var settings = isc.JSON.encode(this.getCSSProperties(), { prettyPrint: true });
    var msg = '<pre>== CSS text ==\n' + css + '\n\n== Settings ==<br>' + settings + '</pre>';
    label.setContents(msg);
};
let onEdEditComplete = function () {
    var css = this.getCSSText().replaceAll(';', ';\n');
    var settings = isc.JSON.encode(this.getCSSProperties(), { prettyPrint: true });
    var msg = '<pre>== CSS text ==\n' + css + '\n\n== Settings ==<br>' + settings + '</pre>';
    isc.say(msg);
};

var values = {
    'border': '1px solid red',
    'border-radius': '5px',
    'padding': '3px'
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <CSSEditor ID="ed" width="400" left="10" top="10" autoDraw="true" values={values} valuesChanged={onEdValuesChanged} editComplete={onEdEditComplete}>
            <groups>
            	<name>myGroup</name>
            	<title>Border / Radius / Padding</title>
            	<canCollapse>false</canCollapse>
            	<allowAsymmetry>true</allowAsymmetry>
            	<settings>
            		<elem>
            			<name>border</name>
            		</elem>
            		<elem>
            			<name>border-radius</name>
            		</elem>
            		<elem>
            			<name>padding</name>
            		</elem>
            	</settings>
            </groups>
        </CSSEditor>

        <Label title="label" ID="label" width="600" left="450" top="10"/>
    </>,
    document.getElementById(target)
);

ed.valuesChanged();
