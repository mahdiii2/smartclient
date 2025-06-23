/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, CheckboxItem, DynamicForm } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onTreeFormCreateTree = function () {
    isc.TreeGrid.create({
        autoDraw: false,
        ID: 'employeeTree',
        width: 500,
        height: 400,
        dataSource: 'employees',
        autoFetchData: true,
        showConnectors: true,
        showFullConnectors: this.getValues()['fullConnectors'],
        nodeIcon: '[SAMPLE]icons/16/person.png',
        folderIcon: '[SAMPLE]icons/16/person.png',
        showOpenIcons: false,
        showDropIcons: false,
        closedIconSuffix: '',
        baseStyle: 'noBorderCell',
        fields: [{ name: 'Name' }]
    });
    container.addChild(employeeTree);
};
let onFullConnectorsChanged = function(form,item,value) {return this.form.createTree();};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Canvas ID="container"/>

        <DynamicForm ID="treeForm" top="415" createTree={onTreeFormCreateTree}>
            <fields>
                <CheckboxItem name="fullConnectors" title="Show Full Connectors?" changed={onFullConnectorsChanged}/>
            </fields>
        </DynamicForm>
    </>,
    document.getElementById(target)
);

treeForm.createTree();
