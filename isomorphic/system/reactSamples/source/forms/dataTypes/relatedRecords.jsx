import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label, LayoutSpacer, HStack, VStack, HeaderItem, SpinnerItem, SelectItem, DynamicForm } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <VStack ID="vStack1" membersMargin="5" autoDraw="false" >
            <members>
                <DynamicForm ID="form1" autoDraw="false" >
                    <fields>
                        <HeaderItem defaultValue="Order Supply Items" />
                        <SelectItem name="itemID" title="Item" type="select" optionDataSource="supplyItem"
                                defaultToFirstOption="true" displayField="itemName"
                                change="label1.setContents('Selected itemID:' + value)" />
                        <SpinnerItem name="Quantity" defaultValue="1" min="1" />
                    </fields>
                </DynamicForm>    
                <Label align="center" border="1px solid blue" height="50" width="250" margin="10" ID="label1"
                            contents="Select an item to order" autoDraw="false" />
            </members>
        </VStack>

        <VStack ID="vStack2" membersMargin="5" autoDraw="false" >
            <members>
                <DynamicForm ID="form2" autoDraw="false" >
                    <fields>
                        <HeaderItem defaultValue="Order Supply Items" />
                        <SelectItem name="itemSKU" title="Item" type="select" optionDataSource="supplyItem"
                                    valueField="SKU" displayField="itemName"
                                    change="label2.setContents('Selected SKU:' + value)"
                                    pickListWidth="300"
                                    pickListFields={[
                                        { name:"itemName", width:125 },
                                        { name:"units" },
                                        { name:"unitCost" }
                                      ]} />
                        <SpinnerItem name="Quantity" defaultValue="1" min="1" />
                    </fields>
                </DynamicForm>    
                <Label ID="label2" align="center" border="1px solid blue" height="50" width="250" margin="10"
                            contents="Select an item to order" />
            </members>
        </VStack>

        <HStack>
            <members>
                <value>vStack1</value>
                <LayoutSpacer width="50" />
                <value>vStack2</value>
            </members>
        </HStack>
        
    </>, 
    document.getElementById(target)
);

