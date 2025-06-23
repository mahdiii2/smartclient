/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, IButton, LGField, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onButtonRemoveFirstClick = function() {return countryList.removeData(countryList.data.get(0))};
let onButtonRemoverFirstSelClick = function () {
    if (countryList.getSelectedRecord()) {
        countryList.removeData(countryList.getSelectedRecord());
    }
};
let onButtonRemoveAllSelClick = function () {
    if (countryList.getSelection().getLength() > 0) {
        countryList.getSelection().map(function (item) {
            countryList.removeData(item);
        });
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="15">
        <members>
            <ListGrid ID="countryList" dataSource="worldDS" dataPageSize="50" sortField="1" autoFetchData="true" width="500" height="224" autoDraw="false">
                <fields>
                    <LGField name="countryCode"/>
                    <LGField name="countryName"/>
                    <LGField name="capital"/>
                    <LGField name="continent"/>
                </fields>
            </ListGrid>
            <HStack membersMargin="20" ID="hStackButtons" autoDraw="false">
                <members>
                    <IButton title="Remove first" ID="buttonRemoveFirst" width="140" autoDraw="false" click={onButtonRemoveFirstClick}/>
                    <IButton autoFit="true" title="Remove first selected" ID="buttonRemoverFirstSel" minWidth="140" autoDraw="false" click={onButtonRemoverFirstSelClick}/>
                    <IButton title="Remove all selected" ID="buttonRemoveAllSel" width="140" autoDraw="false" click={onButtonRemoveAllSelClick}/>
                </members>
            </HStack>
        </members>
    </VLayout>,
    document.getElementById(target)
);
