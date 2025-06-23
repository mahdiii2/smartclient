/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var countryData = [
    {
        continent: 'North America',
        countryName: 'United States',
        countryCode: 'US',
        area: 9631420,
        population: 298444215,
        gdp: 12360,
        independence: new Date(1776, 6, 4),
        government: 'federal republic',
        government_desc: 2,
        capital: 'Washington, DC',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/United_states'
    },
    {
        continent: 'Asia',
        countryName: 'China',
        countryCode: 'CH',
        area: 9596960,
        population: 1313973713,
        gdp: 8859,
        government: 'Communist state',
        government_desc: 0,
        capital: 'Beijing',
        member_g8: false,
        article: 'http://en.wikipedia.org/wiki/China'
    },
    {
        continent: 'Asia',
        countryName: 'Japan',
        countryCode: 'JA',
        area: 377835,
        population: 127463611,
        gdp: 4018,
        government: 'constitutional monarchy with parliamentary government',
        government_desc: 1,
        capital: 'Tokyo',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/Japan'
    },
    {
        continent: 'Asia',
        countryName: 'India',
        countryCode: 'IN',
        area: 3287590,
        population: 1095351995,
        gdp: 3611,
        independence: new Date(1947, 7, 15),
        government: 'federal republic',
        government_desc: 2,
        capital: 'New Delhi',
        member_g8: false,
        article: 'http://en.wikipedia.org/wiki/India'
    },
    {
        continent: 'Europe',
        countryName: 'Germany',
        countryCode: 'GM',
        area: 357021,
        population: 82422299,
        gdp: 2504,
        independence: new Date(1871, 0, 18),
        government: 'federal republic',
        government_desc: 2,
        capital: 'Berlin',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/Germany'
    },
    {
        continent: 'Europe',
        countryName: 'United Kingdom',
        countryCode: 'UK',
        area: 244820,
        population: 60609153,
        gdp: 1830,
        independence: new Date(1801, 0, 1),
        government: 'constitutional monarchy',
        government_desc: 1,
        capital: 'London',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/United_kingdom'
    },
    {
        continent: 'Europe',
        countryName: 'France',
        countryCode: 'FR',
        area: 547030,
        population: 60876136,
        gdp: 1816,
        government: 'republic',
        government_desc: 5,
        capital: 'Paris',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/France'
    },
    {
        continent: 'Europe',
        countryName: 'Italy',
        countryCode: 'IT',
        area: 301230,
        population: 58133509,
        gdp: 1698,
        independence: new Date(1861, 2, 17),
        government: 'republic',
        government_desc: 5,
        capital: 'Rome',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/Italy'
    },
    {
        continent: 'Asia',
        countryName: 'Russia',
        countryCode: 'RS',
        area: 17075200,
        population: 142893540,
        gdp: 1589,
        independence: new Date(1991, 7, 24),
        government: 'federation',
        government_desc: 3,
        capital: 'Moscow',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/Russia'
    },
    {
        continent: 'South America',
        countryName: 'Brazil',
        countryCode: 'BR',
        area: 8511965,
        population: 188078227,
        gdp: 1556,
        independence: new Date(1822, 8, 7),
        government: 'federative republic',
        government_desc: 3,
        capital: 'Brasilia',
        member_g8: false,
        article: 'http://en.wikipedia.org/wiki/Brazil'
    },
    {
        continent: 'North America',
        countryName: 'Canada',
        countryCode: 'CA',
        area: 9984670,
        population: 33098932,
        gdp: 1114,
        independence: new Date(1867, 6, 1),
        government: 'constitutional monarchy with parliamentary democracy and federation',
        government_desc: 1,
        capital: 'Ottawa',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/Canada'
    },
    {
        continent: 'North America',
        countryName: 'Mexico',
        countryCode: 'MX',
        area: 1972550,
        population: 107449525,
        gdp: 1067,
        independence: new Date(1810, 8, 16),
        government: 'federal republic',
        government_desc: 2,
        capital: 'Mexico (Distrito Federal)',
        member_g8: false,
        article: 'http://en.wikipedia.org/wiki/Mexico'
    },
    {
        continent: 'Europe',
        countryName: 'Spain',
        countryCode: 'SP',
        area: 504782,
        population: 40397842,
        gdp: 1029,
        independence: new Date(1492, 0, 1),
        government: 'parliamentary monarchy',
        government_desc: 4,
        capital: 'Madrid',
        member_g8: false,
        article: 'http://en.wikipedia.org/wiki/Spain'
    },
    {
        continent: 'Asia',
        countryName: 'South Korea',
        countryCode: 'KS',
        area: 98480,
        population: 48846823,
        gdp: 965.3,
        independence: new Date(1945, 7, 15),
        government: 'republic',
        government_desc: 5,
        capital: 'Seoul',
        member_g8: false,
        article: 'http://en.wikipedia.org/wiki/South_korea'
    },
    {
        continent: 'Asia',
        countryName: 'Indonesia',
        countryCode: 'ID',
        area: 1919440,
        population: 245452739,
        gdp: 865.6,
        independence: new Date(1945, 7, 17),
        government: 'republic',
        government_desc: 5,
        capital: 'Jakarta',
        member_g8: false,
        article: 'http://en.wikipedia.org/wiki/Indonesia'
    }
];
function createLG(altRecordStyles, altFieldStyles) {
    var lg = isc.ListGrid.create({
        width: 450,
        height: 224,
        alternateRecordStyles: altRecordStyles,
        alternateFieldStyles: altFieldStyles,
        fields: [
            {
                name: 'countryCode',
                title: 'Code'
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
                name: 'continent',
                title: 'Continent'
            }
        ],
        showEmptyMessage: true,
        data: countryData
    });
    return lg;
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout members={[
    createLG(false, false),
    isc.DynamicForm.create({
        ID: 'form1',
        width: 320,
        numCols: 4,
        fields: [
            {
                name: 'recordStyle',
                title: 'Alternate Record Styles',
                type: 'checkbox',
                height: 25,
                changed: function (form, item, value) {
                    vLayout.removeMember(0);
                    var altFieldStyleCB = form1.getValue('fieldStyle');
                    vLayout.addMember(createLG(value, altFieldStyleCB), 0);
                }
            },
            {
                name: 'fieldStyle',
                title: 'Alternate Field Styles',
                type: 'checkbox',
                height: 25,
                changed: function (form, item, value) {
                    vLayout.removeMember(0);
                    var recordStyle = form1.getValue('recordStyle');
                    vLayout.addMember(createLG(recordStyle, value), 0);
                }
            }
        ]
    })
]} ID="vLayout" width="600" height="100%"/>,
    document.getElementById(target)
);
