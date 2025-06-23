var grid = isc.ListGrid.create({
    width: "100%", height: "100%",
    dataSource: "worldDS", dataFetchMode: "local", autoFetchData: true,
    hoverAutoFitMaxWidth: 500,
    implicitCriteria: {
        _constructor: "AdvancedCriteria",
        operator: "and",
        criteria: [{
            fieldName: "continent",
            operator: "equals",
            value: "Asia"
        }, {
            fieldName: "population",
            operator: "greaterThan",
            value: 25000000
        }]
    },
    canHover: true,
    showHover: true,
    showClippedValuesOnHover: true,
    cellHover : function (record, rowNum, colNum) {
        // Show a hover if the value is clipped or we've set an aiHoverRequest on the field.
        if (this.cellValueIsClipped(rowNum, colNum)) return;
        var field = this.getField(colNum);
        if (field && field.aiHoverRequest) return;
        return false;
    },
    fields:[
        {name: "countryCode", width:70},
        {
            name: "countryName", width: 235,
            showHover: true,
            aiHoverRequest: {
                prompt: "a 2-4 sentence demographic and economic description of the country",
                includeRecord: false
            }
        },
        {name: "independence", width: 125},
        {name: "population", width: 125},
        {name: "gdp", width: 125}
    ]
});
