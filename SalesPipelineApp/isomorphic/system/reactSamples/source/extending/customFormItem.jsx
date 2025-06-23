/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDecisionChange = function(form,item,value,oldValue) {return isc.say('User selected ' + value)};

const YesNoMaybeItem = SC.defineClass('YesNoMaybeItem', TextItem);
isc.YesNoMaybeItem.addClassProperties({
    dialog: null,
    currentEditor: null,
    makeDialog: function () {
        isc.YesNoMaybeItem.dialog = isc.Dialog.create({
            autoDraw: false,
            autoCenter: false,
            isModal: true,
            showHeader: false,
            showToolbar: false,
            autoSize: true,
            width: 100,
            bodyDefaults: {
                layoutMargin: 10,
                membersMargin: 10
            },
            items: [
                isc.Button.create({
                    title: 'YES',
                    click: 'isc.YesNoMaybeItem.setValue(this.title)'
                }),
                isc.Button.create({
                    title: 'NO',
                    click: 'isc.YesNoMaybeItem.setValue(this.title)'
                }),
                isc.Button.create({
                    title: 'MAYBE',
                    click: 'isc.YesNoMaybeItem.setValue(this.title)'
                })
            ]
        });
    },
    showDialog: function (left, top) {
        this.dialog.moveTo(left, top);
        this.dialog.show();
    },
    setValue: function (value) {
        this.currentEditor.storeValue(value, true);
        this.dialog.hide();
    }
});
isc.YesNoMaybeItem.addProperties({
    icons: [{}],
    iconClick: function (form, item, icon) {
        var iconRect = this.getIconPageRect(icon);
        if (!isc.YesNoMaybeItem.dialog)
            isc.YesNoMaybeItem.makeDialog();
        isc.YesNoMaybeItem.currentEditor = this;
        isc.YesNoMaybeItem.showDialog(iconRect[0], iconRect[1]);
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm ID="aForm" left="50" top="50">
        <fields>
            <YesNoMaybeItem title="Decision" name="decision" change={onDecisionChange}/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
