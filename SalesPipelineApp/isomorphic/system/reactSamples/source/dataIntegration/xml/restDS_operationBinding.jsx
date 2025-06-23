/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, HLayout, IButton, LGField, ListGrid, RestDataSource } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onAddNewCountryClick = function () {
    countryList.addData({
        countryCode: 'A1',
        countryName: 'New Value',
        capital: 'New Value',
        continent: 'New Value'
    });
    this.disable();
};
let onUpdateCountry_US_Click = function () {
    countryList.updateData({
        countryCode: 'US',
        countryName: 'Edited Value',
        capital: 'Edited Value',
        continent: 'Edited Value'
    });
    countryList.selection.selectSingle({ countryCode: 'US' });
    this.disable();
};
let onRemoveCountry_UK_Click = function () {
    countryList.removeData({ countryCode: 'UK' });
    this.disable();
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <RestDataSource fetchDataURL="[ISOMORPHIC]/system/reference/inlineExamples/dataIntegration/xml/responses/country_fetch_rest.xml" addDataURL="[ISOMORPHIC]/system/reference/inlineExamples/dataIntegration/xml/responses/country_add_rest.xml" removeDataURL="[ISOMORPHIC]/system/reference/inlineExamples/dataIntegration/xml/responses/country_remove_rest.xml" updateDataURL="[ISOMORPHIC]/system/reference/inlineExamples/dataIntegration/xml/responses/country_update_rest.xml" ID="countryDS" title="countryDS">
            <fields>
                <DSField name="countryCode" title="Code" canEdit="false" primaryKey="true"/>
                <DSField name="countryName" title="Country"/>
                <DSField name="capital" title="Capital"/>
            </fields>
        </RestDataSource>

        <ListGrid ID="countryList" dataSource="countryDS" dataPageSize="50" emptyCellValue="--" sortField="0" autoFetchData="true" width="500" height="224">
            <fields>
                <LGField name="countryCode"/>
                <LGField name="countryName"/>
                <LGField name="capital"/>
                <LGField name="continent"/>
            </fields>
        </ListGrid>

        <HLayout membersMargin="15" top="240">
            <members>
                <IButton title="Add new country" width="150" click={onAddNewCountryClick}/>
                <IButton title="Update country (US)" width="150" click={onUpdateCountry_US_Click}/>
                <IButton title="Remove country (UK)" width="150" click={onRemoveCountry_UK_Click}/>
            </members>
        </HLayout>
    </>,
    document.getElementById(target)
);
