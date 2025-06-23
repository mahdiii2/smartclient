/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DataView, HLayout, IButton, ListGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onEditNewClick = function() {return dsFieldEditList.startEditingNew()};
let onReloadClick = function updateDataSource() {
    var callback = function (datas) {
        if (dsFieldForm != null) {
            formContainer.removeMember(dsFieldForm);
            dsFieldForm.clear();
        }
        dsFieldForm = isc.DynamicForm.create({ dataSource: 'dynamicDS' });
        formContainer.addMember(dsFieldForm, 0);
    };
    isc.DataSource.load('dynamicDS', callback, true);
};

isc.DMI.call('GeneratorSetup', 'com.isomorphic.examples.server.editableServerSideDataSource.GeneratorSetup', 'setupGenerator', updateDataSource);
function updateDataSource() {
    var callback = function (datas) {
        if (dsFieldForm != null) {
            formContainer.removeMember(dsFieldForm);
            dsFieldForm.clear();
        }
        dsFieldForm = isc.DynamicForm.create({ dataSource: 'dynamicDS' });
        formContainer.addMember(dsFieldForm, 0);
    };
    isc.DataSource.load('dynamicDS', callback, true);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DataView overflow="hidden" width="100%" height="100%" autoDraw="true">
        <members>
            <HLayout membersMargin="10">
                <members>
                    <VLayout membersMargin="10" width="60%" padding="10" isGroup="true" groupTitle="Edit Fields">
                        <members>
                            <ListGrid ID="dsFieldEditList" dataSource="dynamicDSFields" listEndEditAction="next" canEdit="true" editEvent="click" autoFetchData="true" canRemoveRecords="true" width="100%" height="224" autoDraw="false"/>
                            <IButton title="Edit New" ID="editNew" autoDraw="false" click={onEditNewClick}/>
                        </members>
                    </VLayout>
                    <VLayout overflow="auto" membersMargin="10" ID="formContainer" width="40%" padding="10" isGroup="true" groupTitle="Form bound to fields">
                        <members>
                            <IButton title="Reload" ID="reload" autoDraw="false" click={onReloadClick}/>
                        </members>
                    </VLayout>
                </members>
            </HLayout>
        </members>
    </DataView>,
    document.getElementById(target)
);

var dsFieldForm;
