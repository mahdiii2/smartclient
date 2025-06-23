import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VStack, CubeGrid, Button } from 'smartclient-eval/react';

// A "render target" can be defined to allow JSX to be loaded dynamically into an existing application.
// This sample sets a different render target starting with "showcaseSample" for each JSX file so they
// can be rendered separately on the same page and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSwapButtonClick = function () {
    exampleForm.setTitleOrientation(exampleForm.titleOrientation == "top" ? "left" : "top");
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

    <VStack width="100%" membersMargin="10">
        <members>
            <CubeGrid ID="basicCubeGrid" width="100%" data={productData.cacheData}
                      hideEmptyFacetValues="true" valueFormat="&#x00A4;,0.00"
                      exportFacetTextColor="blue" exportColumnFacetTextColor="red" 
                      exportFacetBGColor="yellow" exportColumnFacetBGColor="#44FF44"
                      exportDefaultBGColor="#FFDDAA">
                <columnFacets>
                    <value>quarter</value>
                    <value>month</value>
                    <value>metric</value>
                </columnFacets>
                <rowFacets>
                    <value>region</value>
                    <value>product</value>
                </rowFacets>
            </CubeGrid>
            <Button title="Export" click={function () {
                basicCubeGrid.exportClientData({exportAs: "xls"});
                }}>
            </Button>
        </members>
    </VStack>

    </>, 
    document.getElementById(target)
);
