/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, DynamicForm, HStack, IButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onButtonClick = function () {
    if (form.isDisabled()) {
        form.enable();
        this.setTitle('Disable Form');
    } else {
        form.disable();
        this.setTitle('Enable Form');
    }
};

const CustomCheckboxItem = SC.defineClass('CustomCheckboxItem', CheckboxItem);
isc.CustomCheckboxItem.addProperties({
    textBoxStyle: 'customCheckboxTitle',
    booleanBaseStyle: 'customCheckbox',
    checkedImage: 'blank',
    uncheckedImage: 'blank',
    printBooleanBaseStyle: 'printCustomCheckbox',
    printCheckedImage: '../inlineExamples/forms/details/checkboxImages/checked.png',
    printUncheckedImage: '../inlineExamples/forms/details/checkboxImages/unchecked.png',
    valueIconWidth: 20,
    valueIconHeight: 20,
    valueIconLeftPadding: 5,
    valueIconRightPadding: 5,
    showUnsetImage: false,
    showValueIconDisabled: true,
    showValueIconOver: true,
    showValueIconDown: true,
    showValueIconFocused: true
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack membersMargin="20" width="100%">
        <members>
            <DynamicForm ID="form" width="300" autoDraw="false">
                <items>
                    <CustomCheckboxItem title="Was the shipment verified?" name="shipmentVerified">
                        <valueMap>
                        	<verified>true</verified>
                        	<unverified>false</unverified>
                        </valueMap>
                    </CustomCheckboxItem>
                </items>
            </DynamicForm>
            <IButton title="Enable Form" ID="button" click={onButtonClick}/>
        </members>
    </HStack>,
    document.getElementById(target)
);
