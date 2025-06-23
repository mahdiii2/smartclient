import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Criterion, AdvancedCriteria, VLayout, HLayout, TreeGrid, TGField, IButton
       } from 'smartclient-eval/react';

// A "render target" can be defined to allow JSX to be loaded dynamically into an existing application.
// This sample sets a different render target starting with "showcaseSample" for each JSX file so they
// can be rendered separately on the same page and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onIButtonClick = function () {
                            employeeTree.removeData(employeeTree.getSelectedRecord());
                        };
let onIButtonClick1 = function () {
                            employeeTree.removeData(employeeTree.getSelectedRecord());
                        };

// we need to call setCurrentUser(), otherwise the client security code assumes you are not authenticated.
isc.Authentication.setCurrentUser({userId:"jean"});

window.createUI = function() {
// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

                <HLayout membersMargin="15" ID="hLayout" recreateOnReactComponentUpdate="true">
                    <members>
                        <TreeGrid ID="employeeTree" dataSource="employeesCO" loadDataOnDemand="false" nodeIcon="[SAMPLE]icons/16/person.png" folderIcon="[SAMPLE]icons/16/person.png" closedIconSuffix="" showOpenIcons="false" showDropIcons="false" autoFetchData="true" width="525" height="400" dataFetchMode="local" showSelectedIcons="true" showAllColumns="true" autoOpenTree="all">
                            <fields>
                                <TGField name="name" title="Name" width="40%"/>
                                <TGField name="job"/>
                                <TGField name="salary"/>
                            </fields>
                            <dynamicProperties>
                                <property name="canEdit">
                                    <criteria operator="or">
                                        <Criterion fieldName="auth.roles" operator="contains" value="CEO"/>
                                        <Criterion fieldName="auth.roles" operator="contains" value="HR"/>
                                    </criteria>
                                </property>
                            </dynamicProperties>
                        </TreeGrid>
                        <VLayout membersMargin="15">
                            <members>
                                <IButton title="Remove Employee" width="200" click={onIButtonClick}>
                                    <enableWhen fieldName="employeeTree.anySelected" operator="equals" value="true"/>
                                    <visibleWhen fieldName="auth.roles" operator="regexp" value="CEO"/>
                                </IButton>
                                <IButton title="Cheater Remove Employee" width="200" click={onIButtonClick1}>
                                    <enableWhen fieldName="employeeTree.anySelected" operator="equals" value="true"/>
                                </IButton>
                            </members>
                        </VLayout>
                    </members>
                </HLayout>

    </>,
    document.getElementById(target)
);

}

createUI();