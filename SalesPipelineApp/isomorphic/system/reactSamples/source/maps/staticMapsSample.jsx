/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Layout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onStaticMapsSampleLayoutDraw = function () {
    this.Super('draw', arguments);
    this.drawMap();
};
let onStaticMapsSampleLayoutRedraw = function () {
    this.Super('redraw', arguments);
    this.drawMap();
};
let onStaticMapsSampleLayoutDrawMap = function () {
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
            staticMapsSampleLayout.infoWindow.setContent(marker.title + '<br>' + marker.infoWindowContent);
            staticMapsSampleLayout.infoWindow.open(staticMapsSampleLayout.gMapObject, marker);
        };
    }(newMarker));
    me.gMapMarkers.add(newMarker);
};
let onStaticMapsSampleLayoutGetInnerHTML = function () {
    return '<div id=\'' + this.getID() + '_DivMaps\' style=\'width: ' + this.getWidth() + 'px; height: ' + this.getHeight() + 'px;\'></div>';
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Layout ID="staticMapsSampleLayout" width="100%" height="100%" redrawOnResize="false" initialZoomLevel="15" draw={onStaticMapsSampleLayoutDraw} redraw={onStaticMapsSampleLayoutRedraw} drawMap={onStaticMapsSampleLayoutDrawMap} getInnerHTML={onStaticMapsSampleLayoutGetInnerHTML}>
        <center>
        	<lat>37.790367</lat>
        	<lng>-122.4013458</lng>
        </center>
        <gMapObject></gMapObject>
    </Layout>,
    document.getElementById(target)
);
