/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, IButton, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFormulaButtonClick = function() {return countryList.addFormulaField();};
let onStateButtonClick = function () {
    var state = countryList.getViewState();
    isc.Offline.put('exampleState', state);
};

var ds = isc.DataSource.get('countryDS');
var savedState = isc.Offline.get('exampleState');

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" ID="layout" width="500" height="250">
        <members>
            <HLayout membersMargin="10" ID="buttonLayout" width="*" height="30">
                <members>
                    <IButton autoFit="true" title="Show Formula Builder" ID="formulaButton" click={onFormulaButtonClick}/>
                    <IButton autoFit="true" title="Persist State" ID="stateButton" click={onStateButtonClick}/>
                </members>
            </HLayout>
        </members>
    </VLayout>,
    document.getElementById(target)
);

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
            width: 50,
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
            title: 'Population',
            format: ',0',
            width: 90
        },
        {
            name: 'area',
            title: 'Area (km&sup2;)',
            format: ',0',
            width: 95
        },
        {
            name: 'gdp',
            format: ',0'
        }
    ]
}));
if (savedState) {
    countryList.setViewState(savedState);
}
