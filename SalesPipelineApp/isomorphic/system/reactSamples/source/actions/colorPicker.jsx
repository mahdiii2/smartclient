/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, IButton, Label, RadioGroupItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onStartModeChanged = function (form, item, value) {
    isc.ColorPicker.getSharedColorPicker({ defaultPickMode: value }).setCurrentPickMode(value);
};
let onPositionChanged = function () {
    isc.ColorPicker.getSharedColorPicker().setProperties({
        autoPosition: this.getValue() == 'auto' ? true : false,
        autoCenterOnShow: this.getValue() == 'auto' ? false : true
    });
};
let onPickerButtonClick = function () {
    isc.ColorPicker.getSharedColorPicker({ colorSelected: 'pickerLabel.setBackgroundColor(color);pickerLabel.setOpacity(opacity);' }).show();
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" width="400">
        <members>
            <Label contents="Selected color:" height="20"/>
            <Label title="pickerLabel" ID="pickerLabel" width="300" height="30" border="1px grey solid"/>
            <DynamicForm ID="pickerForm" numCols="2" titleOrientation="top" width="400">
                <values startMode="simple" position="auto"/>
                <fields>
                    <RadioGroupItem name="startMode" title="Initially show ColorPicker as" width="200" changed={onStartModeChanged}>
                        <valueMap simple="Simple" complex="Complex"/>
                    </RadioGroupItem>
                    <RadioGroupItem name="position" title="Position ColorPicker" width="200" changed={onPositionChanged}>
                        <valueMap auto="Near mouse" center="Centered"/>
                    </RadioGroupItem>
                </fields>
            </DynamicForm>
            <IButton title="Pick a Color" ID="pickerButton" click={onPickerButtonClick}/>
        </members>
    </VLayout>,
    document.getElementById(target)
);
