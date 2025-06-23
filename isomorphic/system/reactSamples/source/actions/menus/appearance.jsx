/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, Menu, MenuButton, MenuItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack width="100%">
        <members>
            <MenuButton title="File" ID="menuButton" width="100" autoDraw="false">
                <menu ID="menu" showShadow="true" shadowDepth="10" autoDraw="false">
                    <data>
                        <MenuItem title="New" icon="[SAMPLE]icons/16/document_plain_new.png" keyTitle="Ctrl+N"/>
                        <MenuItem title="Open" icon="[SAMPLE]icons/16/folder_out.png" keyTitle="Ctrl+O"/>
                        <MenuItem isSeparator="true"/>
                        <MenuItem title="Save" icon="[SAMPLE]icons/16/disk_blue.png" keyTitle="Ctrl+S"/>
                        <MenuItem title="Save As" icon="[SAMPLE]icons/16/save_as.png"/>
                        <MenuItem isSeparator="true"/>
                        <MenuItem title="Recent Documents" icon="[SAMPLE]icons/16/folder_document.png">
                            <submenu title="AJAX.doc"/>
                        </MenuItem>
                        <MenuItem isSeparator="true"/>
                        <MenuItem title="Export as..." icon="[SAMPLE]icons/16/export1.png">
                            <submenu title="Plain text"/>
                        </MenuItem>
                        <MenuItem isSeparator="true"/>
                        <MenuItem title="Print" enabled="false" icon="[SAMPLE]icons/16/printer3.png" keyTitle="Ctrl+P"/>
                    </data>
                </menu>
            </MenuButton>
        </members>
    </HStack>,
    document.getElementById(target)
);
