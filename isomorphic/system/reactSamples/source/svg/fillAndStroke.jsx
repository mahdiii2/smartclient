/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DynamicForm, SelectItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCreateButtonsClick = function () {
    var form = this.form;
    svgLayout.addMember(getMediaPlayerImages(30, 24, 'center', null, null, { cssClass: form.getValue('cssClass') }));
};

var spriteFile = '[ISOMORPHIC]system/reference/inlineExamples/svg/mediaPlayer.svg';
var spritePrefix = 'sprite:svg:' + spriteFile;
var colors = [
    'none',
    'red',
    'orange',
    'blue',
    'lightblue',
    'green',
    'lightgreen',
    'grey',
    'lightgrey'
];
var strokeWidths = [
    0,
    0.5,
    1,
    1.5,
    2,
    2.5,
    3
];
function getImage(id, widgetSize, imageSize, imageType, colorize, outline, props) {
    props = props || {};
    if (props.cssClass == null)
        props.cssClass = 'svgIcon';
    if (props.classInSrc == null)
        props.classInSrc = false;
    var imgProps = {
        ID: 'icon_' + Math.random() * 1000 + '_' + id,
        click: 'isc.say(\'Clicked ' + id + '\')',
        border: '1px solid lightgrey',
        autoDraw: false,
        showRollOver: true,
        showDown: true
    };
    if (widgetSize)
        imgProps.width = imgProps.height = parseInt(widgetSize);
    if (imageSize)
        imgProps.imageWidth = imgProps.imageHeight = parseInt(imageSize);
    imgProps.imageType = imageType || 'center';
    imgProps.src = spritePrefix + '#' + id + ';';
    if (props.cssClass) {
        if (props.classInSrc)
            imgProps.src += 'cssClass:' + props.cssClass + ';';
        else
            imgProps.baseStyle = props.cssClass;
    }
    if (colorize) {
        if (!outline)
            imgProps.src += 'fill:' + colors[Math.floor(Math.random() * 9)] + ';';
        imgProps.src += 'stroke:' + colors[Math.floor(Math.random() * 9)] + ';';
        imgProps.src += 'stroke-width:' + strokeWidths[Math.floor(Math.random() * 6)] + 'px;';
    }
    if (outline) {
        imgProps.src += 'fill:none;';
    }
    if (props.srcObject) {
        var prefix = spritePrefix + '#' + id + ';cssClass:' + props.cssClass;
        imgProps.src = {
            _base: prefix + ';',
            Over: prefix + 'Over;',
            Down: prefix + 'Down;'
        };
    }
    return isc.Img.create(imgProps);
}
function getMediaPlayerImages(widgetSize, imageSize, imageType, colorize, outline, props) {
    return isc.HLayout.create({
        autoDraw: false,
        height: 1,
        overflow: 'visible',
        defaultLayoutAlign: 'center',
        membersMargin: 10,
        members: [
            getImage('icon-first', widgetSize, imageSize, imageType, colorize, outline, props),
            getImage('icon-previous', widgetSize, imageSize, imageType, colorize, outline, props),
            getImage('icon-backward', widgetSize, imageSize, imageType, colorize, outline, props),
            getImage('icon-play', widgetSize, imageSize, imageType, colorize, outline, props),
            getImage('icon-pause', widgetSize, imageSize, imageType, colorize, outline, props),
            getImage('icon-stop', widgetSize, imageSize, imageType, colorize, outline, props),
            getImage('icon-forward', widgetSize, imageSize, imageType, colorize, outline, props),
            getImage('icon-next', widgetSize, imageSize, imageType, colorize, outline, props),
            getImage('icon-last', widgetSize, imageSize, imageType, colorize, outline, props),
            getImage('icon-eject', widgetSize, imageSize, imageType, colorize, outline, props),
            isc.Img.create({
                src: '[SKINIMG]actions/remove.png',
                width: 24,
                height: 24,
                autoDraw: false,
                click: function () {
                    var canvas = this.parentElement;
                    canvas.delayCall('destroy');
                    canvas = null;
                }
            })
        ]
    });
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <VLayout overflow="visible" layoutMargin="10" membersMargin="10" ID="svgLayout" top="50" autoDraw="true"/>

        <DynamicForm numCols="6">
            <items>
                <SelectItem name="cssClass" title="CSS Class" defaultValue="svgIcon" wrapTitle="false">
                    <valueMap svgIcon="Skin default (svgIcon)" svgForestFill="Forest (green, filled)" svgFloridaOutline="Florida (orange, outline)"/>
                </SelectItem>
                <ButtonItem name="createButtons" title="Create Icons" width="*" startRow="false" endRow="false" click={onCreateButtonsClick}/>
            </items>
        </DynamicForm>
    </>,
    document.getElementById(target)
);

svgLayout.addMember(getMediaPlayerImages(20, 16, 'center'));
svgLayout.addMember(getMediaPlayerImages(24, 20, 'center'));
svgLayout.addMember(getMediaPlayerImages(30, 24, 'center'));
svgLayout.addMember(getMediaPlayerImages(36, 32, 'center'));
svgLayout.addMember(getMediaPlayerImages(52, 48, 'center'));
svgLayout.addMember(getMediaPlayerImages(80, null, 'stretch', true, false));
