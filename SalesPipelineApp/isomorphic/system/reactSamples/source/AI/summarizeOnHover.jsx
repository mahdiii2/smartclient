/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Criterion, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onListGridCellHover = function (record, rowNum, colNum) {
    if (this.cellValueIsClipped(rowNum, colNum))
        return;
    var field = this.getField(colNum);
    if (field && field.aiHoverRequest)
        return;
    return false;
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid dataSource="worldDS" canHover="true" showHover="true" autoFetchData="true" width="100%" height="100%" dataFetchMode="local" showClippedValuesOnHover="true" cellHover={onListGridCellHover}>
        <implicitCriteria operator="and">
            <criteria>
                <Criterion fieldName="continent" operator="equals" value="Asia"/>
                <Criterion fieldName="population" operator="greaterThan" value="25000000"/>
            </criteria>
        </implicitCriteria>
        <fields>
            <LGField name="countryCode" width="70"/>
            <LGField name="countryName" width="235" showHover="true">
                <aiHoverRequest>
                	<prompt>a 2-4 sentence demographic and economic description of the country</prompt>
                	<includeRecord>false</includeRecord>
                </aiHoverRequest>
            </LGField>
            <LGField name="independence" width="125"/>
            <LGField name="population" width="125"/>
            <LGField name="gdp" width="125"/>
        </fields>
    </ListGrid>,
    document.getElementById(target)
);
