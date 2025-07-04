import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Img, DynamicForm, TextAreaItem, HLayout, VLayout, VStack, PortalLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const DragPiece = SC.defineClass("DragPiece", Img);
isc.DragPiece.addProperties({
    width: 48,
    height: 48,
    padding: 12,
    layoutAlign: "center",
    canDragReposition: true,
    canDrop: true,
    dragAppearance: "target",
    appImgDir: "pieces/48/"
});

let portlets = [
    [ // Array for left column
        isc.Portlet.create({
            title: "Portlet 1"
        }),
        [ // Array for a row
            isc.Portlet.create({
                title: "Portlet 2"
            }),
            isc.Portlet.create({
                title: "Portlet 3"
            })
        ]
    ],[ // Array for right column
        [
            isc.Portlet.create({
                title: 'Portlet 4'
            }),
            isc.Portlet.create({
                title: 'Portlet 5'
            })
        ],
        isc.Portlet.create({
            title: 'Portlet 6'
        })
    ]
];

let portletsChanged = function () {
    var message = "portlets changed";
    if (this.fromColNum) {
        if (isc.Portlet.isA(this.dragTarget)) {
            message += "\ndrag from " + this.fromColNum + "," + this.fromRowNum;
            if (this.fromDropPosition) {
                message += "," + this.fromDropPosition;
            }
            message += " to " + this.toColNum + "," + this.toRowNum;
            if (this.toDropPosition) {
                message += "," + this.toDropPosition;
            }
        } else {
            message += "\nnew portlet at " + this.toColNum + "," + this.toRowNum;
        }
        delete this.fromColNum;
        delete this.fromRowNum;
        delete this.fromDropPosition;
        delete this.dragTarget;
        delete this.toColNum;
        delete this.toRowNum;
        delete this.toDropPosition;
    }
    message += "\n";
    eventsForm.setValue("eventsArea", eventsForm.getValue("eventsArea") + message);
}

let willAcceptPortletDrop = function (dragTarget, colNum, rowNum, dropPosition) {
    if (!this.fromColNum) {
        this.fromColNum = colNum;
        this.fromRowNum = rowNum;
        this.fromDropPosition = dropPosition;
        this.dragTarget = dragTarget;
    }
    if (this.toColNum != colNum || this.toRowNum != rowNum || this.toDropPosition != dropPosition) {
        this.toColNum = colNum;
        this.toRowNum = rowNum;
        this.toDropPosition = dropPosition;
    }
    return true;
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm ID="eventsForm" width="100%" height="250" titleWidth="50" numCols="1" autoDraw="false">
            <fields>
                <TextAreaItem title="Events" name="eventsArea" value="" width="*" height="*" titleOrientation="top"/>
            </fields>
        </DynamicForm>
    
        <VStack ID="itemsStack" membersMargin="10" layoutMargin="10" showEdges="true">
            <members>
                <DragPiece src="pawn_blue.png"/>
                <DragPiece src="pawn_green.png"/>
                <DragPiece src="pawn_yellow.png"/>
            </members>
        </VStack>
    
        <PortalLayout ID="portal" width="70%" height="100%" canResizePortlets="true" portlets={portlets}
            portletMaximized={function (portlet) {
                                    var message = "portlet maximized: " + portlet.title + "\n";
                                    eventsForm.setValue("eventsArea", eventsForm.getValue("eventsArea") + message);
                                }}
            portletMinimized={function (portlet) {
                                    var message = "portlet minimized: " + portlet.title + "\n";
                                    eventsForm.setValue("eventsArea", eventsForm.getValue("eventsArea") + message);
                                }}
            portletRestored={function (portlet) {
                                    var message = "portlet restored: " + portlet.title + "\n";
                                    eventsForm.setValue("eventsArea", eventsForm.getValue("eventsArea") + message);
                                }}
            portletsResized={function () {
                                    var message = "portlets resized\n";
                                    eventsForm.setValue("eventsArea", eventsForm.getValue("eventsArea") + message);
                                }}
            willClosePortlet={function (portlet) {
                                    var message = "portlet about to close: " + portlet.title + "\n";
                                    eventsForm.setValue("eventsArea", eventsForm.getValue("eventsArea") + message);
                                    return true;
                                }}
            dropOver={function () {
                                    var message = "drop over\n";
                                    eventsForm.setValue("eventsArea", eventsForm.getValue("eventsArea") + message);
                                }}
            portletsChanged={portletsChanged}
            willAcceptPortletDrop={willAcceptPortletDrop}
            >
        
        </PortalLayout>
    
        <HLayout width="100%" height="100%" overflow="hidden">
            <members>
                <value>portal</value>
                <VLayout width="*">
                    <members>
                        <value>itemsStack</value>
                        <value>eventsForm</value>
                    </members>
                </VLayout>
            </members>
        </HLayout>
    
        
    </>,
    document.getElementById(target)
);
