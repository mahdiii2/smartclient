/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <ListGrid ID="countryList" dataSource="countryDS" cellHeight="42" wrapCells="true" canEdit="true" editEvent="click" autoFetchData="true" width="620" height="224">
        <fields>
            <LGField name="countryName" width="100"/>
            <LGField name="government" width="175" editorType="TextAreaItem">
                <editorProperties height="40"/>
            </LGField>
            <LGField name="population" width="100" editorType="SpinnerItem"/>
            <LGField name="independence" width="225">
                <editorProperties useTextField="false"/>
            </LGField>
        </fields>
    </ListGrid>,
    document.getElementById(target)
);
