/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Tree, TreeGrid, TreeNode } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TreeGrid ID="animalTreeGrid" animateFolders="true" animateFolderSpeed="100" width="300" height="300">
        <data ID="animalTree">
            <root name="Zoo">
                <children>
                    <TreeNode name="Aquarium">
                        <children>
                            <TreeNode name="Salt Water">
                                <children>
                                    <TreeNode name="Bottlenose Dolphin"/>
                                    <TreeNode name="Giant Pacific Octopus"/>
                                </children>
                            </TreeNode>
                            <TreeNode name="Fresh Water">
                                <children>
                                    <TreeNode name="Freshwater Stingray"/>
                                </children>
                            </TreeNode>
                        </children>
                    </TreeNode>
                    <TreeNode name="Reptile House">
                        <children>
                            <TreeNode name="Lizard House">
                                <children>
                                    <TreeNode name="Cuban Ground Iguana"/>
                                    <TreeNode name="Desert Iguana"/>
                                    <TreeNode name="Marbled Salamander"/>
                                </children>
                            </TreeNode>
                            <TreeNode name="Snake House">
                                <children>
                                    <TreeNode name="Indian Rock Python"/>
                                </children>
                            </TreeNode>
                            <TreeNode name="Monkey House">
                                <children>
                                    <TreeNode name="Howler Monkey"/>
                                    <TreeNode name="Orangutan"/>
                                    <TreeNode name="Guinea Baboon"/>
                                </children>
                            </TreeNode>
                            <TreeNode name="Lion Enclosure">
                                <children>
                                    <TreeNode name="Lion"/>
                                </children>
                            </TreeNode>
                        </children>
                    </TreeNode>
                </children>
            </root>
        </data>
    </TreeGrid>,
    document.getElementById(target)
);
