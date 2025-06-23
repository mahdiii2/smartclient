/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, BlurbItem, ColorItem, ComboBoxItem, DateItem, DynamicForm, FormItemIcon, RowSpacerItem, SelectItem, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFormItemIconClick = function(form,item,icon) {return isc.say(item.helpText)};
let onClearClick = function (form, item, icon) {
    item.clearValue();
    item.focusInItem();
};

var valueMap = {
    'US': 'United States',
    'CH': 'China',
    'JA': 'Japan',
    'IN': 'India',
    'GM': 'Germany',
    'FR': 'France',
    'IT': 'Italy',
    'RS': 'Russia',
    'BR': 'Brazil',
    'CA': 'Canada',
    'MX': 'Mexico',
    'SP': 'Spain'
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm ID="showIconsOnFocusForm" groupTitle="Show Icons On Focus" width="350" padding="5" isGroup="true" canTabToIcons="false">
        <items>
            <BlurbItem value="Picker Icons"/>
            <ComboBoxItem valueMap={valueMap} name="comboBoxItem" title="Combo Box" showPickerIconOnFocus="true"/>
            <DateItem useTextField="true" name="dateItem" title="Date Item" showPickerIconOnFocus="true"/>
            <ColorItem name="colorItem" title="Color Item" showPickerIconOnFocus="true"/>
            <RowSpacerItem/>
            <BlurbItem value="Custom Icons"/>
            <SelectItem name="customIcon" title="External Icon" value="2" showIconsOnFocus="true" helpText={'<br><b>Severity 1</b> - Critical problem<br>System is unavailable in production or ' + 'is corrupting data, and the error severely impacts the user\'s operations.' + '<br><br><b>Severity 2</b> - Major problem<br>An important function of the system ' + 'is not available in production, and the user\'s operations are restricted.' + '<br><br><b>Severity 3</b> - Minor problem<br>Inability to use a function of the ' + 'system occurs, but it does not seriously affect the user\'s operations.'}>
                <valueMap>
                        <value id="1">Severity 1</value>
                        <value id="2">Severity 2</value>
                        <value id="3">Severity 3</value>
                </valueMap>
                <icons>
                    <FormItemIcon src="[SAMPLE]other/help.png" click={onFormItemIconClick}/>
                </icons>
            </SelectItem>
            <TextItem name="inclineIcons" title="Inline Icons" iconHeight="16" iconWidth="16" suppressBrowserClearIcon="true" showIconsOnFocus="true">
                <icons>
                    <FormItemIcon name="view" src="[SKINIMG]actions/view.png" inline="true" hspace="5" baseStyle="roundedTextItemIcon" showRTL="true"/>
                    <FormItemIcon name="clear" src="[SKINIMG]actions/close.png" width="10" height="10" inline="true" prompt="Clear this field" click={onClearClick}/>
                </icons>
            </TextItem>
        </items>
    </DynamicForm>,
    document.getElementById(target)
);
