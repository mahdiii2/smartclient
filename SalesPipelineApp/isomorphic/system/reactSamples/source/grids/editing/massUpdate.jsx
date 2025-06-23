/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onEditNewClick = function() {return countryList.startEditingNew()};
let onSaveClick = function() {return countryList.saveAllEdits()};
let onDiscardClick = function() {return countryList.discardAllEdits()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="countryList" dataSource="countryDS" autoSaveEdits="false" listEndEditAction="next" canEdit="true" editEvent="click" autoFetchData="true" width="550" height="224">
            <fields>
                <LGField name="countryName"/>
                <LGField name="continent"/>
                <LGField name="member_g8"/>
                <LGField name="population"/>
                <LGField name="independence"/>
            </fields>
        </ListGrid>

        <IButton title="Edit New" top="250" click={onEditNewClick}/>

        <IButton title="Save" left="140" top="250" click={onSaveClick}/>

        <IButton title="Discard" left="280" top="250" click={onDiscardClick}/>
    </>,
    document.getElementById(target)
);
