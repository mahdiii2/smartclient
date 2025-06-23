/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DSField, DataSource, DynamicForm, TextItem, Validator } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSubmitClick = function () {
    var audioIsSupported = isc.Sound.isSupported(), docDir = isc.Page.getIsomorphicDocsDir() + 'inlineExamples/audios/';
    if (registrationForm.validate()) {
        if (audioIsSupported)
            isc.Sound.play(docDir + 'success.mp3');
        isc.say('Submission accepted');
    } else {
        if (audioIsSupported)
            isc.Sound.play(docDir + 'error.mp3');
        isc.warn('Please complete all fields', 'registrationForm.focus()', { title: 'Submission Error' });
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="registrationFormDS" title="registrationFormDS" clientOnly="true">
            <fields>
                <DSField name="name" type="text" title="Name"/>
                <DSField name="email" type="text" title="Email">
                    <validators>
                        <Validator type="regexp" expression="^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9\-])+\.)+[a-zA-Z0-9]{2,4}$"/>
                    </validators>
                </DSField>
            </fields>
        </DataSource>

        <DynamicForm ID="registrationForm" dataSource="registrationFormDS">
            <fields>
                <TextItem name="name" value="John Smith" required="true"/>
                <TextItem name="email" required="true"/>
                <ButtonItem title="Submit" width="80" click={onSubmitClick}/>
            </fields>
        </DynamicForm>
    </>,
    document.getElementById(target)
);
