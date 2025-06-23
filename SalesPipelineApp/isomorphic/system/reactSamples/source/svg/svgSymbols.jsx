/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var spriteFile = '[ISOMORPHIC]system/reference/inlineExamples/svg/chat.svg';
var spritePrefix = 'sprite:svg:' + spriteFile;
function getImage(src, title) {
    var imgProps = {
        border: '1px solid lightgrey',
        autoDraw: false,
        showRollOver: true,
        width: 40,
        height: 40,
        imageWidth: 32,
        imageHeight: 32,
        imageType: 'center',
        src: src
    };
    if (isc.isA.String(src)) {
        imgProps.prompt = 'sprite:svg:' + src.replace(spritePrefix, 'chat.svg');
    } else if (isc.isAn.Object(src)) {
        var obj = isc.addProperties({}, src);
        for (var key in obj) {
            obj[key] = 'sprite:svg:' + obj[key].replace(spritePrefix, 'chat.svg');
        }
        imgProps.prompt = isc.JSON.encode(obj).replace(/\n/g, '<br>');
    }
    imgProps.prompt = title + '<br><br>' + imgProps.prompt;
    return isc.Img.create(imgProps);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout members={[
    getImage(spritePrefix + '#chat_grey', 'Single Image, not stateful'),
    getImage({
        _base: spritePrefix + '#chat_grey;',
        Over: spritePrefix + '#chat_red;'
    }, 'Two different images by id'),
    getImage(spritePrefix + '#chat_grey;statefulId:true;', 'Two different images by \'statefulId\''),
    getImage({
        _base: spritePrefix + '#chat;color:grey;',
        Over: spritePrefix + '#chat;color:red;'
    }, 'One symbol, two src-strings, each with a custom color'),
    getImage({
        _base: spritePrefix + '#chat;cssClass:chatGrey;',
        Over: spritePrefix + '#chat;cssClass:chatRed;'
    }, 'One symbol, two src-strings, each with a custom cssClass'),
    getImage(spritePrefix + '#chat;cssClass:chatStyle;', 'One symbol, stateful cssClass'),
    isc.Img.create({
        width: 40,
        height: 40,
        border: '1px solid lightgrey',
        showRollOver: true,
        baseStyle: 'chatStyle',
        src: spritePrefix + '#chat;size:32,32;',
        prompt: 'One symbol, stateful Img.baseStyle<br><br>sprite:svg:chat.svg#chat;size:32,32;'
    })
]} layoutMargin="20" membersMargin="20"/>,
    document.getElementById(target)
);
