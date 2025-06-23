/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, RibbonBar, RibbonGroup } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var typeMenu = {
    _constructor: 'Menu',
    autoDraw: false,
    showShadow: true,
    shadowDepth: 10,
    data: [
        {
            title: 'Document',
            keyTitle: 'Ctrl+D',
            icon: '[SAMPLE]icons/16/document_plain_new.png'
        },
        {
            title: 'Picture',
            keyTitle: 'Ctrl+P',
            icon: '[SAMPLE]icons/16/folder_out.png'
        },
        {
            title: 'Email',
            keyTitle: 'Ctrl+E',
            icon: '[SAMPLE]icons/16/disk_blue.png'
        }
    ]
};
function getRibbonButton(title, props) {
    return isc.RibbonButton.create(isc.addProperties({
        title: title,
        autoDraw: false,
        icon: 'pieces/48/cube_blue.png',
        click: 'isc.say(this.title + \' button clicked\');'
    }, props));
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <RibbonGroup title="File (vertical icons)" titleAlign="left" numRows="2" controls={[
    getRibbonButton('New', {
        vertical: true,
        menu: typeMenu,
        showMenuIconOver: false
    }),
    getRibbonButton('Open', {
        vertical: true,
        icon: 'pieces/48/cube_green.png'
    }),
    getRibbonButton('Save', {
        vertical: true,
        icon: 'pieces/48/star_yellow.png'
    }),
    getRibbonButton('Save As', {
        vertical: true,
        menu: typeMenu,
        icon: 'pieces/48/pawn_red.png'
    })
]} ID="fileGroup" autoDraw="false">
            <colWidths>40</colWidths>
            <colWidths>*</colWidths>
        </RibbonGroup>

        <RibbonGroup title="Editing Tools" numRows="2" controls={[
    getRibbonButton('Edit', {
        vertical: false,
        icon: 'pieces/16/star_yellow.png'
    }),
    getRibbonButton('Copy', {
        vertical: false,
        icon: 'pieces/16/pawn_white.png'
    }),
    getRibbonButton('Undo', {
        vertical: false,
        menu: typeMenu,
        showMenuIconOver: false,
        icon: 'pieces/16/star_grey.png'
    }),
    getRibbonButton('Redo', {
        vertical: false,
        menu: typeMenu,
        icon: 'pieces/16/piece_green.png'
    })
]} ID="editGroup" autoDraw="false">
            <colWidths>40</colWidths>
            <colWidths>*</colWidths>
        </RibbonGroup>

        <RibbonGroup title="Insert" numRows="2" controls={[
    getRibbonButton('Picture', {
        vertical: true,
        menu: typeMenu,
        icon: 'pieces/48/cube_blue.png'
    }),
    getRibbonButton('Video', {
        vertical: true,
        menu: typeMenu,
        icon: 'pieces/16/pawn_yellow.png'
    }),
    getRibbonButton('Link', {
        vertical: false,
        icon: 'pieces/16/piece_red.png'
    }),
    getRibbonButton('Other', {
        vertical: false,
        icon: 'pieces/16/star_blue.png'
    })
]} ID="insertGroup" autoDraw="false">
            <colWidths>40</colWidths>
            <colWidths>*</colWidths>
        </RibbonGroup>

        <RibbonBar groupTitleAlign="center" ID="ribbonBar" groupTitleOrientation="top"/>
    </>,
    document.getElementById(target)
);

ribbonBar.addGroup(fileGroup, 0);
ribbonBar.addGroup(editGroup, 1);
ribbonBar.addGroup(insertGroup, 2);
