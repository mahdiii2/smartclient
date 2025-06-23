/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Timeline } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

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
var _calStart = isc.DateUtil.getStartOf(new Date(2020, 6, 5), 'W');
var _calEnd = _calStart.duplicate();
_calEnd.setDate(_calEnd.getDate() + 20);

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Timeline dataSource="tasks" ID="timeline" height="475" autoFetchData="true" startDate={_calStart} endDate={_calEnd} lanes={developers} canEditLane="true" showEventDescriptions="false" columnsPerPage="5">
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
