/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Timeline } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var _today = isc.DateUtil.getStartOf(new Date(2020, 6, 4), 'W');
var _start = _today.getDate();
var _month = _today.getMonth();
var _year = _today.getFullYear();
var events = [
    {
        eventId: 1,
        name: 'Add new Timeline view',
        description: 'Add a new calendar Timeline component',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 2), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 8), 'D'),
        lane: 'darcyFeeney'
    },
    {
        eventId: 2,
        name: 'ListGrid field autoSize',
        description: 'Complex field-autosizing in ListGrid',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start), 'D'),
        lane: 'kaiKong'
    },
    {
        eventId: 3,
        name: 'PDF Import/Export',
        description: 'Implement native PDF import/export',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 1), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 6), 'D'),
        lane: 'garretMonroe'
    },
    {
        eventId: 4,
        name: 'Calculated Fields',
        description: 'Formula and Summary fields for ListGrid',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 4), 'D'),
        lane: 'charlesMadigen'
    },
    {
        eventId: 5,
        name: 'ListGrid cell-level selection',
        description: 'Implement spreadsheet-like selection in ListGrid',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 7), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 14), 'D'),
        lane: 'charlesMadigen'
    },
    {
        eventId: 6,
        name: 'Text import',
        description: 'Server text-import',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 16), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 20), 'D'),
        lane: 'charlesMadigen'
    },
    {
        eventId: 7,
        name: 'TabIndex enhancements',
        description: 'Enhance formItem tabindex handling',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 9), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 11), 'D'),
        lane: 'kaiKong'
    },
    {
        eventId: 8,
        name: 'Reify skin',
        description: 'Skinning changes',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 3), 'D'),
        lane: 'shellyFewel'
    },
    {
        eventId: 9,
        name: 'DataSource Transaction-handling',
        description: 'This canvas is styled by color settings on the CalendarEvent',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 2), 'D'),
        lane: 'tamaraKane',
        headerTextColor: 'white',
        headerBackgroundColor: 'green',
        headerBorderColor: 'green',
        textColor: 'darkgreen',
        borderColor: 'darkgreen',
        backgroundColor: 'lightgreen'
    },
    {
        eventId: 10,
        name: 'New Samples',
        description: 'Add 20 samples for the following new features: ...',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 4), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 20), 'D'),
        lane: 'tamaraKane'
    },
    {
        eventId: 11,
        name: 'Localization',
        description: 'Extend i18n support',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 9), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 14), 'D'),
        lane: 'darcyFeeney'
    },
    {
        eventId: 12,
        name: 'New Language Packs',
        description: 'Add these 4 new language packs: ...',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 16), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 18), 'D'),
        lane: 'darcyFeeney'
    },
    {
        eventId: 13,
        name: 'ComponentXML',
        description: 'Add the following features and update documentation: ...',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 5), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 11), 'D'),
        lane: 'shellyFewel'
    },
    {
        eventId: 14,
        name: 'TileGrid',
        description: 'This canvas is styled by color settings on the CalendarEvent',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 14), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 19), 'D'),
        lane: 'shellyFewel',
        headerTextColor: 'black',
        headerBackgroundColor: 'orange',
        headerBorderColor: 'darkorange',
        textColor: 'darkgreen',
        borderColor: 'darkorange',
        backgroundColor: '#ffffcc'
    },
    {
        eventId: 15,
        name: 'Dev Meeting',
        description: 'This canvas is styled by a custom CalendarEvent.styleName',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 1), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 1), 'D'),
        lane: 'charlesMadigen',
        styleName: 'testStyle',
        canEdit: false
    },
    {
        eventId: 16,
        name: 'Dev Meeting',
        description: 'This canvas is styled by a custom CalendarEvent.styleName',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 8), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 8), 'D'),
        lane: 'charlesMadigen',
        styleName: 'testStyle',
        canEdit: false
    },
    {
        eventId: 17,
        name: 'Dev Meeting',
        description: 'This canvas is styled by a custom CalendarEvent.styleName',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 15), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 15), 'D'),
        lane: 'charlesMadigen',
        styleName: 'testStyle',
        canEdit: false
    },
    {
        eventId: 18,
        name: 'Oracle enhancements',
        description: 'Add the following 11g-specific enhancements: ...',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 7), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 9), 'D'),
        lane: 'garretMonroe'
    },
    {
        eventId: 19,
        name: 'Client export',
        description: 'Excel export alterations',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 11), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 14), 'D'),
        lane: 'garretMonroe'
    },
    {
        eventId: 20,
        name: 'Record Components',
        description: 'New ListGrid recordComponent modes: ...',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 16), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 20), 'D'),
        lane: 'garretMonroe'
    },
    {
        eventId: 21,
        name: 'SQLDataSource',
        description: 'Enhancements to customSQL support',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 2), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 4), 'D'),
        lane: 'kaiKong'
    },
    {
        eventId: 22,
        name: 'includeFrom',
        description: 'Update support via includeFrom',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 6), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 8), 'D'),
        lane: 'kaiKong'
    },
    {
        eventId: 23,
        name: 'FileItem',
        description: 'Add milti-file upload support',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 14), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 16), 'D'),
        lane: 'kaiKong'
    },
    {
        eventId: 24,
        name: 'Doc viewer',
        description: 'Enhance documentation viewer with these additional syntax-hilites: ...',
        startDate: isc.DateUtil.getStartOf(new Date(_year, _month, _start + 18), 'D'),
        endDate: isc.DateUtil.getEndOf(new Date(_year, _month, _start + 19), 'D'),
        lane: 'kaiKong'
    }
];
var developers = [
    {
        name: 'charlesMadigen',
        title: 'Charles Madigen'
    },
    {
        name: 'tamaraKane',
        title: 'Tamara Kane'
    },
    {
        name: 'darcyFeeney',
        title: 'Darcy Feeney'
    },
    {
        name: 'kaiKong',
        title: 'Kai Kong'
    },
    {
        name: 'shellyFewel',
        title: 'Shelly Fewel'
    },
    {
        name: 'garretMonroe',
        title: 'Garret Monroe'
    }
];
var _calStart = isc.DateUtil.getStartOf(new Date(2020, 6, 4), 'W');
var _calEnd = _calStart.duplicate();
_calEnd.setDate(_calEnd.getDate() + 21);

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Timeline data={events} ID="timeline" height="475" startDate={_calStart} endDate={_calEnd} lanes={developers} canEditLane="true" showEventDescriptions="false" columnsPerPage="5">
        <headerLevels>
        	<unit>week</unit>
        </headerLevels>
        <headerLevels>
        	<unit>day</unit>
        </headerLevels>
        <laneFields>
        	<name>title</name>
        	<title>Developer</title>
        	<minWidth>120</minWidth>
        	<autoFitWidth>true</autoFitWidth>
        </laneFields>
    </Timeline>,
    document.getElementById(target)
);
