/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DynamicForm, PasswordItem, TextItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onLoadProjectClick = function () {
    var projectName = projectForm.getValue('projectName');
    isc.Reify.loadProject(projectName, function (project, projects, rpcResponse) {
        var message = isc.RPCManager.getLoadProjectErrorMessage(rpcResponse);
        if (message) {
            isc.warn(message);
            return;
        }
        if (rpcResponse.status == 0) {
            if (mainLayout.getMember(1) != null)
                mainLayout.removeMember(1);
            var screen = project.createScreen(project.screens[0].ID);
            mainLayout.addMember(screen);
            isc.notify('Project ' + projectName + ' loaded from ' + projectForm.getValue('serverURL'), null, null, {
                autoFitMaxWidth: 400,
                canDismiss: true,
                appearMethod: 'fade',
                disappearMethod: 'fade',
                position: 'C'
            });
        }
    }, {
        userName: projectForm.getValue('userName'),
        password: projectForm.getValue('password'),
        serverURL: projectForm.getValue('serverURL'),
        willHandleError: true
    });
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout defaultLayoutAlign="center" layoutMargin="5" ID="mainLayout" width="100%" height="100%" padding="10" border="1px dashed blue">
        <members>
            <DynamicForm ID="projectForm" wrapItemTitles="false" canEdit="false" width="250" snapTo="T">
                <fields>
                    <TextItem defaultValue="Supply Catalog" name="projectName" title="Project Name"/>
                    <TextItem defaultValue="reifySample" name="userName" title="Email / User Name"/>
                    <PasswordItem defaultValue="tryReify" name="password" title="Password"/>
                    <TextItem defaultValue="https://create.reify.com" name="serverURL" title="Server URL"/>
                    <ButtonItem name="loadProject" title="Load Project" canEdit="true" click={onLoadProjectClick}/>
                </fields>
            </DynamicForm>
        </members>
    </VLayout>,
    document.getElementById(target)
);
