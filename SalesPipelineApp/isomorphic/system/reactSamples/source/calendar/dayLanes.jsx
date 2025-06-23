/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Calendar } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var _today = new Date();
var y = _today.getFullYear();
var m = _today.getMonth();
var d = _today.getDate();
var dayLaneData = [
    {
        eventId: 1,
        startDate: new Date(y, m, d, 8, 0),
        endDate: new Date(y, m, d, 12, 0),
        name: 'Development Meeting',
        description: 'This canvas is styled and disabled by custom styleName and canEdit settings on the CalendarEvent',
        lane: 'charlesMadigen',
        styleName: 'testStyle',
        canEdit: false
    },
    {
        eventId: 2,
        startDate: new Date(y, m, d, 14, 0),
        endDate: new Date(y, m, d, 18, 0),
        name: 'Mgmt Meeting',
        description: 'Management Meeting',
        lane: 'charlesMadigen'
    },
    {
        eventId: 3,
        startDate: new Date(y, m, d, 4, 0),
        endDate: new Date(y, m, d, 12, 0),
        name: 'Data Cleansing',
        description: 'This canvas is styled by color settings on the CalendarEvent',
        lane: 'tamaraKane',
        headerTextColor: 'black',
        headerBackgroundColor: 'orange',
        headerBorderColor: 'darkorange',
        textColor: 'darkgreen',
        borderColor: 'darkorange',
        backgroundColor: '#ffffcc'
    },
    {
        eventId: 4,
        startDate: new Date(y, m, d, 7, 30),
        endDate: new Date(y, m, d, 12, 0),
        name: 'Data Migration',
        description: 'Data Migration',
        lane: 'tamaraKane'
    },
    {
        eventId: 5,
        startDate: new Date(y, m, d, 13, 0),
        endDate: new Date(y, m, d, 16, 0),
        name: 'Documentation',
        description: 'Product documentation',
        lane: 'tamaraKane'
    },
    {
        eventId: 6,
        startDate: new Date(y, m, d, 8, 0),
        endDate: new Date(y, m, d, 20, 0),
        name: 'Support',
        description: 'Telephone Support',
        lane: 'darcyFeeney'
    },
    {
        eventId: 7,
        startDate: new Date(y, m, d, 11, 0),
        endDate: new Date(y, m, d, 11, 30),
        name: 'Break',
        description: 'Morning break',
        lane: 'darcyFeeney'
    },
    {
        eventId: 8,
        startDate: new Date(y, m, d, 16, 0),
        endDate: new Date(y, m, d, 16, 30),
        name: 'Break',
        description: 'Afternoon break',
        lane: 'darcyFeeney'
    },
    {
        eventId: 9,
        startDate: new Date(y, m, d, 0, 0),
        endDate: new Date(y, m, d, 8, 0),
        name: 'Premium Support',
        description: 'This canvas is styled by color settings on the CalendarEvent',
        lane: 'kaiKong',
        headerTextColor: 'white',
        headerBackgroundColor: 'green',
        headerBorderColor: 'green',
        textColor: 'darkgreen',
        borderColor: 'darkgreen',
        backgroundColor: 'lightgreen'
    },
    {
        eventId: 10,
        startDate: new Date(y, m, d, 20, 0),
        endDate: new Date(y, m, d, 23, 59),
        name: 'Support',
        description: 'Premium Support (overnight response)',
        lane: 'kaiKong'
    },
    {
        eventId: 11,
        startDate: new Date(y, m, d, 8, 0),
        endDate: new Date(y, m, d, 12, 0),
        name: 'Development Meeting',
        description: 'Development Meeting',
        lane: 'shellyFewel'
    },
    {
        eventId: 12,
        startDate: new Date(y, m, d, 13, 30),
        endDate: new Date(y, m, d, 17, 30),
        name: 'Team Meeting',
        description: 'Developer Team Meeting',
        lane: 'shellyFewel'
    }
];
var lanes = [
    {
        name: 'charlesMadigen',
        title: 'Charles Madigen',
        width: 200
    },
    {
        name: 'tamaraKane',
        title: 'Tamara Kane',
        width: 200
    },
    {
        name: 'darcyFeeney',
        title: 'Darcy Feeney',
        width: 200
    },
    {
        name: 'kaiKong',
        title: 'Kai Kong',
        width: 200
    },
    {
        name: 'shellyFewel',
        title: 'Shelly Fewel',
        width: 200
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Calendar chosenDate={new Date()} showWeekView="false" showMonthView="false" data={dayLaneData} ID="calendar" top="40" lanes={lanes} showTimelineView="false" showDayLanes="true" canEditLane="true"/>,
    document.getElementById(target)
);
