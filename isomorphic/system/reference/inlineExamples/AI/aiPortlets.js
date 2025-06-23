    // Palette Node used to create a default portal
    var initialPortalPaletteNode = {
        type: "PortalLayout",
        defaults: {
            width: "100%",
            height: "100%",
            numColumns:1,
            canResizePortlets: true
        }
    };

    // User Interface to request portlet user interface from the AI based on a user prompt
    isc.VLayout.create({
        ID:"aiLayout",
        autoDraw:false,
        width:"100%", height:"*",

        isGroup:true, groupTitle:"Create a view using AI",

        aiPromptSuggestionsBarConstructor:"ToolStrip",
        aiPromptSuggestionsBarDefaults : {
            isGroup:true,
            initWidget : function () {
                var bar = this;
                this.addMembers([
                    isc.Label.create({
                        width:80,
                        vAlign:"center", align:"center", contents:"Samples:"
                    }),
                    isc.ToolStripButton.create({
                        title:"Carnivores",
                        prompt:"Example prompt to show a list of records from the animals dataSource",
                        click : function () {
                            bar.creator.aiPortletForm.setValue(
                                "userPrompt", "Show a filterable list of all Carnivores, sorted by life span and grouped by endangered status"
                            );
                        }
                    }),
                    isc.ToolStripButton.create({
                        title:"Average cost",
                        prompt:"Example prompt to show a list of aggregated data from the SupplyItem dataSource",
                        click : function () {
                            bar.creator.aiPortletForm.setValue(
                                "userPrompt", "List the average unit cost of Office Supplies in each category"
                            );
                        }
                    }),
                    isc.ToolStripButton.create({
                        title:"Population by continent",
                        prompt:"Example prompt to build a chart of aggregated data from the Countries dataSource",
                        click : function () {
                            bar.creator.aiPortletForm.setValue(
                                "userPrompt", "Show the total population per continent in a pie chart"
                            );
                        }
                    }),
                    isc.ToolStripButton.create({
                        title:"Size of Europe",
                        prompt:"Example prompt to display a single calculated value from the Countries dataSource",
                        click : function () {
                            bar.creator.aiPortletForm.setValue(
                                "userPrompt", "How large is Europe?"
                            );
                        }
                    })                    
                ]);
                return this.Super("initWidget", arguments);
            }
        },
        aiPortletFormConstructor:"DynamicForm",
        aiPortletFormDefaults:{
            width:"100%", height:"*",
            numCols:1,
            items:[
                {
                    editorType:"TextAreaItem",
                    hint:"Describe the view you'd like to create, or choose an example prompt from the buttons above",
                    showHintInField:true,
                    name:"userPrompt", showTitle:false, width:"*", height:"*"
                },
                {
                    editorType:"ButtonItem",
                    title:"Create View",
                    click:function () {
                        var userPrompt = this.form.getValue("userPrompt");
                        if (userPrompt == null || userPrompt == "") return;

                        var creator = this.form.creator;
                        creator.requestNewAIPortlet(userPrompt);
                    }
                }
            ]
        },
        initWidget : function () {
            this.addAutoChild("aiPromptSuggestionsBar");
            this.addAutoChild("aiPortletForm");
            this.addAutoChild("aiPortletForm");
            return this.Super("initWidget");
        },

        requestNewAIPortlet : function (userPrompt) {

            var buildRequest = {
                availableDataSources:[
                    animals,supplyItem,worldDS
                ],
                userAIRequest:{
                    prompt:userPrompt
                }
            };

            isc.AI.buildDataBoundUI(
                buildRequest,
                {target:this, methodName:"processAIPortletCode"}
            );
        },
        processAIPortletCode : function (response, request) {
            this.aiPortletForm.clearValue("userPrompt");
            
            if (response.nodes == null || response.nodes.length == 0) {
                // response is an informational error message
                var errorMessage = "Unable to process request";
                if (response.errorMessage) errorMessage += "\n\n" + response.errorMessage;
                isc.say(errorMessage.asHTML());
            } else {
                this.displayAIPortlet(response);
            }
        },
        displayAIPortlet : function (response) {
            // // Add a portlet to the portal layout that will hold our AI-created contents
            // var portlet = {
            //     type: "Portlet",
            //     defaults: {
            //         destroyOnClose:true,
            //         title:"AI-Generated View"
            //     }
            // };
            // var portletNode = editPane.addFromPaletteNode(portlet);

            // // Add our AI content to our portlet
            // editPane.addFromPaletteNodes(response.nodes, portletNode);
            
            var code = response.jsCode;
            // Add a CodeStringPortlet paletteNode to the edit pane
            // This will generate the actual Portlet in the Portal Layout and
            // allow us to store the serialized code
            var codeStringPortlet = {
                type: "CodeStringPortlet",
                defaults: {
                    destroyOnClose:true,
                    title:"AI-Generated View",
                    codeString:code
                }
            };
            editPane.addFromPaletteNode(codeStringPortlet);

        }
    })


    // The ListPalette contains components available
    // for use, with default settings.
    // In this case a ListGrid for each available dataSource
    isc.ListPalette.create({
        ID: "listPalette",
        autoDraw:false,
        width:"100%",
        autoFitData:"vertical",
        leaveScrollbarGap: false,
        
        isGroup:true, groupTitle:"Available Datasets (double-click to add as list)",
    
        // The regular ListGrid property
        showHeader:false,
        fields: [
            {name: "title"}
        ],

        // We are supplying the component data inline for this example.
        // However, ListPalette is a subclass of ListGrid, so you could
        // also use a dataSource.
        data: [
            {
                title: "Animals", 
                type: "ListGrid", 
                defaults: {
                    dataSource: "animals",
                    autoFetchData: true,
                    showFilterEditor: true,
                    useAllDataSourceFields: true
                }
            },{
                title: "Supply Items", 
                type: "ListGrid", 
                defaults: {
                    dataSource: "supplyItem",
                    autoFetchData: true,
                    showFilterEditor: true,
                    useAllDataSourceFields: true
                }
            },
            {
                title: "Countries", 
                type: "ListGrid", 
                defaults: {
                    dataSource: "worldDS",
                    autoFetchData: true,
                    showFilterEditor: true,
                    useAllDataSourceFields: true
                }
            }
        ]


    });
    
    isc.VLayout.create({
        ID:"paletteLayout",
        width:"100%",
        height:"100%",
        showResizeBar:true,
        autoDraw:false,

        dashboardDS:ai_dashboards,

        // User interface to view saved dashboards

        dashboardWindowConstructor:"Window",
        dashboardWindowDefaults : {
            title:"Saved Dashboards",
            modal:true,
            autoCenter:true,
            width:500, height:500
        },
        dashboardListConstructor:"ListGrid",
        dashboardListDefaults : {
            dataSource: "ai_dashboards",
            autoFetchData: true,
            selectionType: "single",
            sortField: "description",
            leaveScrollbarGap: false,
    
            // (Allow removal of dashboards)
            canRemoveRecords: true,
    
            fields: [ { name: "description" } ],
    
            recordDoubleClick : function (viewer, record, recordNum, field, fieldNum, value, rawValue) {
                this.creator.dashboardWindow.close();
                this.creator.editDashboard(record);
            }
        },

        dashboardToolbarConstructor:"HLayout",
        dashboardToolbarDefaults:{
            height:30,
            membersMargin:5,
            initWidget : function () {
                var _this = this;
                this.addMember(isc.LayoutSpacer.create({width:"*"}));
                this.addMember(isc.IButton.create({
                    title:"Load Dashboard",
                    click : function () {
                        var paletteLayout = _this.creator;
                        var dashboardList = paletteLayout.dashboardList;
                        var dashboard = dashboardList.getSelectedRecord();

                        if (dashboard == null) return;

                        paletteLayout.dashboardWindow.close();
                        paletteLayout.editDashboard(dashboard);
                    }
                }));
                this.addMember(isc.IButton.create({
                    title:"Cancel",
                    click : function () {
                        _this.creator.dashboardWindow.close();
                    }
                }));
                return this.Super("initWidget", arguments);
            }
        },

        // APIs to edit and save dashboards
        
        clearCurrentDashboard : function () {
            editPane.destroyAll();
            this._currentRecord = null;
        },

        editDashboard : function (dashboardRecord) {   
            this.clearCurrentDashboard();
            if (dashboardRecord) {
                editPane.setPortal(dashboardRecord.layout);
            }
            this._currentRecord = dashboardRecord;
        },

        newDashboard : function () {
            this.clearCurrentDashboard();

            // Add a PortalLayout to the editPane
            editPane.setInitialPortal(initialPortalPaletteNode);
        },
        
        refreshDashboard : function () {
            var dashboard = this._currentRecord;
            this.clearCurrentDashboard();
            this.editDashboard(dashboard);
        },

        saveDashboard : function () {
            // Never save an empty dashboard
            var editNodes = editPane.getEditNodeTree().getDescendants();
            var hasPortlet = false;
            for (var i = 0; i < editNodes.length; i++) {
                if (isc.isA.Portlet(isc.ClassFactory.getClass(editNodes[i].type))) {
                    hasPortlet = true;
                    break;
                }
            }
            if (!hasPortlet) return;

            var editNodes = editPane.serializeAllEditNodes({ indent: false });

            if (this._currentRecord) {
                this._currentRecord.layout = editNodes;
                this.dashboardDS.updateData(this._currentRecord, function () {
                    isc.say("Dashboard has been saved");
                });
            } else {
                var _this = this;
                isc.askForValue("Enter a brief description for this dashboard",
                    function (value) {
                        var record = { description: value, layout: editNodes }
                        _this.dashboardDS.addData(record, function (response, data, request) {
                            _this._currentRecord = data;
                            isc.say("Dashboard has been saved with description: '" + value + "'");
                        });
                    },
                    {
                        title:"Dashboard Description"
                    }
                );
            }

        },

        loadDashboard : function () {
            if (this.dashboardWindow == null) {
                this.dashboardList = this.createAutoChild("dashboardList");
                this.dashboardToolbar = this.createAutoChild("dashboardToolbar");
                this.dashboardWindow = this.createAutoChild("dashboardWindow", {items:[this.dashboardList, this.dashboardToolbar]});
            }
            this.dashboardWindow.show();
        },

        layoutMargin:5,   
        membersMargin:3,     
        members:[
            aiLayout,
            listPalette
        ]
    })
    
    isc.EditPane.create({
        ID: "editPane",
        autoDraw:false,
        extraPalettes: isc.HiddenPalette.create({
            data: [
            { title: "ListGridField", type: "ListGridField" }
            ]
        }),
        setInitialPortal : function (paletteNode) {
            var editNode = this.addFromPaletteNode(paletteNode);
            this.getEditContext().defaultParent = editNode;
        },
        setPortal : function (xml) {
            var editContext = this.getEditContext(),
                editTree = editContext.getEditNodeTree(),
                rootNode = editContext.getRootEditNode()
            ;
            this.addPaletteNodesFromXML(xml, null, null, function (paletteNodes) {
                // PortalLayout is assumed to be the first node under root.
                var childNodes = editTree.getChildren(rootNode),
                    editNode = (childNodes && childNodes.length > 0 ? childNodes[0] : null)
                ;
                editContext.defaultParent = editNode;
            });
        }
    });

    // Make the new editPane the default Edit Context for the palette,
    // to support double-clicking on components in the palette to create them
    listPalette.setDefaultEditContext(editPane);
    editPane.setDefaultPalette(listPalette);

    // Add a PortalLayout to the editPane
    editPane.setInitialPortal(initialPortalPaletteNode);

    isc.IButton.create({
        ID: "saveButton",
        autoDraw:false,
        title: "Save",
        autoFit: true,
        click : function () {
            paletteLayout.saveDashboard();
        }
    });

    isc.IButton.create({
        ID: "loadButton",
        autoDraw:false,
        title: "Load Dashboard",
        autoFit: true,
        click : function () {
            paletteLayout.loadDashboard();
        }
    });

    isc.IButton.create({
        ID: "newButton",
        autoDraw:false,
        title: "Create New",
        autoFit: true,
        click : function () {
            paletteLayout.newDashboard();
        }
    });

    isc.HLayout.create({
        ID: "editToolbar",
        autoDraw:false,
        height: 30,
        membersMargin: 10,
        defaultLayoutAlign: "center",

        members: [
            isc.LayoutSpacer.create(),
            saveButton,
            loadButton,
            newButton
        ]
    })

    isc.VLayout.create({
        ID: "dashboardLayout",
        autoDraw:false,
        width: "100%",
        height: "100%",
        layoutMargin:5, membersMargin:3,
        members: [
            editPane,
            editToolbar
        ]
    });

    isc.HLayout.create({
        width: "100%",
        height: "100%",
        members: [paletteLayout, dashboardLayout],
        autoDraw:true
    });
