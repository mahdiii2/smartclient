import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label, IButton, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var data = [
    {employee:"Richard Smith", division:"Marketing", department:"Community Relations"},
    {employee:"Sam Edwards", division:"Services", department:"Support"}
]

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
    
        <Label contents="Local Data" width="90%" height="25" autoDraw="true" baseStyle="exampleSeparator"/>
        
        <ListGrid top="40" width="500" height="200" canEdit="true" autoDraw="true" data={data}>
            <fields>
                <LGField name="employee" title="Name" canEdit="false"/>
                <LGField name="division" title="Division" editorType="SelectItem"
                    valueMap={["Marketing", "Sales", "Manufacturing", "Services"]}
                    changed="item.grid.setValueMap('department')"/>
                <LGField name="department" title="Department" editorType="SelectItem"
                        getEditorValueMap={function (values, field, grid) {
                            var division = values.division;
                            return field.departments[division];
                        }}
                        departments={{
                            Marketing: ["Advertising", "Community Relations"],
                            Sales: ["Channel Sales", "Direct Sales"],
                            Manufacturing: ["Design", "Development", "QA"],
                            Services: ["Support", "Consulting"]
                         }}
                         editorProperties={{ addUnknownValues:false }}/>
            </fields>
        </ListGrid>
        
        <Label contents="Remote Data" top="280" width="90%" height="25" autoDraw="true" baseStyle="exampleSeparator"/>
    
        <ListGrid top="320" width="500" height="200" canEdit="true" autoDraw="true" ID="orderList" modalEditing="true">
            <fields>
                <LGField name="quantity" title="Qty" type="integer" width="50"/>
                <LGField name="categoryName" title="Category" editorType="SelectItem" 
                     changed="this.grid.setEditValue(this.rowNum, 'itemName', null);"
                     editorProperties={{ optionDataSource:"supplyCategory" }}/>
                <LGField name="itemName" title="Item" editorType="SelectItem"
                        editorProperties={{
                             optionDataSource:"supplyItem", 
                             getPickListFilterCriteria : function () {
                                var category = this.grid.getEditedCell(this.rowNum, "categoryName");
                                return {category:category};
                             }
                         }}/>
            </fields>
        </ListGrid>
    
        <IButton top="535" autoFit="true" title="Order New Item" click="orderList.startEditingNew({quantity:1})"/>
    </>, 
    document.getElementById(target)
);
