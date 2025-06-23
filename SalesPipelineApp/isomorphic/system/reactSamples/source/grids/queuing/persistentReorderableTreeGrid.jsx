/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TGField, TreeGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onTreeGridFolderDrop = function (draggedNodes, folder, targetIndex, sourceWidget) {
    var draggedNodes_length = draggedNodes.getLength();
    if (this == sourceWidget && draggedNodes_length > 0) {
        var folderChildren = folder.children;
        isc.RPCManager.startQueue();
        var ds = isc.DS.get(this.dataSource);
        var request = {
            operation: this.updateOperation,
            application: this.application,
            oldValues: {}
        };
        var numDraggedNodesBeforeTargetIndex = 0;
        for (var ri = draggedNodes_length; ri > 0; --ri) {
            var draggedNode = draggedNodes.get(ri - 1);
            var pos = folderChildren.findIndex('EmployeeId', draggedNode.EmployeeId);
            if (pos >= 0) {
                folderChildren.removeAt(pos);
                if (pos < targetIndex) {
                    numDraggedNodesBeforeTargetIndex++;
                }
                folderChildren.addAt(draggedNode, targetIndex - numDraggedNodesBeforeTargetIndex);
            }
        }
        var numDraggedNodesNotInTargetFolder = 0;
        for (var ri = 0; ri < draggedNodes_length; ri++) {
            var draggedNode = draggedNodes.get(ri);
            var pos = folderChildren.findIndex('EmployeeId', draggedNode.EmployeeId);
            if (pos == -1) {
                draggedNode.userOrder = targetIndex + ri - numDraggedNodesBeforeTargetIndex;
                numDraggedNodesNotInTargetFolder++;
            }
        }
        var folderChildren_length = folderChildren.getLength();
        for (var i = 0; i < folderChildren_length; ++i) {
            var node = folderChildren.get(i);
            var updates = {
                EmployeeId: node.EmployeeId,
                ReportsTo: folder.EmployeeId,
                userOrder: i < targetIndex ? i : i + numDraggedNodesNotInTargetFolder
            };
            request.oldValues.ReportsTo = node.ReportsTo;
            request.oldValues.userOrder = node.userOrder;
            node.ReportsTo = folder.EmployeeId;
            node.userOrder = i < targetIndex ? i : i + numDraggedNodesNotInTargetFolder;
            ds.updateData(updates, null, request);
        }
        isc.RPCManager.sendQueue();
    }
    this.Super('folderDrop', arguments);
};
let onNameFormatCellValue = function (value, record) {
    return value + '&nbsp;-&nbsp;' + record.Job;
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TreeGrid dataSource="employees" nodeIcon="[SAMPLE]icons/16/person.png" folderIcon="[SAMPLE]icons/16/person.png" dropIconSuffix="into" closedIconSuffix="" canReparentNodes="true" showOpenIcons="false" showDropIcons="true" autoSaveEdits="true" canEdit="true" canSort="false" sortField="userOrder" canDragRecordsOut="true" canAcceptDroppedRecords="true" canReorderRecords="true" dragDataAction="move" autoFetchData="true" width="430" height="400" folderDrop={onTreeGridFolderDrop}>
        <fields>
            <TGField name="EmployeeId" title="ID" width="15%"/>
            <TGField name="Name" treeField="true" formatCellValue={onNameFormatCellValue}/>
        </fields>
    </TreeGrid>,
    document.getElementById(target)
);
