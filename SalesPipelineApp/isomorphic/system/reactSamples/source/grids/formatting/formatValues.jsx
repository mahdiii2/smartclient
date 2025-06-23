import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let formatCellValue = function (value) {
    if (isc.isA.Date(value)) {
        return (new Date().getYear() - value.getYear()) + " years ago";
    }
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" width="500" height="224" alternateRecordStyles="true" data={countryData}>
            <fields>
                <LGField name="countryCode" title="Flag" width="60" type="image" imageURLPrefix="flags/24/" imageURLSuffix=".png" />
                <LGField name="countryName" title="Country"/>
                <LGField name="independence" title="Nationhood" type="date" width="25%" formatCellValue={formatCellValue}/>
                <LGField name="area" title="Area" type="number" formatCellValue="isc.NumberUtil.format(value, ',0') + ' km&sup2;'"/>
            </fields>
        </ListGrid>
       
    </>,
    document.getElementById(target)
);
