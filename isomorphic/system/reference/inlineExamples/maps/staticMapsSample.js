
//creates a Layout object with center and zoom level
isc.Layout.create({
    ID : "staticMapsSampleLayout",
    width : "100%",
    height : "100%",
    center : {
        lat : 37.790367,
        lng : -122.4013458
    },
    redrawOnResize : false,
    initialZoomLevel : 15,
    gMapObject : null,
    gMapMarkers : [],
    //draws the Layout and a map object in the Layout object's div with the specified center and zoom level
    draw : function () {
        this.Super("draw", arguments);
        this.drawMap();
    },
    redraw : function () {
        this.Super("redraw", arguments);
        this.drawMap();
    },
    drawMap : function () {
        var me = this;
        
        var mapOptions = {
            center : me.center,
            zoom : me.initialZoomLevel,
            fullscreenControl : false
        };
        
        me.gMapObject = new google.maps.Map(
            document.getElementById(me.getID() + "_DivMaps"), mapOptions);
        
        me.infoWindow = new google.maps.InfoWindow();
        
        //creates a marker with the position, map, title, and infoWindowContent specified in the markerOption
        var newMarker = new google.maps.Marker({
            position : {
                lat : 37.790367,
                lng : -122.4013458
            },
            map : me.gMapObject,
            title : "Isomorphic Software",
            infoWindowContent : "<a href='https://smartclient.com/'>Come visit our website</a><br>" +
                "Or come check our <a href='https://smartclient.com/product/'>pricing</a><br>"
        });
        
        //adds a listener to the marker which displays the marker's title and infoWindowContent when clicked
        newMarker.addListener("click", (function (marker) {
            return function () {
                staticMapsSampleLayout.infoWindow.setContent(
                    marker.title + "<br>" + marker.infoWindowContent);
                staticMapsSampleLayout.infoWindow.open(
                    staticMapsSampleLayout.gMapObject, marker);
            };
        })(newMarker));
        
        me.gMapMarkers.add(newMarker);
    },
    getInnerHTML : function () {
        return "<div id='" + this.getID() + "_DivMaps' style='width: " + this.getWidth() + "px; height: " + this.getHeight() + "px;'></div>";
    }
});

