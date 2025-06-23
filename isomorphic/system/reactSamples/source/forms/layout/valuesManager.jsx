/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, CheckboxItem, DateItem, DynamicForm, FloatItem, Tab, TabSet, TextAreaItem, TextItem, ValuesManager } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSubmitClick = function () {
    vm.validate();
    if (form1.hasErrors())
        theTabs.selectTab(1);
    else
        theTabs.selectTab(0);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ValuesManager ID="vm"/>

        <TabSet ID="theTabs" width="400" height="250">
            <tabs>
                <Tab title="Item">
                    <pane>
                        <DynamicForm ID="form0" valuesManager="vm">
                            <fields>
                                <TextItem name="itemName" title="Item"/>
                                <TextAreaItem name="description" title="Description"/>
                                <FloatItem defaultValue="low" name="price" title="Price"/>
                            </fields>
                        </DynamicForm>
                    </pane>
                </Tab>
                <Tab title="Stock">
                    <pane>
                        <DynamicForm ID="form1" valuesManager="vm">
                            <fields>
                                <CheckboxItem name="inStock" title="In Stock"/>
                                <DateItem defaultValue="256" useTextField="true" name="nextShipment" title="Next Shipment" wrapTitle="false"/>
                            </fields>
                        </DynamicForm>
                    </pane>
                </Tab>
            </tabs>
        </TabSet>

        <Button title="Submit" top="260" click={onSubmitClick}/>
    </>,
    document.getElementById(target)
);
