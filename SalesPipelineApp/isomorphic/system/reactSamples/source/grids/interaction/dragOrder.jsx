import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, VStack, ImgButton, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var upFirstClick = function () {
    var selectedRecords = countryList.getSelectedRecords();  
    for (var i=0; i<selectedRecords.length; i++) {
        var selectedRecord = selectedRecords[i];
        if(selectedRecord != null) {
            var idx = countryList.getRecordIndex(selectedRecord);  
            if(idx > 0) {
                var rs = countryList.data;  
                rs.removeAt(idx);  
                rs.addAt(selectedRecord, i);  
            }
        } 
    }
};
var upClick = function () {
    var selectedRecords = countryList.getSelectedRecords();  
    for (var i=0; i<selectedRecords.length; i++) {
        var selectedRecord = selectedRecords[i];
        if(selectedRecord != null) {  
            var idx = countryList.getRecordIndex(selectedRecord);
            if(idx > 0) {  
                var rs = countryList.data;  
                rs.removeAt(idx);  
                rs.addAt(selectedRecord, idx - 1);  
            } else {
                break;
            }
        }  
    }
};
var downClick = function () {
	var selectedRecords = countryList.getSelectedRecords();  
    for (var i=selectedRecords.length-1; i>=0; i--) {
        var selectedRecord = selectedRecords[i];
        if(selectedRecord != null) {  
            var rs = countryList.data;  
            var numRecords = rs.getLength();  
            var idx = countryList.getRecordIndex(selectedRecord);
            if(idx < numRecords - 1) {  
                rs.removeAt(idx);  
                rs.addAt(selectedRecord, idx + 1);  
            } else {
                break;
            }
        }  
    }
};
var downLastClick = function () {
	var selectedRecords = countryList.getSelectedRecords();  
    for (var i=0; i<selectedRecords.length; i++) {
        var selectedRecord = selectedRecords[i];
        if(selectedRecord != null) {  
            var rs = countryList.data;  
            var numRecords = rs.getLength();  
            var idx = countryList.getRecordIndex(selectedRecord);  
            if(idx < numRecords - 1) {  
                rs.removeAt(idx);  
                rs.addAt(selectedRecord, rs.getLength());  
            }  
        }  
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HStack membersMargin="10" height="160">
            <members>
                <ListGrid ID="countryList" width="500" height="224" alternateRecordStyles="true"
                        canReorderRecords="true" data={countryData}>
                    <fields>
                        <LGField name="countryCode" title="Flag" width="60" type="image" imageURLPrefix="flags/24/"
                                imageURLSuffix=".png"/>
                        <LGField name="countryName" title="Country"/>
                        <LGField name="capital" title="Capital"/>
                        <LGField name="continent" title="Continent"/>
                    </fields>
                </ListGrid>
                <VStack width="32" height="74" layoutAlign="center" membersMargin="5">
                    <members>
                        <ImgButton src="[SKINIMG]TransferIcons/up_first.png" width="24" height="22"
                                   imageType="center" showDisabled="false" showRollOver="false" showDown="false" showFocused="false"
                                    click={upFirstClick} />
                        <ImgButton src="[SKINIMG]TransferIcons/up.png" width="24" height="22"
                                   imageType="center" showDisabled="false" showRollOver="false" showDown="false" showFocused="false"
                                    click={upClick} />
                        <ImgButton src="[SKINIMG]TransferIcons/down.png" width="24" height="22"
                                   imageType="center" showDisabled="false" showRollOver="false" showDown="false" showFocused="false"
                                    click={downClick} />
                        <ImgButton src="[SKINIMG]TransferIcons/down_last.png" width="24" height="22"
                                   imageType="center" showDisabled="false" showRollOver="false" showDown="false" showFocused="false"
                                    click={downLastClick} />
                    </members>
                </VStack>
            </members>
        </HStack>
    </>, 
    document.getElementById(target)
);
