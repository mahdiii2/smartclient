import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label, Button, DataSource, ListGrid, FormItem, DynamicForm, VLayout,
         Canvas, DSField, Validator, Record
       } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
    <DataSource ID="supplyItemLocalDS" clientOnly="true">
        <fields>
            <DSField name="itemID"      type="sequence" hidden="true"       primaryKey="true"/>
            <DSField name="itemName"    type="text"     title="Item"        length="128"       required="true"/>
            <DSField name="SKU"         type="text"     title="SKU"         length="10"        required="true"/>
            <DSField name="description" type="text"     title="Description" length="2000"/>
            <DSField name="category"    type="text"     title="Category"    length="128"       required="true"
                      foreignKey="supplyCategory.categoryName"/>
            <DSField name="units"       type="enum"     title="Units"       length="5">
                <valueMap>
                    <value>Roll</value>
                    <value>Ea</value>
                    <value>Pkt</value>
                    <value>Set</value>
                </valueMap>
            </DSField>
            <DSField name="unitCost" type="float" title="Unit Cost" required="true">
                <validators>
                    <Validator type="floatRange" min="0"
                                errorMessage="Please enter a valid (positive) cost"/>
                    <Validator type="floatPrecision" precision="2"
                                errorMessage="The maximum allowed precision is 2"/>
                </validators>
            </DSField>
            <DSField name="inStock"      title="In Stock"      type="boolean"/>
            <DSField name="nextShipment" title="Next Shipment" type="date"/>
        </fields>
        <testData>
            <Record itemID="1" itemName="Glue Pelikan Roll-fix Permanent #950" SKU="1088300"
                     description="A clean no-drips, no brush roll-on glue. Will not dry out. Suitable for
                                  artwork, photos or posters. Glue cartridges are 12 metres long. Refillable."
                     category="Rollfix Glue" units="Ea" unitCost="6.96"/>
            <Record itemID="2" itemName="Glue Pelikan Roll-fix Refill Permanent #955" SKU="1089400"
                     category="Rollfix Glue" units="Ea" unitCost="3.73"/>
            <Record itemID="3" itemName="Glue Pelikan Roll-fix Non Permanent #960" SKU="1090500"
                     category="Rollfix Glue" units="Ea"  unitCost="6.96" />
            <Record itemID="4" itemName="Glue Pelikan Roll-fix Refill Non Permanent #965" SKU="1091600"
                     category="Rollfix Glue" units="Ea" unitCost="3.73"/>
        </testData>
    </DataSource>

    <VLayout minWidth="600" width="98%" membersMargin="15" backgroundColor="white">
        <members>
            <Label height="10" width="100%"
                    contents="Showing items in Category 'Rollfix Glue'" />
            <ListGrid ID="dsGrid" width="100%" height="200"
                       dataSource="supplyItemLocalDS"  autoFetchData="true"
                       recordClick={function (viewer) {dsForm.reset();  
                       dsForm.editSelectedData(viewer);}} />
            <DynamicForm ID="dsForm" isGroup="true" groupTitle="update" numCols="4"
                          dataSource="supplyItemLocalDS"/>
            <Button title="Save" click={function () {dsForm.saveData()}} />
        </members>
    </VLayout>

    </>, 
    document.getElementById(target)
);
