/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, HStack, IButton, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSaveButtonClick = function() {return dynamicForm.saveData()};
let onClearErrorsButtonClick = function() {return dynamicForm.clearErrors(true)};
let onDisableValidationButtonClick = function () {
    dynamicForm.disableValidation = !dynamicForm.disableValidation;
    this.setTitle((dynamicForm.disableValidation ? 'Enable' : 'Disable') + ' Validation');
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10">
        <members>
            <DynamicForm ID="dynamicForm" dataSource="supplyItem">
                <values unitCost="-1.234" SKU="my SKU"/>
            </DynamicForm>
            <HStack membersMargin="10" ID="buttons" height="24">
                <members>
                    <IButton title="Save" ID="saveButton" click={onSaveButtonClick}/>
                    <IButton title="Clear Errors" ID="clearErrorsButton" click={onClearErrorsButtonClick}/>
                    <IButton autoFit="true" title="Disable Validation" ID="disableValidationButton" click={onDisableValidationButtonClick}/>
                </members>
            </HStack>
        </members>
    </VLayout>,
    document.getElementById(target)
);
