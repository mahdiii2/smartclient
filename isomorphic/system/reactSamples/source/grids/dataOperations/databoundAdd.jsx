/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onAddNewCountryClick = function () {
    countryList.addData({
        countryCode: 'A' + this.nextNum,
        countryName: 'Country ' + this.nextNum,
        capital: 'Capital ' + this.nextNum
    });
    this.nextNum++;
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" dataSource="worldDS" dataPageSize="50" emptyCellValue="--" sortField="0" autoFetchData="true" width="500" height="224">
            <fields>
                <LGField name="countryCode"/>
                <LGField name="countryName"/>
                <LGField name="capital"/>
                <LGField name="continent"/>
            </fields>
        </ListGrid>

        <IButton title="Add new country" width="150" left="0" top="240" nextNum="1" click={onAddNewCountryClick}/>
    </>,
    document.getElementById(target)
);
