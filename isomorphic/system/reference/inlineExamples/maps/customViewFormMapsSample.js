
var hotelData = [
    {
        id : 1,
        latitude : 37.788022,
        longitude : -122.399797,
        name : "The Ritz Carlton",
        opening_date : new Date("January 1, 1909"),
        description : "The Ritz Carlton, opened in 1909, is a luxurious hotel located in San Francisco. Its rooms are fitted with modern amenities, and a 24-hour fitness center is available on site. The hotel also offers a spa, restaurants, and a bar for guests to enjoy."
    },
    {
        id : 2,
        latitude : 37.789638,
        longitude : -122.400902,
        name : "The St. Regis San Francisco",
        opening_date : new Date("February 14, 2005"),
        description : "The St. Regis San Francisco, opened in 2005, is a luxurious hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also boasts a variety of amenities including complimentary Wi-Fi, room service and valet parking."
    },
    {
        id : 3,
        latitude : 37.791355,
        longitude : -122.401130,
        name : "Four Seasons Hotel San Francisco",
        opening_date : new Date("March 1, 2001"),
        description : "The Four Seasons Hotel San Francisco, opened in 2001, is a luxurious hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also offers complimentary Wi-Fi, valet parking, and room service for guests to enjoy."
    },
    {
        id : 4,
        latitude : 37.790135,
        longitude : -122.401291,
        name : "InterContinental San Francisco",
        opening_date : new Date("February 28, 1926"),
        description : "The InterContinental San Francisco, opened in 1926, is a classic hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also provides complimentary Wi-Fi, valet parking, and room service to its guests."
    },
    {
        id : 5,
        latitude : 37.788727,
        longitude : -122.402060,
        name : "Westin St. Francis",
        opening_date : new Date("March 21, 1904"),
        description : "The Westin St. Francis, opened in 1904, is a classic hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also provides complimentary Wi-Fi, valet parking, and room service to its guests."
    },
    {
        id : 6,
        latitude : 37.786910,
        longitude : -122.402480,
        name : "Palace Hotel",
        opening_date : new Date("December 19, 1909"),
        description : "The Palace Hotel, opened in 1909, is a classic hotel located in San Francisco. Its rooms are equipped with modern amenities, and a 24-hour fitness center is available on site. The hotel also offers a spa, restaurants, and a bar for guests to enjoy."
    },
    {
        id : 7,
        latitude : 37.784890,
        longitude : -122.403130,
        name : "W San Francisco",
        opening_date : new Date("May 7, 1999"),
        description : "The W San Francisco, opened in 1999, is a luxurious hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also provides complimentary Wi-Fi, valet parking, and room service for guests to enjoy."
    },
    {
        id : 8,
        latitude : 37.783670,
        longitude : -122.404320,
        name : "Hilton San Francisco Union Square",
        opening_date : new Date("August 15, 1964"),
        description : "The Hilton San Francisco Union Square, opened in 1964, is a classic hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also offers complimentary Wi-Fi, valet parking, and room service for guests to enjoy."
    },
    {
        id : 9,
        latitude : 37.782450,
        longitude : -122.405510,
        name : "JW Marriott San Francisco Union Square",
        opening_date : new Date("September 1, 1987"),
        description : "The JW Marriott San Francisco Union Square, opened in 1987, is a luxurious hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also offers complimentary Wi-Fi, valet parking, and room service for guests to enjoy."
    },
    {
        id : 10,
        latitude : 37.781230,
        longitude : -122.406700,
        name : "Omni San Francisco Hotel",
        opening_date : new Date("October 15, 1926"),
        description : "The Omni San Francisco Hotel, opened in 1926, is a classic hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also provides complimentary Wi-Fi, valet parking, and room service to its guests."
    },
    {
        id : 11,
        latitude : 37.780010,
        longitude : -122.407890,
        name : "Grand Hyatt San Francisco",
        opening_date : new Date("November 1, 1972"),
        description : "The Grand Hyatt San Francisco, opened in 1972, is a luxurious hotel located in San Francisco. It features a spa, a fitness center, and a restaurant and bar. The hotel also offers complimentary Wi-Fi, valet parking, and room service for guests to enjoy."
    }
];

isc.DataSource.create({
    ID : "gMapsDS",
    fields : [
        {
            name : "id",
            title : "ID",
            type : "integer",
            primaryKey : true
        },
        {
            name : "name",
            title : "Name",
            type : "text"
        },
        {
            name : "latitude",
            title : "Latitude",
            type : "float"
        },
        {
            name : "longitude",
            title : "Longitude",
            type : "float"
        },
        {
            name : "opening_date",
            title : "Opening date",
            type : "date"
        },
        {
            name : "description",
            title : "Description",
            type : "text"
        }
    ],
    clientOnly : true,
    cacheData : hotelData
});


//creates a Layout object with center and zoom level
isc.Layout.create({
    ID : "customMapsSampleLayout",
    width : "70%",
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
        
        me.infoWindow.addListener("closeclick", function () {
            customMapsSampleForm.clearValues();
        });
        
    },
    getInnerHTML : function () {
        return "<div id='" + this.getID() + "_DivMaps' style='width: " + this.getWidth() + "px; height: " + this.getHeight() + "px;'></div>";
    }
});

isc.HLayout.create({
    width : "100%",
    height : "100%",
    members : [
        customMapsSampleLayout,
        isc.DynamicForm.create({
            ID : "customMapsSampleForm",
            dataSource : "gMapsDS",
            width : "*",
            canEdit : false,
            padding : 5,
            fields : [
                {
                    name : "name",
                    title : "Name",
                    width : "*"
                },
                {
                    name : "latitude",
                    title : "Latitude",
                    type : "float",
                    width : "*"
                },
                {
                    name : "longitude",
                    title : "Longitude",
                    type : "float",
                    width : "*"
                },
                {
                    name : "description",
                    title : "Description",
                    width : "*",
                    editorType : "TextArea",
                    height : 120
                }
            ]
        })
    ]
});


gMapsDS.fetchData(null, function (response, data) {
    if (data) {
        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            var markerOption = {};
            var map = customMapsSampleLayout.gMapObject;
            markerOption.position = {
                lat : record.latitude,
                lng : record.longitude
            };
            
            if (markerOption.position != null && markerOption.position.lat != null && markerOption.position.lng != null) {
                var newMarker = new google.maps.Marker({
                    position : markerOption.position,
                    map : map,
                    id : record.id,
                    title : record.name,
                    infoWindowContent : record.name + "<br>Opening date: " +
                        isc.DateUtil.format(record.opening_date, "MMMM d, yyyy")
                });
                
                newMarker.addListener("click", (function (marker) {
                    return function () {
                        customMapsSampleLayout.infoWindow.setContent(
                            marker.infoWindowContent);
                        customMapsSampleLayout.infoWindow.open(
                            customMapsSampleLayout.gMapObject, marker);
                        customMapsSampleForm.fetchData({id : marker.id});
                    };
                })(newMarker));
                
                customMapsSampleLayout.gMapMarkers.add(newMarker);
            } else {
                isc.logWarn("Marker position can't be null. Ignoring");
            }
        }
    }
});
