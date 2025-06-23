/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var clearPicker = isc.FormItem.getPickerIcon('clear', {
    click: function () {
        isc.say('Clear Picker clicked');
    }
});
var searchPicker = isc.FormItem.getPickerIcon('search', {
    click: function () {
        isc.say('Search Picker clicked');
    }
});
var datePicker = isc.FormItem.getPickerIcon('date', {
    click: function () {
        isc.say('Date Picker clicked');
    }
});
var refreshPicker = isc.FormItem.getPickerIcon('refresh', {
    click: function () {
        isc.say('Refresh Picker clicked');
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm colWidths="110,*" titleWidth="100" autoFocus="true" width="400" margin="10">
        <fields>
            <TextItem name="pickerControls" title="Picker Controls" icons={[
    clearPicker,
    searchPicker,
    refreshPicker
]}/>
            <TextItem name="datePicker" title="Date Picker" icons={[datePicker]}/>
            <TextItem name="refreshOnlyControls" title="Refresh Picker" icons={[refreshPicker]}/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
