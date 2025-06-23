import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ListGrid, LGField, ToolStripButton, ToolStrip, VLayout, DynamicForm,
         SavedSearchItem, ToolStripSeparator, FormLayout, RadioGroupItem
       } from 'smartclient-eval/react';

// A "render target" can be defined to allow JSX to be loaded dynamically into an existing application.
// This sample sets a different render target starting with "showcaseSample" for each JSX file so they
// can be rendered separately on the same page and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

isc.Authentication.setRoles(null);
isc.Auth.setCurrentUser({"userId":"showcaseSavedSampleViews"});

let ds = isc.DataSource.get("countryDS");

window.createMainUI = function() {

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="builtinViewsMenu" width="100%" height="200" recreateOnReactComponentUpdate="true"
                  autoFitData="horizontal" autoFitFieldWidths="true" leaveScrollBarGap="true"
                  canGroupBy="true" autoDraw="false" canFreezeFields="true" canAddFormulaFields="true"
                  canAddSummaryFields="true" dataSource={ds} autoFetchData="true"
                  showFilterEditor="true" allowFilterOperators="true">
            <fields>
                <LGField name="countryCode" title="Flag" type="image" width="70"
                         imageURLPrefix="flags/24/" imageURLSuffix=".png" canSort="false"/>
                <LGField name="countryName" title="Country" width="100"/>
                <LGField name="capital" title="Capital" width="100"/>
                <LGField name="population" title="Population" width="150"/>
                <LGField name="area" title="Area (km&sup2;)" width="200"/>
            </fields>
        </ListGrid>
    
        <ToolStripButton ID="formulaBuilder" autoDraw="false" showDownIcon="false"
                         icon="icons/16/sc_insertformula.png"  title="Formula Builder" autoFit="true"
                         click="builtinViewsMenu.addFormulaField();"/>

        <ToolStripButton ID="summaryBuilder" autoDraw="false" showDownIcon="false"
                         icon="icons/16/application_side_tree.png" title="Summary Builder"
                         autoFit="true" click="builtinViewsMenu.addSummaryField();"/>

        <ToolStrip ID="topStrip" width="100%" addFill="true" align="right" autoDraw="false">
            <members>
                <value>formulaBuilder</value>
                <value>summaryBuilder</value>
            </members>
        </ToolStrip>

        <VLayout ID="topContainer" autoDraw="false" width="750" height="240" layoutMargin="15"
                    groupTitle="Saved Search - Grid Menus">
            <members>
                <value>topStrip</value>
                <value>builtinViewsMenu</value>
            </members>
        </VLayout>
    
        <ListGrid ID="toolbarViewsMenu" width="100%" height="200" recreateOnReactComponentUpdate="true"
                  autoFitData="horizontal" autoFitFieldWidths="true" leaveScrollBarGap="true"
                  canGroupBy="true" autoDraw="false" canFreezeFields="true" canAddFormulaFields="true"
                  canAddSummaryFields="true" dataSource={ds} autoFetchData="true" showFilterEditor="true"
                  allowFilterOperators="true" canSaveSearches="false">
            <fields>
                <LGField name="countryCode" title="Flag" type="image" width="70"
                         imageURLPrefix="flags/24/" imageURLSuffix=".png" canSort="false"/>
                <LGField name="countryName" title="Country" width="100"/>
                <LGField name="capital" title="Capital" width="100"/>
                <LGField name="population" title="Population" width="150"/>
                <LGField name="area" title="Area (km&sup2;)" width="200"/>
            </fields>
        </ListGrid>
    
        <DynamicForm ID="gridView" width="300" numCols="2" autoDraw="false"
                     recreateOnReactComponentUpdate="true">
            <fields>
                <SavedSearchItem ID="gridViewItem" targetComponent="toolbarViewsMenu" width="220"
                                 canAddSearch="true" name="savedSeachItem"
                                 title="Grid View" showTitle="true"/>
            </fields>
        </DynamicForm>
    
        <ToolStripButton ID="bottomFormulaBuilder" autoDraw="false" showDownIcon="false"
                         icon="icons/16/sc_insertformula.png"  title="Formula Builder"
                         autoFit="true" click="toolbarViewsMenu.addFormulaField();"/>

        <ToolStripButton ID="bottomSummaryBuilder" autoDraw="false" showDownIcon="false"
                         icon="icons/16/application_side_tree.png" title="Summary Builder"
                         autoFit="true" click="toolbarViewsMenu.addSummaryField();"/>
    
        <ToolStrip ID="bottomStrip" width="100%" addFill="true" align="right" autoDraw="false">
            <members>
                <value>gridView</value>
                <ToolStripSeparator/>
                <value>bottomFormulaBuilder</value>
                <value>bottomSummaryBuilder</value>
            </members>
        </ToolStrip>
    
        <VLayout ID="bottomContainer" autoDraw="false" width="750" height="240"
                 layoutMargin="15" groupTitle="Saved Search - External Toolbar">
            <members>
                <value>bottomStrip</value>
                <value>toolbarViewsMenu</value>
            </members>
        </VLayout>
    </>, 
    document.getElementById(target)
);

}

createMainUI();
