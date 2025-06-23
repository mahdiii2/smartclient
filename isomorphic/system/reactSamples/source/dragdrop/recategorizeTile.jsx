/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DVField, DynamicForm, HLayout, SelectItem, TileGrid, TileGridField, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onForm1ItemChanged = function(item,newValue) {return boundList1.fetchData(this.getValuesAsCriteria());};
let onForm2ItemChanged = function(item,newValue) {return boundList2.fetchData(this.getValuesAsCriteria());};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout membersMargin="10">
        <members>
            <VLayout>
                <members>
                    <DynamicForm ID="form1" autoDraw="false" itemChanged={onForm1ItemChanged}>
                        <fields>
                            <SelectItem name="status" title="&lt;b&gt;Status&lt;/b&gt;" defaultValue="Endangered">
                                <valueMap>
                                        <value>Threatened</value>
                                        <value>Endangered</value>
                                        <value>Not Endangered</value>
                                        <value>Not currently listed</value>
                                        <value>May become threatened</value>
                                        <value>Protected</value>
                                </valueMap>
                            </SelectItem>
                        </fields>
                    </DynamicForm>
                    <TileGrid ID="boundList1" dataSource="animals" showAllRecords="true" animateTileChange="true" canDragTilesOut="true" canAcceptDroppedRecords="true" tileWidth="150" tileHeight="185" width="400" height="400" autoFetchData="true" autoFetchTextMatchStyle="exact" autoDraw="false" tileDragAppearance="target">
                        <initialCriteria status="Endangered"/>
                        <fields>
                            <DVField name="picture" title="picture"/>
                            <DVField name="commonName" title="commonName"/>
                            <DVField name="status" title="status"/>
                        </fields>
                    </TileGrid>
                </members>
            </VLayout>
            <VLayout>
                <members>
                    <DynamicForm ID="form2" autoDraw="false" itemChanged={onForm2ItemChanged}>
                        <fields>
                            <SelectItem name="status" title="&lt;b&gt;Status&lt;/b&gt;" defaultValue="Threatened">
                                <valueMap>
                                        <value>Threatened</value>
                                        <value>Endangered</value>
                                        <value>Not Endangered</value>
                                        <value>Not currently listed</value>
                                        <value>May become threatened</value>
                                        <value>Protected</value>
                                </valueMap>
                            </SelectItem>
                        </fields>
                    </DynamicForm>
                    <TileGrid ID="boundList2" dataSource="animals" showAllRecords="true" animateTileChange="true" canDragTilesOut="true" canAcceptDroppedRecords="true" tileWidth="150" tileHeight="185" width="400" height="400" autoFetchData="true" autoFetchTextMatchStyle="exact" autoDraw="false" tileDragAppearance="target">
                        <initialCriteria status="Threatened"/>
                        <fields>
                            <DVField name="picture" title="picture"/>
                            <DVField name="commonName" title="commonName"/>
                            <DVField name="status" title="status"/>
                        </fields>
                    </TileGrid>
                </members>
            </VLayout>
        </members>
    </HLayout>,
    document.getElementById(target)
);
