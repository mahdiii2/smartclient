/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, HTMLFlow, SelectItem, Window, WindowCloseButton, WindowHeaderLabel, WindowMinimizeButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSelectFontChange = function(form,item,value,oldValue) {return statusReport.setNewStatus(value)};
let onStatusReportSetNewStatus = function (system) {
    this.setContents(system + ': <span style=\'color:green;font-weight:bold\'>Normal</span><br>');
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Window title="Status" width="400" height="200" canDragReposition="true" canDragResize="true">
        <headerControls>
            <WindowCloseButton/>
            <WindowMinimizeButton/>
            <WindowHeaderLabel/>
            <DynamicForm ID="systemSelector" numCols="1" width="75" layoutAlign="center">
                <fields>
                    <SelectItem name="selectFont" defaultValue="Development" showTitle="false" width="150" change={onSelectFontChange}>
                        <valueMap>
                                <value>Development</value>
                                <value>Staging</value>
                                <value>Production</value>
                        </valueMap>
                    </SelectItem>
                </fields>
            </DynamicForm>
        </headerControls>
        <items>
            <HTMLFlow ID="statusReport" width="100%" height="100%" padding="5" setNewStatus={onStatusReportSetNewStatus}/>
        </items>
    </Window>,
    document.getElementById(target)
);

statusReport.setNewStatus('Development');
