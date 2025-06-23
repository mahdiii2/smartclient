/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

function createSplitPane() {
    var detailPane = isc.DetailViewer.create({
        dataSource: 'supplyItem',
        autoDraw: false
    });
    var listPane = isc.ListGrid.create({
        autoDraw: false,
        dataSource: 'supplyItem'
    });
    if (isc.Browser.isTablet) {
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
        showHeader: isc.Browser.isDesktop,
        selectionUpdated: function () {
            this.splitPane.setDetailTitle(null);
            detailPane.setData([]);
        }
    });
    var splitPane = isc.SplitPane.create({
        autoDraw: false,
        navigationTitle: 'Categories',
        showLeftButton: false,
        showRightButton: false,
        border: '1px solid blue',
        detailPane: detailPane,
        listPane: listPane,
        navigationPane: navigationPane,
        listPaneTitleTemplate: '${record.categoryName}',
        detailPaneTitleTemplate: '${index + 1} of ${totalRows}'
    });
    return splitPane;
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout members={[createSplitPane()]} width="100%" height="100%"/>,
    document.getElementById(target)
);
