/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, FormItemIcon, RadioGroupItem, TextItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onHavePhoneNumberChanged = function (form, item, value) {
    var phoneNumberItem = form.getItem('phoneNumber');
    var enabled = value == true || value == 'true';
    phoneNumberItem.setDisabled(!enabled);
    if (enabled) {
        phoneNumberItem.setValue(this.previousPhoneNumber);
    } else {
        this.previousPhoneNumber = phoneNumberItem.getValue();
        phoneNumberItem.clearValue();
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack width="100%">
        <members>
            <DynamicForm autoDraw="false">
                <items>
                    <RadioGroupItem vertical="false" name="havePhoneNumber" title="Have Phone Number?" defaultValue="true" wrapTitle="false" changed={onHavePhoneNumberChanged}>
                        <valueMap true="Yes" false="No"/>
                    </RadioGroupItem>
                    <TextItem name="phoneNumber" title="Phone Number" iconHeight="16" iconWidth="16" wrapTitle="false" width="200" keyPressFilter="[-+(),./#0-9 Xx]">
                        <icons>
                            <FormItemIcon name="tel" src="blank" inline="true" text="&amp;#x2706;" baseStyle="telIcon"/>
                        </icons>
                    </TextItem>
                </items>
            </DynamicForm>
        </members>
    </VStack>,
    document.getElementById(target)
);
