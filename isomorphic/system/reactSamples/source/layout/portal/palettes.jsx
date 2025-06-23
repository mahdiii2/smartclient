/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, PortalColumn, PortalLayout, TGField, Tree, TreeNode, TreePalette } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout membersMargin="10" width="100%" height="100%">
        <members>
            <PortalLayout numColumns="0" ID="portalLayout">
                <portalColumns>
                    <PortalColumn/>
                    <PortalColumn/>
                </portalColumns>
            </PortalLayout>
            <TreePalette ID="treePalette" width="25%">
                <fields>
                    <TGField name="title" title="Component"/>
                </fields>
                <data ID="componentTree">
                    <root>
                        <children>
                            <TreeNode isFolder="true" title="Canvas" canDrag="false">
                                <children>
                                    <TreeNode title="Blue Canvas" type="Canvas">
                                        <defaults>
                                        	<width>120</width>
                                        	<height>120</height>
                                        	<backgroundColor>blue</backgroundColor>
                                        	<canDragReposition>true</canDragReposition>
                                        	<canDragResize>true</canDragResize>
                                        	<keepInParentRect>true</keepInParentRect>
                                        	<dragAppearance>target</dragAppearance>
                                        </defaults>
                                    </TreeNode>
                                    <TreeNode title="Red Canvas" type="Canvas">
                                        <defaults>
                                        	<width>120</width>
                                        	<height>120</height>
                                        	<backgroundColor>red</backgroundColor>
                                        	<canDragReposition>true</canDragReposition>
                                        	<canDragResize>true</canDragResize>
                                        	<keepInParentRect>true</keepInParentRect>
                                        	<dragAppearance>target</dragAppearance>
                                        </defaults>
                                    </TreeNode>
                                </children>
                            </TreeNode>
                            <TreeNode isFolder="true" title="Images" canDrag="false">
                                <children>
                                    <TreeNode title="Alligator" type="Img">
                                        <defaults>
                                        	<width>120</width>
                                        	<height>120</height>
                                        	<canDragReposition>true</canDragReposition>
                                        	<canDragResize>true</canDragResize>
                                        	<keepInParentRect>true</keepInParentRect>
                                        	<dragAppearance>target</dragAppearance>
                                        	<src>../inlineExamples/tiles/images/Alligator.jpg</src>
                                        </defaults>
                                    </TreeNode>
                                    <TreeNode title="Anteater" type="Img">
                                        <defaults>
                                        	<width>120</width>
                                        	<height>120</height>
                                        	<canDragReposition>true</canDragReposition>
                                        	<canDragResize>true</canDragResize>
                                        	<keepInParentRect>true</keepInParentRect>
                                        	<dragAppearance>target</dragAppearance>
                                        	<src>../inlineExamples/tiles/images/AntEater.jpg</src>
                                        </defaults>
                                    </TreeNode>
                                </children>
                            </TreeNode>
                        </children>
                    </root>
                </data>
            </TreePalette>
        </members>
    </HLayout>,
    document.getElementById(target)
);

componentTree.openAll();
