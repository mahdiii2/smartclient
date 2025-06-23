import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, TabSet, TreeGrid, Tree, ListGrid, LGField, SectionStack, SectionStackSection } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var treeGridRoot = {
    name: "root", 
    children: [
        {name: "File"},
        {name: "Edit"},
        {name: "Search"},
        {name: "Project"},
        {name: "Tools"},
        {name: "Window"},
        {name: "Favorites"}
    ]
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid ID="listGrid" autoDraw="false" dataSource="supplyItem" autoFitDateFields="both" width="80%" 
                    useAllDataSourceFields="true" autoFetchData="true"/>
    
        <TreeGrid ID="treeGrid" width="20%" showConnectors="true" showResizeBar="true">
            <fields>
                <LGField name="Navigation" formatCellValue="record.name"/>
            </fields>
            <data>
                <Tree modelType="children" root={treeGridRoot}/>
            </data>
        </TreeGrid>
    
        <SectionStack height="400" width="850" visibilityMode="multiple" border="1px solid blue" animateSections="true" 
                    overflow="hidden">
            <sections>
                <SectionStackSection title="Summary" expanded="true" 
                    items={[
                            <HLayout ID="navLayout" autoDraw="false">
                                <members>
                                    <value>treeGrid</value>
                                    <value>listGrid</value>
                                </members>
                            </HLayout>]}/>
                <SectionStackSection title="Details" expanded="true" 
                            items={[
                                    <TabSet ID="tabSet" autoDraw="false" tabs={[ {title: "View"}, {title: "Edit"} ]}/>]}/>
            </sections>
        </SectionStack>
    
    </>, 
    document.getElementById(target)
);

