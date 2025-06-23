
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, VStack, LayoutSpacer, ListGrid, LGField, Img, DynamicForm, FormItem, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onArrowImgClick = function () {
        var selectedEmployeeRecords = employeesGrid.getSelectedRecords();  
        teamMembersGrid.transferSelectedData(employeesGrid);
        mockRemoveEmployees(selectedEmployeeRecords);
    };
let onTeamIdDataArrived = function (startRow, endRow, data) {
             if (this.getValue() == null && startRow == 0 && endRow > 0) {
                 var record = data.get(0),
                     value;
                 if (record == null || record === isc.ResultSet.getLoadingMarker()) {
                     value = null;
                 } else {
                     value = record[this.getValueFieldName()];
                 }
                 this.setValue(value);
                 this.splitEmployeesByTeam();
             }
         };
let onTeamIdSplitEmployeesByTeam = function () {
             var criteria = teamSelectionForm.getValuesAsCriteria();
             teamMembersGrid.fetchData(criteria);
             var dsRequest = {
                 ID: "dsRequestID",
                 operationType: "fetch",
                 operationId: "fetchEmployeesNotInTeam"
             };
             employeesGrid.fetchData(criteria, null, dsRequest);
         };
let onTeamMembersGridRecordDrop = function (dropRecords, targetRecord, index, sourceWidget) {
        mockRemoveEmployees(dropRecords);
        return this.Super("recordDrop", arguments);
    };
let onTeamMembersGridRemoveRecordClick = function (rowNum) {
        var record = this.getRecord(rowNum);
        this.removeData(record, function (dsResponse, data, dsRequest) {
            // Update `employeesGrid` now that an employee has been removed from
            // the selected team.  This will add the employee back to `employeesGrid`,
            // the list of employees who are not in the team.
            mockAddEmployeesFromTeamMemberRecords(record);
        });
    };


// To remove entries of `employeesGrid` without deleting the corresponding rows from  
// the database, we can mock a "remove" DSResponse and post it to `employeesDS` via  
// DataSource#updateCaches().  All grids that are bound to the data source respond to  
// these events as appropriate.  In this case, posting a "remove" DSResponse will cause  
// employeesGrid` to remove the records from its list.
function mockRemoveEmployees (employeeRecords) {
    if (employeeRecords.length == 0) {  
        return;
    }
    var dsRequest = {
        ID: "mockRemoveResponse",
        operationType: "remove",
        data: employeeRecords
    }
    employeesByTeam.updateCaches(dsRequest);
}

function mockAddEmployeesFromTeamMemberRecords(teamMemberRecord) {
    var mockEmployeeRecord = teamMemberRecord;
    mockEmployeeRecord.Name = teamMemberRecord.EmployeeName;  
    mockEmployeeRecord.Job = teamMemberRecord.EmployeeJob;  

    var dsRequest = {
        ID: "mockAddResponse",
        operationType: "add",
        data: mockEmployeeRecord
    }
    employeesByTeam.updateCaches(dsRequest);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <HStack ID="hStack" height="160">
            <members>
                <VStack ID="vStack">
                    <members>
                        <LayoutSpacer height="30" ID="spacer"/>
                        <ListGrid ID="employeesGrid" dataSource="employeesByTeam" sortField="EmployeeId" canDragRecordsOut="true" dragDataAction="none" autoFetchData="false" width="300" height="224" dragType="nonTeamMemberEmployee">
                            <fields>
                                <LGField name="EmployeeId" title="ID" width="50"/>
                                <LGField name="Name" title="Employee Name"/>
                            </fields>
                        </ListGrid>
                    </members>
                </VStack>
                <Img src="[SAMPLE]icons/32/arrow_right.png" title="arrowImg" width="32" height="32" ID="arrowImg" layoutAlign="center" click={onArrowImgClick}/>
                <VStack ID="vStack2">
                    <members>
                        <DynamicForm ID="teamSelectionForm" width="300" height="30">
                            <fields>
                                <SelectItem optionDataSource="teams" valueField="TeamId" displayField="TeamName" type="select" name="TeamId" title="Team" changed="item.splitEmployeesByTeam()" dataArrived={onTeamIdDataArrived} splitEmployeesByTeam={onTeamIdSplitEmployeesByTeam}/>
                            </fields>
                        </DynamicForm>
                        <ListGrid ID="teamMembersGrid" dataSource="teamMembers2" sortField="EmployeeId" canAcceptDroppedRecords="true" autoFetchData="false" canRemoveRecords="true" width="350" height="264" recordDrop={onTeamMembersGridRecordDrop} removeRecordClick={onTeamMembersGridRemoveRecordClick}>
                            <fields>
                                <LGField name="EmployeeId" title="EID" width="20%"/>
                                <LGField name="EmployeeName" title="Employee Name" width="40%"/>
                                <LGField name="TeamName" title="Team Name"/>
                            </fields>
                            <dropTypes>
                                <value>nonTeamMemberEmployee</value>
                            </dropTypes>
                        </ListGrid>
                    </members>
                </VStack>
            </members>
        </HStack>

    </>,
    document.getElementById(target)
);
