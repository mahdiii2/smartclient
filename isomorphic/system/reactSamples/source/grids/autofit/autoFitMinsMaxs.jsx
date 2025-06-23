import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, VLayout, Button, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HLayout width="100%" membersMargin="20" height="250">
            <members>
                <ListGrid ID="listGrid" autoDraw="false" width="700" alternateRecordStyles="true" dataPageSize="250"
                            dataSource="supplyItem" autoFetchData="false">
                    <fields>
                        <LGField name="itemName" title="Name"/>
                        <LGField name="SKU" title="SKU"/>
                        <LGField name="category" title="Category" autoFitWidth="true"/>
                        <LGField name="unitCost" title="Unit Cost" autoFitWidth="true" autoFitWidthApproach="both"/>
                        <LGField name="description" title="Description" minWidth="47" maxWidth="270" autoFitWidth="true"/>
                    </fields>
                </ListGrid>
                <VLayout membersMargin="15">
                    <members>
                        <Button autoDraw="false" width="160" title="All Short Descriptions"
                            click={ function () {
                                    listGrid.resizeField(0, 300);
                                    listGrid.setData(resultSet.findAll('SKU',['4044000','5935000','5753100','5617200','10328400']));
                            } }/>
                        <Button autoDraw="false" width="160" title="One Long Description"
                            click={ function () {
                                    listGrid.resizeField(0, 180);
                                    listGrid.setData(resultSet.findAll('SKU',['4044000','5935000','5753100','5617200','10193600']));
                            } }/>
                        <Button autoDraw="false" width="160" title="All Blank Descriptions"
                            click={ function () {
                                    listGrid.resizeField(0, 340);
                                    listGrid.setData(resultSet.findAll('SKU',['45300','135900','951300','1089400','1090500']));
                            } }/>
                    </members>
                </VLayout>
            </members>
        </HLayout>
    </>, 
    document.getElementById(target)
);

var resultSet = [];
listGrid.fetchData({}, function (dsRequest, data, dsResponse) {
    resultSet = data;
});

