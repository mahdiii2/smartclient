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
    'population less than 1 million',
    'in South America',
    'nationhood prior to 1900',
    'area more than 500K square miles',
    'country name starts with a vowel',
    'member of the G8'
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
            <ListGrid dataSource="worldDS" showFilterEditor="true" sortField="countryName" autoFetchData="true" width="100%" height="100%" dataFetchMode="local" filterViaAIMode="aiAssist"/>
        </members>
    </VLayout>,
    document.getElementById(target)
);

if (isc.AI._spoofedAIFilterAssistResponses)
    isc.AI.removeSpoofedResponses(isc.AI._spoofedAIFilterAssistResponses);
isc.AI.addSpoofedResponses(isc.AI._spoofedAIFilterAssistResponses = [
    {
        matchesPrompt: function (prompt) {
            return prompt.contains('This is a request for an AdvancedCriteria object') && /fulfill the following filter-query:\s+population\s+less\s+than\s+(1|an?|one)\s+million\s+The data-bound component's/i.test(prompt);
        },
        value: {
            '_constructor': 'AdvancedCriteria',
            'operator': 'and',
            'criteria': [
                {
                    'fieldName': 'population',
                    'operator': 'notBlank'
                },
                {
                    'fieldName': 'population',
                    'operator': 'lessThan',
                    'value': 1000000
                }
            ]
        }
    },
    {
        matchesPrompt: function (prompt) {
            return prompt.contains('This is a request for an AdvancedCriteria object to apply to a data-bound component') && /fulfill the following filter-query:\s+((with)?in|(a\s+)?part\s+of)\s+South\s+America\s+The data-bound component's/i.test(prompt);
        },
        value: {
            '_constructor': 'AdvancedCriteria',
            'operator': 'iEquals',
            'fieldName': 'continent',
            'value': 'South America'
        }
    },
    {
        matchesPrompt: function (prompt) {
            return prompt.contains('This is a request for an AdvancedCriteria object to apply to a data-bound component') && /fulfill the following filter-query:\s+nationhood\s+(before|prior)\s+to\s+1900\s+The data-bound component's/i.test(prompt);
        },
        value: {
            '_constructor': 'AdvancedCriteria',
            'operator': 'and',
            'criteria': [
                {
                    'fieldName': 'independence',
                    'operator': 'notBlank'
                },
                {
                    'fieldName': 'independence',
                    'operator': 'lessThan',
                    'value': '1900-01-01'
                }
            ]
        }
    },
    {
        matchesPrompt: function (prompt) {
            return prompt.contains('This is a request for an AdvancedCriteria object to apply to a data-bound component') && /fulfill the following filter-query:\s+area\s+(is\s+)?(greater|more)(\s+|-)than\s+((five(-?|\s+)|5\s*)hundred|500)\s*(K|thousand|,?000)\s+(square\s+|sq(.?|\s+))miles\s+The data-bound component's/i.test(prompt);
        },
        value: {
            '_constructor': 'AdvancedCriteria',
            'operator': 'greaterThan',
            'fieldName': 'area',
            'value': 1295000
        }
    },
    {
        matchesPrompt: function (prompt) {
            return prompt.contains('This is a request for an AdvancedCriteria object to apply to a data-bound component') && /fulfill the following filter-query:\s+country\s*name\s+(begins|starts)\s+with\s+(a\s+)?vowel\s+The data-bound component's/i.test(prompt);
        },
        value: {
            '_constructor': 'AdvancedCriteria',
            'operator': 'or',
            'criteria': [
                {
                    'fieldName': 'countryName',
                    'operator': 'iStartsWith',
                    'value': 'A'
                },
                {
                    'fieldName': 'countryName',
                    'operator': 'iStartsWith',
                    'value': 'E'
                },
                {
                    'fieldName': 'countryName',
                    'operator': 'iStartsWith',
                    'value': 'I'
                },
                {
                    'fieldName': 'countryName',
                    'operator': 'iStartsWith',
                    'value': 'O'
                },
                {
                    'fieldName': 'countryName',
                    'operator': 'iStartsWith',
                    'value': 'U'
                }
            ]
        }
    },
    {
        matchesPrompt: function (prompt) {
            return prompt.contains('This is a request for an AdvancedCriteria object to apply to a data-bound component') && /fulfill the following filter-query:\s+(a\s+)?(member|part)\s+of\s+(the\s+)?G8\s+The data-bound component's/i.test(prompt);
        },
        value: {
            '_constructor': 'AdvancedCriteria',
            'operator': 'iEquals',
            'fieldName': 'member_g8',
            'value': true
        }
    }
]);
