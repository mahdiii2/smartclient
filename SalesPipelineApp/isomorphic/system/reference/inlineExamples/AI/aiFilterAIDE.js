var grid = isc.ListGrid.create({
    width: "100%", height: "100%",
    dataSource: "worldDS", dataFetchMode: "local", autoFetchData: true,
    sortField: "countryName",
    implicitCriteria: {
        _constructor: "AdvancedCriteria",
        fieldName: "continent",
        operator: "inSet",
        value: ["North America", "Australia/Oceania"]
    },

    filterViaAIMode: "AIDE"
});

function filterViaAI(filterDescription) {
    grid.setUserAIFilterRequest(filterDescription == null ? null : {prompt: filterDescription});
}

var exampleFilterDescriptions = [
    "in the Northern Hemisphere",
    "Spanish is one of the official languages",
    "in the Caribbean"
];

isc.VLayout.create({
    width: "100%",
    height: "100%",
    members: [
        isc.HLayout.create({
            width: "100%",
            height: "*",
            members: [isc.Label.create({height: "30", contents: "Examples: ", autoFit: true})].concat(exampleFilterDescriptions.map(function (exampleFilterDescription) {
                return isc.IButton.create({
                    title: "\"" + exampleFilterDescription + "\"",
                    autoFit: true,
                    click : function () {
                        filterViaAI(exampleFilterDescription);
                    }
                });
            })),
            membersMargin: 6
        }),
        grid
    ],
    membersMargin: 12
});










if (isc.AI._spoofedAIFilterAIDEResponses) isc.AI.removeSpoofedResponses(isc.AI._spoofedAIFilterAIDEResponses);
isc.AI.addSpoofedResponses(isc.AI._spoofedAIFilterAIDEResponses = [{
    matchesPrompt : function (prompt) {
        return prompt.contains("determine which data-records match the user-supplied filter-query") &&
                prompt.contains("data-record index") &&
                /match the user-supplied filter-query:\s+Spanish is one of the official languages\s+The DataSource has the following summary/i.test(prompt);
    },
    makeAIResponse : function (aiRequest, aiEngine) {
        // https://en.wikipedia.org/wiki/List_of_countries_and_territories_where_Spanish_is_an_official_language
        var countryCodes = [
            "MX",
            "CO",
            "SP",
            "AR",
            "PE",
            "VE",
            "CI",
            "GT",
            "EC",
            "BL",
            "CU",
            "DR",
            "HO",
            "PA",
            "ES",
            "NU",
            "CS",
            "PM",
            "UY",
            "EK",
            "RQ"
        ];

        var prompt = aiEngine.makePromptText(aiRequest),
            records = isc.AI._extractJsonResult(prompt, "[", "]"),
            results = [];
        for (var i = 0; i < records.length; ++i) {
            var record = records[i];
            if (countryCodes.contains(record.countryCode)) {
                results.push(record["data-record index"]);
            }
        }
        return {
            type: "success",
            message: {content: {result: results}}
        };
    }
}, {
    matchesPrompt : function (prompt) {
        return prompt.contains("determine which data-records match the user-supplied filter-query") &&
                prompt.contains("data-record index") &&
                /match the user-supplied filter-query:\s+shares a land border with China\s+The DataSource has the following summary/i.test(prompt);
    },
    makeAIResponse : function (aiRequest, aiEngine) {
        // https://en.wikipedia.org/wiki/Borders_of_China
        var countryCodes = [
            "CH",
            "KN",
            "RS",
            "MG",
            "KZ",
            "KG",
            "TI",
            "AF",
            "PK",
            "IN",
            "NP",
            "BT",
            "BM",
            "LA",
            "VM"
        ];

        var prompt = aiEngine.makePromptText(aiRequest),
            records = isc.AI._extractJsonResult(prompt, "[", "]"),
            results = [];
        for (var i = 0; i < records.length; ++i) {
            var record = records[i];
            if (countryCodes.contains(record.countryCode)) {
                results.push(record["data-record index"]);
            }
        }
        return {
            type: "success",
            message: {content: {result: results}}
        };
    }
}, {
    matchesPrompt : function (prompt) {
        return prompt.contains("determine which data-records match the user-supplied filter-query") &&
                prompt.contains("data-record index") &&
                /match the user-supplied filter-query:\s+in the Caribbean\s+The DataSource has the following summary/i.test(prompt);
    },
    makeAIResponse : function (aiRequest, aiEngine) {
        // https://en.wikipedia.org/wiki/Caribbean
        var countryCodes = [
            "AV",
            "AC",
            "AA",
            "BF",
            "BB",
            "BH",
            "VI",
            "CJ",
            "CU",
            "DO",
            "DR",
            "GJ",
            "HA",
            "JM",
            "MB",
            "MH",
            "RQ",
            "SC",
            "ST",
            "VC",
            "TD",
            "TK",
            "VQ"
        ];

        var prompt = aiEngine.makePromptText(aiRequest),
            records = isc.AI._extractJsonResult(prompt, "[", "]"),
            results = [];
        for (var i = 0; i < records.length; ++i) {
            var record = records[i];
            if (countryCodes.contains(record.countryCode)) {
                results.push(record["data-record index"]);
            }
        }
        return {
            type: "success",
            message: {content: {result: results}}
        };
    }
}]);
