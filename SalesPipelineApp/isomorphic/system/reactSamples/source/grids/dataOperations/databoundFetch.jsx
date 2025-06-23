/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, IButton, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFetchUSClick = function() {return countryList.fetchData({countryCode:'US'})};
let onFetchEuropeClick = function() {return countryList.fetchData({continent:'Europe'})};
let onFetchAllClick = function() {return countryList.fetchData()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" dataSource="worldDS" dataPageSize="50" drawAheadRatio="4" sortField="1" width="500" height="224">
            <fields>
                <LGField name="countryCode"/>
                <LGField name="countryName"/>
                <LGField name="capital"/>
                <LGField name="continent"/>
            </fields>
        </ListGrid>

        <HStack membersMargin="20" width="100%" top="240">
            <members>
                <IButton title="Fetch Code: US" ID="fetchUS" width="140" click={onFetchUSClick}/>
                <IButton autoFit="true" title="Fetch Continent: Europe" ID="fetchEurope" minWidth="140" click={onFetchEuropeClick}/>
                <IButton title="Fetch All" ID="fetchAll" width="140" click={onFetchAllClick}/>
            </members>
        </HStack>
    </>,
    document.getElementById(target)
);
