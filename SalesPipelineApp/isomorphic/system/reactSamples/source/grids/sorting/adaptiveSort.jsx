import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, BooleanItem, Label, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// ---------------------------------------------------------------------------------------
// The code that follows is just to illustrate when SmartClient has needed to contact the
// server. It is not part of the example.
var origBGColor,
    restoreBGColorTimerID;
supplyItem.addProperties({
    transformResponse: function () {
        serverCount.increment();
        // Flash the label
        if (restoreBGColorTimerID == null) origBGColor = serverCount.backgroundColor;
        else isc.Timer.clear(restoreBGColorTimerID);
        serverCount.setBackgroundColor("#ffff77");
        restoreBGColorTimerID = isc.Timer.setTimeout(function () {
            restoreBGColorTimerID = null;
            serverCount.setBackgroundColor(origBGColor);
        }, 500);
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="supplyList" width="500" height="300" alternateRecordStyles="true" dataSource="supplyItem" 
                    autoFetchData="true" dataPageSize="20">
            <fields>
                <LGField name="SKU" />   
                <LGField name="itemName" />   
                <LGField name="description" />   
                <LGField name="category" />   
            </fields>
        </ListGrid>   
    
        <DynamicForm ID="sortForm" width="300" top="310">
            <fields>
                <BooleanItem name="restrict" title="Limit to Dictionaries"
                            changed={ function () {
                                        var criteria = null;
                                        if (this.getValue() == true) {
                                            criteria = {category: "Dictionaries"};
                                        }
                                        supplyList.fetchData(criteria);
                                    }}/>
            </fields>        
        </DynamicForm>
    
        <Label ID="serverCount" top="350" padding="10" width="500" height="30" border="1px solid black" 
                    contents="<b>Number of server trips: 0</b>"
                    count="0" increment={ function () {
                                            this.count++;
                                            this.setContents("<b>Number of server trips: " + this.count + "</b>");
                                        }}/>
        

    </>, 
    document.getElementById(target)
);


