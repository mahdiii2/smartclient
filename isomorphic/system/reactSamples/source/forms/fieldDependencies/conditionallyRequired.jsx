/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DSField, DataSource, DynamicForm, RadioGroupItem, TextItem, Validator } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onValidateClick = function(form,item) {return form.validate()};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="exampleFormDS" title="exampleFormDS" clientOnly="true">
            <fields>
                <DSField name="itemId" type="sequence" primaryKey="true"/>
                <DSField name="willAttend" type="text"/>
                <DSField name="reason" type="text"/>
            </fields>
        </DataSource>

        <DynamicForm ID="exampleForm" dataSource="exampleFormDS" titleOrientation="top" width="250">
            <fields>
                <RadioGroupItem vertical="false" name="willAttend" title="Will you be attending the meeting on April 4th? If no, please provide a reason" colSpan="*" required="true" redrawOnChange="true">
                    <valueMap>
                            <value>Yes</value>
                            <value>No</value>
                    </valueMap>
                </RadioGroupItem>
                <TextItem name="reason" title="Reason">
                    <validators>
                        <Validator type="required" errorMessage="Please provide a reason">
                            <applyWhen fieldName="willAttend" operator="equals" value="No"/>
                        </Validator>
                    </validators>
                </TextItem>
                <ButtonItem name="validate" title="Validate" click={onValidateClick}/>
            </fields>
        </DynamicForm>
    </>,
    document.getElementById(target)
);
