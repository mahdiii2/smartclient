/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, CheckboxItem, DynamicForm, HLayout, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onButtonDownloadClick = function () {
    var selectedRecords = listGridSuppyItem.getSelectedRecords();
    if (selectedRecords.length == 0) {
        isc.say('You must select at least one record');
        return;
    }
    var criteria = { itemID: selectedRecords.getProperty('itemID') };
    var dsRequest = {
        ID: 'dsRequest',
        operationId: 'downloadDescriptions',
        downloadResult: true,
        downloadToNewWindow: !!formDownload.getValue('checkbox')
    };
    supplyItemDownload.fetchData(criteria, null, dsRequest);
};

var initialCriteria = {
    _constructor: 'AdvancedCriteria',
    operator: 'and',
    criteria: [{
            fieldName: 'description',
            operator: 'notNull'
        }]
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout ID="vLayout" width="300">
        <members>
            <ListGrid ID="listGridSuppyItem" dataSource="supplyItemDownload" selectionType="simple" width="700" height="224"/>
            <HLayout ID="hLayout" width="300">
                <members>
                    <Button title="Download Descriptions" ID="buttonDownload" width="200" click={onButtonDownloadClick}/>
                    <DynamicForm ID="formDownload">
                        <fields>
                            <CheckboxItem name="checkbox" title="Download to new window"/>
                        </fields>
                    </DynamicForm>
                </members>
            </HLayout>
        </members>
    </VLayout>,
    document.getElementById(target)
);

listGridSuppyItem.fetchData(initialCriteria);
