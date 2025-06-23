/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, LGField, ListGrid, StaticTextItem, ToolStrip, ToolStripButton, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFormulaBuilderClick = function () {
    countryGrid.addFormulaField();
};
let onSummaryBuilderClick = function () {
    countryGrid.addSummaryField();
};
let onCountryGridDraw = function () {
    this.Super('draw', arguments);
    this.showSavedViewState();
};
let onCountryGridViewStateChanged = function () {
    this.showSavedViewState();
};
let onCountryGridShowSavedViewState = function () {
    var viewState = this.getSavedViewState();
    if (viewState == null)
        viewState = '[None]';
    preferenceForm.setValue('state', viewState);
};
let onClearStateClick = function () {
    countryGrid.clearSavedViewState();
    countryGrid.showSavedViewState();
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout minBreadthMember="countryGrid" ID="testLayout" height="100%">
        <members>
            <ToolStrip align="right" ID="preferenceStrip" width="100%" autoDraw="false" addFill="true">
                <members>
                    <ToolStripButton icon="[SAMPLE]icons/16/sc_insertformula.png" showDownIcon="false" autoFit="true" title="Formula Builder" ID="formulaBuilder" autoDraw="false" click={onFormulaBuilderClick}/>
                    <ToolStripButton icon="[SAMPLE]icons/16/application_side_tree.png" showDownIcon="false" autoFit="true" title="Summary Builder" ID="summaryBuilder" autoDraw="false" click={onSummaryBuilderClick}/>
                </members>
            </ToolStrip>
            <ListGrid ID="countryGrid" dataSource="countryDS" canFreezeFields="true" canGroupBy="true" autoFitData="horizontal" autoFitFieldWidths="true" autoFetchData="true" canAddFormulaFields="true" canAddSummaryFields="true" width="700" height="200" autoDraw="false" leaveScrollBarGap="true" draw={onCountryGridDraw} viewStateChanged={onCountryGridViewStateChanged} showSavedViewState={onCountryGridShowSavedViewState}>
                <fields>
                    <LGField name="countryCode" type="image" title="Flag" width="80" imageURLPrefix="flags/24/" imageURLSuffix=".png" canSort="false"/>
                    <LGField name="countryName" title="Country"/>
                    <LGField name="capital" title="Capital"/>
                    <LGField name="population" title="Population" width="150"/>
                    <LGField name="area" title="Area (km&amp;sup2;)" width="150"/>
                </fields>
                <autoPersistViewState>all</autoPersistViewState>
            </ListGrid>
            <DynamicForm ID="preferenceForm" numCols="2" width="100%" height="50" autoDraw="false">
                <fields>
                    <StaticTextItem name="state" title="Current view state" wrapTitle="false" shouldSaveValue="false"/>
                </fields>
            </DynamicForm>
            <ToolStrip align="right" ID="restoreStrip" width="100%" autoDraw="false" addFill="true">
                <members>
                    <ToolStripButton icon="[SAMPLE]icons/16/close.png" showDownIcon="false" autoFit="true" title="Clear Saved State" ID="clearState" autoDraw="false" click={onClearStateClick}/>
                </members>
            </ToolStrip>
        </members>
    </VLayout>,
    document.getElementById(target)
);
