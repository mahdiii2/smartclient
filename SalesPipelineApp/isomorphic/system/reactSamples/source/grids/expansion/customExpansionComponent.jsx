import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ListGrid, LGField, HLayout, VLayout, IButton } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var getExpansionComponent = function (record) {

    var countryGrid = isc.ListGrid.create({
        height: 224,
        dataSource: supplyItem,
        canEdit: true,
        modalEditing: true,
        editEvent: "click",
        listEndEditAction: "next",
        autoSaveEdits: false
    });
    countryGrid.fetchRelatedData(record, supplyCategory);

    var hLayout = isc.HLayout.create({
        align: "center",padding: 5,
        membersMargin: 10,
        members: [
            isc.IButton.create({
                title: "Save",
                click: function () {
                    countryGrid.saveAllEdits();
                }
            }),
            isc.IButton.create({
                title: "Discard",
                click : function () {
                    countryGrid.discardAllEdits();
                }
            }),
            isc.IButton.create({
                title: "Close",
                click : function () {
                    categoryList.collapseRecord(record);
                }
            })
        ]
    });

    var layout = isc.VLayout.create({
        padding: 5,
        members: [ countryGrid, hLayout ]
    });
    return layout;

}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>	
        <ListGrid ID="categoryList" width="100%" height="500" drawAheadRatio="4" dataSource="supplyCategory"
    					expansionFieldImageShowSelected="true" autoFetchData="true" canExpandRecords="true"
						getExpansionComponent={getExpansionComponent} />

    </>, 
    document.getElementById(target)
);



