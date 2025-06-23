/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, HLayout, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDataSourceChange = function (form, item, value, oldValue) {
    if (!this.valueMap.contains(value))
        return false;
    else
        compoundEditor.setDataSource(value);
};

const CompoundEditor = SC.defineClass('CompoundEditor', HLayout);
isc.CompoundEditor.addProperties({
    initWidget: function () {
        this.Super('initWidget', arguments);
        this.form = isc.DynamicForm.create({
            compoundEditor: this,
            autoDraw: false,
            dataSource: this.dataSource
        });
        this.saveButton = isc.IButton.create({
            form: this.form,
            disabled: true,
            autoDraw: false,
            layoutAlign: 'center',
            title: 'Save',
            click: 'this.form.saveData()'
        });
        this.editorLayout = isc.VLayout.create({
            autoDraw: false,
            membersMargin: 5,
            members: [
                this.form,
                this.saveButton
            ]
        });
        this.grid = isc.ListGrid.create({
            compoundEditor: this,
            form: this.form,
            width: 750,
            saveButton: this.saveButton,
            autoDraw: false,
            showResizeBar: true,
            dataSource: this.dataSource,
            autoFitDateFields: 'both',
            wrapHeaderTitles: true,
            autoFetchData: true,
            recordClick: function (viewer, record, rowNum, field, fieldNum, value, rawValue) {
                this.form.clearErrors();
                this.form.editRecord(record);
                this.saveButton.enable();
            }
        });
        this.addMember(this.grid);
        this.addMember(this.editorLayout);
    },
    setDataSource: function (dataSource) {
        this.grid.setDataSource(dataSource);
        this.form.setDataSource(dataSource);
        this.saveButton.disable();
        this.grid.filterData();
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm>
            <values dataSource="Select A DataSource"/>
            <items>
                <SelectItem name="dataSource" showTitle="false" width="190" change={onDataSourceChange}>
                    <valueMap>
                            <value>countryDS</value>
                            <value>supplyItem</value>
                    </valueMap>
                </SelectItem>
            </items>
        </DynamicForm>

        <CompoundEditor dataSource="countryDS" ID="compoundEditor" width="100%" height="80%" top="50"/>
    </>,
    document.getElementById(target)
);
