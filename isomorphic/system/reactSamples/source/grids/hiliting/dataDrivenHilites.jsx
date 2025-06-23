/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var countryDataHilites = [
    {
        continent: 'North America',
        countryName: 'United States',
        countryCode: 'US',
        area: 9631420,
        population: 298444215,
        gdp: 12360 * 1000,
        independence: new Date(1776, 6, 4),
        government: 'federal republic',
        government_desc: 2,
        capital: 'Washington, DC',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/United_states',
        _hilite: 0
    },
    {
        continent: 'Asia',
        countryName: 'China',
        countryCode: 'CH',
        area: 9596960,
        population: 1313973713,
        gdp: 8859 * 1000,
        government: 'Communist state',
        government_desc: 0,
        capital: 'Beijing',
        member_g8: false,
        article: 'http://en.wikipedia.org/wiki/China',
        _hilite: 0
    },
    {
        continent: 'Asia',
        countryName: 'Japan',
        countryCode: 'JA',
        area: 377835,
        population: 127463611,
        gdp: 4018 * 1000,
        government: 'constitutional monarchy with parliamentary government',
        government_desc: 1,
        capital: 'Tokyo',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/Japan',
        _hilite: 1
    },
    {
        continent: 'Asia',
        countryName: 'India',
        countryCode: 'IN',
        area: 3287590,
        population: 1095351995,
        gdp: 3611 * 1000,
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
        gdp: 2504 * 1000,
        independence: new Date(1871, 0, 18),
        government: 'federal republic',
        government_desc: 2,
        capital: 'Berlin',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/Germany',
        _hilite: 1
    },
    {
        continent: 'Europe',
        countryName: 'United Kingdom',
        countryCode: 'UK',
        area: 244820,
        population: 60609153,
        gdp: 1830 * 1000,
        independence: new Date(1801, 0, 1),
        government: 'constitutional monarchy',
        government_desc: 1,
        capital: 'London',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/United_kingdom',
        _hilite: 1
    },
    {
        continent: 'Europe',
        countryName: 'France',
        countryCode: 'FR',
        area: 547030,
        population: 60876136,
        gdp: 1816 * 1000,
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
        gdp: 1698 * 1000,
        independence: new Date(1861, 2, 17),
        government: 'republic',
        government_desc: 5,
        capital: 'Rome',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/Italy',
        _hilite: 1
    },
    {
        continent: 'Asia',
        countryName: 'Russia',
        countryCode: 'RS',
        area: 17075200,
        population: 142893540,
        gdp: 1589 * 1000,
        independence: new Date(1991, 7, 24),
        government: 'federation',
        government_desc: 3,
        capital: 'Moscow',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/Russia',
        _hilite: 0
    },
    {
        continent: 'South America',
        countryName: 'Brazil',
        countryCode: 'BR',
        area: 8511965,
        population: 188078227,
        gdp: 1556 * 1000,
        independence: new Date(1822, 8, 7),
        government: 'federative republic',
        government_desc: 3,
        capital: 'Brasilia',
        member_g8: false,
        article: 'http://en.wikipedia.org/wiki/Brazil',
        _hilite: 0
    },
    {
        continent: 'North America',
        countryName: 'Canada',
        countryCode: 'CA',
        area: 9984670,
        population: 33098932,
        gdp: 1114 * 1000,
        independence: new Date(1867, 6, 1),
        government: 'constitutional monarchy with parliamentary democracy and federation',
        government_desc: 1,
        capital: 'Ottawa',
        member_g8: true,
        article: 'http://en.wikipedia.org/wiki/Canada',
        _hilite: 0
    },
    {
        continent: 'North America',
        countryName: 'Mexico',
        countryCode: 'MX',
        area: 1972550,
        population: 107449525,
        gdp: 1067 * 1000,
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
        gdp: 1029 * 1000,
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
        gdp: 965.3 * 1000,
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
        gdp: 865.6 * 1000,
        independence: new Date(1945, 7, 17),
        government: 'republic',
        government_desc: 5,
        capital: 'Jakarta',
        member_g8: false,
        article: 'http://en.wikipedia.org/wiki/Indonesia'
    }
];
function recreateListGrid() {
    layout.addMember(isc.ListGrid.create({
        ID: 'countryList',
        width: '100%',
        height: '*',
        dataSource: 'countryDSHilites',
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
                title: 'Population',
                format: ',0'
            },
            {
                name: 'area',
                title: 'Area (km&sup2;)',
                format: ',0'
            },
            {
                name: 'gdp',
                format: ',0'
            }
        ],
        hilites: [
            {
                fieldName: 'area',
                textColor: '#FF0000',
                cssText: 'color:#FF0000;',
                id: 0
            },
            {
                fieldName: [
                    'area',
                    'gdp'
                ],
                textColor: '#FFFFFF',
                backgroundColor: '#639966',
                cssText: 'color:#3333FF;background-color:#639966;',
                id: 1
            }
        ]
    }));
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="countryDSHilites" title="countryDSHilites" clientOnly="true" testData={countryDataHilites}>
            <fields>
                <DSField name="countryName" title="Country"/>
                <DSField name="countryCode" title="Code"/>
                <DSField name="independence" type="date" title="Independence"/>
                <DSField name="population" type="integer" title="Population"/>
                <DSField name="gdp" type="float" title="GDP ($M)"/>
                <DSField name="area" type="float" title="Area (km&amp;sup2;)"/>
                <DSField name="capital" type="text" title="Capital"/>
                <DSField name="government" type="text" length="500" title="Government"/>
            </fields>
        </DataSource>

        <VLayout ID="layout" width="525" height="250"/>
    </>,
    document.getElementById(target)
);

recreateListGrid();
