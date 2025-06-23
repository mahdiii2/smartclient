/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, DSField, DataSource, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onAddContactClick = function () {
    phoneContactsList.startEditingNew();
};

var phoneContactsData = [{
        firstName: 'Jenny',
        lastName: 'Burns',
        mobile: '5558675309'
    }];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="phoneContacts" title="phoneContacts" clientOnly="true" testData={phoneContactsData}>
            <fields>
                <DSField name="firstName"/>
                <DSField name="lastName"/>
                <DSField name="mobile" type="phoneNumber" title="Mobile number"/>
            </fields>
        </DataSource>

        <ListGrid ID="phoneContactsList" dataSource="phoneContacts" modalEditing="true" canEdit="true" editEvent="click" autoFetchData="true" width="500" height="224"/>

        <Button title="Add Contact" top="230" click={onAddContactClick}/>
    </>,
    document.getElementById(target)
);
