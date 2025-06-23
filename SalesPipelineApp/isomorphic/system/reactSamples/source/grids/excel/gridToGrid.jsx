/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TabSet, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const GridCanvas = SC.defineClass('GridCanvas', VLayout);
isc.GridCanvas.addProperties({
    GRID_FIELD_NAMES: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G'
    ],
    addButtons: function () {
        var MEMBER_ALIGNMENT = [
            'left',
            'center',
            'right'
        ];
        var grid = this.grid;
        var layout = isc.HLayout.create({
            margin: 10,
            membersMargin: 10,
            width: '100%',
            layoutAlign: 'center',
            align: MEMBER_ALIGNMENT[this.orderNumber],
            members: [
                isc.IButton.create({
                    title: 'Copy',
                    click: function () {
                        listGridSheets.data = grid.getSelectedCellData();
                    }
                }),
                isc.IButton.create({
                    title: 'Paste',
                    click: function () {
                        grid.applyCellData(listGridSheets.data);
                    }
                })
            ]
        });
        this.addMember(layout);
    },
    initWidget: function () {
        this.Super('initWidget', arguments);
        var i, fields = [];
        for (i = 0; i < this.GRID_FIELD_NAMES.length; i++) {
            fields.add({ name: this.GRID_FIELD_NAMES[i] });
        }
        var data = [];
        for (i = 0; i < 10; i++) {
            data.add({});
        }
        if (this.orderNumber === 0) {
            data[2].B = 'text1';
            data[2].E = 'text2';
            data[4].C = 'text3';
            data[7].G = 'text4';
            data[5].A = 'text5';
            data[5].F = 'text6';
        }
        this.grid = isc.ListGrid.create({
            ID: 'tabGrid' + this.orderNumber,
            data: data,
            canvas: this,
            canEdit: true,
            width: '100%',
            fields: fields,
            canSelectAll: true,
            canDragSelect: true,
            canSelectCells: true,
            leaveScrollbarGap: false,
            autoFitData: 'vertical'
        });
        this.addMember(this.grid);
        this.addButtons();
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TabSet ID="listGridSheets" width="100%" height="100%"/>,
    document.getElementById(target)
);

for (var i = 0; i < 3; i++) {
    var canvas = isc.GridCanvas.create({
        orderNumber: i,
        overflow: 'visible'
    });
    listGridSheets.addTab({
        title: 'Sheet ' + (i + 1),
        pane: canvas
    });
}
