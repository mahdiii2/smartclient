/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onNewButtonClick = function() {return worldList.startEditingNew();};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="worldList" dataSource="worldDS" showFilterEditor="true" canEdit="true" editEvent="click" autoFetchData="true" canRemoveRecords="true" width="850" height="224">
            <fields>
                <LGField name="countryCode" title="Code" width="50"/>
                <LGField name="countryName" title="Country"/>
                <LGField name="capital" title="Capital"/>
                <LGField name="government" title="Government" width="95"/>
                <LGField name="continent" title="Continent"/>
                <LGField name="independence" title="Nationhood"/>
                <LGField name="area" title="Area (km&amp;sup2;)"/>
                <LGField name="population" title="Population" width="100"/>
                <LGField name="gdp" title="GDP ($M)" width="85"/>
            </fields>
        </ListGrid>

        <Button title="Add New" ID="newButton" top="230" click={onNewButtonClick}/>
    </>,
    document.getElementById(target)
);
