/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, EditPane, HLayout, HiddenPalette, IButton, LGField, LayoutSpacer, ListGrid, ListGridRecord, ListPalette, SplitPane, Tab, TabSet, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onEditPaneSetInitialPortal = function (paletteNode) {
    var editNode = this.addFromPaletteNode(paletteNode);
    this.getEditContext().defaultParent = editNode;
};
let onEditPaneSetPortal = function (xml) {
    var editContext = this.getEditContext(), editTree = editContext.getEditNodeTree(), rootNode = editContext.getRootEditNode();
    this.addPaletteNodesFromXML(xml, null, null, function (paletteNodes) {
        var childNodes = editTree.getChildren(rootNode), editNode = childNodes && childNodes.length > 0 ? childNodes[0] : null;
        editContext.defaultParent = editNode;
    });
};
let onSaveButtonClick = function () {
    dashboardList.saveDashboard();
};
let onDiscardButtonClick = function () {
    dashboardList.refreshDashboard();
};
let onDashboardListCellContextClick = function (record, rowNum, colNum) {
    if (!this.cellContextMenu) {
        this.cellContextMenu = this.createAutoChild('cellContextMenu');
    }
    var menuItems = [
        {
            title: 'Rename',
            rowNum: rowNum,
            click: 'target.startEditing(item.rowNum)'
        },
        { isSeparator: true },
        {
            title: 'Edit',
            click: 'target.clearCurrentDashboard(); target.editDashboard()'
        },
        {
            title: 'Clone',
            click: 'target.clearCurrentDashboard(); target.cloneDashboard()'
        }
    ];
    this.cellContextMenu.setData(menuItems);
    this.cellContextMenu.showContextMenu(this);
    return false;
};
let onDashboardListRecordDoubleClick = function (viewer, record, recordNum, field, fieldNum, value, rawValue) {
    viewer.clearCurrentDashboard();
    viewer.viewDashboard();
};
let onDashboardListClearCurrentDashboard = function () {
    editPane.destroyAll();
    editPane.hide();
    editToolbar.hide();
};
let onDashboardListEditDashboard = function () {
    var record = this.getSelectedRecord();
    if (record) {
        editPane.setPortal(record.layout);
        editPane.show();
        editToolbar.show();
        this.showPalette();
    }
    this._currentRecord = record;
};
let onDashboardListViewDashboard = function () {
    var record = this.getSelectedRecord();
    if (record) {
        editPane.addPaletteNodesFromXML(record.layout);
        editPane.show();
        editToolbar.hide();
        this.hidePalette();
    }
    this._currentRecord = record;
};
let onDashboardListNewDashboard = function () {
    this.clearCurrentDashboard();
    this._currentRecord = null;
    editPane.setInitialPortal(initialPortalPaletteNode);
    editPane.show();
    editToolbar.show();
    this.showPalette();
    this.saveDashboard();
};
let onDashboardListCloneDashboard = function () {
    var record = this.getSelectedRecord();
    if (record) {
        this.cloneRecord(record);
    }
};
let onDashboardListShowPalette = function () {
    selector.enableTab(1);
    selector.selectTab(1);
};
let onDashboardListHidePalette = function () {
    selector.disableTab(1);
    selector.selectTab(0);
};
let onDashboardListRefreshDashboard = function () {
    this.clearCurrentDashboard();
    this.editDashboard();
};
let onDashboardListSaveDashboard = function () {
    var editNodes = editPane.serializeAllEditNodes({ indent: false });
    if (this._currentRecord) {
        this._currentRecord.layout = editNodes;
        this.updateData(this._currentRecord);
    } else {
        var grid = this;
        this.addData({
            description: 'New dashboard',
            layout: editNodes
        }, function (response, data, request) {
            if (data && data.length > 0) {
                grid.selectSingleRecord(data[0]);
                grid._currentRecord = data[0];
            }
        });
    }
};
let onDashboardListCloneRecord = function (record) {
    this.addData({
        description: record.description,
        layout: record.layout
    });
};
let onViewButtonClick = function () {
    dashboardList.clearCurrentDashboard();
    dashboardList.viewDashboard();
};
let onEditButtonClick = function () {
    dashboardList.clearCurrentDashboard();
    dashboardList.editDashboard();
};
let onNewButtonClick = function () {
    dashboardList.newDashboard();
};
let onCloneButtonClick = function () {
    dashboardList.cloneDashboard();
};

var initialPortalPaletteNode = {
    type: 'PortalLayout',
    defaults: {
        width: '100%',
        height: '100%',
        canResizePortlets: true
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <SplitPane navigationTitle="Selector" showLeftButton="true" showRightButton="false" ID="splitPane" width="100%" height="100%">
        <navigationPane>
            <TabSet ID="selector" height="100%">
                <tabs>
                    <Tab title="Dashboards">
                        <pane>
                            <VLayout ID="selectLayout">
                                <members>
                                    <ListGrid ID="dashboardList" dataSource="dashboards" leaveScrollbarGap="false" canEdit="true" editEvent="none" selectionType="single" sortField="description" autoFetchData="true" canRemoveRecords="true" cellContextMenuConstructor="Menu" cellContextClick={onDashboardListCellContextClick} recordDoubleClick={onDashboardListRecordDoubleClick} clearCurrentDashboard={onDashboardListClearCurrentDashboard} editDashboard={onDashboardListEditDashboard} viewDashboard={onDashboardListViewDashboard} newDashboard={onDashboardListNewDashboard} cloneDashboard={onDashboardListCloneDashboard} showPalette={onDashboardListShowPalette} hidePalette={onDashboardListHidePalette} refreshDashboard={onDashboardListRefreshDashboard} saveDashboard={onDashboardListSaveDashboard} cloneRecord={onDashboardListCloneRecord}>
                                        <fields>
                                            <LGField name="description"/>
                                        </fields>
                                    </ListGrid>
                                    <HLayout defaultLayoutAlign="center" membersMargin="10" ID="selectToolbar" height="30">
                                        <members>
                                            <LayoutSpacer/>
                                            <IButton autoFit="true" title="View" ID="viewButton" click={onViewButtonClick}/>
                                            <IButton autoFit="true" title="Edit" ID="editButton" click={onEditButtonClick}/>
                                            <IButton autoFit="true" title="New" ID="newButton" click={onNewButtonClick}/>
                                            <IButton autoFit="true" title="Clone" ID="cloneButton" click={onCloneButtonClick}/>
                                        </members>
                                    </HLayout>
                                </members>
                            </VLayout>
                        </pane>
                    </Tab>
                    <Tab title="Palette" disabled="true">
                        <pane>
                            <ListPalette ID="listPalette" leaveScrollbarGap="false">
                                <data>
                                    <ListGridRecord title="Animals" type="ListGrid">
                                        <defaults>
                                        	<dataSource>animals</dataSource>
                                        	<autoFetchData>true</autoFetchData>
                                        	<showFilterEditor>true</showFilterEditor>
                                        	<useAllDataSourceFields>true</useAllDataSourceFields>
                                        </defaults>
                                    </ListGridRecord>
                                    <ListGridRecord title="Supply Categories" type="ListGrid">
                                        <defaults>
                                        	<dataSource>supplyCategory</dataSource>
                                        	<autoFetchData>true</autoFetchData>
                                        	<showFilterEditor>true</showFilterEditor>
                                        	<useAllDataSourceFields>true</useAllDataSourceFields>
                                        </defaults>
                                    </ListGridRecord>
                                    <ListGridRecord title="Supply Items" type="ListGrid">
                                        <defaults>
                                        	<dataSource>supplyItem</dataSource>
                                        	<autoFetchData>true</autoFetchData>
                                        	<showFilterEditor>true</showFilterEditor>
                                        	<useAllDataSourceFields>true</useAllDataSourceFields>
                                        </defaults>
                                    </ListGridRecord>
                                </data>
                                <fields>
                                    <LGField name="title" title="Component"/>
                                </fields>
                            </ListPalette>
                        </pane>
                    </Tab>
                </tabs>
            </TabSet>
        </navigationPane>
        <detailPane>
            <VLayout ID="dashboardLayout" width="100%" height="100%">
                <members>
                    <EditPane ID="editPane" visibility="hidden" setInitialPortal={onEditPaneSetInitialPortal} setPortal={onEditPaneSetPortal}>
                        <extraPalettes>
                            <HiddenPalette>
                                <data>
                                    <Object>
                                    	<title>ListGridField</title>
                                    	<type>ListGridField</type>
                                    </Object>
                                </data>
                            </HiddenPalette>
                        </extraPalettes>
                    </EditPane>
                    <HLayout defaultLayoutAlign="center" membersMargin="10" ID="editToolbar" height="30" visibility="hidden">
                        <members>
                            <LayoutSpacer/>
                            <IButton autoFit="true" title="Save" ID="saveButton" click={onSaveButtonClick}/>
                            <IButton autoFit="true" title="Discard changes" ID="discardButton" click={onDiscardButtonClick}/>
                        </members>
                    </HLayout>
                </members>
            </VLayout>
        </detailPane>
    </SplitPane>,
    document.getElementById(target)
);

listPalette.setDefaultEditContext(editPane);
editPane.setDefaultPalette(listPalette);
editPane.setInitialPortal(initialPortalPaletteNode);
