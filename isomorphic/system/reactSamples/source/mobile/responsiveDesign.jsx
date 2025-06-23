/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Tab, TabSet } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

function createSplitPane(deviceMode) {
    var splitPane = isc.SplitPane.create({
        autoDraw: false,
        deviceMode: deviceMode,
        navigationTitle: 'Categories',
        showLeftButton: false,
        showRightButton: false,
        border: '1px solid blue'
    });
    var detailPane = isc.DetailViewer.create({
        dataSource: 'supplyItem',
        autoDraw: false
    });
    var listPane = isc.ListGrid.create({
        dataSource: 'supplyItem',
        autoDraw: false,
        recordClick: function (grid, record, rowNum) {
            detailPane.viewSelectedData(this);
            splitPane.showDetailPane(rowNum + 1 + ' of ' + grid.getTotalRows(), null, 'forward');
        }
    });
    if (deviceMode === 'tablet') {
        listPane.addProperties({
            fields: [
                { name: 'itemName' },
                { name: 'unitCost' },
                { name: 'inStock' }
            ]
        });
    }
    var navigationPane = isc.TreeGrid.create({
        autoDraw: false,
        dataSource: 'supplyCategory',
        autoFetchData: true,
        showHeader: deviceMode == 'desktop',
        nodeClick: function (grid, record) {
            listPane.fetchRelatedData(record, this);
            splitPane.showListPane(record.categoryName, null, 'forward');
        }
    });
    splitPane.setDetailPane(detailPane);
    splitPane.setNavigationPane(navigationPane);
    splitPane.setListPane(listPane);
    var flipButton = isc.IButton.create({
        autoFit: true,
        getTitle: function () {
            return 'Flip (' + splitPane.getPageOrientation() + ')';
        },
        click: function () {
            var newOrientation = splitPane.getPageOrientation() == 'landscape' ? 'portrait' : 'landscape';
            splitPane.setPageOrientation(newOrientation);
            splitPane.updateUI();
            this.markForRedraw();
        }
    });
    var container = isc.VLayout.create({
        layoutMargin: 10,
        membersMargin: 2,
        members: [
            flipButton,
            splitPane
        ]
    });
    return container;
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TabSet width="100%" height="100%">
        <tabs>
            <Tab title="desktop" pane={createSplitPane('desktop')}/>
            <Tab title="tablet" pane={createSplitPane('tablet')}/>
            <Tab title="handset" pane={createSplitPane('handset')}/>
        </tabs>
    </TabSet>,
    document.getElementById(target)
);
