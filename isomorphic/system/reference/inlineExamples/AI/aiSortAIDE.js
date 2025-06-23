var grid = isc.ListGrid.create({
    width: "100%", height: "100%",
    dataSource: "worldDS", dataFetchMode: "local", autoFetchData: true,
    fields: [
        {name:"countryCode", title:"Flag", width:70, type: "image", imageURLPrefix: "flags/24/", imageURLSuffix: ".png"},
        {name:"countryName", width:235},
        {name:"continent", width:125},
        {name:"government", width:235},
        {
            name: "pressFreedom",
            title: "Press Freedom",
            width: 175,
            aiFieldRequest: {
                prompt: "press freedom in the country",
                valueClass: "ordinal",
                categories: [
                    "Very Restricted",
                    "Restricted",
                    "Moderate",
                    "Free",
                    "Very Free"
                ],
                categoryHints: {
                    "Very Restricted": "Countries with severe limitations on press freedom, including widespread censorship, harassment, and imprisonment of journalists.",
                    "Restricted": "Countries with significant constraints on the press but not as severe as 'Very Restricted'.",
                    "Moderate": "Countries where press freedom is somewhat limited but generally allows for criticism and diverse viewpoints.",
                    "Free": "Countries with mostly unrestricted press freedom but occasional issues or pressures.",
                    "Very Free": "Countries with near-complete press freedom, few (if any) limitations, and robust protections for journalists."
                }
            },
            canEditAISummary: false
        }
    ],
    implicitCriteria: { // exclude territories
        _constructor: "AdvancedCriteria",
        fieldName: "independence",
        operator: "notNull"
    },
    initialCriteria: {
        continent: "Europe"
    },
    //showFilterEditor: true,
    initialSort: [{
        property: "pressFreedom",
        direction: "descending"
    }, {
        property: "countryName",
        direction: "ascending"
    }],
    sortViaAIMode: "hybrid",
    aiSortFieldMaxRecords: 50,
    canAddAISummaryFields: true
});





