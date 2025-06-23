/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, EditPane, HLayout, HiddenPalette, IButton, LGField, LayoutSpacer, ListGridRecord, ListPalette, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onPaletteLayoutRecordDoubleClick = function (viewer, record, recordNum, field, fieldNum, value, rawValue) {
    this.creator.dashboardWindow.close();
    this.creator.editDashboard(record);
};
let onPaletteLayoutInitWidget = function () {
    var _this = this;
    this.addMember(isc.LayoutSpacer.create({ width: '*' }));
    this.addMember(isc.IButton.create({
        title: 'Load Dashboard',
        click: function () {
            var paletteLayout = _this.creator;
            var dashboardList = paletteLayout.dashboardList;
            var dashboard = dashboardList.getSelectedRecord();
            if (dashboard == null)
                return;
            paletteLayout.dashboardWindow.close();
            paletteLayout.editDashboard(dashboard);
        }
    }));
    this.addMember(isc.IButton.create({
        title: 'Cancel',
        click: function () {
            _this.creator.dashboardWindow.close();
        }
    }));
    return this.Super('initWidget', arguments);
};
let onPaletteLayoutClearCurrentDashboard = function () {
    editPane.destroyAll();
    this._currentRecord = null;
};
let onPaletteLayoutEditDashboard = function (dashboardRecord) {
    this.clearCurrentDashboard();
    if (dashboardRecord) {
        editPane.setPortal(dashboardRecord.layout);
    }
    this._currentRecord = dashboardRecord;
};
let onPaletteLayoutNewDashboard = function () {
    this.clearCurrentDashboard();
    editPane.setInitialPortal(initialPortalPaletteNode);
};
let onPaletteLayoutRefreshDashboard = function () {
    var dashboard = this._currentRecord;
    this.clearCurrentDashboard();
    this.editDashboard(dashboard);
};
let onPaletteLayoutSaveDashboard = function () {
    var editNodes = editPane.getEditNodeTree().getDescendants();
    var hasPortlet = false;
    for (var i = 0; i < editNodes.length; i++) {
        if (isc.isA.Portlet(isc.ClassFactory.getClass(editNodes[i].type))) {
            hasPortlet = true;
            break;
        }
    }
    if (!hasPortlet)
        return;
    var editNodes = editPane.serializeAllEditNodes({ indent: false });
    if (this._currentRecord) {
        this._currentRecord.layout = editNodes;
        this.dashboardDS.updateData(this._currentRecord, function () {
            isc.say('Dashboard has been saved');
        });
    } else {
        var _this = this;
        isc.askForValue('Enter a brief description for this dashboard', function (value) {
            var record = {
                description: value,
                layout: editNodes
            };
            _this.dashboardDS.addData(record, function (response, data, request) {
                _this._currentRecord = data;
                isc.say('Dashboard has been saved with description: \'' + value + '\'');
            });
        }, { title: 'Dashboard Description' });
    }
};
let onPaletteLayoutLoadDashboard = function () {
    if (this.dashboardWindow == null) {
        this.dashboardList = this.createAutoChild('dashboardList');
        this.dashboardToolbar = this.createAutoChild('dashboardToolbar');
        this.dashboardWindow = this.createAutoChild('dashboardWindow', {
            items: [
                this.dashboardList,
                this.dashboardToolbar
            ]
        });
    }
    this.dashboardWindow.show();
};
let onAiLayoutInitWidget = function () {
    var bar = this;
    this.addMembers([
        isc.Label.create({
            width: 80,
            vAlign: 'center',
            align: 'center',
            contents: 'Samples:'
        }),
        isc.ToolStripButton.create({
            title: 'Carnivores',
            prompt: 'Example prompt to show a list of records from the animals dataSource',
            click: function () {
                bar.creator.aiPortletForm.setValue('userPrompt', 'Show a filterable list of all Carnivores, sorted by life span and grouped by endangered status');
            }
        }),
        isc.ToolStripButton.create({
            title: 'Average cost',
            prompt: 'Example prompt to show a list of aggregated data from the SupplyItem dataSource',
            click: function () {
                bar.creator.aiPortletForm.setValue('userPrompt', 'List the average unit cost of Office Supplies in each category');
            }
        }),
        isc.ToolStripButton.create({
            title: 'Population by continent',
            prompt: 'Example prompt to build a chart of aggregated data from the Countries dataSource',
            click: function () {
                bar.creator.aiPortletForm.setValue('userPrompt', 'Show the total population per continent in a pie chart');
            }
        }),
        isc.ToolStripButton.create({
            title: 'Size of Europe',
            prompt: 'Example prompt to display a single calculated value from the Countries dataSource',
            click: function () {
                bar.creator.aiPortletForm.setValue('userPrompt', 'How large is Europe?');
            }
        })
    ]);
    return this.Super('initWidget', arguments);
};
let onCreateViewClick = function () {
    var userPrompt = this.form.getValue('userPrompt');
    if (userPrompt == null || userPrompt == '')
        return;
    var creator = this.form.creator;
    creator.requestNewAIPortlet(userPrompt);
};
let onAiLayoutInitWidget1 = function () {
    this.addAutoChild('aiPromptSuggestionsBar');
    this.addAutoChild('aiPortletForm');
    this.addAutoChild('aiPortletForm');
    return this.Super('initWidget');
};
let onAiLayoutRequestNewAIPortlet = function (userPrompt) {
    var buildRequest = {
        availableDataSources: [
            animals,
            supplyItem,
            worldDS
        ],
        userAIRequest: { prompt: userPrompt }
    };
    isc.AI.buildDataBoundUI(buildRequest, {
        target: this,
        methodName: 'processAIPortletCode'
    });
};
let onAiLayoutProcessAIPortletCode = function (response, request) {
    this.aiPortletForm.clearValue('userPrompt');
    if (response.nodes == null || response.nodes.length == 0) {
        var errorMessage = 'Unable to process request';
        if (response.errorMessage)
            errorMessage += '\n\n' + response.errorMessage;
        isc.say(errorMessage.asHTML());
    } else {
        this.displayAIPortlet(response);
    }
};
let onAiLayoutDisplayAIPortlet = function (response) {
    var code = response.jsCode;
    var codeStringPortlet = {
        type: 'CodeStringPortlet',
        defaults: {
            destroyOnClose: true,
            title: 'AI-Generated View',
            codeString: code
        }
    };
    editPane.addFromPaletteNode(codeStringPortlet);
};
let onEditPaneSetInitialPortal = function (paletteNode) {
    var editNode = this.addFromPaletteNode(paletteNode);
    this.getEditContext().defaultParent = editNode;
};
let onEditPaneSetPortal = function (xml) {
    var editContext = this.getEditContext(), editTree = editContext.getEditNodeTree(), rootNode = editContext.getRootEditNode();
    this.addPaletteNodesFromXML(xml, null, null, function (paletteNodes) {
        var childNodes = editTree.getChildren(rootNode), editNode = childNodes && childNodes.length > 0 ? childNodes[0] : null;
        editContext.defaultParent = editNode;
    });
};
let onSaveButtonClick = function () {
    paletteLayout.saveDashboard();
};
let onLoadButtonClick = function () {
    paletteLayout.loadDashboard();
};
let onNewButtonClick = function () {
    paletteLayout.newDashboard();
};

isc.logWarn('DOING IT:' + window.animals);
if (window.animals) {
    animals.title = 'Animals of the world';
    animals.description = 'A DataSource containing information about animals of the world';
}
if (window.supplyItem) {
    supplyItem.title = 'Office Supplies';
    supplyItem.description = 'Catalog of available wholesale Office Supplies';
}
if (window.supplyCategory) {
    supplyCategory.title = 'Office Supply categories';
    supplyCategory.description = 'Hierarchy of categories for Office Supplies';
}
if (window.worldDS) {
    worldDS.title = 'Countries of the world';
}
var initialPortalPaletteNode = {
    type: 'PortalLayout',
    defaults: {
        width: '100%',
        height: '100%',
        numColumns: 1,
        canResizePortlets: true
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout width="100%" height="100%" autoDraw="true">
        <members>
            <VLayout layoutMargin="5" membersMargin="3" ID="paletteLayout" width="100%" height="100%" showResizeBar="true" autoDraw="false" dashboardWindowConstructor="Window" dashboardListConstructor="ListGrid" dashboardToolbarConstructor="HLayout" clearCurrentDashboard={onPaletteLayoutClearCurrentDashboard} editDashboard={onPaletteLayoutEditDashboard} newDashboard={onPaletteLayoutNewDashboard} refreshDashboard={onPaletteLayoutRefreshDashboard} saveDashboard={onPaletteLayoutSaveDashboard} loadDashboard={onPaletteLayoutLoadDashboard} dashboardDS="withID:ai_dashboards">
                <members>
                    <VLayout ID="aiLayout" width="100%" height="*" isGroup="true" groupTitle="Create a view using AI" autoDraw="false" aiPromptSuggestionsBarConstructor="ToolStrip" aiPortletFormConstructor="DynamicForm" initWidget={onAiLayoutInitWidget1} requestNewAIPortlet={onAiLayoutRequestNewAIPortlet} processAIPortletCode={onAiLayoutProcessAIPortletCode} displayAIPortlet={onAiLayoutDisplayAIPortlet}>
                        <aiPromptSuggestionsBarDefaults>
                        	<isGroup>true</isGroup>
                        	
                        </aiPromptSuggestionsBarDefaults>
                        <aiPortletFormDefaults>
                        	<width>100%</width>
                        	<height>*</height>
                        	<numCols>1</numCols>
                        	<items>
                        		<elem>
                        			<editorType>TextAreaItem</editorType>
                        			<hint>Describe the view you'd like to create, or choose an example prompt from the buttons above</hint>
                        			<showHintInField>true</showHintInField>
                        			<name>userPrompt</name>
                        			<showTitle>false</showTitle>
                        			<width>*</width>
                        			<height>*</height>
                        		</elem>
                        		<elem>
                        			<editorType>ButtonItem</editorType>
                        			<title>Create View</title>
                        			
                        		</elem>
                        	</items>
                        </aiPortletFormDefaults>
                    </VLayout>
                    <ListPalette ID="listPalette" leaveScrollbarGap="false" showHeader="false" autoFitData="vertical" width="100%" isGroup="true" groupTitle="Available Datasets (double-click to add as list)" autoDraw="false">
                        <data>
                            <ListGridRecord title="Animals" type="ListGrid">
                                <defaults>
                                	<dataSource>animals</dataSource>
                                	<autoFetchData>true</autoFetchData>
                                	<showFilterEditor>true</showFilterEditor>
                                	<useAllDataSourceFields>true</useAllDataSourceFields>
                                </defaults>
                            </ListGridRecord>
                            <ListGridRecord title="Supply Items" type="ListGrid">
                                <defaults>
                                	<dataSource>supplyItem</dataSource>
                                	<autoFetchData>true</autoFetchData>
                                	<showFilterEditor>true</showFilterEditor>
                                	<useAllDataSourceFields>true</useAllDataSourceFields>
                                </defaults>
                            </ListGridRecord>
                            <ListGridRecord title="Countries" type="ListGrid">
                                <defaults>
                                	<dataSource>worldDS</dataSource>
                                	<autoFetchData>true</autoFetchData>
                                	<showFilterEditor>true</showFilterEditor>
                                	<useAllDataSourceFields>true</useAllDataSourceFields>
                                </defaults>
                            </ListGridRecord>
                        </data>
                        <fields>
                            <LGField name="title"/>
                        </fields>
                    </ListPalette>
                </members>
                <dashboardWindowDefaults>
                	<title>Saved Dashboards</title>
                	<modal>true</modal>
                	<autoCenter>true</autoCenter>
                	<width>500</width>
                	<height>500</height>
                </dashboardWindowDefaults>
                <dashboardListDefaults>
                	<dataSource>ai_dashboards</dataSource>
                	<autoFetchData>true</autoFetchData>
                	<selectionType>single</selectionType>
                	<sortField>description</sortField>
                	<leaveScrollbarGap>false</leaveScrollbarGap>
                	<canRemoveRecords>true</canRemoveRecords>
                	<fields>
                		<elem>
                			<name>description</name>
                		</elem>
                	</fields>
                	
                </dashboardListDefaults>
                <dashboardToolbarDefaults>
                	<height>30</height>
                	<membersMargin>5</membersMargin>
                	
                </dashboardToolbarDefaults>
            </VLayout>
            <VLayout layoutMargin="5" membersMargin="3" ID="dashboardLayout" width="100%" height="100%" autoDraw="false">
                <members>
                    <EditPane ID="editPane" autoDraw="false" setInitialPortal={onEditPaneSetInitialPortal} setPortal={onEditPaneSetPortal}>
                        <extraPalettes>
                            <HiddenPalette>
                                <data>
                                    <Object>
                                    	<title>ListGridField</title>
                                    	<type>ListGridField</type>
                                    </Object>
                                </data>
                            </HiddenPalette>
                        </extraPalettes>
                    </EditPane>
                    <HLayout defaultLayoutAlign="center" membersMargin="10" ID="editToolbar" height="30" autoDraw="false">
                        <members>
                            <LayoutSpacer/>
                            <IButton autoFit="true" title="Save" ID="saveButton" autoDraw="false" click={onSaveButtonClick}/>
                            <IButton autoFit="true" title="Load Dashboard" ID="loadButton" autoDraw="false" click={onLoadButtonClick}/>
                            <IButton autoFit="true" title="Create New" ID="newButton" autoDraw="false" click={onNewButtonClick}/>
                        </members>
                    </HLayout>
                </members>
            </VLayout>
        </members>
    </HLayout>,
    document.getElementById(target)
);

listPalette.setDefaultEditContext(editPane);
editPane.setDefaultPalette(listPalette);
editPane.setInitialPortal(initialPortalPaletteNode);
