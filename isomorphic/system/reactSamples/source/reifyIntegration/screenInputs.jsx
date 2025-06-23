/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, LGField, ListGrid, Tab, TabSet, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onOrderGridRecordClick = function (viewer, record, rowNum, field, fieldNum, value, rawValue) {
    var screenInput = project.createScreen(project.screens[0].ID, {
        dataContext: { CM_Order: record },
        suppressAutoDraw: true
    });
    var tab = {
        name: record.orderNumber,
        title: 'Order: ' + record.orderNumber + ' by ' + record.customerName,
        canClose: true,
        pane: screenInput
    };
    tabSet.addTab(tab);
    tabSet.selectTab(tab);
};

var project;

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TabSet ID="tabSet" width="900" height="450">
        <tabs>
            <Tab title="Orders" ID="ordersTab" canClose="false">
                <pane>
                    <VLayout ID="vLayout" width="100%">
                        <members>
                            <ListGrid ID="orderGrid" dataSource="CM_Order" selectionType="single" autoFetchData="true" disabled="true" recordClick={onOrderGridRecordClick}>
                                <fields>
                                    <LGField name="customerNumber" width="*"/>
                                    <LGField name="orderNumber" width="150"/>
                                    <LGField name="orderDate" width="150"/>
                                    <LGField name="status" width="100"/>
                                </fields>
                            </ListGrid>
                        </members>
                    </VLayout>
                </pane>
            </Tab>
        </tabs>
    </TabSet>,
    document.getElementById(target)
);

isc.Reify.loadProject('Screen Inputs', function (loadedProject, projects, rpcResponse) {
    CM_OrderLine.createAlias('CM_OrderDetail');
    project = loadedProject;
    orderGrid.enable();
}, {
    userName: 'reifySample',
    password: 'tryReify',
    serverURL: 'https://create.reify.com'
});
