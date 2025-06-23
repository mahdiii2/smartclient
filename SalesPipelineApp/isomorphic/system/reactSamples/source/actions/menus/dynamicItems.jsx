/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, LGField, ListGrid, ListGridRecord, Menu, MenuButton, MenuItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onMenuItemEnableIf = function(target,menu,item) {return listGrid.getSelectedRecord() != null};
let onMenuItemDynamicTitle = function(target,menu,item) {return 'New file in' + (listGrid.getSelectedRecord() == null ? '...' : ' '+listGrid.getSelectedRecord().project)};
let onMenuItemDynamicIcon = function(target,menu,item) {return listGrid.getSelectedRecord() == null ? '[SAMPLE]icons/16/document_plain_new_Disabled.png' : '[SAMPLE]icons/16/document_plain_new.png'};
let onProjectListingCheckIf = function(target,menu,item) {return listGrid.isVisible()};
let onProjectListingClick = function(target,item,menu,colNum) {return listGrid.isVisible() ? listGrid.hide() : listGrid.show()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack membersMargin="20" width="100%">
        <members>
            <ListGrid ID="listGrid" width="130" autoDraw="false">
                <data>
                    <ListGridRecord project="AJAX Interface"/>
                    <ListGridRecord project="Simplify Backend"/>
                    <ListGridRecord project="Broaden Reach"/>
                </data>
                <fields>
                    <LGField name="project" type="text" title="Project"/>
                </fields>
            </ListGrid>
            <MenuButton title="File" ID="menuButton" width="100" autoDraw="false">
                <menu ID="menu" showShadow="true" shadowDepth="10" autoDraw="false">
                    <data>
                        <MenuItem keyTitle="Ctrl+N" enableIf={onMenuItemEnableIf} dynamicTitle={onMenuItemDynamicTitle} dynamicIcon={onMenuItemDynamicIcon}/>
                        <MenuItem title="Open" icon="[SAMPLE]icons/16/folder_out.png" keyTitle="Ctrl+O"/>
                        <MenuItem isSeparator="true"/>
                        <MenuItem title="Save" icon="[SAMPLE]icons/16/disk_blue.png" keyTitle="Ctrl+S"/>
                        <MenuItem title="Save As" icon="[SAMPLE]icons/16/save_as.png"/>
                        <MenuItem isSeparator="true"/>
                        <MenuItem title="Project Listing" checkIf={onProjectListingCheckIf} click={onProjectListingClick}/>
                    </data>
                </menu>
            </MenuButton>
        </members>
    </HStack>,
    document.getElementById(target)
);
