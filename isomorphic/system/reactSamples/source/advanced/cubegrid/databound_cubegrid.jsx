/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, Canvas, CubeGrid, LGField, Label, ListGrid, Menu, MenuButton, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onRowFacetListCellContextClick = function (record, rowNum, colNum) {
    var menu = window[record.id + 'Menu'];
    menu.showContextMenu();
    return false;
};
let onRowFacetListWillAcceptDrop = function () {
    if (isc.EventHandler.getDragTarget().dragType == 'facet')
        return true;
    return null;
};
let onRowFacetListTransferDragData = function () {
    var selection = this.getDragData();
    if (selection.length == this.data.getLength()) {
        isc.warn('Unable to shift all row facets onto columns - cubeGrid requires at least ' + 'one facet on each axis.');
        return null;
    }
    return this.Super('transferDragData', arguments);
};
let onRowFacetListRecordDrop = function (dropRecords, targetRecord, dropIndex, sourceWidget) {
    if (sourceWidget.dragType == 'facet') {
        report.addRowFacet(sourceWidget.facetId, dropIndex);
    }
};
let onRowFacetListDragStart = function () {
    if (this.Super('dragStart')) {
        this.facetId = this.getSelectedRecord().id;
    }
};
let onColFacetListCellContextClick = function (record, rowNum, colNum) {
    var menu = window[record.id + 'Menu'];
    menu.showContextMenu();
    return false;
};
let onColFacetListWillAcceptDrop = function () {
    if (isc.EventHandler.getDragTarget().dragType == 'facet')
        return true;
    return null;
};
let onColFacetListTransferDragData = function () {
    var selection = this.getDragData();
    if (selection.length == this.data.getLength()) {
        isc.warn('Unable to shift all column facets onto rows - cubeGrid requires at least ' + 'one facet on each axis.');
        return null;
    }
    return this.Super('transferDragData', arguments);
};
let onColFacetListRecordDrop = function (dropRecords, targetRecord, dropIndex, sourceWidget) {
    if (sourceWidget.dragType == 'facet') {
        report.addColumnFacet(sourceWidget.facetId, dropIndex);
    }
};
let onColFacetListDragStart = function () {
    if (this.Super('dragStart')) {
        this.facetId = this.getSelectedRecord().id;
    }
};
let onReportExportClick = function () {
    report.exportClientData({ exportAs: 'xls' });
};
let onReportCellHoverHTML = function(record,rowNum,colNum) {if (record != null) return 'cell value: '+record.value+'<br>cell ID: '+record.cellID;};

isc.HeaderGrid.addProperties({ backgroundColor: '#6682A0' });
var productRevenue_facets = [
    {
        id: 'Regions',
        title: 'Region',
        isTree: true,
        values: [
            {
                id: 'sum',
                title: 'All Regions',
                collapse: false
            },
            {
                id: 'North',
                parentId: 'sum',
                title: 'North'
            },
            {
                id: 'South',
                parentId: 'sum',
                title: 'South'
            },
            {
                id: 'East',
                parentId: 'sum',
                title: 'East'
            },
            {
                id: 'West',
                parentId: 'sum',
                title: 'West'
            }
        ]
    },
    {
        id: 'Scenarios',
        title: 'Scenario',
        values: [
            {
                id: 'Actual',
                title: 'Actual'
            },
            {
                id: 'Budget',
                title: 'Budget'
            }
        ]
    },
    {
        id: 'Time',
        title: 'Time',
        isTree: true,
        collapsed: true,
        width: 150,
        values: [
            {
                id: 'sum',
                title: 'All Years',
                collapsed: false
            },
            {
                id: '2018',
                parentId: 'sum',
                title: '2018'
            },
            {
                id: '2019',
                parentId: 'sum',
                title: '2019'
            },
            {
                id: '2020',
                parentId: 'sum',
                title: '2020',
                collapsed: false
            },
            {
                id: 'Q1-2018',
                parentId: '2018',
                title: 'Q1-2018'
            },
            {
                id: 'Q2-2018',
                parentId: '2018',
                title: 'Q2-2018'
            },
            {
                id: 'Q3-2018',
                parentId: '2018',
                title: 'Q3-2018'
            },
            {
                id: 'Q4-2018',
                parentId: '2018',
                title: 'Q4-2018'
            },
            {
                id: 'Q1-2019',
                parentId: '2019',
                title: 'Q1-2019'
            },
            {
                id: 'Q2-2019',
                parentId: '2019',
                title: 'Q2-2019'
            },
            {
                id: 'Q3-2019',
                parentId: '2019',
                title: 'Q3-2019'
            },
            {
                id: 'Q4-2019',
                parentId: '2019',
                title: 'Q4-2019'
            },
            {
                id: 'Q1-2020',
                parentId: '2020',
                title: 'Q1-2020'
            },
            {
                id: 'Q2-2020',
                parentId: '2020',
                title: 'Q2-2020'
            },
            {
                id: 'Q3-2020',
                parentId: '2020',
                title: 'Q3-2020'
            },
            {
                id: 'Q4-2020',
                parentId: '2020',
                title: 'Q4-2020'
            },
            {
                id: '1/1/2018',
                parentId: 'Q1-2018',
                title: '1/1/2018'
            },
            {
                id: '2/1/2018',
                parentId: 'Q1-2018',
                title: '2/1/2018'
            },
            {
                id: '3/1/2018',
                parentId: 'Q1-2018',
                title: '3/1/2018'
            },
            {
                id: '4/1/2018',
                parentId: 'Q2-2018',
                title: '4/1/2018'
            },
            {
                id: '5/1/2018',
                parentId: 'Q2-2018',
                title: '5/1/2018'
            },
            {
                id: '6/1/2018',
                parentId: 'Q2-2018',
                title: '6/1/2018'
            },
            {
                id: '7/1/2018',
                parentId: 'Q3-2018',
                title: '7/1/2018'
            },
            {
                id: '8/1/2018',
                parentId: 'Q3-2018',
                title: '8/1/2018'
            },
            {
                id: '9/1/2018',
                parentId: 'Q3-2018',
                title: '9/1/2018'
            },
            {
                id: '10/1/2018',
                parentId: 'Q4-2018',
                title: '10/1/2018'
            },
            {
                id: '11/1/2018',
                parentId: 'Q4-2018',
                title: '11/1/2018'
            },
            {
                id: '12/1/2018',
                parentId: 'Q4-2018',
                title: '12/1/2018'
            },
            {
                id: '1/1/2019',
                parentId: 'Q1-2019',
                title: '1/1/2019'
            },
            {
                id: '2/1/2019',
                parentId: 'Q1-2019',
                title: '2/1/2019'
            },
            {
                id: '3/1/2019',
                parentId: 'Q1-2019',
                title: '3/1/2019'
            },
            {
                id: '4/1/2019',
                parentId: 'Q2-2019',
                title: '4/1/2019'
            },
            {
                id: '5/1/2019',
                parentId: 'Q2-2019',
                title: '5/1/2019'
            },
            {
                id: '6/1/2019',
                parentId: 'Q2-2019',
                title: '6/1/2019'
            },
            {
                id: '7/1/2019',
                parentId: 'Q3-2019',
                title: '7/1/2019'
            },
            {
                id: '8/1/2019',
                parentId: 'Q3-2019',
                title: '8/1/2019'
            },
            {
                id: '9/1/2019',
                parentId: 'Q3-2019',
                title: '9/1/2019'
            },
            {
                id: '10/1/2019',
                parentId: 'Q4-2019',
                title: '10/1/2019'
            },
            {
                id: '11/1/2019',
                parentId: 'Q4-2019',
                title: '11/1/2019'
            },
            {
                id: '12/1/2019',
                parentId: 'Q4-2019',
                title: '12/1/2019'
            },
            {
                id: '1/1/2020',
                parentId: 'Q1-2020',
                title: '1/1/2020'
            },
            {
                id: '2/1/2020',
                parentId: 'Q1-2020',
                title: '2/1/2020'
            },
            {
                id: '3/1/2020',
                parentId: 'Q1-2020',
                title: '3/1/2020'
            },
            {
                id: '4/1/2020',
                parentId: 'Q2-2020',
                title: '4/1/2020'
            },
            {
                id: '5/1/2020',
                parentId: 'Q2-2020',
                title: '5/1/2020'
            },
            {
                id: '6/1/2020',
                parentId: 'Q2-2020',
                title: '6/1/2020'
            },
            {
                id: '7/1/2020',
                parentId: 'Q3-2020',
                title: '7/1/2020'
            },
            {
                id: '8/1/2020',
                parentId: 'Q3-2020',
                title: '8/1/2020'
            },
            {
                id: '9/1/2020',
                parentId: 'Q3-2020',
                title: '9/1/2020'
            },
            {
                id: '10/1/2020',
                parentId: 'Q4-2020',
                title: '10/1/2020'
            },
            {
                id: '11/1/2020',
                parentId: 'Q4-2020',
                title: '11/1/2020'
            },
            {
                id: '12/1/2020',
                parentId: 'Q4-2020',
                title: '12/1/2020'
            }
        ]
    },
    {
        id: 'Products',
        title: 'Product',
        isTree: true,
        collapsed: true,
        width: 175,
        values: [
            {
                id: 'sum',
                title: 'All Products',
                collapsed: false
            },
            {
                id: 'ProdFamily1',
                parentId: 'sum',
                title: 'Office Paper Products'
            },
            {
                id: 'ProdFamily2',
                parentId: 'sum',
                title: 'Office Filing and Storage'
            },
            {
                id: 'ProdFamily3',
                parentId: 'sum',
                title: 'Office Machines'
            },
            {
                id: 'ProdFamily4',
                parentId: 'sum',
                title: 'Computer Consumables',
                collapsed: false
            },
            {
                id: 'ProdGroup1',
                parentId: 'ProdFamily1',
                title: 'Photocopy / Lasercopy',
                collapsed: false
            },
            {
                id: 'ProdGroup2',
                parentId: 'ProdFamily1',
                title: 'Post-it Products'
            },
            {
                id: 'ProdGroup3',
                parentId: 'ProdFamily2',
                title: 'Folders'
            },
            {
                id: 'ProdGroup4',
                parentId: 'ProdFamily3',
                title: 'Overhead Projectors'
            },
            {
                id: 'ProdGroup5',
                parentId: 'ProdFamily4',
                title: 'Printing Supplies'
            },
            {
                id: 'ProdGroup6',
                parentId: 'ProdFamily4',
                title: 'Storage / Accessories'
            },
            {
                id: 'Prod01',
                parentId: 'ProdGroup1',
                title: 'Copy Paper A4'
            },
            {
                id: 'Prod02',
                parentId: 'ProdGroup1',
                title: 'Copy Paper Letter'
            },
            {
                id: 'Prod03',
                parentId: 'ProdGroup1',
                title: 'Copy Paper Legal'
            },
            {
                id: 'Prod04',
                parentId: 'ProdGroup1',
                title: 'Paper Reflex A4'
            },
            {
                id: 'Prod05',
                parentId: 'ProdGroup1',
                title: 'Paper Reflex Letter'
            },
            {
                id: 'Prod06',
                parentId: 'ProdGroup1',
                title: 'Paper Reflex Legal'
            },
            {
                id: 'Prod07',
                parentId: 'ProdGroup1',
                title: 'Paper Optix A4'
            },
            {
                id: 'Prod08',
                parentId: 'ProdGroup1',
                title: 'Paper Optix Letter'
            },
            {
                id: 'Prod09',
                parentId: 'ProdGroup1',
                title: 'Paper Optix Legal'
            },
            {
                id: 'Prod10',
                parentId: 'ProdGroup1',
                title: 'Renew Recycled A4'
            },
            {
                id: 'Prod11',
                parentId: 'ProdGroup1',
                title: 'Renew Recycled Letter'
            },
            {
                id: 'Prod12',
                parentId: 'ProdGroup1',
                title: 'Renew Recycled Legal'
            },
            {
                id: 'Prod13',
                parentId: 'ProdGroup2',
                title: '653 Neon Colors'
            },
            {
                id: 'Prod14',
                parentId: 'ProdGroup2',
                title: '654 Blue'
            },
            {
                id: 'Prod15',
                parentId: 'ProdGroup2',
                title: '654 Yellow'
            },
            {
                id: 'Prod16',
                parentId: 'ProdGroup2',
                title: '654 Green'
            },
            {
                id: 'Prod17',
                parentId: 'ProdGroup2',
                title: '654 Neon Yellow'
            },
            {
                id: 'Prod18',
                parentId: 'ProdGroup3',
                title: 'Manilla Legal Buff'
            },
            {
                id: 'Prod19',
                parentId: 'ProdGroup3',
                title: 'Manilla Legal Blue'
            },
            {
                id: 'Prod20',
                parentId: 'ProdGroup3',
                title: 'Manilla Legal Red'
            },
            {
                id: 'Prod21',
                parentId: 'ProdGroup3',
                title: 'Manilla Legal Green'
            },
            {
                id: 'Prod22',
                parentId: 'ProdGroup3',
                title: 'Manilla Legal Yellow'
            },
            {
                id: 'Prod23',
                parentId: 'ProdGroup4',
                title: 'OHP Deltascreen'
            },
            {
                id: 'Prod24',
                parentId: 'ProdGroup5',
                title: 'Label Copier 98x38'
            },
            {
                id: 'Prod25',
                parentId: 'ProdGroup5',
                title: 'Label Copier 63x25'
            },
            {
                id: 'Prod26',
                parentId: 'ProdGroup5',
                title: 'Label Laser 63x25'
            },
            {
                id: 'Prod27',
                parentId: 'ProdGroup5',
                title: 'Label Copier Avery'
            },
            {
                id: 'Prod28',
                parentId: 'ProdGroup5',
                title: 'Label Laser Avery'
            },
            {
                id: 'Prod29',
                parentId: 'ProdGroup5',
                title: 'Label Laser/Copier Avery'
            },
            {
                id: 'Prod30',
                parentId: 'ProdGroup5',
                title: 'Labels Inkjet J8666'
            },
            {
                id: 'Prod31',
                parentId: 'ProdGroup5',
                title: 'Labels L7675 Video'
            },
            {
                id: 'Prod32',
                parentId: 'ProdGroup5',
                title: 'Comp. Paper Bhs7GSM'
            },
            {
                id: 'Prod33',
                parentId: 'ProdGroup5',
                title: 'Comp. Paper 15x11'
            },
            {
                id: 'Prod34',
                parentId: 'ProdGroup5',
                title: 'InkJet Cartridge'
            },
            {
                id: 'Prod35',
                parentId: 'ProdGroup5',
                title: 'BubbleJet Cartridge'
            },
            {
                id: 'Prod36',
                parentId: 'ProdGroup5',
                title: 'Laserjet Cartidge'
            },
            {
                id: 'Prod37',
                parentId: 'ProdGroup5',
                title: 'Toner Canon C-f554'
            },
            {
                id: 'Prod38',
                parentId: 'ProdGroup5',
                title: 'OHP Film 3M pp2900'
            },
            {
                id: 'Prod39',
                parentId: 'ProdGroup5',
                title: 'OHP Film Blk/Clr'
            },
            {
                id: 'Prod40',
                parentId: 'ProdGroup5',
                title: 'OHP Film 3M (laser)'
            },
            {
                id: 'Prod41',
                parentId: 'ProdGroup5',
                title: 'Label Floppy 3.5'
            },
            {
                id: 'Prod42',
                parentId: 'ProdGroup5',
                title: 'Label CD'
            },
            {
                id: 'Prod43',
                parentId: 'ProdGroup5',
                title: 'Label Zip'
            },
            {
                id: 'Prod44',
                parentId: 'ProdGroup6',
                title: 'Diskette Box'
            },
            {
                id: 'Prod45',
                parentId: 'ProdGroup6',
                title: 'Label Holders'
            },
            {
                id: 'Prod46',
                parentId: 'ProdGroup6',
                title: 'Keyboard Cover'
            },
            {
                id: 'Prod47',
                parentId: 'ProdGroup6',
                title: 'Pen tidy'
            },
            {
                id: 'Prod48',
                parentId: 'ProdGroup6',
                title: 'Screen Filter 15\'\''
            },
            {
                id: 'Prod49',
                parentId: 'ProdGroup6',
                title: 'Screen Filter 18\'\''
            },
            {
                id: 'Prod50',
                parentId: 'ProdGroup6',
                title: 'Screen Mesh 15\'\''
            }
        ]
    }
];
const FacetMenu = SC.defineClass('FacetMenu', Menu);
const FacetMenuButton = SC.defineClass('FacetMenuButton', MenuButton);
var facetIds = [
    'Regions',
    'Scenarios',
    'Time',
    'Products'
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" width="100%" height="100%">
        <members>
            <Canvas ID="controlCanvas" width="775" height="188" layoutAlign="center" overflow="hidden" autoDraw="false">
                <childComponents>
                    <VLayout membersMargin="4" ID="menuButtonStack" width="175" padding="3" autoDraw="false"/>
                    <ListGrid ID="rowFacetList" leaveScrollbarGap="false" selectionType="single" canSort="false" showSortArrow="none" canDragRecordsOut="true" canAcceptDroppedRecords="true" canReorderRecords="true" width="150" height="150" left="250" dragType="facet" autoDraw="false" cellContextClick={onRowFacetListCellContextClick} willAcceptDrop={onRowFacetListWillAcceptDrop} transferDragData={onRowFacetListTransferDragData} recordDrop={onRowFacetListRecordDrop} dragStart={onRowFacetListDragStart}>
                        <fields>
                            <LGField name="title" title="Row Facets"/>
                        </fields>
                    </ListGrid>
                    <ListGrid ID="colFacetList" leaveScrollbarGap="false" selectionType="single" canSort="false" showSortArrow="none" canDragRecordsOut="true" canAcceptDroppedRecords="true" canReorderRecords="true" width="150" height="150" left="450" dragType="facet" autoDraw="false" cellContextClick={onColFacetListCellContextClick} willAcceptDrop={onColFacetListWillAcceptDrop} transferDragData={onColFacetListTransferDragData} recordDrop={onColFacetListRecordDrop} dragStart={onColFacetListDragStart}>
                        <fields>
                            <LGField name="title" title="Column facets"/>
                        </fields>
                    </ListGrid>
                    <Button title="Export" ID="reportExport" left="640" top="125" autodraw="false" click={onReportExportClick}/>
                </childComponents>
            </Canvas>
            <Label align="center" valign="center" padding="5" wrap="false" title="reportLabel" layoutAlign="center" ID="reportLabel" width="500" height="30" styleName="blackOnWhite" border="1px solid black;" overflow="visible" autoDraw="false"/>
            <CubeGrid cellIdProperty="cellID" valueProperty="value" valueTitle="Sales" facets={productRevenue_facets} canMoveFacets="true" canCollapseFacets="true" canMinimizeFacets="true" hiliteProperty="_hilite" autoSelectValues="both" showCellContextMenus="true" showFacetValueContextMenus="true" showFacetContextMenus="true" rowHeaderGridMode="true" enableCharting="true" ID="report" dataSource="productRevenue" canHover="true" autoDraw="false" cellHoverHTML={onReportCellHoverHTML}>
                <columnFacets>
                    <value>Time</value>
                </columnFacets>

                <rowFacets>
                    <value>Regions</value>
                    <value>Products</value>
                </rowFacets>

                <fixedFacetValues Scenarios="Budget"/>
                <hoverProperties>
                	<width>150</width>
                	<height>20</height>
                </hoverProperties>
            </CubeGrid>
        </members>
    </VLayout>,
    document.getElementById(target)
);

isc.FacetMenu.addMethods({
    initWidget: function () {
        var cubeGridId = this.cubeGrid.getID();
        this.data = [
            {
                title: 'Add To Row Facets',
                enableIf: '!' + cubeGridId + '.rowFacets.contains(\'' + this.facetId + '\')',
                click: 'report.addToRowFacets(\'' + this.facetId + '\');'
            },
            {
                title: 'Add To Column Facets',
                enableIf: '!' + cubeGridId + '.columnFacets.contains(\'' + this.facetId + '\')',
                click: 'report.addToColumnFacets(\'' + this.facetId + '\');'
            },
            {
                title: 'Fix ' + this.facetId + ' value',
                submenu: isc.Menu.create({
                    autoDraw: false,
                    canSelectParentItems: true,
                    data: isc.Tree.create({
                        modelType: 'parent',
                        childrenProperty: 'childNodes',
                        data: this.cubeGrid.getFacet(this.facetId).values
                    }),
                    itemClick: 'report.fixFacetValue(\'' + facetId + '\', item.id)'
                })
            }
        ];
        return this.Super('initWidget', arguments);
    }
});
report.addMethods({
    addToColumnFacets: function (facetId) {
        if (this.rowFacets.length == 1 && this.rowFacets.contains(facetId)) {
            isc.warn('Unable to add ' + facetId + ' to column facets.<br>' + 'This would remove the only row-facet for this cubeGrid.');
            return;
        }
        this.addColumnFacet(facetId);
    },
    addToRowFacets: function (facetId) {
        if (this.columnFacets.length == 1 && this.columnFacets.contains(facetId)) {
            isc.warn('Unable to add ' + facetId + ' to row facets.<br>' + 'This would remove the only column-facet for this cubeGrid.');
            return;
        }
        this.addRowFacet(facetId);
    },
    fixFacetValue: function (facetId, facetValue) {
        if (this.columnFacets.length == 1 && this.columnFacets.contains(facetId) || this.rowFacets.length == 1 && this.rowFacets.contains(facetId)) {
            isc.warn('Unable to fix value for ' + facetId + '.<br>' + 'This would remove the only column-facet for this cubeGrid.');
            return;
        }
        this.setFixedFacetValue(facetId, facetValue);
    }
});
isc.FacetMenuButton.addProperties({
    width: 175,
    canDrag: true,
    canDrop: true,
    dragType: 'facet',
    prompt: 'Drag to desired facet position, or click to display menu.'
});
for (var i = 0; i < facetIds.length; i++) {
    var facetId = facetIds[i];
    menuButtonStack.addMember(isc.FacetMenuButton.create({
        autoDraw: false,
        ID: facetId + 'Button',
        menu: isc.FacetMenu.create({
            ID: facetId + 'Menu',
            width: 175,
            cubeGrid: report,
            facetId: facetId
        }),
        facetId: facetId
    }));
}
isc.Page.addClassMethods({
    updateLists: function () {
        var data = [];
        for (var i = 0; i < report.rowFacets.length; i++) {
            data[i] = report.getFacet(report.rowFacets[i]);
        }
        rowFacetList.setData(data);
        data = [];
        for (var j = 0; j < report.columnFacets.length; j++) {
            data[j] = report.getFacet(report.columnFacets[j]);
        }
        colFacetList.setData(data);
    },
    updateLabels: function () {
        var fixedFacetValueTitles = {};
        for (var i in report.fixedFacetValues) {
            fixedFacetValueTitles[i] = report.getFacetValue(i, report.fixedFacetValues[i]).title;
        }
        for (var i = 0; i < facetIds.length; i++) {
            var facetId = facetIds[i], displayType = fixedFacetValueTitles[facetId];
            if (displayType == null)
                displayType = report.columnFacets.contains(facetId) ? 'in columns' : 'in rows';
            var menuButton = window[facetId + 'Button'];
            menuButton.setTitle('<b>' + facetId + '</b>: [' + displayType + ']');
        }
        var fixedValueString;
        for (var j in fixedFacetValueTitles) {
            if (fixedValueString == null)
                fixedValueString = '';
            else
                fixedValueString += ', ';
            fixedValueString += j + ': <i>\'' + fixedFacetValueTitles[j] + '\'</i>';
        }
        if (fixedValueString == null)
            fixedValueString = 'none';
        reportLabel.setContents('<B>Report - fixed values: ' + fixedValueString + '</B>');
    }
});
report.addMethods({
    facetAdded: function (facetId) {
        isc.Page.updateLists();
        isc.Page.updateLabels();
    },
    facetMoved: function (facetId) {
        isc.Page.updateLists();
        isc.Page.updateLabels();
    },
    fixedFacetValueChanged: function (facetId, facetValueId) {
        isc.Page.updateLists();
        isc.Page.updateLabels();
    }
});
isc.Page.updateLists();
isc.Page.updateLabels();
