/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, Menu, MenuButton, Tree, TreeNode, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onMenuItemClick = function (item) {
    isc.say('You picked the "' + item.name + '" department.');
};
let onMenuItemClick1 = function (item) {
    isc.say('You picked the "' + item.categoryName + '" category.');
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack width="100%">
        <members>
            <VStack membersMargin="10" autoDraw="false">
                <members>
                    <MenuButton title="Go to department" width="160" autoDraw="false">
                        <menu canSelectParentItems="true" itemClick={onMenuItemClick}>
                            <data>
                                <Tree ID="menuTree">
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
                                </Tree>
                            </data>
                        </menu>
                    </MenuButton>
                    <MenuButton title="Go to category" width="160" autoDraw="false">
                        <menu canSelectParentItems="true" dataSource="supplyCategory" itemClick={onMenuItemClick1}/>
                    </MenuButton>
                </members>
            </VStack>
        </members>
    </HStack>,
    document.getElementById(target)
);
