/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DSField, DataSource, DynamicForm, FloatItem, Layout, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onMoveClick = function () {
    if (interactiveCenterMapsSampleForm.validate()) {
        var values = interactiveCenterMapsSampleForm.getValues();
        interactiveCenterMapsSampleLayout.gMapObject.setCenter(new google.maps.LatLng(values.lat, values.lng));
        interactiveCenterMapsSampleLayout.gMapObject.setZoom(initialZoomLevel);
    }
};
let onInteractiveCenterMapsSampleLayoutDraw = function () {
    this.Super('draw', arguments);
    this.drawMap();
};
let onInteractiveCenterMapsSampleLayoutRedraw = function () {
    this.Super('redraw', arguments);
    this.drawMap();
};
let onInteractiveCenterMapsSampleLayoutDrawMap = function () {
    var me = this;
    var mapOptions = {
        center: me.center,
        zoom: me.initialZoomLevel,
        fullscreenControl: false
    };
    me.gMapObject = new google.maps.Map(document.getElementById(me.getID() + '_DivMaps'), mapOptions);
    me.infoWindow = new google.maps.InfoWindow();
    var newMarker = new google.maps.Marker({
        position: {
            lat: 37.790367,
            lng: -122.4013458
        },
        map: me.gMapObject,
        title: 'Isomorphic Software',
        infoWindowContent: '<a href=\'https://smartclient.com/\'>Come visit our website</a><br>' + 'Or come check our <a href=\'https://smartclient.com/product/\'>pricing</a><br>'
    });
    newMarker.addListener('click', function (marker) {
        return function () {
            interactiveCenterMapsSampleLayout.infoWindow.setContent(marker.title + '<br>' + marker.infoWindowContent);
            interactiveCenterMapsSampleLayout.infoWindow.open(interactiveCenterMapsSampleLayout.gMapObject, marker);
        };
    }(newMarker));
    me.gMapMarkers.add(newMarker);
};
let onInteractiveCenterMapsSampleLayoutGetInnerHTML = function () {
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

        <VLayout width="100%" height="100%">
            <members>
                <DynamicForm ID="interactiveCenterMapsSampleForm" numCols="5" width="800" height="24" padding="5">
                    <fields>
                        <FloatItem name="lat" title="New center Latitude" required="true"/>
                        <FloatItem name="lng" title="New center Longitude" required="true"/>
                        <ButtonItem title="Move" startRow="false" endRow="false" click={onMoveClick}/>
                    </fields>
                </DynamicForm>
                <Layout ID="interactiveCenterMapsSampleLayout" width="800" height="800" redrawOnResize="false" initialZoomLevel="15" draw={onInteractiveCenterMapsSampleLayoutDraw} redraw={onInteractiveCenterMapsSampleLayoutRedraw} drawMap={onInteractiveCenterMapsSampleLayoutDrawMap} getInnerHTML={onInteractiveCenterMapsSampleLayoutGetInnerHTML}>
                    <center>
                    	<lat>37.790367</lat>
                    	<lng>-122.4013458</lng>
                    </center>
                    <gMapObject></gMapObject>
                </Layout>
            </members>
        </VLayout>
    </>,
    document.getElementById(target)
);

gMapsDS.fetchData(null, function (response, data) {
    if (data) {
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            var markerOption = {};
            var map = interactiveCenterMapsSampleLayout.gMapObject;
            markerOption.position = {
                lat: record.lat,
                lng: record.lng
            };
            if (markerOption.position != null && markerOption.position.lat != null && markerOption.position.lng != null) {
                var newMarker = new google.maps.Marker({
                    position: markerOption.position,
                    map: map,
                    id: record.id,
                    title: record.name,
                    infoWindowContent: record.name + '<br>Opening date: ' + isc.DateUtil.format(record.opening_date, 'MMMM d, yyyy')
                });
                newMarker.addListener('click', function (marker) {
                    return function () {
                        interactiveCenterMapsSampleLayout.infoWindow.setContent(marker.infoWindowContent);
                        interactiveCenterMapsSampleLayout.infoWindow.open(interactiveCenterMapsSampleLayout.gMapObject, marker);
                    };
                }(newMarker));
                interactiveCenterMapsSampleLayout.gMapMarkers.add(newMarker);
            } else {
                isc.logWarn('Marker position can\'t be null. Ignoring');
            }
        }
    }
});
