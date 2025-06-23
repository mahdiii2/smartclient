isc.HLayout.create({
    ID:"mainLayout",
    membersMargin:20,
    members:[        
        isc.VLayout.create({
            membersMargin:20,
            members:[
                isc.Button.create({
                    title:"Fetch Unloaded Records",
                    click : function () {
                        var data = supplyList.data;
                        if (!data.rangeIsLoaded(0, data.getLength())) {
                            // getRange will fetch the requested rows from the server
                            data.getRange(0, data.getLength());
                        }
                    },
                    width:200
                }),
                isc.Button.create({
                    title:"Recreate Grid",
                    click : function () {
                        createGrid();
                    },
                    width:200
                })        
            ]
        })
    ]
})

function createGrid () {

    mainLayout.addMember(
        isc.ListGrid.create({
            ID: "supplyList",
            width:500, height:300, 
            dataSource: supplyItem,
            fields:[
                {name:"SKU"},
                {name:"itemName", filterEditorType:"SetFilterItem"},
                {name:"category", filterEditorType:"SetFilterItem",
                    optionDataSource:"supplyCategory",
                    valueField:"categoryName",
                    filterEditorProperties:{
                        deriveUniqueValues:false,
                        expandedPickListFields:[{name:"categoryName"}, {name:"parentID"}]
                    }
                },
                {name:"units", filterEditorType:"SetFilterItem"},
            ],
            autoFetchData: true,
            showFilterEditor: true,
            filterOnKeypress: true,
            fetchDelay: 500
        }),
        0
    );
}

createGrid();


// ---------------------------------------------------------------------------------------
// The code that follows is just to illustrate when SmartClient has needed to contact the
// server. It is not part of the example.
var origBGColor,
    restoreBGColorTimerID;

var dataSourceCommMonitorOverrides = {

    transformResponse: function (dsResponse) {
        if (this.dataFormat == "iscServer") this.updateRowCountLabel(dsResponse);
    },
    // This approach logs simulated server trips for SmartClient LGPL, where all DataSources
    // in the Feature Explorer are converted to clientOnly:true so that no server is required.
    getClientOnlyResponse : function (dsRequest) {
        var dsResponse = this.Super("getClientOnlyResponse", arguments);
        this.updateRowCountLabel(dsResponse);
        return dsResponse;
    },
    updateRowCountLabel : function (dsResponse) {
        serverCount.incrementAndUpdate(this.ID, dsResponse.totalRows, 
                                       dsResponse.startRow, 
                                       dsResponse.endRow);
        // Flash the label
        if (restoreBGColorTimerID == null) origBGColor = serverCount.backgroundColor;
        else isc.Timer.clear(restoreBGColorTimerID);
        serverCount.setBackgroundColor("#ffff77");
        restoreBGColorTimerID = isc.Timer.setTimeout(function () {
            restoreBGColorTimerID = null;
            serverCount.setBackgroundColor(origBGColor);
        }, 500);
    }
};
supplyItem.addProperties(dataSourceCommMonitorOverrides);
supplyCategory.addProperties(dataSourceCommMonitorOverrides);

isc.Label.create({
    ID: "serverCount",
    top: 320, padding: 10,
    width: 500, height: 40,
    border: "1px solid grey",
    contents: "<b>Number of server trips: 0</b>",
    count: 0,
    incrementAndUpdate: function (dataSource, totalRows, startRow, endRow) {
        this.count++;
        this.setContents("<b>Number of server trips: " + this.count + 
                         "<br><br>DataSource: \"" + dataSource  + "\"" +
                         "<br/>Total rows in this filter set: " + totalRows +
                         "<br/>Last range of records returned: " + 
                         startRow + " to " + endRow + "</b>");
    }
});