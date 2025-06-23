import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, Button, TextItem, PasswordItem,
         DynamicForm } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSwapButtonClick = function () {
    exampleForm.setTitleOrientation(exampleForm.titleOrientation == "top" ? "left" : "top");
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HLayout>
            <DynamicForm ID="exampleForm" width="300" autoDraw="false" >
                <TextItem name="username" title="Username"
                           required="true" width="*" defaultValue="bob" />
                <TextItem name="email" title="Email" required="true" width="*"
                           defaultValue="bob@isomorphic.com" />
                <PasswordItem name="password" title="Password"
                               required="true" width="*" />
                <PasswordItem name="password2" title="Password again" 
                               required="true" width="*" wrapTitle="false" />
            </DynamicForm>            

            <Button ID="swapButton" height="36" margin="2" title="Swap titles" click={onSwapButtonClick} />
        </HLayout>
        
    </>, 
    document.getElementById(target)
);
