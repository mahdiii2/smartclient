/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, LGField, ListGrid, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onButtonClick = function() {return countryList.startEditingNew()};

var countryData = [
    {
        countryCode: 'US',
        countryName: 'United States',
        population: 298444215
    },
    {
        countryCode: 'CH',
        countryName: 'China',
        population: 1313973713
    },
    {
        countryCode: 'JA',
        countryName: 'Japan',
        population: 127463611
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="10">
        <members>
            <ListGrid ID="countryList" data={countryData} listEndEditAction="next" enterKeyEditAction="nextRowStart" canEdit="true" editEvent="click" autoFitData="vertical" autoFitMaxRecords="6" width="500" autoDraw="false">
                <fields>
                    <LGField name="countryCode" title="Country Code"/>
                    <LGField name="countryName" title="Country Name"/>
                    <LGField name="population" title="Population"/>
                </fields>
            </ListGrid>
            <IButton title="Edit New" ID="button" autoDraw="false" click={onButtonClick}/>
        </members>
    </VStack>,
    document.getElementById(target)
);
