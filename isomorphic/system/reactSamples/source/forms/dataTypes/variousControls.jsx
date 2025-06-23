/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, ColorItem, ComboBoxItem, DateItem, DateRangeItem, DateTimeItem, DynamicForm, LinkItem, MiniDateRangeItem, RadioGroupItem, RelativeDateItem, SelectItem, SliderItem, SpinnerItem, TextAreaItem, TextItem, TimeItem, ToggleItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onLinkClick = function(form,item) {return isc.say('Hello world!')};

var valueMap = {
    'US': '<b>United States</b>',
    'CH': 'China',
    'JA': '<b>Japan</b>',
    'IN': 'India',
    'GM': 'Germany',
    'FR': 'France',
    'IT': 'Italy',
    'RS': 'Russia',
    'BR': '<b>Brazil</b>',
    'CA': 'Canada',
    'MX': 'Mexico',
    'SP': 'Spain'
};
var valueIcons = {
    'US': 'US',
    'CH': 'CH',
    'JA': 'JA',
    'IN': 'IN',
    'GM': 'GM',
    'FR': 'FR',
    'IT': 'IT',
    'RS': 'RS',
    'BR': 'BR',
    'CA': 'CA',
    'MX': 'MX',
    'SP': 'SP'
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10">
        <members>
            <DynamicForm ID="form1" colWidths="190,*" width="620">
                <values slider="4"/>
                <fields>
                    <TextItem name="text" title="Text" hint="A plain text field" wrapHintText="false"/>
                    <ColorItem name="colorPicker" title="Color Picker"/>
                    <TextAreaItem name="textArea" title="TextArea"/>
                    <SpinnerItem step="0.5" max="10" min="0" defaultValue="5" writeStackedIcons="true" name="stackedSpinner" title="Stacked Spinner" wrapTitle="false"/>
                    <SpinnerItem step="0.5" max="10" min="0" defaultValue="5" writeStackedIcons="false" name="unstackedSpinner" title="Unstacked Spinner"/>
                    <SliderItem minValue="1" maxValue="5" numValues="5" name="slider" title="Slider"/>
                    <LinkItem linkTitle="Click Me" target="javascript" name="link" title="LinkItem" click={onLinkClick}/>
                    <CheckboxItem name="checkbox" title="Checkbox" height="25"/>
                    <RadioGroupItem name="radioGroup" title="Radio Group">
                        <valueMap>
                                <value>Option 1</value>
                                <value>Option 2</value>
                        </valueMap>
                    </RadioGroupItem>
                    <ToggleItem name="toggle" title="Toggle"/>
                </fields>
            </DynamicForm>
            <DynamicForm ID="form2" colWidths="190,*" groupTitle="Select / Combo Controls" width="620" isGroup="true">
                <fields>
                    <ComboBoxItem name="bugStatus" title="ComboBox" hint="&lt;nobr&gt;A simple combobox&lt;/nobr&gt;">
                        <valueMap cat="Cat" dog="Dog" giraffe="Giraffe" goat="Goat" marmoset="Marmoset" mouse="Mouse"/>
                    </ComboBoxItem>
                    <ComboBoxItem optionDataSource="supplyItem" name="itemName" title="Item Name" hint="&lt;nobr&gt;A databound combobox&lt;/nobr&gt;"/>
                    <SelectItem valueMap={valueMap} hint="&lt;nobr&gt;A select with icons&lt;/nobr&gt;" name="selectItem" title="Select" valueIcons={valueIcons} valueIconSize="16" imageURLPrefix="flags/24/" imageURLSuffix=".png"/>
                    <SelectItem hint="&lt;nobr&gt;A select with styled entries&lt;/nobr&gt;" name="selectItem2" title="Select">
                        <valueMap red="&lt;span style=&apos;color:#FF0000;&apos;&gt;Red&lt;/span&gt;" green="&lt;span style=&apos;color:#00FF00;&apos;&gt;Green&lt;/span&gt;" blue="&lt;span style=&apos;color:#0000FF;&apos;&gt;Blue&lt;/span&gt;"/>
                    </SelectItem>
                    <SelectItem multiple="true" multipleAppearance="grid" name="selectItemMultipleGrid" title="Select Multiple (Grid)">
                        <valueMap cat="Cat" dog="Dog" giraffe="Giraffe" goat="Goat" marmoset="Marmoset" mouse="Mouse"/>
                    </SelectItem>
                    <SelectItem multiple="true" multipleAppearance="picklist" name="selectItemMultiplePickList" title="Select Multiple (PickList)">
                        <valueMap cat="Cat" dog="Dog" giraffe="Giraffe" goat="Goat" marmoset="Marmoset" mouse="Mouse"/>
                    </SelectItem>
                </fields>
            </DynamicForm>
            <DynamicForm ID="dateForm" colWidths="190,*" fixedColWidths="true" groupTitle="Date Controls" width="620" isGroup="true">
                <fields>
                    <DateItem name="dateItem" title="Date" hint="&lt;nobr&gt;Picklist based date input&lt;/nobr&gt;"/>
                    <DateItem useTextField="true" name="dateItem2" title="Date" hint="&lt;nobr&gt;Direct date input&lt;/nobr&gt;"/>
                    <DateTimeItem useTextField="true" name="dateTimeItem" title="Datetime" hint="&lt;nobr&gt;Direct datetime input&lt;/nobr&gt;"/>
                    <TimeItem name="timeItem" title="Time"/>
                    <TimeItem name="timeItem2" title="Time" hint="Picklist based time input" useTextField="false"/>
                    <DateRangeItem title="Date Range" name="dri" width="400" allowRelativeDates="true" fromDate="$today" toDate="-1m"/>
                    <MiniDateRangeItem title="Mini Date Range" name="mdri"/>
                    <RelativeDateItem title="Relative Date" name="rdi"/>
                </fields>
            </DynamicForm>
        </members>
    </VStack>,
    document.getElementById(target)
);
