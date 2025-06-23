import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ListGrid, LGField, DynamicForm, SelectItem, ToolStripButton, ToolStrip, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let ds = isc.DataSource.get("countryDS");
let tableDS = isc.DataSource.get("gridUserViewState");

var drawCountryGrid = function() {
    this.Super("draw", arguments);
    viewStateTable.fetchData({}, function(dsResponse, data) {
            var defaultRecord = false;
            for (var i=0; i<data.length; i++) {
                if (data[i].name == "Default") {
                    defaultRecord = true;
                    break;
                }
            }
            if (!defaultRecord || data.length == 0) viewStateTable.addData({
                name: "Default", viewState: countryGrid.getViewState()
            });
        }
    );   
    preferenceSelectItem.setValue("Default");
}  

var changedSelectItem = function (form, item, value) {
    var criteria = {name: value};
    tableDS.fetchData(criteria, function(dsResponse, data) {
        if (data.length != 0) {
            var selectedViewState = data[0].viewState;
            countryGrid.setViewState(selectedViewState);
        }
    }); 
} 

var clickToolStripButton = function () {
    isc.askForValue("Save Preference as", function(value) {
        if (value) {
            viewStateTable.addData({
                name: value, viewState: countryGrid.getViewState()
            });
            preferenceSelectItem.setValue(value);
        }
    }, {width: 300, height: 100});
} 

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="viewStateTable" height="200" width="100%" wrapCells="true" fixedRecordHeights="false" canEdit="true"
                    autoDraw="false" emptyMessage="No Saved Preferences" canRemoveRecords="true" autoFetchData="true"
                    dataSource={tableDS}>
            <fields>
                <LGField name="name" title="Preference" width="130"/>
                <LGField name="viewState" title="View State String" editorType="TextAreaItem"/>
            </fields>
        </ListGrid>

        <ListGrid ID="countryGrid" width="100%" height="200" leaveScrollBarGap="true"
                  sparseFieldState="true" canGroupBy="true" autoDraw="false"
                  canFreezeFields="true" canAddFormulaFields="true" canAddSummaryFields="true"
                    dataSource={ds} autoFetchData="true" draw={drawCountryGrid}>
            <fields>
                <LGField name="countryCode" title="Flag" type="image" width="60"
                         imageURLPrefix="flags/24/" imageURLSuffix=".png"
                    canSort="false"/>
                <LGField name="countryName" title="Country"/>
                <LGField name="capital" title="Capital"/>
                <LGField name="population" title="Population"/>
                <LGField name="area" title="Area (km&sup2;)"/>
            </fields>
        </ListGrid>
    
        <DynamicForm top="45" width="200" ID="preferenceForm" numCols="2" autoDraw="false">
            <fields>
                <SelectItem name="name" title="Preference" ID="preferenceSelectItem" displayField="name"
                        addUnknownValues="true" optionDataSource={tableDS} changed={changedSelectItem}/>
            </fields>
        </DynamicForm>
    
        <ToolStripButton ID="formulaBuilder" autoDraw="false" showDownIcon="false" icon="icons/16/sc_insertformula.png"
                    title="Formula Builder" autoFit="true" click="countryGrid.addFormulaField();"/>
        
        <ToolStripButton ID="summaryBuilder" autoDraw="false" showDownIcon="false" icon="icons/16/application_side_tree.png"
                    title="Summary Builder" autoFit="true" click="countryGrid.addSummaryField();"/>
    
        <ToolStripButton ID="savePreference" icon="icons/16/database_gear.png" showDownIcon="false" title="Save Preference"
                    autoDraw="false" autoFit="true" click={clickToolStripButton}/>
    
        <ToolStrip ID="preferenceStrip" width="100%" addFill="true" align="right" autoDraw="false">
            <members>
                <value>formulaBuilder</value>
                <value>summaryBuilder</value>
                <value>separator</value>
                <value>savePreference</value>
                <value>separator</value>
                <value>preferenceForm</value>
            </members>
        </ToolStrip>   
    
        <ToolStripButton ID="restoreState" autoDraw="false" title="Restore State" showDownIcon="false" icon="icons/16/database_gear.png"  
                    autoFit="true" click={function () {
                                                var selectedViewState = viewStateTable.getSelectedRecord().viewState;
                                                preferenceSelectItem.setValue(viewStateTable.getSelectedRecord().name);
                                                countryGrid.setViewState(selectedViewState);
                                            }}/>
    
        <ToolStrip ID="restoreStrip" width="100%" addFill="true" autoDraw="false" align="right">
            <members>
                <value>restoreState</value>
            </members>
        </ToolStrip>  
    
        <VLayout height="100%" minBreadthMember="preferenceStrip">
            <members>
                <value>preferenceStrip</value>
                <value>countryGrid</value>
                <value>viewStateTable</value>
                <value>restoreStrip</value>
            </members>
        </VLayout>
    </>, 
    document.getElementById(target)
);
