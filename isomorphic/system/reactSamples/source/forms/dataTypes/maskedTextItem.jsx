import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import {SC, TextItem, DateItem, DateTimeItem, TimeItem,
        DynamicForm} from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm ID="contactForm" width="400" wrapHintText="false" wrapItemTitles="false">
            <TextItem name="firstName" title="First name" mask=">?<??????????????"
                       hint="<nobr>&gt;?&lt;??????????????</nobr>" />
            <TextItem name="lastName" title="Last name" mask=">?<??????????????"
                       hint="<nobr>&gt;?&lt;??????????????</nobr>" />
            <TextItem name="state" title="State" mask=">LL" hint="<nobr>&gt;LL</nobr>" />
            <TextItem name="phoneNo" title="Phone No." editorType="TextItem"
                       mask="(###) ###-####" hint="(###) ###-####" showHintInField="true" />
            <DateItem name="dateItem" title="Date" useTextField="true" useMask="true" />
            <DateTimeItem name="dateTimeItem" title="Date Time"
                           useTextField="true" useMask="true" />
            <TimeItem name="timeItem" title="Time" useMask="true" />
            <TextItem name="color" title="HTML Color" useMask="true"
                       mask="\\#>[0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F]"
                       hint="<nobr>\\\\#&lt;[0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F]</nobr>" />
        </DynamicForm>
    </>, 
    document.getElementById(target)
);
