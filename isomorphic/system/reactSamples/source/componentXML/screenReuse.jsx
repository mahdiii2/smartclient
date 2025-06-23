/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DynamicForm, SelectItem, TabSet, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCreateScreenClick = function (form, item) {
    if (form.getValue('dataSource') != 'Select A DataSource') {
        switchTo(form.getValue('dataSource'));
    }
};

function switchTo(datasource) {
    var screen = isc.RPCManager.createScreen('screenReuse');
    screen.getByLocalId('saveButton').addProperties({
        click: function () {
            this.form.saveData();
        },
        form: screen.getByLocalId('editForm')
    });
    screen.getByLocalId('listGrid').setDataSource(datasource);
    screen.getByLocalId('listGrid').addProperties({
        recordClick: function (viewer, record, rowNum, field, fieldNum, value, rawValue) {
            this.form.clearErrors();
            this.form.editRecord(record);
            this.saveButton.enable();
        },
        form: screen.getByLocalId('editForm'),
        saveButton: screen.getByLocalId('saveButton')
    });
    screen.getByLocalId('editForm').setDataSource(datasource);
    var tab = {
        title: datasource,
        pane: screen
    };
    tabSet.addTab(tab);
    tabSet.selectTab(tab);
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" width="100%" height="90%" top="5">
        <members>
            <DynamicForm>
                <values dataSource="Select A DataSource"/>
                <items>
                    <SelectItem name="dataSource" showTitle="false">
                        <valueMap>
                                <value>countryDS</value>
                                <value>supplyItem</value>
                                <value>worldDS</value>
                        </valueMap>
                    </SelectItem>
                    <ButtonItem title="Create Screen" width="120" click={onCreateScreenClick}/>
                </items>
            </DynamicForm>
            <TabSet ID="tabSet" width="100%" height="*"/>
        </members>
    </VLayout>,
    document.getElementById(target)
);

isc.RPCManager.cacheScreens('screenReuse', function (data, rpcResponse) {
    switchTo('countryDS');
});
