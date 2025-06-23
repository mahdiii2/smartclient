var addDemographicsButton,
    aiDemographicsFieldName = "aiDemographics",
    addReligionsButton,
    aiReligionsFieldName = "aiReligions",
    addLandmarkButton,
    aiLandmarkFieldName = "aiLandmark";

var grid = isc.ListGrid.create({
    autoDraw: false,
    width: "100%", height: "100%",
    dataSource: "worldDS",
    fields:[
        {name:"countryCode", title:"Code", width:70},
        {name:"countryName", width:235},
        {name:"independence", title:"Nationhood", width:125},
        {name:"population", width:125},
        {name:"gdp", width:125}
    ],
    initialCriteria: {
        "continent": "South America"
    },
    initialSort: [{
        property: "countryName",
        direction: "ascending"
    }],
    autoFetchData: true, dataFetchMode: "paged",
    autoFitData: "horizontal",
    autoFitWidthApproach: "both",
    minFieldWidth: 70,
    wrapCells: true,
    fixedRecordHeights: false,

    canAddAISummaryFields: true,

    // To display the hover when an AI-generated field's value is being computed, or an error
    // occurs during that asynchronous computation, we need canHover:true and showHover:true.
    canHover: true,
    showHover: true,
    showClippedValuesOnHover: true,
    cellHover : function (record, rowNum, colNum) {
        if (this.cellValueIsClipped(rowNum, colNum)) return;
        var field = this.getField(colNum);
        if (this.isValuePendingAsyncOrAsyncError(record, field)) return;
        return false;
    },
    cellHoverHTML : function (record, rowNum, colNum) {
        var field = this.getField(colNum);
        // Customize the hover contents if the value for a cell is being computed.
        if (this.isValuePendingAsync(record, field)) {
            return "This value for " + record.countryName + " is being computed.";
        }
        // Otherwise (if an error occurred trying to calculate a value, or a value is clipped)
        // defer to the standard cellHoverHTML() implementation.
        return this.Super("cellHoverHTML", arguments);
    },

    userRemovedField : function (field) {
        if (field.name == aiDemographicsFieldName) {
            addDemographicsButton.enable();
        } else if (field.name == aiReligionsFieldName) {
            addReligionsButton.enable();
        } else if (field.name == aiLandmarkFieldName) {
            addLandmarkButton.enable();
        }
        // The "Custom Prompt" button is always enabled.
    }
});

function addAISummaryField(fieldProps, aiFieldRequest) {
    var fields = grid.getFields();
    // Duplicate the array because the result of getFields() should be treated as read-only.
    fields = fields.duplicate();
    var existingIndex = fields.findIndex("name", fieldProps.name);
    if (existingIndex >= 0) fields.removeAt(existingIndex);
    fieldProps = isc.addProperties(isc.AI.applyAIFieldRequestToFieldDefaults(aiFieldRequest, {
        width: 180,
        wrap: true
    }), fieldProps);
    fields.addAt(fieldProps, existingIndex < 0 ? fields.length : existingIndex);
    grid.setFields(fields);
}

var aiCustomFieldName = "aiCustom";
var customPromptButton = isc.Button.create({
    autoFit: true,
    title: "Custom Prompt&hellip;",
    click : function () {
        isc.askForValue("Enter a prompt for the AI to evaluate on each record", function (newPrompt) {
            if (newPrompt == null) return;

            newPrompt = newPrompt.trim();

            if (newPrompt == "") {
                var fields = grid.getFields(),
                    existingIndex = fields.findIndex("name", aiCustomFieldName);
                if (existingIndex >= 0) {
                    fields = fields.duplicate();
                    fields.removeAt(existingIndex);
                    grid.setFields(fields);
                }
                return;
            }

            var buildRequest = {
                userAIRequest: {prompt: newPrompt},
                showProgressDialog: true,
                component: grid,
                dataSource: grid.getDataSource()
            };

            isc.AI.asyncBuildAIFieldRequest(buildRequest)
                .then(function (buildResponse) {
                    var aiFieldRequest = buildResponse.aiFieldRequest;

                    addAISummaryField({name:aiCustomFieldName, title:"Custom Prompt Result", width:"*", wrap:true},
                                      aiFieldRequest);
                },
                function (nonSuccessfulResult) {
                    if (nonSuccessfulResult.type != "canceled") {
                        isc.warn(isc.getAsyncMessage(nonSuccessfulResult).asHTML());
                    }
                });
        });
    }
});

var buttonsLayout = isc.HStack.create({
    autoDraw: false,
    height: "*",
    membersMargin: 8,
    members: [
        addDemographicsButton = isc.Button.create({
            autoDraw: false,
            autoFit: true,
            title: "Add Demographics",
            click : function () {
                var aiFieldRequest = {
                    prompt: "a 2-4 sentence demographic and economic description of the country",
                    valueClass: "general",
                    relevantFieldNames: ["countryName"],
                    maxRecordsPerBatch: 6
                };
                addAISummaryField({name:aiDemographicsFieldName, title:"Demographics Summary", width:"*", minWidth: 300},
                                  aiFieldRequest);
                this.disable();
            }
        }),
        addReligionsButton = isc.Button.create({
            autoDraw: false,
            autoFit: true,
            title: "Add Religions",
            click : function () {
                var aiFieldRequest = {
                    prompt: "most common religions, as a comma-separated list",
                    valueClass: "general",
                    relevantFieldNames: ["countryName"]
                };
                addAISummaryField({name:aiReligionsFieldName, title:"Common Religions"},
                                  aiFieldRequest);
                this.disable();
            }
        }),
        addLandmarkButton = isc.Button.create({
            autoDraw: false,
            autoFit: true,
            title: "Add Landmark",
            click : function () {
                var aiFieldRequest = {
                    prompt: "most famous landmark",
                    valueClass: "general",
                    relevantFieldNames: ["countryName"]
                };
                addAISummaryField({name:aiLandmarkFieldName, title:"Famous Landmark"},
                                  aiFieldRequest);
                this.disable();
            }
        }),
        customPromptButton
    ]
});

isc.VLayout.create({
    width: "100%",
    height: "100%",
    membersMargin: 10,
    members: [buttonsLayout, grid]
});

