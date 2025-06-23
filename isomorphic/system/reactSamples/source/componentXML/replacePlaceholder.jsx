/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, Canvas, CheckboxItem, DynamicForm, HStack, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onReloadComponentButtonClick = function () {
    if (xmlLayout != null) {
        xmlLayout.destroy();
        xmlLayout = null;
        isc.RPCManager.loadScreen('replacePlaceholder', function (screen) {
            xmlLayout = screen;
            placeholder = screen.getByLocalId('placeholder');
            container.addChild(xmlLayout);
            if (autoReplacePlaceholderDynamicForm.getValue('autoReplacePlaceholderCheckbox')) {
                replacePlaceholderButton.click();
            }
        });
    }
};
let onReplacePlaceholderButtonClick = function () {
    if (placeholder) {
        var grid = isc.ListGrid.create({
            dataSource: 'supplyItem',
            autoFetchData: true,
            autoFitDateFields: true,
            width: 850,
            height: 200
        });
        xmlLayout.removeMember(placeholder);
        placeholder = null;
        xmlLayout.addMember(grid);
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack>
        <members>
            <HStack membersMargin="5" height="30">
                <members>
                    <Button title="Reload component XML" ID="reloadComponentButton" width="200" autoDraw="false" click={onReloadComponentButtonClick}/>
                    <Button title="Replace Placeholder" ID="replacePlaceholderButton" width="200" autoDraw="false" click={onReplacePlaceholderButtonClick}/>
                    <DynamicForm ID="autoReplacePlaceholderDynamicForm">
                        <items>
                            <CheckboxItem name="autoReplacePlaceholderCheckbox" title="Auto-replace Placeholder"/>
                        </items>
                    </DynamicForm>
                </members>
            </HStack>
            <Canvas ID="container" border="3px solid green"/>
        </members>
    </VStack>,
    document.getElementById(target)
);

isc.RPCManager.loadScreen('replacePlaceholder', function (screen) {
    xmlLayout = screen;
    placeholder = screen.getByLocalId('placeholder');
    container.addChild(xmlLayout);
});
