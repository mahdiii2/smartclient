/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, DynamicForm, SelectItem, Tab, TabSet } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSelectChanged = function (form, item, value) {
    statusPane.setContents(value + ': <span style=\'color:green;font-weight:bold\'>Normal</span><br>');
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TabSet tabBarPosition="top" tabBarAlign="left" ID="topTabSet" width="400" height="200">
        <tabBarControls>
            <DynamicForm ID="form" numCols="1" cellPadding="1" margin="0" padding="0" autoDraw="false">
                <fields>
                    <SelectItem name="select" defaultValue="Development" showTitle="false" changed={onSelectChanged}>
                        <valueMap>
                                <value>Development</value>
                                <value>Staging</value>
                                <value>Production</value>
                        </valueMap>
                    </SelectItem>
                </fields>
            </DynamicForm>
        </tabBarControls>
        <tabs>
            <Tab title="Status">
                <pane>
                    <Canvas ID="statusPane" autoDraw="false"/>
                </pane>
            </Tab>
        </tabs>
    </TabSet>,
    document.getElementById(target)
);
