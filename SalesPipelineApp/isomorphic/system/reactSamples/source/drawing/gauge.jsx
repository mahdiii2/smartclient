/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, CheckboxItem, DynamicForm, Gauge, HLayout, SliderItem, TextItem, Validator } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onChkbox_drawnClockwiseChanged = function (form, drawnClockwiseConfigItem, value) {
    gauge.setDrawnClockwise(value);
};
let onText_minValueCondition = function (item, validator, value, record) {
    return parseFloat(value) <= parseFloat(record.text_maxValue) - 1;
};
let onText_minValueEditorExit = function (form, self, minValue) {
    if (!form.hasFieldErrors(self.name) && !form.hasFieldErrors('text_maxValue')) {
        var maxValueItem = form.getItem('text_maxValue'), maxValue;
        minValue = parseFloat(minValue);
        maxValue = parseFloat(maxValueItem.getValue());
        gauge.setMinValue(minValue);
        gauge.setMaxValue(maxValue);
        updateGaugeValueConfigItem();
        makeSectorsForm();
    }
};
let onText_maxValueCondition = function (item, validator, value, record) {
    return parseFloat(record.text_minValue) <= parseFloat(value) - 1;
};
let onText_maxValueEditorExit = function (form, self, maxValue) {
    if (!form.hasFieldErrors('text_minValue') && !form.hasFieldErrors(self.name)) {
        var minValueItem = form.getItem('text_minValue'), minValue;
        minValue = parseFloat(minValueItem.getValue());
        maxValue = parseFloat(maxValue);
        gauge.setMinValue(minValue);
        gauge.setMaxValue(maxValue);
        updateGaugeValueConfigItem();
        makeSectorsForm();
    }
};
let onText_numMajorTicksEditorExit = function (form, self, numMajorTicks) {
    if (!form.hasFieldErrors(self.name)) {
        var num = parseInt(numMajorTicks);
        gauge.setNumMajorTicks(num);
    }
};
let onText_numMinorTicksEditorExit = function (form, self, numMinorTicks) {
    if (!form.hasFieldErrors(self.name)) {
        var num = parseInt(numMinorTicks);
        gauge.setNumMinorTicks(num);
    }
};
let onText_labelPrefixEditorExit = function (form, self, labelPrefix) {
    gauge.setLabelPrefix(labelPrefix);
};
let onText_labelSuffixEditorExit = function (form, self, labelSuffix) {
    gauge.setLabelSuffix(labelSuffix);
};
let onText_newSectorValueCondition = function (item, validator, value, record) {
    value = parseFloat(value);
    if (!isc.isA.Number(value))
        return false;
    return parseFloat(record.text_minValue) <= value && value <= parseFloat(record.text_maxValue);
};
let onButton_addSectorClick = function (form, self) {
    var newSectorValueTextItem = form.getItem('text_newSectorValue'), value = newSectorValueTextItem.getValue();
    if (value != null && !isc.isAn.emptyString(value) && !form.hasFieldErrors(newSectorValueTextItem.name)) {
        var value = parseFloat(newSectorValueTextItem.getValue());
        newSectorValueTextItem.setValue();
        gauge.addSector(value);
        makeSectorsForm();
    }
};
let onSlider_gaugeValueChanged = function (form, self, value) {
    var val = parseFloat(value);
    gauge.setValue(val);
};

function makeSectorsForm() {
    var numSectors = gauge.getNumSectors();
    var items = new Array(numSectors);
    for (var i = 0; i < numSectors; ++i) {
        items[i] = {
            name: 'colorpick_sector' + (i + 1) + 'Color',
            title: 'Sector ' + (i + 1),
            type: 'color',
            _sectorIndex: i,
            changed: function (form, colorItem, value) {
                gauge.setSectorFillColor(this._sectorIndex, colorItem.getValue());
            },
            icons: numSectors == 1 ? [] : [{
                    src: '[SKIN]/actions/remove.png',
                    endRow: true,
                    click: function (sectorIndex) {
                        return function (form, item) {
                            if (numSectors > 1) {
                                gauge.removeSector(sectorIndex);
                                makeSectorsForm();
                            }
                        };
                    }(i)
                }]
        };
    }
    sectorsForm.setItems(items);
    for (var i = 0; i < numSectors; ++i) {
        var colorItem = items[i];
        var fillColor = gauge.getSectorFillColor(i);
        colorItem.setDefaultValue(fillColor);
        colorItem.setValue(fillColor);
    }
}
function updateGaugeValueConfigItem() {
    var gaugeValueConfigItem = window.ID_gaugeSample_gaugeValueConfigItem;
    gaugeValueConfigItem.setMinValue(gauge.minValue);
    gaugeValueConfigItem.setMaxValue(gauge.maxValue);
    var value = gauge.value;
    gaugeValueConfigItem.setValue(value);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout width="100%" height="400">
        <members>
            <Gauge width="400" height="100%" autoDraw="false" numMajorTicks="11" numMinorTicks="101" value="45">
                <sectors>
                	<value>10</value>
                	<fillColor>#E33B35</fillColor>
                </sectors>
                <sectors>
                	<value>30</value>
                	<fillColor>#ED5450</fillColor>
                </sectors>
                <sectors>
                	<value>60</value>
                	<fillColor>#FCBE29</fillColor>
                </sectors>
                <sectors>
                	<value>90</value>
                	<fillColor>#0889C6</fillColor>
                </sectors>
                <sectors>
                	<value>100</value>
                	<fillColor>#3AACE1</fillColor>
                </sectors>
            </Gauge>
            <DynamicForm numCols="3" colWidths="165,*,135" overflow="hidden" autoFocusOnError="false" groupTitle="Configuration" width="500" padding="5" isGroup="true" autoDraw="false">
                <items>
                    <CheckboxItem name="chkbox_drawnClockwise" title="Draw Clockwise?" value={gauge.drawnClockwise} endRow="true" changed={onChkbox_drawnClockwiseChanged}/>
                    <TextItem defaultValue={gauge.minValue} name="text_minValue" title="Min. Value" validateOnExit="true" endRow="true" editorExit={onText_minValueEditorExit}>
                        <validators>
                            <Validator type="required"/>
                            <Validator type="isFloat"/>
                            <Validator type="custom" errorMessage="Must be at least 1 less than the max value." condition={onText_minValueCondition}>
                                <dependentFields>
                                    <value>text_maxValue</value>
                                </dependentFields>
                            </Validator>
                        </validators>
                    </TextItem>
                    <TextItem defaultValue={gauge.maxValue} name="text_maxValue" title="Max. Value" validateOnExit="true" endRow="true" editorExit={onText_maxValueEditorExit}>
                        <validators>
                            <Validator type="required"/>
                            <Validator type="isFloat"/>
                            <Validator type="custom" errorMessage="Must be at least 1 greater than the min value." condition={onText_maxValueCondition}>
                                <dependentFields>
                                    <value>text_minValue</value>
                                </dependentFields>
                            </Validator>
                        </validators>
                    </TextItem>
                    <TextItem name="text_numMajorTicks" title="# Major Ticks" value={gauge.numMajorTicks + ''} validateOnExit="true" endRow="true" editorExit={onText_numMajorTicksEditorExit}>
                        <validators>
                            <Validator type="required"/>
                            <Validator type="isInteger"/>
                        </validators>
                    </TextItem>
                    <TextItem name="text_numMinorTicks" title="# Minor Ticks" value={gauge.numMinorTicks + ''} validateOnExit="true" endRow="true" editorExit={onText_numMinorTicksEditorExit}>
                        <validators>
                            <Validator type="required"/>
                            <Validator type="isInteger"/>
                        </validators>
                    </TextItem>
                    <TextItem name="text_labelPrefix" title="Label Prefix" value={gauge.labelPrefix} endRow="true" editorExit={onText_labelPrefixEditorExit}/>
                    <TextItem name="text_labelSuffix" title="Label Suffix" value={gauge.labelSuffix} endRow="true" editorExit={onText_labelSuffixEditorExit}/>
                    <TextItem name="text_newSectorValue" title="New Sector - Value" validateOnExit="true" wrapTitle="false" endRow="false">
                        <validators>
                            <Validator type="required"/>
                            <Validator type="isFloat"/>
                            <Validator type="custom" errorMessage="Must be between the min and max values." condition={onText_newSectorValueCondition}/>
                        </validators>
                    </TextItem>
                    <ButtonItem name="button_addSector" title="Add Sector" width="*" startRow="false" click={onButton_addSectorClick}/>
                    <SliderItem name="slider_gaugeValue" ID="ID_gaugeSample_gaugeValueConfigItem" title="Value" width="*" colSpan="2" changed={onSlider_gaugeValueChanged}/>
                </items>
            </DynamicForm>
            <DynamicForm numCols="2" overflow="auto" groupTitle="Sectors" width="275" padding="5" isGroup="true" autoDraw="false"/>
        </members>
    </HLayout>,
    document.getElementById(target)
);

updateGaugeValueConfigItem();
makeSectorsForm();
