/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFilterCountry_UnitedClick = function() {return countryList.filterData({countryName:'United'})};
let onFilterCapital_PortClick = function() {return countryList.filterData({capital:'port'})};
let onClearFilterClick = function() {return countryList.clearCriteria()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" dataSource="worldDS" dataPageSize="50" sortField="1" autoFetchData="true" width="500" height="224">
            <fields>
                <LGField name="countryCode"/>
                <LGField name="countryName"/>
                <LGField name="capital"/>
                <LGField name="continent"/>
            </fields>
        </ListGrid>

        <IButton title="Filter Country: united" width="150" left="0" top="240" click={onFilterCountry_UnitedClick}/>

        <IButton title="Filter Capital: port" width="150" left="170" top="240" click={onFilterCapital_PortClick}/>

        <IButton title="Clear filter" width="150" left="340" top="240" click={onClearFilterClick}/>
    </>,
    document.getElementById(target)
);
