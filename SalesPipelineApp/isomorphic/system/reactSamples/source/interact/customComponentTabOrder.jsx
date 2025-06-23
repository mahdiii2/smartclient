/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, Canvas, CanvasItem, DynamicForm, FormItemIcon, HLayout, IButton, TextItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCustomCreateCanvas = function () {
    return isc.NativeButtonToolbar.create({
        buttons: [
            { title: 'Native Button 1' },
            { title: 'Native Button 2' }
        ]
    });
};
let onSwitchMembersButtonClick = function () {
    outerLayout.reorderMember(1, 0);
};

const NativeButtonToolbar = SC.defineClass('NativeButtonToolbar', Canvas);
isc.NativeButtonToolbar.addProperties({
    height: 50,
    draw: function () {
        if (!this.registeredTabIndices) {
            for (var i = 0; i < this.buttons.length; i++) {
                var button = this.buttons[i];
                isc.TabIndexManager.addTarget(this.getButtonElementID(button), true, this.getID(), null, {
                    target: this,
                    methodName: 'updateButtonTabIndex'
                }, {
                    target: this,
                    methodName: 'focusInButton'
                });
            }
            this.registeredTabIndices = true;
        }
        return this.Super('draw', arguments);
    },
    getInnerHTML: function () {
        var html = '<table border=1 cellPadding=5><tr>';
        for (var i = 0; i < this.buttons.length; i++) {
            var button = this.buttons[i];
            html += '<td><button type=\'button\'' + ' id=\'' + this.getButtonElementID(button) + '\' tabindex=' + isc.TabIndexManager.getTabIndex(this.getButtonElementID(button)) + '>' + button.title + '</button></td>';
        }
        html += '</tr></table>';
        return html;
    },
    getButtonElementID: function (button) {
        return this.getID() + '_buttonElement_' + this.buttons.indexOf(button);
    },
    updateButtonTabIndex: function (buttonID) {
        if (!this.isDrawn())
            return;
        var element = isc.Element.get(buttonID);
        if (element != null)
            element.tabIndex = isc.TabIndexManager.getTabIndex(buttonID);
    },
    focusInButton: function (buttonID) {
        if (!this.isDrawn() || isc.EH.targetIsMasked(this))
            return;
        var element = isc.Element.get(buttonID);
        if (element != null) {
            element.focus();
            return true;
        }
        return false;
    },
    destroy: function () {
        for (var i = 0; i < this.buttons.length; i++) {
            isc.TabIndexManager.removeTarget(this.getButtonElementID(this.buttons[i]));
        }
        this.Super('destroy', arguments);
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10">
        <members>
            <HLayout membersMargin="10" ID="outerLayout" height="285">
                <members>
                    <VLayout defaultLayoutAlign="center" layoutMargin="10" layoutTopMargin="16" membersMargin="5" ID="customTabLayout" width="250" isGroup="true" groupTitle="Custom Tab Elements" autoDraw="true">
                        <members>
                            <IButton title="Previous SC Button" width="200"/>
                            <NativeButtonToolbar>
                                <buttons>
                                	<title>Native Button 1</title>
                                </buttons>
                                <buttons>
                                	<title>Native Button 2</title>
                                </buttons>
                            </NativeButtonToolbar>
                            <IButton title="Subsequent SC Button" width="200"/>
                        </members>
                    </VLayout>
                    <DynamicForm ID="customTabForm" groupTitle="Custom Tab Form" width="250" padding="5" isGroup="true" autoDraw="true">
                        <items>
                            <TextItem name="item1"/>
                            <TextItem name="item2">
                                <icons>
                                    <FormItemIcon/>
                                    <FormItemIcon/>
                                </icons>
                            </TextItem>
                            <ButtonItem name="item3"/>
                            <CanvasItem name="custom" createCanvas={onCustomCreateCanvas}/>
                            <ButtonItem name="item4"/>
                            <TextItem name="item5"/>
                        </items>
                    </DynamicForm>
                </members>
            </HLayout>
            <IButton title="Switch Members" ID="SwitchMembersButton" width="150" click={onSwitchMembersButtonClick}/>
        </members>
    </VLayout>,
    document.getElementById(target)
);
