import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, MenuButton, ColorPicker, Menu, Canvas, DynamicForm, TextItem, MenuItem, IButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var colorPickerColorChanged = function () {
    colorBox.setBackgroundColor(this.getHtmlColor());
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
    
        <Menu ID="menu" width="505" height="440" showShadow="true" autoDraw="false">
            <data>
                <MenuItem title="New tab" keyTitle="Ctrl+T" />
                <MenuItem title="New window" keyTitle="Ctrl+N" />
                <MenuItem isSeparator="true" />
                <MenuItem title="Edit" showRollOver="false" embeddedComponentFields={["key"]}
                    embeddedComponent={<HStack ID="hStackButtons" autoDraw="false" height="100%" snapTo="TR" 
                                           membersMargin="3" layoutRightMargin="3" defaultLayoutAlign="center" >
                                        <members>
                                            <IButton title="Cut" width="63" />
                                            <IButton title="Copy" width="63" />
                                            <IButton title="Paste" width="63" />
                                        </members>
                                    </HStack>} />
                
                <MenuItem isSeparator="true" />
                <MenuItem title="Add bookmark" showRollOver="false"
                    click={ function () { bookmarkForm.focusInItem("bookmarkTitle") } } 
                    embeddedComponentFields={["key"]}
                    embeddedComponent={<HStack ID="hStack" height="100%" snapTo="TR" membersMargin="3" defaultLayoutAlign="center" autoDraw="false" >
                                        <members>
                                            <Canvas ID="colorBox" width="22" height="22" autoDraw="false" />
                                            <DynamicForm ID="bookmarkForm" width="200" height="*" snapTo="TR" autoDraw="false" >
                                                <fields>
                                                    <TextItem width="200" showTitle="false" name="bookmarkTitle"
                                                        defaultValue="SmartClient Feature Explorer" />
                                                </fields>
                                            </DynamicForm>
                                            <IButton title="Add" width="50" click="isc.Menu.hideAllMenus();" />
                                        </members>

                                    </HStack>} />
                <MenuItem isSeparator="true" />
                <MenuItem showRollOver="false"
                    embeddedComponentFields={["key"]}
                    embeddedComponent={<ColorPicker ID="colorPicker" 
                                        snapTo="TR" styleName="" bodyStyle=""  marginLeft="20"
                                        border="0" showShadow="false" defaultPickMode="complex" showHeader="false"
                                        showFooter="false" showEdges="false" showOkButton="false" showModeToggleButton="false"
                                        showCancelButton="false" canDragReposition="false" autoHide="false" autoDraw="false"
                                        colorChanged={colorPickerColorChanged} />} />
                
            </data>
        </Menu>
    
        <HStack width="100%">
            <members>
                <MenuButton ID="menuButton" title="Menu" width="100" menu="menu" />
            </members>
        </HStack>
    </>, 
    document.getElementById(target)
);

