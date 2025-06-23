/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DetailViewer, DynamicForm, LGField, Label, ListGrid, SectionStack, SectionStackSection, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFindOrdersFormFindOrders = function () {
    sectionStack.draw();
    isc.RPCManager.startQueue();
    userDetailViewer.fetchData(findOrdersForm);
    ordersListGrid.fetchData(findOrdersForm);
    isc.RPCManager.sendQueue();
};
let onFindOrdersClick = function(form,item) {return findOrdersForm.findOrders()};
let onServerCountIncrementAndUpdate = function (requests) {
    this.count++;
    this.setContents('<b>Number of server trips: ' + this.count + '<br>Last queue contained ' + requests.length + ' request(s)</b>');
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm ID="findOrdersForm" width="450" findOrders={onFindOrdersFormFindOrders}>
            <fields>
                <TextItem defaultValue="1" name="userID" title="User ID" width="50" hint="Note:&amp;nbsp;sample&amp;nbsp;data&amp;nbsp;only exists for user ID 1"/>
                <ButtonItem title="Find Orders" click={onFindOrdersClick}/>
            </fields>
        </DynamicForm>

        <SectionStack visibilityMode="multiple" ID="sectionStack" width="400" height="300" top="100" autoDraw="false">
            <sections>
                <SectionStackSection title="User Details" expanded="true">
                    <items>
                        <DetailViewer ID="userDetailViewer" dataSource="queuing_userHB" useAllDataSourceFields="true" autoDraw="false"/>
                    </items>
                </SectionStackSection>
                <SectionStackSection title="Orders" expanded="true">
                    <items>
                        <ListGrid ID="ordersListGrid" dataSource="queuing_order" dataPageSize="10" drawAheadRatio="1" showFilterEditor="true" autoDraw="false" drawAllMaxCells="0">
                            <fields>
                                <LGField name="orderID" width="80"/>
                                <LGField name="customerName" width="110"/>
                                <LGField name="orderDate" width="100"/>
                                <LGField name="totalValue"/>
                            </fields>
                        </ListGrid>
                    </items>
                </SectionStackSection>
            </sections>
        </SectionStack>

        <Label contents="&lt;b&gt;Number of server trips: 0&lt;br&gt;No queues sent&lt;/b&gt;" padding="10" title="serverCount" ID="serverCount" width="300" height="40" left="420" top="100" border="1px solid grey" count="0" incrementAndUpdate={onServerCountIncrementAndUpdate}/>
    </>,
    document.getElementById(target)
);

var origBGColor, restoreBGColorTimerID;
isc.RPCManager.addClassProperties({
    queueSent: function (requests) {
        if (serverCount && !serverCount.destroyed)
            this.updateServerContactLabel(requests);
    },
    updateServerContactLabel: function (requests) {
        serverCount.incrementAndUpdate(requests);
        if (restoreBGColorTimerID == null)
            origBGColor = serverCount.backgroundColor;
        else
            isc.Timer.clear(restoreBGColorTimerID);
        serverCount.setBackgroundColor('#ffff77');
        restoreBGColorTimerID = isc.Timer.setTimeout(function () {
            restoreBGColorTimerID = null;
            if (serverCount && !serverCount.destroyed)
                serverCount.setBackgroundColor(origBGColor);
        }, 500);
    }
});
