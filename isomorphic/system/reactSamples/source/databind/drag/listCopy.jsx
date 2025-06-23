/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, HStack, Img, LGField, Label, LayoutSpacer, ListGrid, SelectItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onImgClick = function() {return projectList.transferSelectedData(employeesList)};
let onProjectCodeChanged = function () {
    var crit = this.form.getValuesAsCriteria();
    projectList.fetchData(crit);
};
let onServerCountIncrementAndUpdate = function (requests) {
    this.count++;
    this.setContents('<b>Number of server trips: ' + this.count + '<br>Last queue contained ' + requests.length + ' request(s)</b>');
};

var projects = [
    'New Costing System',
    'Warehousing Improvements',
    'Evaluate AJAX Frameworks',
    'Upgrade Postgres',
    'Online Billing'
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HStack membersMargin="10" height="160">
            <members>
                <VStack>
                    <members>
                        <LayoutSpacer height="36"/>
                        <ListGrid ID="employeesList" dataSource="employees" canDragRecordsOut="true" dragDataAction="copy" autoFetchData="false" width="320" height="264">
                            <fields>
                                <LGField name="EmployeeId" width="35%"/>
                                <LGField name="Name"/>
                            </fields>
                        </ListGrid>
                    </members>
                </VStack>
                <Img src="[SAMPLE]icons/32/arrow_right.png" width="32" height="32" layoutAlign="center" click={onImgClick}/>
                <VStack>
                    <members>
                        <DynamicForm width="300" height="30">
                            <fields>
                                <SelectItem valueMap={projects} name="projectCode" ID="projectSelector" title="Team for Project" defaultValue={projects[0]} wrapTitle="false" changed={onProjectCodeChanged}/>
                            </fields>
                        </DynamicForm>
                        <ListGrid ID="projectList" dataSource="teamMembers" leaveScrollbarGap="false" canAcceptDroppedRecords="true" autoFetchData="false" canRemoveRecords="true" width="400" height="264" preventDuplicates="true">
                            <fields>
                                <LGField name="employeeId" width="30%"/>
                                <LGField name="employeeName" width="35%"/>
                                <LGField name="projectCode"/>
                            </fields>
                        </ListGrid>
                    </members>
                </VStack>
            </members>
        </HStack>

        <Label contents="&lt;b&gt;Number of server trips: 0&lt;br&gt;No queues sent&lt;/b&gt;" padding="10" title="serverCount" ID="serverCount" width="260" height="40" left="220" top="315" border="1px solid grey" count="0" incrementAndUpdate={onServerCountIncrementAndUpdate}/>
    </>,
    document.getElementById(target)
);

employeesList.fetchData();
projectSelector.changed();
var origBGColor, restoreBGColorTimerID;
isc.RPCManager.addClassProperties({
    queueSent: function (requests) {
        if (window.serverCount && !serverCount.destroyed)
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
