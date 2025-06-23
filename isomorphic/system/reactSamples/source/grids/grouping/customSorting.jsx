import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let countGroupLeaves = function (record) {
    var count = 0, children = record.groupMembers;
    for (var i = 0; i < children.length; i++) {
        if (this.isGroupNode(children[i])) {
            count += this.countGroupLeaves(children[i]);
        } else {
            count++;
        }
    }
    return count;
}

let buttonClick = function() {
    var newDirection;
    if (companyList.groupSortDirection == "ascending") {
        newDirection = "descending";
        this.setTitle("Sort Descending");
    } else {
        newDirection = "ascending";
        this.setTitle("Sort Ascending");
    }
    companyList.setProperty("groupSortDirection", newDirection);
    companyList.setSort();
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="companyList" width="600" height="525" alternateRecordStyles="true" autoFetchData="true"
                    dataSource="orderItemLocalDS" canEdit="true" editEvent="click" showAllRecords="true"
                    groupByField={["category", "shipDate"]} groupStartOpen="all" canMultiGroup="true"
                    sortByGroupFirst="true" groupSortDirection="ascending"
                    countGroupLeaves={countGroupLeaves}
                    groupSortNormalizer={function (record, fieldName, grid) {
                                            if (grid.isGroupNode(record) && record.groupName == fieldName) {
                                                return grid.countGroupLeaves(record);
                                            }
                                            return null
                                        }}>
            <fields>
                <LGField name="orderID" includeInRecordSummary="false"/>
                <LGField name="itemDescription" width="120"/>
                <LGField name="category" width="80"/>
                <LGField name="shipDate" width="100"/>
                <LGField name="quantity"/>
                <LGField name="unitPrice"/>
                <LGField name="total" title="Total" align="right" width="80" type="summary"
                        recordSummaryFunction="multiplier" formatCellValue={function (value) {
                                                                                if (isc.isA.Number(value)) {
                                                                                    return isc.NumberUtil.format(value, "$#,##0.00");
                                                                                }
                                                                                return value;
                                                                            }}/>
            </fields>
        </ListGrid>
    
        <Button top="550" width="150" title="Sort Descending" click={buttonClick}/>
    </>, 
    document.getElementById(target)
);
