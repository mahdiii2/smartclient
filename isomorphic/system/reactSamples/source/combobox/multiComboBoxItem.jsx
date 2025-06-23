import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout, BooleanItem, MultiComboBoxItem, SelectItem, DynamicForm } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let initialLayoutStyle = "flow",
    initialAddUnknownValues = false;

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <VLayout width="100%">
            <members>
                <DynamicForm ID="configureForm" isGroup="true" groupTitle="Configure Multi ComboBox" width="100%"
                        padding="3" titleOrientation="top">
                    <fields>
                        <SelectItem 
                            title="Change layout style"
                            colSpan="2" defaultValue={initialLayoutStyle}
                            valueMap={[ "flow", "flowReverse", "horizontal", "horizontalReverse", "vertical", "verticalReverse" ]}
                            changed="selectedSupplyItems.getField('supplies').setLayoutStyle(value);"
                        />
                        <BooleanItem title="Allow New Values" value={initialAddUnknownValues} 
                            changed="selectedSupplyItems.getField('supplies').setAddUnknownValues(value);"
                        />
                    </fields>
                </DynamicForm>
                <DynamicForm ID="selectedSupplyItems" width="100%" numCols="1" titleOrientation="top">
                    <fields>
                        <MultiComboBoxItem name="supplies" title="Items" 
                            optionDataSource="supplyItem" displayField="itemName" valueField="SKU"
                            value={["58074604", "90600", "1089400", "6024900"]}
                            comboBoxProperties={{ pickListWidth: 290 }}
                            autoFetchData="true"
                            layoutStyle={initialLayoutStyle}
                            addUnknownValues={initialAddUnknownValues}
                            />
                    </fields>
                </DynamicForm>
            </members>
        </VLayout>
    </>, 
    document.getElementById(target)
);
