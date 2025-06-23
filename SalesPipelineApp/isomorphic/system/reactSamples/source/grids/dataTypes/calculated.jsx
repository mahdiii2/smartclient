import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let formatCellValue = function (value, record) {
    if (!isc.isA.Number(record.gdp) || !isc.isA.Number(record.population)) return "N/A";
    var gdpPerCapita = Math.round(record.gdp*1000000000/record.population);
    return isc.NumberUtil.format(gdpPerCapita, "\u00A4,0");
}

let editorExit = function (event, record, newValue, rowNum, colNum) {
    var fieldName = this.getFieldName(colNum);
    if (fieldName == 'gdp' || fieldName == 'population') {
        this.refreshCell(rowNum, this.getFieldNum('gdp_percap'), false, true);
    }
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" width="575" height="224" alternateRecordStyles="true" canEdit="true" editEvent="click"
                    modalEditing="true" saveByCell="true" data={countryData}
                    editorExit={editorExit}>
            <fields>
                <LGField name="countryCode" title="Flag" width="60" type="image" imageURLPrefix="flags/24/" imageURLSuffix=".png" canEdit="false"/>
                <LGField name="countryName" title="Country"/>
                <LGField name="population" title="Population" type="integer" format=",0"/>
                <LGField name="gdp" title="GDP ($B)" type="float" format=",0.0"/>
                <LGField name="gdp_percap" title="GDP (per capita)" canEdit="false" align="right"
                        formatCellValue={formatCellValue} sortNormalizer={ function (record) { return record.gdp/record.population; } }/>
            </fields>
        </ListGrid>

    </>, 
    document.getElementById(target)
);
