/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

function filterViaAI(filterDescription) {
    grid.setUserAIFilterRequest(filterDescription == null ? null : { prompt: filterDescription });
}
var exampleFilterDescriptions = [
    'in the Northern Hemisphere',
    'Spanish is one of the official languages',
    'in the Caribbean'
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="12" width="100%" height="100%">
        <members>
            <HLayout members={[isc.Label.create({
        height: '30',
        contents: 'Examples: ',
        autoFit: true
    })].concat(exampleFilterDescriptions.map(function (exampleFilterDescription) {
    return isc.IButton.create({
        title: '"' + exampleFilterDescription + '"',
        autoFit: true,
        click: function () {
            filterViaAI(exampleFilterDescription);
        }
    });
}))} membersMargin="6" width="100%" height="*"/>
            <ListGrid dataSource="worldDS" sortField="countryName" autoFetchData="true" width="100%" height="100%" dataFetchMode="local" filterViaAIMode="AIDE">
                <implicitCriteria fieldName="continent" operator="inSet">
                    <value>North America</value>
                    <value>Australia/Oceania</value>
                </implicitCriteria>
            </ListGrid>
        </members>
    </VLayout>,
    document.getElementById(target)
);

if (isc.AI._spoofedAIFilterAIDEResponses)
    isc.AI.removeSpoofedResponses(isc.AI._spoofedAIFilterAIDEResponses);
isc.AI.addSpoofedResponses(isc.AI._spoofedAIFilterAIDEResponses = [
    {
        matchesPrompt: function (prompt) {
            return prompt.contains('determine which data-records match the user-supplied filter-query') && prompt.contains('data-record index') && /match the user-supplied filter-query:\s+Spanish is one of the official languages\s+The DataSource has the following summary/i.test(prompt);
        },
        makeAIResponse: function (aiRequest, aiEngine) {
            var countryCodes = [
                'MX',
                'CO',
                'SP',
                'AR',
                'PE',
                'VE',
                'CI',
                'GT',
                'EC',
                'BL',
                'CU',
                'DR',
                'HO',
                'PA',
                'ES',
                'NU',
                'CS',
                'PM',
                'UY',
                'EK',
                'RQ'
            ];
            var prompt = aiEngine.makePromptText(aiRequest), records = isc.AI._extractJsonResult(prompt, '[', ']'), results = [];
            for (var i = 0; i < records.length; ++i) {
                var record = records[i];
                if (countryCodes.contains(record.countryCode)) {
                    results.push(record['data-record index']);
                }
            }
            return {
                type: 'success',
                message: { content: { result: results } }
            };
        }
    },
    {
        matchesPrompt: function (prompt) {
            return prompt.contains('determine which data-records match the user-supplied filter-query') && prompt.contains('data-record index') && /match the user-supplied filter-query:\s+shares a land border with China\s+The DataSource has the following summary/i.test(prompt);
        },
        makeAIResponse: function (aiRequest, aiEngine) {
            var countryCodes = [
                'CH',
                'KN',
                'RS',
                'MG',
                'KZ',
                'KG',
                'TI',
                'AF',
                'PK',
                'IN',
                'NP',
                'BT',
                'BM',
                'LA',
                'VM'
            ];
            var prompt = aiEngine.makePromptText(aiRequest), records = isc.AI._extractJsonResult(prompt, '[', ']'), results = [];
            for (var i = 0; i < records.length; ++i) {
                var record = records[i];
                if (countryCodes.contains(record.countryCode)) {
                    results.push(record['data-record index']);
                }
            }
            return {
                type: 'success',
                message: { content: { result: results } }
            };
        }
    },
    {
        matchesPrompt: function (prompt) {
            return prompt.contains('determine which data-records match the user-supplied filter-query') && prompt.contains('data-record index') && /match the user-supplied filter-query:\s+in the Caribbean\s+The DataSource has the following summary/i.test(prompt);
        },
        makeAIResponse: function (aiRequest, aiEngine) {
            var countryCodes = [
                'AV',
                'AC',
                'AA',
                'BF',
                'BB',
                'BH',
                'VI',
                'CJ',
                'CU',
                'DO',
                'DR',
                'GJ',
                'HA',
                'JM',
                'MB',
                'MH',
                'RQ',
                'SC',
                'ST',
                'VC',
                'TD',
                'TK',
                'VQ'
            ];
            var prompt = aiEngine.makePromptText(aiRequest), records = isc.AI._extractJsonResult(prompt, '[', ']'), results = [];
            for (var i = 0; i < records.length; ++i) {
                var record = records[i];
                if (countryCodes.contains(record.countryCode)) {
                    results.push(record['data-record index']);
                }
            }
            return {
                type: 'success',
                message: { content: { result: results } }
            };
        }
    }
]);
