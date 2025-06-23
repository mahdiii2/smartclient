/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, CanvasItem, DynamicForm, HLayout, Label, TextItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSetValue_FranceClick = function () {
    exampleForm.setValue('countryName', 'France');
    valuesLabel.setContents('Current values:<br> ' + isc.JSON.encode(exampleForm.getValues()));
};
let onExampleFormItemChanged = function () {
    valuesLabel.setContents('Current values:<br> ' + isc.JSON.encode(this.getValues()));
};

const ListGridItem = SC.defineClass('ListGridItem', CanvasItem);
isc.ListGridItem.addProperties({
    height: '*',
    width: '*',
    rowSpan: '*',
    endRow: true,
    startRow: true,
    shouldSaveValue: true,
    createCanvas: function () {
        return isc.ListGrid.create({
            autoDraw: false,
            width: this.width,
            height: this.height,
            leaveScrollbarGaps: false,
            dataSource: this.gridDataSource,
            fields: this.gridFields,
            autoFetchData: true,
            dataArrived: function () {
                this.canvasItem.showValue(null, this.canvasItem.getValue());
            },
            selectionUpdated: function (record) {
                var item = this.canvasItem;
                if (record == null)
                    item.storeValue(null);
                else
                    item.storeValue(record[item.name]);
            }
        });
    },
    showValue: function (displayValue, dataValue) {
        if (this.canvas == null)
            return;
        var record = this.canvas.data.find(this.name, dataValue);
        if (record)
            this.canvas.selection.selectSingle(record);
        else
            this.canvas.selection.deselectAll();
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout membersMargin="50">
        <members>
            <VLayout membersMargin="30" ID="vLayout" autoDraw="false">
                <members>
                    <Button autoFit="true" title="Set Value: France" click={onSetValue_FranceClick}/>
                    <Label title="valuesLabel" ID="valuesLabel"/>
                </members>
            </VLayout>
            <DynamicForm ID="exampleForm" width="400" height="350" padding="5" border="2px solid blue" canDragResize="true" autoDraw="false" itemChanged={onExampleFormItemChanged}>
                <values Name="Bob" countryName="Germany" Email="bob@isomorphic.com"/>
                <fields>
                    <TextItem name="Name"/>
                    <ListGridItem title="Home Country" name="countryName" gridDataSource="countryDS">
                        <gridFields>
                        	<name>countryName</name>
                        </gridFields>
                        <gridFields>
                        	<name>capital</name>
                        </gridFields>
                    </ListGridItem>
                    <TextItem name="Email"/>
                </fields>
            </DynamicForm>
        </members>
    </HLayout>,
    document.getElementById(target)
);

valuesLabel.setContents('Initial values:<br> ' + isc.JSON.encode(exampleForm.getValues()));
