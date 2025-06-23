/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, IButton, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onEditHilitesButtonClick = function() {return countryList.editHilites();};
let onStateButtonClick = function () {
    var state = countryList.getHiliteState();
    countryList.destroy();
    recreateListGrid(false);
    countryList.setHiliteState(state);
};

var ds = isc.DataSource.get('countryDS');
var iHTML = isc.Canvas.imgHTML('[SKIN]/actions/exclamation.png', 16, 16);
var hiliteArray = [
    {
        fieldName: 'area',
        cssText: 'color:#FF0000;',
        criteria: {
            fieldName: 'area',
            operator: 'greaterThan',
            value: 5000000
        }
    },
    {
        fieldName: [
            'area',
            'gdp'
        ],
        cssText: 'color:#FFFFFF;background-color:#639966;',
        htmlAfter: iHTML,
        criteria: {
            _constructor: 'AdvancedCriteria',
            operator: 'and',
            criteria: [
                {
                    fieldName: 'gdp',
                    operator: 'greaterThan',
                    value: 1000000
                },
                {
                    fieldName: 'area',
                    operator: 'lessThan',
                    value: 500000
                }
            ]
        }
    }
];
function recreateListGrid(includeHilites) {
    layout.addMember(isc.ListGrid.create({
        ID: 'countryList',
        width: '100%',
        height: '*',
        dataSource: ds,
        autoFetchData: true,
        canAddFormulaFields: true,
        canAddSummaryFields: true,
        fields: [
            {
                name: 'countryCode',
                title: 'Flag',
                width: 60,
                type: 'image',
                imageURLPrefix: 'flags/24/',
                imageURLSuffix: '.png'
            },
            {
                name: 'countryName',
                title: 'Country'
            },
            {
                name: 'capital',
                title: 'Capital'
            },
            {
                name: 'population',
                title: 'Population'
            },
            {
                name: 'area',
                title: 'Area (km&sup2;)'
            },
            { name: 'gdp' }
        ],
        hilites: includeHilites ? hiliteArray : null
    }));
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="5" ID="layout" width="600" height="250">
        <members>
            <HLayout membersMargin="10" ID="buttonLayout" width="*" height="30">
                <members>
                    <IButton autoFit="true" title="Edit Hilites" ID="editHilitesButton" click={onEditHilitesButtonClick}/>
                    <IButton autoFit="true" title="Recreate from State" ID="stateButton" click={onStateButtonClick}/>
                </members>
            </HLayout>
        </members>
    </VLayout>,
    document.getElementById(target)
);

recreateListGrid(true);
