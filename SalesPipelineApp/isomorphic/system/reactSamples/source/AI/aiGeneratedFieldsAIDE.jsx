/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, HStack, LGField, ListGrid, SortSpecifier, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onAddDemographicsClick = function () {
    var aiFieldRequest = {
        prompt: 'a 2-4 sentence demographic and economic description of the country',
        valueClass: 'general',
        relevantFieldNames: ['countryName'],
        maxRecordsPerBatch: 6
    };
    addAISummaryField({
        name: aiDemographicsFieldName,
        title: 'Demographics Summary',
        width: '*',
        minWidth: 300
    }, aiFieldRequest);
    this.disable();
};
let onAddReligionsClick = function () {
    var aiFieldRequest = {
        prompt: 'most common religions, as a comma-separated list',
        valueClass: 'general',
        relevantFieldNames: ['countryName']
    };
    addAISummaryField({
        name: aiReligionsFieldName,
        title: 'Common Religions'
    }, aiFieldRequest);
    this.disable();
};
let onAddLandmarkClick = function () {
    var aiFieldRequest = {
        prompt: 'most famous landmark',
        valueClass: 'general',
        relevantFieldNames: ['countryName']
    };
    addAISummaryField({
        name: aiLandmarkFieldName,
        title: 'Famous Landmark'
    }, aiFieldRequest);
    this.disable();
};
let onCustomPrompt_hellip_Click = function () {
    isc.askForValue('Enter a prompt for the AI to evaluate on each record', function (newPrompt) {
        if (newPrompt == null)
            return;
        newPrompt = newPrompt.trim();
        if (newPrompt == '') {
            var fields = grid.getFields(), existingIndex = fields.findIndex('name', aiCustomFieldName);
            if (existingIndex >= 0) {
                fields = fields.duplicate();
                fields.removeAt(existingIndex);
                grid.setFields(fields);
            }
            return;
        }
        var buildRequest = {
            userAIRequest: { prompt: newPrompt },
            showProgressDialog: true,
            component: grid,
            dataSource: grid.getDataSource()
        };
        isc.AI.asyncBuildAIFieldRequest(buildRequest).then(function (buildResponse) {
            var aiFieldRequest = buildResponse.aiFieldRequest;
            addAISummaryField({
                name: aiCustomFieldName,
                title: 'Custom Prompt Result',
                width: '*',
                wrap: true
            }, aiFieldRequest);
        }, function (nonSuccessfulResult) {
            if (nonSuccessfulResult.type != 'canceled') {
                isc.warn(isc.getAsyncMessage(nonSuccessfulResult).asHTML());
            }
        });
    });
};
let onListGridCellHover = function (record, rowNum, colNum) {
    if (this.cellValueIsClipped(rowNum, colNum))
        return;
    var field = this.getField(colNum);
    if (this.isValuePendingAsyncOrAsyncError(record, field))
        return;
    return false;
};
let onListGridCellHoverHTML = function (record, rowNum, colNum) {
    var field = this.getField(colNum);
    if (this.isValuePendingAsync(record, field)) {
        return 'This value for ' + record.countryName + ' is being computed.';
    }
    return this.Super('cellHoverHTML', arguments);
};
let onListGridUserRemovedField = function (field) {
    if (field.name == aiDemographicsFieldName) {
        addDemographicsButton.enable();
    } else if (field.name == aiReligionsFieldName) {
        addReligionsButton.enable();
    } else if (field.name == aiLandmarkFieldName) {
        addLandmarkButton.enable();
    }
};

var addDemographicsButton, aiDemographicsFieldName = 'aiDemographics', addReligionsButton, aiReligionsFieldName = 'aiReligions', addLandmarkButton, aiLandmarkFieldName = 'aiLandmark';
function addAISummaryField(fieldProps, aiFieldRequest) {
    var fields = grid.getFields();
    fields = fields.duplicate();
    var existingIndex = fields.findIndex('name', fieldProps.name);
    if (existingIndex >= 0)
        fields.removeAt(existingIndex);
    fieldProps = isc.addProperties(isc.AI.applyAIFieldRequestToFieldDefaults(aiFieldRequest, {
        width: 180,
        wrap: true
    }), fieldProps);
    fields.addAt(fieldProps, existingIndex < 0 ? fields.length : existingIndex);
    grid.setFields(fields);
}
var aiCustomFieldName = 'aiCustom';

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" width="100%" height="100%">
        <members>
            <HStack membersMargin="8" height="*" autoDraw="false">
                <members>
                    <Button autoFit="true" title="Add Demographics" autoDraw="false" click={onAddDemographicsClick}/>
                    <Button autoFit="true" title="Add Religions" autoDraw="false" click={onAddReligionsClick}/>
                    <Button autoFit="true" title="Add Landmark" autoDraw="false" click={onAddLandmarkClick}/>
                    <Button autoFit="true" title="Custom Prompt&amp;hellip;" click={onCustomPrompt_hellip_Click}/>
                </members>
            </HStack>
            <ListGrid dataSource="worldDS" fixedRecordHeights="false" canHover="true" showHover="true" minFieldWidth="70" wrapCells="true" autoFitData="horizontal" autoFitWidthApproach="both" autoFetchData="true" width="100%" height="100%" autoDraw="false" dataFetchMode="paged" canAddAISummaryFields="true" showClippedValuesOnHover="true" cellHover={onListGridCellHover} cellHoverHTML={onListGridCellHoverHTML} userRemovedField={onListGridUserRemovedField}>
                <initialCriteria continent="South America"/>
                <fields>
                    <LGField name="countryCode" title="Code" width="70"/>
                    <LGField name="countryName" width="235"/>
                    <LGField name="independence" title="Nationhood" width="125"/>
                    <LGField name="population" width="125"/>
                    <LGField name="gdp" width="125"/>
                </fields>
                <initialSort>
                    <SortSpecifier direction="ascending" property="countryName"/>
                </initialSort>
            </ListGrid>
        </members>
    </VLayout>,
    document.getElementById(target)
);

if (isc.AI._spoofedAIGeneratedFieldsAIDEResponses)
    isc.AI.removeSpoofedResponses(isc.AI._spoofedAIGeneratedFieldsAIDEResponses);
isc.AI.addSpoofedResponses(isc.AI._spoofedAIGeneratedFieldsAIDEResponses = [
    {
        matchesPrompt: function (prompt) {
            return prompt.contains('a request to supplement the data in records from a DataSource') && prompt.contains('data-record index') && /The supplemental information requested for each record is:\s+most famous landmark\s+The records specified below are from the DataSource with the following description:/i.test(prompt);
        },
        makeAIResponse: function (aiRequest, aiEngine) {
            var mostFamousLandmarksByCountryName = {
                'Argentina': 'Obelisco de Buenos Aires',
                'Bolivia': 'Salar de Uyuni',
                'Brazil': 'Christ the Redeemer',
                'Chile': 'Easter Island',
                'Colombia': 'The Gold Museum',
                'Ecuador': 'The Middle of the World Monument',
                'Guyana': 'Kaieteur Falls',
                'Paraguay': 'The Grand Chaco',
                'Peru': 'Machu Picchu',
                'Suriname': 'The Saint Peter and Paul Cathedral',
                'Uruguay': 'Montevideo Metropolitan Cathedral',
                'Venezuela': 'Angel Falls'
            };
            var prompt = aiEngine.makePromptText(aiRequest), records = isc.AI._extractJsonResult(prompt, '[', ']'), results = [];
            for (var i = 0; i < records.length; ++i) {
                var record = records[i];
                results.push(mostFamousLandmarksByCountryName[record['countryName']]);
            }
            return {
                type: 'success',
                message: { content: { result: results } }
            };
        },
        delay: 100
    },
    {
        matchesPrompt: function (prompt) {
            return prompt.contains('This is a request to gather information about a request to supplement') && /The supplemental information requested for each record is:\s+most populous city\s+Note: In this request, ignore directions to/i.test(prompt);
        },
        value: {
            valueClass: 'general',
            relevantFieldNames: ['countryName']
        },
        delay: 0
    },
    {
        matchesPrompt: function (prompt) {
            return prompt.contains('a request to supplement the data in records from a DataSource') && prompt.contains('data-record index') && /The supplemental information requested for each record is:\s+most populous city\s+The records specified below are from the DataSource with the following description:/i.test(prompt);
        },
        makeAIResponse: function (aiRequest, aiEngine) {
            var mostPopulousCityByCountryName = {
                'Argentina': 'Buenos Aires',
                'Bolivia': 'La Paz',
                'Brazil': 'São Paulo',
                'Chile': 'Santiago',
                'Colombia': 'Bogotá',
                'Ecuador': 'Quito',
                'Guyana': 'Georgetown',
                'Paraguay': 'Asunción',
                'Peru': 'Lima',
                'Suriname': 'Paramaribo',
                'Uruguay': 'Montevideo',
                'Venezuela': 'Caracas'
            };
            var prompt = aiEngine.makePromptText(aiRequest), records = isc.AI._extractJsonResult(prompt, '[', ']'), results = [];
            for (var i = 0; i < records.length; ++i) {
                var record = records[i];
                results.push(mostPopulousCityByCountryName[record['countryName']]);
            }
            return {
                type: 'success',
                message: { content: { result: results } }
            };
        },
        delay: 3000
    }
]);
