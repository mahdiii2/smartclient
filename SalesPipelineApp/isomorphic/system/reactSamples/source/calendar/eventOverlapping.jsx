/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Calendar } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var _today = new Date();
var _start = _today.getDate() - _today.getDay();
var _month = _today.getMonth();
var _year = _today.getFullYear();
var eventOverlapData = [
    {
        eventId: 1,
        name: 'Meeting',
        description: 'Shareholders meeting: monthly forecast report',
        startDate: new Date(_year, _month, _start + 3, 9),
        endDate: new Date(_year, _month, _start + 3, 14)
    },
    {
        eventId: 2,
        name: 'Realtor',
        description: 'This canvas is styled by color settings on the CalendarEvent',
        startDate: new Date(_year, _month, _start + 3, 8),
        endDate: new Date(_year, _month, _start + 3, 10),
        headerTextColor: 'black',
        headerBackgroundColor: 'orange',
        headerBorderColor: 'darkorange',
        textColor: 'darkgreen',
        borderColor: 'darkorange',
        backgroundColor: '#ffffcc'
    },
    {
        eventId: 3,
        name: 'Soccer',
        description: 'This canvas is styled by color settings on the CalendarEvent',
        startDate: new Date(_year, _month, _start + 4, 8),
        endDate: new Date(_year, _month, _start + 4, 12),
        headerTextColor: 'white',
        headerBackgroundColor: 'green',
        headerBorderColor: 'green',
        textColor: 'darkgreen',
        borderColor: 'darkgreen',
        backgroundColor: 'lightgreen'
    },
    {
        eventId: 4,
        name: 'Sleep',
        description: 'Catch up on sleep',
        startDate: new Date(_year, _month, _start + 4, 9),
        endDate: new Date(_year, _month, _start + 4, 11)
    },
    {
        eventId: 5,
        name: 'Inspection',
        description: 'This canvas is styled and disabled by custom styleName and canEdit settings on the CalendarEvent',
        startDate: new Date(_year, _month, _start + 4, 10),
        endDate: new Date(_year, _month, _start + 4, 12),
        styleName: 'testStyle',
        canEdit: false
    },
    {
        eventId: 6,
        name: 'Dinner Party',
        description: 'Prepare elaborate meal for friends',
        startDate: new Date(_year, _month, _start + 4, 11),
        endDate: new Date(_year, _month, _start + 4, 14)
    },
    {
        eventId: 7,
        name: 'Poker',
        description: 'Poker at Steve\'s house',
        startDate: new Date(_year, _month, _start + 4, 13),
        endDate: new Date(_year, _month, _start + 4, 16)
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Calendar data={eventOverlapData} eventOverlapPercent="10" ID="eventCalendar" eventAutoArrange="true" eventOverlap="true" eventOverlapIdenticalStartTimes="false"/>,
    document.getElementById(target)
);

eventCalendar.scrollToTime('07:00');
