import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let getGridSummary = function (records, summaryField) {
    var seenCategories = {};
    for (var i = 0; i < records.length; i++) {
        seenCategories[records[i].category] = true;
    }
    var totalCategories = isc.getKeys(seenCategories).length;
    return totalCategories + " Categories";
}

let summaryFunction = function (records, summaryField) {
    var seenCategories = {};
    for (var i = 0; i < records.length; i++) {
        seenCategories[records[i].category] = true;
    }
    var totalCategories = isc.getKeys(seenCategories).length;
    return totalCategories + " Categories"; 
}

let shipDateSummaryFunction = [
    function (records, summaryField) {
        var firstOrder = null;  
        for (var i = 0; i < records.length; i++) {  
            var record = records[i],
                shipDate = record["shipDate"];  
            if (firstOrder == null || shipDate < firstOrder) {  
                firstOrder = shipDate;  
            }  
        }  
        return "First Order " + isc.DateUtil.format(firstOrder, 'MMM d, yyyy'); ; 
    },
    function (records, summaryField) {
        var lastOrder = null;  
        for (var i = 0; i < records.length; i++) {  
            var record = records[i],
                shipDate = record["shipDate"];  
            if (lastOrder == null || shipDate > lastOrder) {  
                lastOrder = shipDate;  
            }  
        }  
        return "Last Order " + isc.DateUtil.format(lastOrder, 'MMM d, yyyy'); 
    }
]

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="companyList" width="680" height="520" alternateRecordStyles="true" autoFetchData="true"
                    dataSource="orderItemLocalDS" showAllRecords="true" groupByField="category"
                    groupStartOpen="all" canEdit="true" showGridSummary="true" showGroupSummary="true">
            <fields>
                <LGField name="orderID" includeInRecordSummary="false" summaryFunction="count"/>
                <LGField name="itemDescription"/>
                <LGField name="category" showGridSummary="true" width="100"
                            getGridSummary={getGridSummary} summaryFunction={summaryFunction}/>
                <LGField name="shipDate" width="170" showGroupSummary="true" showGridSummary="false"
                            summaryFunction={shipDateSummaryFunction}/>
                <LGField name="quantity" showGroupSummary="false" showGridSummary="false"/>
                <LGField name="unitPrice" showGroupSummary="false" showGridSummary="false" format="&#x00A4;,0.00"/>
                <LGField name="Total" type="summary" recordSummaryFunction="multiplier"
                            summaryFunction="sum" showGroupSummary="true" showGridSummary="true"
                            align="right" format="&#x00A4;,0.00"/>
            </fields>
        </ListGrid>

    </>, 
    document.getElementById(target)
);
