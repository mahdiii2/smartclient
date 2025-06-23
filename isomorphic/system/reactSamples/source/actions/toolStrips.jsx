import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ToolStrip, ToolStripMenuButton, ToolStripButton, Menu, DynamicForm, MenuItem, SelectItem, ValueMap } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var subMenuRD = [
    {title: "data.xml", checked: true},
    {title: "Component Guide.doc"},
    {title: "SmartClient.doc", checked: true},
    {title: "AJAX.doc"}
];

var subMenuEA = [
    {title: "XML"},
    {title: "CSV"},
    {title: "Plain text"}
];


// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
    
        <Menu ID="menu" shadowDepth="10" showShadow="true" autoDraw="false">
            <data>
                <MenuItem title="New" keyTitle="Ctrl+N" icon="icons/16/document_plain_new.png" />
                <MenuItem title="Open" keyTitle="Ctrl+O" icon="icons/16/folder_out.png" />
                <MenuItem isSeparator="true" />
                <MenuItem title="Save" keyTitle="Ctrl+S" icon="icons/16/disk_blue.png" />
                <MenuItem title="Save As" icon="icons/16/save_as.png" />
                <MenuItem isSeparator="true" />
                <MenuItem title="Recent Documents" icon="icons/16/folder_document.png" submenu={subMenuRD} />
                <MenuItem isSeparator="true" />
                <MenuItem title="Export as..." icon="icons/16/export1.png" submenu={subMenuEA} />
                <MenuItem isSeparator="true" />
                <MenuItem title="Print" enabled="false" keyTitle="Ctrl+P" icon="icons/16/printer3.png" />
            </data>
        </Menu>
    
        <DynamicForm ID="fontSelector" showResizeBar="true" width="120" minWidth="50" numCols="1" autoDraw="false" >
            <fields>
                <SelectItem name="selectFont" showTitle="false" width="*" defaultValue="courier" >
                    <valueMap>
                        <ValueMap 
                            courier="<span style='font-family:courier'>Courier</span>"
                            verdana="<span style='font-family:verdana'>Verdana</span>"
                            times="<span style='font-family:times'>Times</span>" />
                    </valueMap>
                </SelectItem>
            </fields>
        </DynamicForm>    
    
        <DynamicForm ID="zoomSelector" width="100" minWidth="50" numCols="1" autoDraw="false" >
            <fields>
                <SelectItem name="selectZoom" showTitle="false" width="*"
                        valueMap={["50%", "75%", "100%", "150%", "200%", "Fit"]}
                        defaultValue="100%" />
            </fields>
        </DynamicForm>    
    
        <ToolStrip width="450">
            <members>
                <ToolStripMenuButton ID="menuButton" title="File" menu="menu" />
                <value>separator</value>
                <ToolStripButton ID="printButton" icon="[SKIN]/RichTextEditor/print.png" title="Print" />
                <value>resizer</value>
                <ToolStripButton ID="bold" icon="[SKIN]/RichTextEditor/text_bold.png" actionType="checkbox"
                                    showFocused="false" showFocusOutline="true" />
                <ToolStripButton ID="italics" icon="[SKIN]/RichTextEditor/text_italic.png" actionType="checkbox"
                                    showFocused="false" showFocusOutline="true" />
                <ToolStripButton ID="underlined" icon="[SKIN]/RichTextEditor/text_underline.png" actionType="checkbox"
                                    showFocused="false" showFocusOutline="true" />
                <value>separator</value>
                <ToolStripButton ID="alignLeft" icon="[SKIN]/RichTextEditor/text_align_left.png" 
                                    actionType="radio" radioGroup="textAlign" />
                <ToolStripButton ID="alignRight" icon="[SKIN]/RichTextEditor/text_align_right.png" 
                                    actionType="radio" radioGroup="textAlign" />
                <ToolStripButton ID="alignCenter" icon="[SKIN]/RichTextEditor/text_align_center.png"
                                    actionType="radio" radioGroup="textAlign" />
                <value>separator</value>
                <value>fontSelector</value>
                <value>resizer</value>
                <value>zoomSelector</value>
            </members>
        </ToolStrip>
        
    </>, 
    document.getElementById(target)
);

