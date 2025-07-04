isc.VLayout.create({
	ID:"layout",
	width:525, height:250
});


// Function to create a new ListGrid.
function recreateListGrid() {
	layout.addMember(isc.ListGrid.create({
	    ID: "countryList",
	    width:"100%", height:"*",
	    
	    dataSource: "countryDSHilites",
	    autoFetchData: true,
	    canAddFormulaFields: true,
	    canAddSummaryFields: true,
	    fields:[
	        {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/",
	            imageURLSuffix:".png"
	        },
	        {name:"countryName", title:"Country"},
	        {name:"capital", title:"Capital"},
	        {name:"population", title:"Population", format:",0"},
	        {name:"area", title:"Area (km&sup2;)", format:",0"},
	        {name:"gdp", format:",0"}
	    ],
		hilites:     [
            {
                fieldName: "area", 
                textColor: "#FF0000", 
                cssText: "color:#FF0000;", 
                id: 0
            }, 
            {
                fieldName:[
                    "area"
                    , 
                    "gdp"
                ], 
                textColor: "#FFFFFF", 
                backgroundColor: "#639966", 
                cssText: "color:#3333FF;background-color:#639966;", 
                id:1
            }
        ]
	}));

}

// Create the initial ListGrid.
recreateListGrid();

