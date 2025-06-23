/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, HStack, PickTreeItem, Tree, TreeNode } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack width="100%">
        <members>
            <DynamicForm autoDraw="false">
                <fields>
                    <PickTreeItem valueField="name" name="department" title="Department">
                        <valueTree modelType="children">
                            <root name="root">
                                <children>
                                    <TreeNode name="Marketing">
                                        <children>
                                            <TreeNode name="Advertising"/>
                                            <TreeNode name="Community Relations"/>
                                        </children>
                                    </TreeNode>
                                    <TreeNode name="Sales">
                                        <children>
                                            <TreeNode name="Channel Sales"/>
                                            <TreeNode name="Direct Sales"/>
                                        </children>
                                    </TreeNode>
                                    <TreeNode name="Manufacturing">
                                        <children>
                                            <TreeNode name="Design"/>
                                            <TreeNode name="Development"/>
                                            <TreeNode name="QA"/>
                                        </children>
                                    </TreeNode>
                                    <TreeNode name="Services">
                                        <children>
                                            <TreeNode name="Support"/>
                                            <TreeNode name="Consulting"/>
                                        </children>
                                    </TreeNode>
                                </children>
                            </root>
                        </valueTree>
                    </PickTreeItem>
                    <PickTreeItem dataSource="supplyCategory" canSelectParentItems="true" emptyMenuMessage="No Sub Categories" name="category" title="Category"/>
                </fields>
            </DynamicForm>
        </members>
    </HStack>,
    document.getElementById(target)
);
