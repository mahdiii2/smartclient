/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onListGridRecordDrop = function (draggedRecords, targetRecord, targetIndex, sourceWidget) {
    if (this == sourceWidget && draggedRecords.getLength() > 0) {
        draggedRecords.sort(function (lhs, rhs) {
            return lhs.userOrder - rhs.userOrder;
        });
        var data = this.data;
        var draggedIndices = draggedRecords.map(function (draggedRecord) {
            return data.findIndex('EmployeeId', draggedRecord.EmployeeId);
        });
        var minIndex = Math.min(draggedIndices.min(), targetIndex);
        var maxIndex = Math.max(draggedIndices.max(), targetIndex - 1);
        isc.RPCManager.startQueue();
        var ds = isc.DS.get(this.dataSource);
        var request = {
            operation: this.updateOperation,
            application: this.application,
            oldValues: {}
        };
        var deque = isc.Deque.create();
        var prevUserOrder = -1;
        if (minIndex > 0) {
            var record = data.get(minIndex - 1);
            prevUserOrder = record.userOrder;
        }
        var updateUserOrders = function (minIndex, targetIndex, draggedIndices) {
            var i;
            for (i = minIndex; i < targetIndex; ++i) {
                var record = data.get(i);
                deque.pushBack(record.userOrder);
                if (!draggedIndices.contains(i)) {
                    var newUserOrder = Math.max(deque.popFront(), prevUserOrder + 1);
                    var updates = {
                        EmployeeId: record.EmployeeId,
                        userOrder: newUserOrder
                    };
                    request.oldValues.userOrder = record.userOrder;
                    record.userOrder = updates.userOrder;
                    prevUserOrder = newUserOrder;
                    ds.updateData(updates, null, request);
                }
            }
            var numDraggedRecordsBeforeTargetIndex = deque.getLength();
            for (var j = 0; !deque.isEmpty(); ++j) {
                var record = data.get(draggedIndices[j]);
                var newUserOrder = Math.max(deque.popFront(), prevUserOrder + 1);
                var updates = {
                    EmployeeId: record.EmployeeId,
                    userOrder: newUserOrder
                };
                request.oldValues.userOrder = record.userOrder;
                record.userOrder = updates.userOrder;
                prevUserOrder = newUserOrder;
                ds.updateData(updates, null, request);
            }
        };
        updateUserOrders(minIndex, targetIndex, draggedIndices);
        var nonDraggedIndices = new Array();
        for (var i = targetIndex; i <= maxIndex; ++i) {
            if (!draggedIndices.contains(i)) {
                nonDraggedIndices.push(i);
            }
        }
        updateUserOrders(targetIndex, maxIndex + 1, nonDraggedIndices);
        isc.RPCManager.sendQueue();
    }
    this.Super('recordDrop', arguments);
};

const Deque = SC.defineClass('Deque');
isc.Deque.addProperties({
    store: [],
    isEmpty: function () {
        return this.store.length == 0;
    },
    getLength: function () {
        return this.store.length;
    },
    pushFront: function (element) {
        this.store.push(element);
    },
    popFront: function () {
        return this.store.pop();
    },
    pushBack: function (element) {
        this.store.unshift(element);
    },
    popBack: function () {
        return this.store.shift();
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid dataSource="employees" autoSaveEdits="true" canEdit="true" canSort="false" sortField="userOrder" canReorderRecords="true" canGroupBy="false" autoFetchData="true" width="100%" height="400" recordDrop={onListGridRecordDrop}/>,
    document.getElementById(target)
);
