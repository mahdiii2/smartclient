/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, LGField, Layout, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onVisibleChange = function (form, item, value) {
    var record = this.getSelectedRecord();
    markersVisibilityMapsSampleLayout.gMapMarkers.find({ id: record.id }).setVisible(value);
};
let onMarkersVisibilityMapsSampleLayoutDraw = function () {
    this.Super('draw', arguments);
    this.drawMap();
};
let onMarkersVisibilityMapsSampleLayoutRedraw = function () {
    this.Super('redraw', arguments);
    this.drawMap();
};
let onMarkersVisibilityMapsSampleLayoutDrawMap = function () {
    var me = this;
    var mapOptions = {
        center: me.center,
        zoom: me.initialZoomLevel,
        fullscreenControl: false
    };
    me.gMapObject = new google.maps.Map(document.getElementById(me.getID() + '_DivMaps'), mapOptions);
    me.infoWindow = new google.maps.InfoWindow();
};
let onMarkersVisibilityMapsSampleLayoutGetInnerHTML = function () {
    return '<div id=\'' + this.getID() + '_DivMaps\' style=\'width: ' + this.getWidth() + 'px; height: ' + this.getHeight() + 'px;\'></div>';
};

var hotelData = [
    {
        id: 1,
        latitude: 37.788022,
        longitude: -122.399797,
        name: 'The Ritz Carlton',
        visible: true,
        opening_date: new Date('January 1, 1909'),
        description: 'The Ritz Carlton, opened in 1909, is a luxurious hotel located in San Francisco. Its rooms are fitted with modern amenities, and a 24-hour fitness center is available on site. The hotel also offers a spa, restaurants, and a bar for guests to enjoy.'
    },
    {
        id: 2,
        latitude: 37.789638,
        longitude: -122.400902,
        name: 'The St. Regis San Francisco',
        visible: true,
        opening_date: new Date('February 14, 2005'),
        description: 'The St. Regis San Francisco, opened in 2005, is a luxurious hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also boasts a variety of amenities including complimentary Wi-Fi, room service and valet parking.'
    },
    {
        id: 3,
        latitude: 37.791355,
        longitude: -122.40113,
        name: 'Four Seasons Hotel San Francisco',
        visible: false,
        opening_date: new Date('March 1, 2001'),
        description: 'The Four Seasons Hotel San Francisco, opened in 2001, is a luxurious hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also offers complimentary Wi-Fi, valet parking, and room service for guests to enjoy.'
    },
    {
        id: 4,
        latitude: 37.790135,
        longitude: -122.401291,
        name: 'InterContinental San Francisco',
        visible: true,
        opening_date: new Date('February 28, 1926'),
        description: 'The InterContinental San Francisco, opened in 1926, is a classic hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also provides complimentary Wi-Fi, valet parking, and room service to its guests.'
    },
    {
        id: 5,
        latitude: 37.788727,
        longitude: -122.40206,
        name: 'Westin St. Francis',
        visible: false,
        opening_date: new Date('March 21, 1904'),
        description: 'The Westin St. Francis, opened in 1904, is a classic hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also provides complimentary Wi-Fi, valet parking, and room service to its guests.'
    },
    {
        id: 6,
        latitude: 37.78691,
        longitude: -122.40248,
        name: 'Palace Hotel',
        visible: false,
        opening_date: new Date('December 19, 1909'),
        description: 'The Palace Hotel, opened in 1909, is a classic hotel located in San Francisco. Its rooms are equipped with modern amenities, and a 24-hour fitness center is available on site. The hotel also offers a spa, restaurants, and a bar for guests to enjoy.'
    },
    {
        id: 7,
        latitude: 37.78489,
        longitude: -122.40313,
        name: 'W San Francisco',
        visible: true,
        opening_date: new Date('May 7, 1999'),
        description: 'The W San Francisco, opened in 1999, is a luxurious hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also provides complimentary Wi-Fi, valet parking, and room service for guests to enjoy.'
    },
    {
        id: 8,
        latitude: 37.78367,
        longitude: -122.40432,
        name: 'Hilton San Francisco Union Square',
        visible: false,
        opening_date: new Date('August 15, 1964'),
        description: 'The Hilton San Francisco Union Square, opened in 1964, is a classic hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also offers complimentary Wi-Fi, valet parking, and room service for guests to enjoy.'
    },
    {
        id: 9,
        latitude: 37.78245,
        longitude: -122.40551,
        name: 'JW Marriott San Francisco Union Square',
        visible: true,
        opening_date: new Date('September 1, 1987'),
        description: 'The JW Marriott San Francisco Union Square, opened in 1987, is a luxurious hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also offers complimentary Wi-Fi, valet parking, and room service for guests to enjoy.'
    },
    {
        id: 10,
        latitude: 37.78123,
        longitude: -122.4067,
        name: 'Omni San Francisco Hotel',
        visible: false,
        opening_date: new Date('October 15, 1926'),
        description: 'The Omni San Francisco Hotel, opened in 1926, is a classic hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also provides complimentary Wi-Fi, valet parking, and room service to its guests.'
    },
    {
        id: 11,
        latitude: 37.78001,
        longitude: -122.40789,
        name: 'Grand Hyatt San Francisco',
        visible: true,
        opening_date: new Date('November 1, 1972'),
        description: 'The Grand Hyatt San Francisco, opened in 1972, is a luxurious hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also offers complimentary Wi-Fi, valet parking, and room service for guests to enjoy.'
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="gMapsDS" title="gMapsDS" clientOnly="true" cacheData={hotelData}>
            <fields>
                <DSField name="id" type="integer" title="ID" primaryKey="true"/>
                <DSField name="name" type="text" title="Name"/>
                <DSField name="latitude" type="float" title="Latitude"/>
                <DSField name="longitude" type="float" title="Longitude"/>
                <DSField name="visible" type="boolean" title="Visible"/>
                <DSField name="opening_date" type="date" title="Opening date"/>
                <DSField name="description" type="text" title="Description"/>
            </fields>
        </DataSource>

        <VLayout membersMargin="10" width="100%" height="100%">
            <members>
                <ListGrid dataSource="gMapsDS" canEdit="true" autoFetchData="true" width="1000" height="250">
                    <fields>
                        <LGField name="name" type="text" title="Name"/>
                        <LGField name="opening_date" type="date" title="Opening date"/>
                        <LGField name="description" type="text" title="Description" showHover="true"/>
                        <LGField name="visible" type="boolean" title="Visible" change={onVisibleChange}/>
                    </fields>
                </ListGrid>
                <Layout ID="markersVisibilityMapsSampleLayout" width="1000" height="600" redrawOnResize="false" initialZoomLevel="15" draw={onMarkersVisibilityMapsSampleLayoutDraw} redraw={onMarkersVisibilityMapsSampleLayoutRedraw} drawMap={onMarkersVisibilityMapsSampleLayoutDrawMap} getInnerHTML={onMarkersVisibilityMapsSampleLayoutGetInnerHTML}>
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
            var map = markersVisibilityMapsSampleLayout.gMapObject;
            markerOption.position = {
                lat: record.latitude,
                lng: record.longitude
            };
            if (markerOption.position != null && markerOption.position.lat != null && markerOption.position.lng != null) {
                var newMarker = new google.maps.Marker({
                    position: markerOption.position,
                    map: map,
                    id: record.id,
                    title: record.name,
                    visible: record.visible,
                    infoWindowContent: record.name + '<br>Opening date: ' + isc.DateUtil.format(record.opening_date, 'MMMM d, yyyy')
                });
                newMarker.addListener('click', function (marker) {
                    return function () {
                        markersVisibilityMapsSampleLayout.infoWindow.setContent(marker.infoWindowContent);
                        markersVisibilityMapsSampleLayout.infoWindow.open(markersVisibilityMapsSampleLayout.gMapObject, marker);
                    };
                }(newMarker));
                markersVisibilityMapsSampleLayout.gMapMarkers.add(newMarker);
            } else {
                isc.logWarn('Marker position can\'t be null. Ignoring');
            }
        }
    }
});
