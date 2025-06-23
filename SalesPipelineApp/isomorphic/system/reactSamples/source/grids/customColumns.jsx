/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, IButton, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFormulaButtonClick = function() {return countryList.addFormulaField({fieldWidth: 120})};
let onSummaryButtonClick = function() {return countryList.addSummaryField({fieldWidth: 120})};
let onStateButtonClick = function () {
    var fieldState = countryList.getFieldState();
    countryList.destroy();
    isc.Timer.setTimeout(function () {
        recreateListGrid(fieldState);
    }, 100);
};

var ds = isc.DataSource.get('countryDS');
function recreateListGrid(fieldState) {
    var grid = isc.ListGrid.create({
        ID: 'countryList',
        width: '100%',
        height: '*',
        headerButtonProperties: { showFocusedAsOver: true },
        dataSource: ds,
        autoFetchData: true,
        canAddFormulaFields: true,
        canAddSummaryFields: true,
        fields: [
            {
                name: 'countryCode',
                title: 'Flag',
                width: 70,
                type: 'image',
                imageURLPrefix: 'flags/24/',
                imageURLSuffix: '.png'
            },
            {
                name: 'countryName',
                title: 'Country',
                width: 200
            },
            {
                name: 'capital',
                title: 'Capital',
                width: 200
            },
            {
                name: 'population',
                title: 'Population',
                width: 130
            },
            {
                name: 'area',
                title: 'Area (km&sup2;)',
                width: 130
            },
            {
                name: 'gdp',
                format: ',0',
                width: 130
            }
        ],
        fieldState: fieldState
    });
    layout.addMember(grid);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="5" ID="layout" width="100%" height="250">
        <members>
            <HLayout membersMargin="10" ID="buttonLayout" width="*" height="1">
                <members>
                    <IButton autoFit="true" title="Show Formula Builder" ID="formulaButton" click={onFormulaButtonClick}/>
                    <IButton autoFit="true" title="Show Summary Builder" ID="summaryButton" click={onSummaryButtonClick}/>
                    <IButton autoFit="true" title="Re-create from State" ID="stateButton" click={onStateButtonClick}/>
                </members>
            </HLayout>
        </members>
    </VLayout>,
    document.getElementById(target)
);

recreateListGrid();
