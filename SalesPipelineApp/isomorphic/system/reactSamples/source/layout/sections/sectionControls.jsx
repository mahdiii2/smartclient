/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, HTMLFlow, ImgButton, LGField, ListGrid, SectionStack, SectionStackSection, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onAddButtonClick = function() {listGrid.startEditingNew();return false;};
let onRemoveButtonClick = function() {listGrid.removeSelectedData();return false;};
let onStatusReportSetNewStatus = function (system) {
    this.setContents(system + ': <span style=\'color:green;font-weight:bold\'>Normal</span><br>');
};
let onSystemChange = function(form,item,value,oldValue) {return statusReport.setNewStatus(value)};
let onSystemClick = function(form,item) {return false;};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <SectionStack visibilityMode="multiple" animateSections="true" overflow="hidden" width="300" height="400">
        <sections>
            <SectionStackSection title="Monitors" expanded="true">
                <controls>
                    <ImgButton size="16" src="[SKIN]actions/add.png" title="addButton" showRollOver="false" showDown="false" showFocused="false" ID="addButton" autoDraw="false" click={onAddButtonClick}/>
                    <ImgButton size="16" src="[SKIN]actions/remove.png" title="removeButton" showRollOver="false" showDown="false" showFocused="false" ID="removeButton" autoDraw="false" click={onRemoveButtonClick}/>
                </controls>
                <items>
                    <ListGrid ID="listGrid" canEdit="true" editEvent="click" autoDraw="false">
                        <fields>
                            <LGField name="system" type="text" title="System"/>
                            <LGField name="monitor" type="text" title="Monitor Name"/>
                        </fields>
                    </ListGrid>
                </items>
            </SectionStackSection>
            <SectionStackSection title="Status" expanded="true">
                <controls>
                    <DynamicForm ID="systemSelector" numCols="1" width="75" height="1">
                        <fields>
                            <SelectItem name="system" defaultValue="Development" showTitle="false" width="150" change={onSystemChange} click={onSystemClick}>
                                <valueMap>
                                        <value>Development</value>
                                        <value>Staging</value>
                                        <value>Production</value>
                                </valueMap>
                            </SelectItem>
                        </fields>
                    </DynamicForm>
                </controls>
                <items>
                    <HTMLFlow ID="statusReport" padding="5" border="1px solid #808080" setNewStatus={onStatusReportSetNewStatus}/>
                </items>
            </SectionStackSection>
        </sections>
    </SectionStack>,
    document.getElementById(target)
);

statusReport.setNewStatus(systemSelector.getValue('system'));
