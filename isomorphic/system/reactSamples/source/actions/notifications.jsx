import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout, DynamicForm, TextItem, HeaderItem, ComboBoxItem, CheckboxItem, IButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// NotifySettings that won't change should be set up front using configureMessages()
isc.Notify.configureMessages("message", {
    multiMessageMode: "replace",
    autoFitMaxWidth: 250,
    slideSpeed: 250
});

let valueMap = {
    "L" : "left edge",
    "R" : "right edge",
    "T" : "top edge",
    "B" : "bottom edge",
    "C" : "center",    
    "TL" : "top-left corner",
    "TR" : "top-right corner",
    "BL" : "bottom-left corner",
    "BR" : "bottom-right corner"
};

var click = function () {
    var config = configForm.getValues(),
        contents = config.text;
    if (!contents) contents = "You left the message text empty!"
        var actions = [];
    if (config.window) {
        actions.add({
            title: "Launch...",
            target: sendButton,
            methodName: "showWindow"
        });
    }
    var notifyTypePriority = config.notifyType.toUpperCase(),
        messagePriority = isc.Notify[notifyTypePriority];
    
    isc.Notify.addMessage(contents, actions, null, {
        canDismiss: config.dismiss,
        appearMethod: config.showAnimation,
        disappearMethod: config.hideAnimation,
        messagePriority: messagePriority,
        position: config.location});
};

// if window already exists, just show it; no-ops if already being shown
var showWindow = function () {
    if (!this.wizardWindow) {
        this.wizardWindow = isc.Window.create({
            isModal:true,
            autoSize:true,
            autoCenter:true,
            bodyProperties: {
                defaultLayoutAlign: "center",
                layoutLeftMargin: 5,
                layoutRightMargin: 5,
                layoutBottomMargin: 10
            },
            showModalMask:true,
            canDragReposition:false,
            title:"Notification Action",
            showMinimizeButton:false,
            items: [
                isc.Label.create({
                    width: "100%", height: 40,
                    align: "center", wrap: false, 
                    contents: "In your application, this window might contain a wizard."
                }),
                isc.Img.create({
                    width: 200, height: 250,
                    src:"other/wizard.png"
                })
            ]
        });
    }
    this.wizardWindow.show();
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <VLayout height="100%" membersMargin="10" >
            <members>
                <DynamicForm ID="configForm" autoDraw="false" >
                    <fields>
                        <HeaderItem defaultValue="Configure Notification" />
                        <TextItem name="text" title="Message" hint="Type your Message" defaultValue="Download complete" wrapHintText="false" />
                        <ComboBoxItem name="location" title="Screen Location" defaultValue="T" valueMap={valueMap} />
                        <ComboBoxItem name="showAnimation" title="Show Animation" wrapTitle="false" defaultValue="slide"
                            valueMap={["slide", "fade", "instant"]} />
                        <ComboBoxItem name="hideAnimation" title="Hide Animation" wrapTitle="false" defaultValue="fade"
                            valueMap={["slide", "fade", "instant"]} />
                        <ComboBoxItem name="notifyType" title="Priority" wrapTitle="false" defaultValue="message"
                            valueMap={["message", "warn", "error"]} />
                        <CheckboxItem name="dismiss" title="Add button to immediately dismiss" />
                        <CheckboxItem name="window" title="Add link to launch a window" />
                    </fields>
                </DynamicForm>
                <IButton ID="sendButton" title="Send" autoDraw="false" click={click} showWindow={showWindow} />
            </members>
        </VLayout>
    
    </>, 
    document.getElementById(target)
);

