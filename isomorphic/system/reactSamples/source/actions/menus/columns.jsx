/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, LGField, Menu, MenuButton, MenuItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCustomColumnMenuItemClick = function (item, colNum) {
    if (colNum == 1 && item.canDismiss) {
        this.removeItem(item);
    } else {
        isc.say('You Selected \'' + item.name + '\'.');
        this.hide();
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack width="100%">
        <members>
            <MenuButton title="Show Menu" autoDraw="false">
                <menu autoDismiss="false" ID="customColumnMenu" itemClick={onCustomColumnMenuItemClick}>
                    <data>
                        <MenuItem name="Item 1"/>
                        <MenuItem name="Item 2" canDismiss="true"/>
                        <MenuItem name="Item 3" canDismiss="true"/>
                    </data>
                    <fields>
                        <LGField name="canDismiss" width="16" showValueIconOnly="true">
                            <valueIcons true="[SAMPLE]icons/16/close.png"/>
                        </LGField>
                    </fields>
                </menu>
            </MenuButton>
        </members>
    </HStack>,
    document.getElementById(target)
);
