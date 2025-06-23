/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Img, PortalColumn, PortalLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onPortalLayoutCreatePortlet = function (portletName) {
    var src = this._srcMap[portletName];
    if (src == null)
        return null;
    return isc.Portlet.create({
        title: portletName,
        portletName: portletName,
        canDrag: true,
        dragType: 'partPortlet',
        useNativeDrag: true,
        items: [isc.Part.create({ src: src })],
        dragStart: function () {
            isc.EventHandler.setNativeDragData(portletName, portletName);
            isc.EventHandler.setDragTrackerImage('pieces/48/' + src, 28, 38);
        }
    });
};
let onPortalLayoutGetDropPortlet = function (dragTarget, colNum, rowNum, rowOffset) {
    if (isc.isA.Portlet(dragTarget))
        return dragTarget;
    var portletName = isc.EventHandler.getNativeDragData();
    if (portletName != null) {
        return this.createPortlet(portletName);
    }
    return null;
};

var exampleData = [
    {
        partName: 'Blue',
        partSrc: 'cube_blue.png',
        partNum: 1
    },
    {
        partName: 'Yellow',
        partSrc: 'cube_yellow.png',
        partNum: 2
    },
    {
        partName: 'Green',
        partSrc: 'cube_green.png',
        partNum: 3
    },
    {
        partName: 'Blue',
        partSrc: 'cube_blue.png',
        partNum: 4
    },
    {
        partName: 'Yellow',
        partSrc: 'cube_yellow.png',
        partNum: 5
    },
    {
        partName: 'Green',
        partSrc: 'cube_green.png',
        partNum: 6
    },
    {
        partName: 'Blue',
        partSrc: 'cube_blue.png',
        partNum: 7
    },
    {
        partName: 'Yellow',
        partSrc: 'cube_yellow.png',
        partNum: 8
    },
    {
        partName: 'Green',
        partSrc: 'cube_green.png',
        partNum: 9
    }
];
const Part = SC.defineClass('Part', Img);
isc.Part.addProperties({
    width: 48,
    height: 48,
    padding: 12,
    layoutAlign: 'center',
    appImgDir: 'pieces/48/'
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <PortalLayout numColumns="0" ID="portalLayout" width="100%" height="100%" createPortlet={onPortalLayoutCreatePortlet} getDropPortlet={onPortalLayoutGetDropPortlet}>
        <portalColumns>
            <PortalColumn/>
            <PortalColumn/>
            <PortalColumn/>
        </portalColumns>
        <columnProperties>
        	<dropTypes>
        		<elem>partPortlet</elem>
        	</dropTypes>
        </columnProperties>
    </PortalLayout>,
    document.getElementById(target)
);

portalLayout.addPortlet(portalLayout.createPortlet('Blue'), 0);
portalLayout.addPortlet(portalLayout.createPortlet('Green'), 1);
portalLayout.addPortlet(portalLayout.createPortlet('Yellow'), 2);
