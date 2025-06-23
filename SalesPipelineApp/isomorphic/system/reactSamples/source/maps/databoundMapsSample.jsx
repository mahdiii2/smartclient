/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, Layout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDataboundMapsSampleLayoutDraw = function () {
    this.Super('draw', arguments);
    this.drawMap();
};
let onDataboundMapsSampleLayoutRedraw = function () {
    this.Super('redraw', arguments);
    this.drawMap();
};
let onDataboundMapsSampleLayoutDrawMap = function () {
    var me = this;
    var mapOptions = {
        center: me.center,
        zoom: me.initialZoomLevel,
        fullscreenControl: false
    };
    me.gMapObject = new google.maps.Map(document.getElementById(me.getID() + '_DivMaps'), mapOptions);
    me.infoWindow = new google.maps.InfoWindow();
};
let onDataboundMapsSampleLayoutGetInnerHTML = function () {
    return '<div id=\'' + this.getID() + '_DivMaps\' style=\'width: ' + this.getWidth() + 'px; height: ' + this.getHeight() + 'px;\'></div>';
};

var hotelData = [
    {
        lat: 37.788022,
        lng: -122.399797,
        name: 'The Ritz Carlton',
        opening_date: new Date('January 1, 1909')
    },
    {
        lat: 37.789638,
        lng: -122.400902,
        name: 'The St. Regis San Francisco',
        opening_date: new Date('February 14, 2005')
    },
    {
        lat: 37.791355,
        lng: -122.40113,
        name: 'Four Seasons Hotel San Francisco',
        opening_date: new Date('March 1, 2001')
    },
    {
        lat: 37.790135,
        lng: -122.401291,
        name: 'InterContinental San Francisco',
        opening_date: new Date('February 28, 1926')
    },
    {
        lat: 37.788727,
        lng: -122.40206,
        name: 'Westin St. Francis',
        opening_date: new Date('March 21, 1904')
    },
    {
        lat: 37.78691,
        lng: -122.40248,
        name: 'Palace Hotel',
        opening_date: new Date('December 19, 1909')
    },
    {
        lat: 37.78489,
        lng: -122.40313,
        name: 'W San Francisco',
        opening_date: new Date('May 7, 1999')
    },
    {
        lat: 37.78367,
        lng: -122.40432,
        name: 'Hilton San Francisco Union Square',
        opening_date: new Date('August 15, 1964')
    },
    {
        lat: 37.78245,
        lng: -122.40551,
        name: 'JW Marriott San Francisco Union Square',
        opening_date: new Date('September 1, 1987')
    },
    {
        lat: 37.78123,
        lng: -122.4067,
        name: 'Omni San Francisco Hotel',
        opening_date: new Date('October 15, 1926')
    },
    {
        lat: 37.78001,
        lng: -122.40789,
        name: 'Grand Hyatt San Francisco',
        opening_date: new Date('November 1, 1972')
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="gMapsDS" title="gMapsDS" clientOnly="true" cacheData={hotelData}>
            <fields>
                <DSField name="name" type="text" title="Name"/>
                <DSField name="lat" type="float" title="Latitude"/>
                <DSField name="lng" type="float" title="Longitude"/>
                <DSField name="opening_date" type="date" title="Opening date"/>
            </fields>
        </DataSource>

        <Layout ID="databoundMapsSampleLayout" width="100%" height="100%" redrawOnResize="false" initialZoomLevel="15" draw={onDataboundMapsSampleLayoutDraw} redraw={onDataboundMapsSampleLayoutRedraw} drawMap={onDataboundMapsSampleLayoutDrawMap} getInnerHTML={onDataboundMapsSampleLayoutGetInnerHTML}>
            <center>
            	<lat>37.790367</lat>
            	<lng>-122.4013458</lng>
            </center>
            <gMapObject></gMapObject>
        </Layout>
    </>,
    document.getElementById(target)
);

gMapsDS.fetchData(null, function (response, data) {
    if (data) {
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            var markerOption = {};
            var map = databoundMapsSampleLayout.gMapObject;
            markerOption.position = {
                lat: record.lat,
                lng: record.lng
            };
            if (markerOption.position != null && markerOption.position.lat != null && markerOption.position.lng != null) {
                var newMarker = new google.maps.Marker({
                    position: markerOption.position,
                    map: map,
                    title: record.name,
                    infoWindowContent: record.name + '<br>Opening date: ' + isc.DateUtil.format(record.opening_date, 'MMMM d, yyyy')
                });
                newMarker.addListener('click', function (marker) {
                    return function () {
                        databoundMapsSampleLayout.infoWindow.setContent(marker.infoWindowContent);
                        databoundMapsSampleLayout.infoWindow.open(databoundMapsSampleLayout.gMapObject, marker);
                    };
                }(newMarker));
                databoundMapsSampleLayout.gMapMarkers.add(newMarker);
            } else {
                isc.logWarn('Marker position can\'t be null. Ignoring');
            }
        }
    }
});
