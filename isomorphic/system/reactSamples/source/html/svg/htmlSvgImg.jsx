/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, Img, ImgButton, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSelectImageColorSchemeChanged = function (form, item, value) {
    for (var i = 0; i < images.length; i++) {
        var src = svgPath + images[i].ID;
        if (value > 0)
            src += '-' + 'red';
        images[i].setSrc(src + '.svg');
    }
};
let onImgButtonClick = function () {
    isc.ask('Are you sure you want to click on this button?');
};

var svgPath = '../inlineExamples/html/svg/';

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Img imageType="normal" src={svgPath + 'circle.svg'} title="circle" width="100" height="100" ID="circle" left="20" top="75" overflow="hidden"/>

        <Img imageType="normal" src={svgPath + 'square.svg'} title="square" width="100" height="100" ID="square" left="145" top="75" overflow="hidden"/>

        <Img imageType="normal" src={svgPath + 'bouncyText.svg'} title="bouncyText" width="150" height="90" ID="bouncyText" left="270" top="80" border="1px solid gray" overflow="hidden"/>

        <DynamicForm ID="form" width="400" left="22" top="15">
            <items>
                <SelectItem title="Select Image Color Scheme" defaultValue="0" align="right" wrapTitle="false" width="155" shouldSaveValue="false" changed={onSelectImageColorSchemeChanged}>
                    <valueMap>
                            <value id="0">Green</value>
                            <value id="1">Red</value>
                    </valueMap>
                </SelectItem>
            </items>
        </DynamicForm>

        <ImgButton src={svgPath + 'ellipse.svg'} width="300" height="200" left="75" top="225" canFocus="false" click={onImgButtonClick}/>
    </>,
    document.getElementById(target)
);

var images = [
    circle,
    square,
    bouncyText
];
