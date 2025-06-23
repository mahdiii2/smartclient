/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var carModels = [
    'Ultra',
    'Sparrow',
    'Tiger',
    'Jupiter',
    'Walrus',
    'Alpine',
    'Hero',
    'Vertex',
    'Spider'
];
var carFeatures = [
    {
        name: 'turbo',
        title: 'Turbocharger'
    },
    {
        name: 'sunroof',
        title: 'Sun Roof'
    },
    {
        name: 'rearWing',
        title: 'Rear Wing'
    },
    {
        name: 'surroundSound',
        title: 'Surround Sound'
    },
    {
        name: 'noiseReduce',
        title: 'Active Noise Control'
    },
    {
        name: 'driveAssist',
        title: 'AI Drive Assistance'
    },
    {
        name: 'gps',
        title: 'GPS Navigation'
    },
    {
        name: 'runFlat',
        title: 'Run-flat Tires'
    },
    {
        name: 'gullDoors',
        title: 'Gull Wing Doors'
    },
    {
        name: 'alloyWheels',
        title: 'Alloy Wheels'
    },
    {
        name: 'allWheelDrive',
        title: 'All Wheel Drive'
    },
    {
        name: 'rearSteering',
        title: 'Rear Wheel Steering'
    },
    {
        name: 'stealthPaint',
        title: 'Radar Absorbing Paint'
    },
    {
        name: 'smokeScreen',
        title: 'Smoke Screen'
    },
    {
        name: 'regenerative',
        title: 'Regenerative Braking'
    },
    {
        name: 'solarPanel',
        title: 'Solar Panel'
    },
    {
        name: 'selfPark',
        title: 'Self Parking'
    }
];
var fields = [{
        name: 'modelName',
        title: 'Model Name',
        width: 70,
        wrap: true,
        type: 'text',
        rotateTitle: false
    }];
for (var i = 0; i < carFeatures.length; i++) {
    var feature = carFeatures[i];
    fields.add({
        name: feature.name,
        title: feature.title,
        type: 'boolean'
    });
}
var records = [];
for (var i = 0; i < carModels.length; i++) {
    var model = carModels[i], record = { modelName: model };
    for (var j = 0; j < carFeatures.length; j++) {
        var feature = carFeatures[j];
        record[feature.name] = Math.random() >= 0.5;
    }
    records.add(record);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout>
        <members>
            <Label contents="&lt;span style=&apos;font-size:20px&apos;&gt;&lt;b&gt;Supercar Model Feature Overview&lt;/b&gt;&lt;/span&gt;" title="carDataLabel" ID="carDataLabel" width="500" height="40"/>
            <ListGrid ID="carDataList" data={records} fields={fields} canEdit="true" headerHeight="170" autoFitData="both" rotateHeaderTitles="true"/>
        </members>
    </VLayout>,
    document.getElementById(target)
);
