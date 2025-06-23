/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DetailViewer, HLayout, IButton, LGField, ListGrid, SectionStack, SectionStackSection, VLayout, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onPrintGridRecordClick = function(viewer,record,recordNum,field,fieldNum,value,rawValue,editedRecord) {return printViewer.setData(record)};
let onExportClick = function () {
    var oldAlternateRecordStyles = printGrid.alternateRecordStyles;
    var oldAlternateFieldStyles = printGrid.alternateFieldStyles;
    printGrid.setProperties({
        alternateRecordStyles: true,
        alternateFieldStyles: false
    });
    var settings = {
        skinName: 'Enterprise',
        exportFilename: 'export'
    };
    isc.RPCManager.exportContent(printContainer, settings);
    printGrid.delayCall('setProperties', [{
            alternateRecordStyles: oldAlternateRecordStyles,
            alternateFieldStyles: oldAlternateFieldStyles
        }], 300);
};
let onPrintPreviewClick = function() {return isc.Canvas.showPrintPreview(printContainer)};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10" ID="printContainer">
        <members>
            <SectionStack visibilityMode="multiple" ID="printStack" width="300" height="450" border="1px solid blue" autoDraw="false">
                <sections>
                    <SectionStackSection title="Countries" expanded="true">
                        <items>
                            <ListGrid ID="printGrid" dataSource="worldDS" height="150" autoDraw="false" recordClick={onPrintGridRecordClick}>
                                <fields>
                                    <LGField name="countryCode" title="Code" width="50"/>
                                    <LGField name="countryName" title="Country"/>
                                    <LGField name="capital" title="Capital"/>
                                    <LGField name="continent" title="Continent"/>
                                </fields>
                            </ListGrid>
                        </items>
                    </SectionStackSection>
                    <SectionStackSection title="Country Details" expanded="true">
                        <items>
                            <VStack width="100%" overflow="auto">
                                <members>
                                    <DetailViewer ID="printViewer" dataSource="worldDS" emptyMessage="Select a country to view its details" width="100%" margin="25" autoDraw="false"/>
                                </members>
                            </VStack>
                        </items>
                    </SectionStackSection>
                </sections>
            </SectionStack>
            <HLayout membersMargin="5" ID="printButtonLayout" autoDraw="false">
                <members>
                    <IButton title="Export" autoDraw="false" click={onExportClick}/>
                    <IButton title="Print Preview" autoDraw="false" click={onPrintPreviewClick}/>
                </members>
            </HLayout>
        </members>
    </VLayout>,
    document.getElementById(target)
);

printGrid.filterData({ countryName: 'land' }, function () {
    printGrid.selectRecord(0);
    printViewer.setData(printGrid.getSelectedRecord(0));
});
