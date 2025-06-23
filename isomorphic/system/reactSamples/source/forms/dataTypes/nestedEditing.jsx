/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CanvasItem, DateItem, DynamicForm, SubmitItem, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const GridEditorItem = SC.defineClass('GridEditorItem', CanvasItem);
isc.GridEditorItem.addProperties({
    height: '*',
    width: '*',
    rowSpan: '*',
    colSpan: '*',
    endRow: true,
    startRow: true,
    shouldSaveValue: true,
    createCanvas: function () {
        var gridDS = isc.DS.get(this.gridDataSource);
        return isc.ListGrid.create({
            autoDraw: false,
            leaveScrollbarGaps: false,
            dataSource: gridDS,
            fields: this.gridFields,
            sortField: this.gridSortField,
            data: this.getValue(),
            canEdit: true,
            saveLocally: true,
            modalEditing: true,
            cellChanged: function () {
                this.canvasItem.storeValue(this.data);
                if (this.canvasItem.gridSortField != null) {
                    this.sort(this.canvasItem.gridSortField);
                }
            }
        });
    },
    showValue: function (displayValue, dataValue) {
        if (this.canvas == null)
            return;
        this.canvas.setData(dataValue);
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm ID="exampleForm" dataSource="masterDetail_orderHB" width="400" height="350" autoDraw="true">
        <fields>
            <TextItem name="orderID"/>
            <DateItem name="orderDate"/>
            <GridEditorItem name="items" showTitle="false" gridDataSource="masterDetail_orderItemHB" gridSortField="itemDescription">
                <gridFields>
                	<name>itemDescription</name>
                	<width>145</width>
                </gridFields>
                <gridFields>
                	<name>unitPrice</name>
                </gridFields>
                <gridFields>
                	<name>quantity</name>
                </gridFields>
            </GridEditorItem>
            <TextItem name="trackingNumber" wrapTitle="false"/>
            <SubmitItem title="Save"/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);

exampleForm.fetchData({ orderID: 3 });
