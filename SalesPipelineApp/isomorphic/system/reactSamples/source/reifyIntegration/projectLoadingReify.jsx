import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label, Button, DataSource, ListGrid, TextItem, ButtonItem, PasswordItem,
         DynamicForm, VLayout, DSField, Validator, Record, NotifySettings
       } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
    <VLayout ID="mainLayout" minWidth="600" width="98%" height="90%"
              padding="10" layoutMargin="5" defaultLayoutAlign="center">
        <members>
        <DynamicForm click={function(){return 5;}} ID="projectForm" xsnapTo="T" width="250" wrapItemTitles="false">
                <fields>
                    <TextItem name="projectName" title="Project Name" defaultValue="Supply Catalog"/>
                    <TextItem name="userName" title="Email / User Name" defaultValue="reifySample"/>
                    <PasswordItem name="password" title="Password" defaultValue="tryReify"/>
                    <TextItem name="serverURL" title="Server URL" defaultValue="https://create.reify.com"/>
                    <ButtonItem name="loadProject" title="Load Project" click={
                        function (form) {
                            var projectName = projectForm.getValue("projectName");

                            isc.Reify.loadProject(projectName, function (project, projects, rpcResponse) {
                                var message = isc.RPCManager.getLoadProjectErrorMessage(rpcResponse);
                                if (message) { 
                                    isc.warn(message); 
                                    return; 
                                }
                                if (rpcResponse.status == 0) {
                                    if (mainLayout.getMember(1) != null) mainLayout.removeMember(1);
                                    var screen = project.createScreen(project.screens[0].ID);
                                    mainLayout.addMember(screen);
                                    
                                    isc.notify("Project " + projectName + " loaded from " +
                                               projectForm.getValue("serverURL"), null, null,
                                               form.notifySettings_action);
                                }
                            },  isc.addProperties({willHandleError: true}, projectForm.getValues()));
                        }}/>
                </fields>
                <notifySettings_action>
                    <NotifySettings autoFitMaxWidth="400" canDismiss="true"
                                     appearMethod="fade" disappearMethod="fade" position="C"/>
                </notifySettings_action>
            </DynamicForm>
        </members>  
    </VLayout>

    </>, 
    document.getElementById(target)
);
