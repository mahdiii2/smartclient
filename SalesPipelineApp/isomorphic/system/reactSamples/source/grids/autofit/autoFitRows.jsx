import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" width="500" top="50" alternateRecordStyles="true" data={countryData}
                    autoFitData="vertical" leaveScrollbarGap="false">
            <fields>
                <LGField name="countryCode" title="Flag" width="60" type="image" imageURLPrefix="flags/24/"
                        imageURLSuffix=".png" autoFitData="vertical" leaveScrollbarGap="false"/>
                <LGField name="countryName" title="Country"/>
                <LGField name="capital" title="Capital"/>
                <LGField name="continent" title="Continent"/>
            </fields>
        </ListGrid>
    
        <IButton width="150" title="Data set: 5 records" click="countryList.setData(countryData.getRange(0,5))"/>
        <IButton left="170" width="150" title="Data set: 10 records" click="countryList.setData(countryData.getRange(0,10))"/>
        <IButton left="340" width="150" title="Data set: 15 records" click="countryList.setData(countryData)"/>
        
    </>, 
    document.getElementById(target)
);
