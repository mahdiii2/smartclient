/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, HStack, IButton, LGField, ListGrid, TextItem, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onUserListGridSelectionChanged = function (record, state) {
    if (state) {
        editorForm.editRecord(record);
    }
};
let onAddButtonClick = function() {return editorForm.editNewRecord();};
let onSaveButtonClick = function() {return editorForm.saveData();};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="20">
        <members>
            <ListGrid ID="userListGrid" dataSource="flattenedBeans_flatUserHB" autoFetchData="true" width="650" height="164" autoDraw="false" selectionChanged={onUserListGridSelectionChanged}>
                <fields>
                    <LGField name="firstName"/>
                    <LGField name="surname"/>
                    <LGField name="email"/>
                    <LGField name="addressLine1"/>
                    <LGField name="city"/>
                    <LGField name="state"/>
                </fields>
            </ListGrid>
            <HStack membersMargin="10" ID="hStack" autoDraw="false">
                <members>
                    <DynamicForm ID="editorForm" dataSource="flattenedBeans_flatUserHB" width="280" top="180" autoDraw="false">
                        <fields>
                            <TextItem name="firstName" title="First Name"/>
                            <TextItem name="surname" title="Surname"/>
                            <TextItem name="email" title="Email address" wrapTitle="false"/>
                            <TextItem name="addressLine1" title="Address Line 1" wrapTitle="false"/>
                            <TextItem name="city" title="City"/>
                            <TextItem name="state" title="State"/>
                        </fields>
                    </DynamicForm>
                    <VStack membersMargin="10" ID="vStackButtons" autoDraw="false">
                        <members>
                            <IButton autoFit="true" title="Add User" ID="addButton" minWidth="120" autoDraw="false" click={onAddButtonClick}/>
                            <IButton autoFit="true" title="Save Changes" ID="saveButton" minWidth="120" autoDraw="false" click={onSaveButtonClick}/>
                        </members>
                    </VStack>
                </members>
            </HStack>
        </members>
    </VStack>,
    document.getElementById(target)
);
