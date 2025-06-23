/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onLoginClick = function () {
    isc.showLoginDialog(function (credentials, dialogCallback) {
        if (credentials.username == 'barney' && credentials.password == 'rubble') {
            var loginOK = true;
        } else {
            loginOK = false;
        }
        dialogCallback(loginOK);
    }, {
        dismissable: true,
        loginFormProperties: {
            width: 270,
            titleWidth: 70
        }
    });
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Button title="Login" click={onLoginClick}/>,
    document.getElementById(target)
);
