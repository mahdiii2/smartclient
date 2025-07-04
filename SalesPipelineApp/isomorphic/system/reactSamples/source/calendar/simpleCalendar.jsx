/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Calendar } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var _today = new Date(2021, 4, 23);
var _start = _today.getDate() - _today.getDay();
var _month = _today.getMonth();
var _year = _today.getFullYear();
var eventData = [
    {
        eventId: 1,
        name: 'Meeting',
        description: 'Shareholders meeting: monthly forecast report',
        startDate: new Date(_year, _month, _start + 2, 9),
        endDate: new Date(_year, _month, _start + 2, 14)
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
        description: 'Little league soccer finals',
        startDate: new Date(_year, _month, _start + 4, 13),
        endDate: new Date(_year, _month, _start + 4, 16)
    },
    {
        eventId: 4,
        name: 'Sleep',
        description: 'Catch up on sleep',
        startDate: new Date(_year, _month, _start + 4, 5),
        endDate: new Date(_year, _month, _start + 4, 9)
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
        name: 'Airport run',
        description: 'This canvas is styled by color settings on the CalendarEvent',
        startDate: new Date(_year, _month, _start + 4, 1),
        endDate: new Date(_year, _month, _start + 4, 3),
        headerTextColor: 'white',
        headerBackgroundColor: 'green',
        headerBorderColor: 'green',
        textColor: 'darkgreen',
        borderColor: 'darkgreen',
        backgroundColor: 'lightgreen'
    },
    {
        eventId: 7,
        name: 'Dinner Party',
        description: 'Prepare elaborate meal for friends',
        startDate: new Date(_year, _month, _start + 4, 17),
        endDate: new Date(_year, _month, _start + 4, 20)
    },
    {
        eventId: 8,
        name: 'Poker',
        description: 'Poker at Steve\'s house',
        startDate: new Date(_year, _month, _start + 4, 21),
        endDate: new Date(_year, _month, _start + 4, 23)
    },
    {
        eventId: 9,
        name: 'Directors Meeting',
        description: 'Board of directors meeting: discussion of next months strategy',
        startDate: new Date(_year, _month, _start + 5, 11),
        endDate: new Date(_year, _month, _start + 5, 15)
    }
];
eventData.getDataStartDate = function () {
    return new Date(2021, 4, 23);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Calendar data={eventData} ID="eventCalendar" startDate={eventData.getDataStartDate()} alwaysShowEventHovers="false"/>,
    document.getElementById(target)
);
