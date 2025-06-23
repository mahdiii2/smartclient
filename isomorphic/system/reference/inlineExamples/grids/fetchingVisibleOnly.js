
var ds = isc.DataSource.get("countryDS");
var hiliteArray = [
    {
        fieldName: ["countryName"], 
        cssText: "background-color:#FFA07A;", 
        criteria: { _constructor: "AdvancedCriteria", operator: "and", 
            criteria: [ { fieldName: "member_g8", operator: "equals", value: true } ]
        }
    }
];

var outputFields = isc.Label.create({
    ID: "outputFields",
    top: 290, padding: 10,
    width: 700, height: 40,
    border: "1px solid grey",
    contents: "<b>List of requested fields: NA</b>",
    count: 0,
    updateContent : function (outputs, totalRows, startRow, endRow) {
        this.count++;
        this.setContents("Number of server trips: " + this.count +
                         "<br/>Total rows in this filter set: " + totalRows +
                         "<br/>Last range of records returned: " +
                         startRow + " to " + endRow +
                         "<br/>Fields included in returned records: <b>"+outputs+"</b>");
    }
});
isc.VLayout.create({
    ID:"layout",
    width:700, height:250,
    membersMargin: 5,
    members: [
        isc.IButton.create({
            ID: "highlightButton",
            autoFit: true,
            title: "Highlight G8 Countries",
            click: function() {
                countryList.destroy();
                recreateListGrid(true);
            }
        }),
        outputFields
    ]
});

// Create the initial ListGrid.  See comment below for parameter description.
recreateListGrid(false);

// Function to create a new ListGrid. On the first call, passes "false" as the parameter, such
// that the hiliteArray above is not included in the create() statement. Subsequent calls pass true, 
// meaning the hiliteArray is included to demostrate the grid needs the extra field(member_g8) and fetches it.
function recreateListGrid(includeHilites) {
    layout.addMember(isc.ListGrid.create({
            ID: "countryList",
            width:"100%", height:300,
            showFilterEditor:true,
            canEditHilites:true,
            canEdit:true,
            dataSource: ds,
            autoFetchData: true,
            fetchFields: ["continent"],
            fields:[
                {name:"countryCode", title:"Flag", width:65, type:"image", imageURLPrefix:"flags/24/",
                    imageURLSuffix:".png", canEdit: false
                },
                {name:"countryName"},
                {name:"capital"},
                {name:"population", title:"Population", hidden: true}
            ],
            canEditCell: function (rowNum, colNum) {
                var record = this.getRecord(rowNum),
                    fieldName = this.getFieldName(colNum);

                if (fieldName == "capital" &&
                    record.continent == "Europe")
                {
                   return false;
                }
                // use default rules for all other fields
                return this.Super("canEditCell", arguments);
            },
            hilites: includeHilites ? hiliteArray : null
        }), 1);

}

// ---------------------------------------------------------------------------------------
// The code that follows is just to illustrate when SmartClient has needed to contact the
// server. It is not part of the example.
var origBGColor,
    restoreBGColorTimerID;
ds.addProperties({

    transformResponse: function (dsResponse, dsRequest) {
        if (this.dataFormat == "iscServer") this.updateRowCountLabel(dsResponse, dsRequest);
    },
    // This approach logs simulated server trips for SmartClient LGPL, where all DataSources
    // in the Feature Explorer are converted to clientOnly:true so that no server is required.
    getClientOnlyResponse : function (dsRequest) {
        var dsResponse = this.Super("getClientOnlyResponse", arguments);
        this.updateRowCountLabel(dsResponse, dsRequest);
        return dsResponse;
    },
    updateRowCountLabel : function (dsResponse, dsRequest) {
        outputFields.updateContent(dsRequest.outputs,
                                       dsResponse.totalRows, 
                                       dsResponse.startRow, 
                                       dsResponse.endRow);
        // Flash the label
        if (restoreBGColorTimerID == null) origBGColor = outputFields.backgroundColor;
        else isc.Timer.clear(restoreBGColorTimerID);
        outputFields.setBackgroundColor("#ffff77");
        restoreBGColorTimerID = isc.Timer.setTimeout(function () {
            restoreBGColorTimerID = null;
            outputFields.setBackgroundColor(origBGColor);
        }, 500);
    }
})

