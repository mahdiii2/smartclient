
var hotelData = [
    {
        lat : 37.788022,
        lng : -122.399797,
        name : "The Ritz Carlton",
        opening_date : new Date("January 1, 1909")
    },
    {
        lat : 37.789638,
        lng : -122.400902,
        name : "The St. Regis San Francisco",
        opening_date : new Date("February 14, 2005")
    },
    {
        lat : 37.791355,
        lng : -122.401130,
        name : "Four Seasons Hotel San Francisco",
        opening_date : new Date("March 1, 2001")
    },
    {
        lat : 37.790135,
        lng : -122.401291,
        name : "InterContinental San Francisco",
        opening_date : new Date("February 28, 1926")
    },
    {
        lat : 37.788727,
        lng : -122.402060,
        name : "Westin St. Francis",
        opening_date : new Date("March 21, 1904")
    },
    {
        lat : 37.786910,
        lng : -122.402480,
        name : "Palace Hotel",
        opening_date : new Date("December 19, 1909")
    },
    {
        lat : 37.784890,
        lng : -122.403130,
        name : "W San Francisco",
        opening_date : new Date("May 7, 1999")
    },
    {
        lat : 37.783670,
        lng : -122.404320,
        name : "Hilton San Francisco Union Square",
        opening_date : new Date("August 15, 1964")
    },
    {
        lat : 37.782450,
        lng : -122.405510,
        name : "JW Marriott San Francisco Union Square",
        opening_date : new Date("September 1, 1987")
    },
    {
        lat : 37.781230,
        lng : -122.406700,
        name : "Omni San Francisco Hotel",
        opening_date : new Date("October 15, 1926")
    },
    {
        lat : 37.780010,
        lng : -122.407890,
        name : "Grand Hyatt San Francisco",
        opening_date : new Date("November 1, 1972")
    }
];

isc.DataSource.create({
    ID : "gMapsDS",
    fields : [
        {
            name : "name",
            title : "Name",
            type : "text"
        },
        {
            name : "lat",
            title : "Latitude",
            type : "float"
        },
        {
            name : "lng",
            title : "Longitude",
            type : "float"
        },
        {
            name : "opening_date",
            title : "Opening date",
            type : "date"
        }
    ],
    clientOnly : true,
    cacheData : hotelData
});

//creates a Layout object with center and zoom level
isc.Layout.create({
    ID : "databoundMapsSampleLayout",
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
        
    },
    getInnerHTML : function () {
        return "<div id='" + this.getID() + "_DivMaps' style='width: " + this.getWidth() + "px; height: " + this.getHeight() + "px;'></div>";
    }
});

gMapsDS.fetchData(null, function (response, data) {
    if (data) {
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            var markerOption = {};
            var map = databoundMapsSampleLayout.gMapObject;
            markerOption.position = {
                lat : record.lat,
                lng : record.lng
            };
            
            if (markerOption.position != null && markerOption.position.lat != null && markerOption.position.lng != null) {
                var newMarker = new google.maps.Marker({
                    position : markerOption.position,
                    map : map,
                    title : record.name,
                    infoWindowContent : record.name + "<br>Opening date: " +
                        isc.DateUtil.format(record.opening_date, "MMMM d, yyyy")
                });
                
                newMarker.addListener("click", (function (marker) {
                    return function () {
                        databoundMapsSampleLayout.infoWindow.setContent(
                            marker.infoWindowContent);
                        databoundMapsSampleLayout.infoWindow.open(
                            databoundMapsSampleLayout.gMapObject, marker);
                    };
                })(newMarker));
                
                databoundMapsSampleLayout.gMapMarkers.add(newMarker);
            } else {
                isc.logWarn("Marker position can't be null. Ignoring");
            }
        }
    }
});
