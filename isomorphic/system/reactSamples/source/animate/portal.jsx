/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, LGField, ListGrid, ListGridRecord, VStack, Window } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onPortletListRowClick = function (record, rowNum) {
    record.enabled = false;
    this.refreshRow(rowNum);
    var newPortlet = isc.SimplePortlet.create({
        title: record.portletName,
        items: [isc.Label.create({
                autoDraw: false,
                align: 'center',
                layoutAlign: 'center',
                contents: record.portletName + ' contents'
            })],
        portletRecord: record,
        portletList: this,
        closeClick: function () {
            this.portletList.closePortlet(this, this.portletRecord);
        }
    });
    newPortlet.hide();
    var column = portalContentArea.addPortlet(newPortlet, true);
    var placeHolder = isc.LayoutSpacer.create();
    placeHolder.setRect(newPortlet.getRect());
    column.addMember(placeHolder, 0);
    var outline = isc.Canvas.create({
        left: this.getPageLeft(),
        top: this.getRowPageTop(rowNum),
        width: this.getVisibleWidth(),
        height: this.getRowSize(rowNum),
        border: '2px solid #8289A6'
    });
    outline.bringToFront();
    outline.animateRect(newPortlet.getPageLeft(), newPortlet.getPageTop(), newPortlet.getVisibleWidth(), newPortlet.getVisibleHeight(), function () {
        placeHolder.destroy();
        outline.destroy();
        newPortlet.body.hPolicy = 'fill';
        newPortlet.show();
    }, this.animatePortletTime);
};
let onPortletListClosePortlet = function (portlet, portletRecord) {
    var rowNum = portletList.data.indexOf(portletRecord);
    var outline = isc.Canvas.create({
        autoDraw: false,
        border: '2px solid #8289A6'
    });
    outline.setRect(portlet.getPageRect());
    outline.bringToFront();
    var portalColumn = portlet.parentElement;
    portlet.hide();
    var spacer = isc.LayoutSpacer.create();
    spacer.setRect(portlet.getRect());
    portalColumn.addMember(spacer, portalColumn.getMemberNumber(portlet), true);
    spacer.animateHideTime = this.animatePortletTime;
    spacer.animateHide();
    outline.draw();
    outline.animateRect(this.getPageLeft(), this.getRowPageTop(rowNum), this.getVisibleWidth(), this.getRowSize(rowNum), function () {
        outline.destroy();
        spacer.destroy();
        portlet.destroy();
        portletRecord.enabled = true;
        portletList.refreshRow(rowNum);
    }, this.animatePortletTime);
};
let onPortletNameFormatCellValue = function(value,record,rowNum,colNum,grid) {return grid.gViewIconHTML + ' ' + value};

const SimplePortlet = SC.defineClass('SimplePortlet', Window);
isc.SimplePortlet.addProperties({
    autoDraw: false,
    showShadow: false,
    animateMinimize: true,
    dragAppearance: 'outline',
    canDrop: true,
    headerMembers: [
        'minimizeButton',
        'headerLabel',
        'closeButton'
    ],
    dragOpacity: 30,
    vPolicy: 'none',
    overflow: 'visible',
    bodyProperties: { overflow: 'visible' }
});
const SimplePortalColumn = SC.defineClass('SimplePortalColumn', VStack);
isc.SimplePortalColumn.addProperties({
    membersMargin: 6,
    animateMembers: true,
    animateMemberTime: 750,
    canAcceptDrop: true,
    dropLineThickness: 4,
    dropLineProperties: { backgroundColor: 'aqua' },
    showDragPlaceHolder: true,
    placeHolderProperties: { border: '2px solid #8289A6' }
});
const SimplePortalLayout = SC.defineClass('SimplePortalLayout', HLayout);
isc.SimplePortalLayout.addProperties({
    numColumns: 2,
    membersMargin: 6,
    initWidget: function () {
        this.Super('initWidget', arguments);
        for (var i = 0; i < this.numColumns; i++) {
            this.addMember(isc.SimplePortalColumn.create({
                autoDraw: false,
                width: '*'
            }));
        }
    },
    addPortlet: function (portlet, addToTop) {
        var fewestPortlets = 999999, fewestPortletsColumn;
        for (var i = 0; i < this.members.length; i++) {
            var numPortlets = this.getMember(i).members.length;
            if (numPortlets < fewestPortlets) {
                fewestPortlets = numPortlets;
                fewestPortletsColumn = this.getMember(i);
            }
        }
        fewestPortletsColumn.addMember(portlet, addToTop ? 0 : null);
        return fewestPortletsColumn;
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout layoutMargin="10" membersMargin="10" ID="portalExamplePage" width="100%" height="100%">
        <members>
            <ListGrid ID="portletList" leaveScrollbarGap="false" showHeader="false" selectionType="none" bodyOverflow="visible" width="120" height="20" overflow="visible" autoDraw="false" gViewIconHTML={isc.Canvas.imgHTML('[SKIN]actions/view.png')} animatePortletTime="750" rowClick={onPortletListRowClick} closePortlet={onPortletListClosePortlet}>
                <data>
                    <ListGridRecord portletName="Portlet 1"/>
                    <ListGridRecord portletName="Portlet 2"/>
                    <ListGridRecord portletName="Portlet 3"/>
                    <ListGridRecord portletName="Portlet 4"/>
                    <ListGridRecord portletName="Portlet 5"/>
                    <ListGridRecord portletName="Portlet 6"/>
                    <ListGridRecord portletName="Portlet 7"/>
                    <ListGridRecord portletName="Portlet 8"/>
                    <ListGridRecord portletName="Portlet 9"/>
                    <ListGridRecord portletName="Portlet 10"/>
                </data>
                <fields>
                    <LGField name="portletName" formatCellValue={onPortletNameFormatCellValue}/>
                </fields>
            </ListGrid>
            <SimplePortalLayout ID="portalContentArea" autoDraw="false" numColumns="3"/>
        </members>
    </HLayout>,
    document.getElementById(target)
);
