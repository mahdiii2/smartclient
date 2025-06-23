/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, CanvasItem, DynamicForm, HStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onRememberCurrentValueClick = function (form, self) {
    form.rememberValues();
};

const MyProgressbarItem = SC.defineClass('MyProgressbarItem', CanvasItem);
isc.MyProgressbarItem.addProperties({
    progressbarConstructor: 'Progressbar',
    progressbarDefaults: {
        canFocus: true,
        cursor: 'pointer',
        showTitle: true,
        titleStyle: 'myProgressbarItemTitle',
        _storeValue: function (newPercentDone) {
            this.setTitle('Project progress: ' + newPercentDone + '%');
            this.setPercentDone(newPercentDone);
            var myProgressbarItem = this.canvasItem;
            myProgressbarItem.storeValue(newPercentDone);
        },
        click: function () {
            var offsetX = this.getOffsetX();
            var newPercentDone = Math.round(offsetX / this.getVisibleWidth() * 100);
            newPercentDone = Math.max(0, Math.min(newPercentDone, 100));
            this._storeValue(newPercentDone);
        },
        keyPress: function () {
            var keyName = isc.EventHandler.getKey();
            if (keyName === 'Arrow_Right' || keyName === 'Arrow_Up') {
                var currentPercentDone = this.percentDone;
                if (currentPercentDone < 100)
                    this._storeValue(currentPercentDone + 1);
            } else if (keyName === 'Arrow_Left' || keyName === 'Arrow_Down') {
                var currentPercentDone = this.percentDone;
                if (currentPercentDone > 0)
                    this._storeValue(currentPercentDone - 1);
            } else if (keyName === 'Home') {
                if (this.percentDone != 0)
                    this._storeValue(0);
            } else if (keyName === 'End') {
                if (this.percentDone != 100)
                    this._storeValue(100);
            }
        }
    },
    createCanvas: function (form, self) {
        return this.createAutoChild('progressbar', { ariaRole: this.getCanEdit() ? 'slider' : 'progressbar' });
    },
    canEditChanged: function (canEdit) {
        var progressbar = this.canvas;
        progressbar.setProperty('ariaRole', canEdit ? 'slider' : 'progressbar');
    },
    pendingStatusChanged: function (form, self, pendingStatus, newValue, value) {
        var progressbar = this.canvas;
        progressbar.setTitleStyle(pendingStatus ? 'myProgressbarItemTitlePending' : 'myProgressbarItemTitle');
        return false;
    },
    showValue: function (displayValue, dataValue, form, self) {
        var progressbar = this.canvas;
        progressbar.setTitle('Project progress: ' + dataValue + '%');
        progressbar.setPercentDone(dataValue);
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack membersMargin="20" width="100%">
        <members>
            <DynamicForm colWidths="150,*" width="500" autoDraw="false" revertValueKey="Escape">
                <items>
                    <MyProgressbarItem title="Click to set progress" name="progress" height="25" shouldSaveValue="true" showPending="true" value="75"/>
                    <ButtonItem title="Remember Current Value" click={onRememberCurrentValueClick}/>
                </items>
            </DynamicForm>
        </members>
    </HStack>,
    document.getElementById(target)
);
