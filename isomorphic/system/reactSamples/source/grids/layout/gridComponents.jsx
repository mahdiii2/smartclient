import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ToolStrip, Label, LayoutSpacer, ToolStripButton, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var dataChanged = function () {
    this.Super("dataChanged", arguments);
    var totalRows = this.data.getLength();
    if (totalRows > 0 && this.data.lengthIsKnown()) {
        totalsLabel.setContents(totalRows + " Records");
    } else {
        totalsLabel.setContents("&nbsp;");
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>    
        <ListGrid ID="countryList" width="500" height="425" alternateRecordStyles="true" dataSource="countryDS"
                    autoFetchData="true" showFilterEditor="true" canEdit="true" editEvent="none"
                    dataChanged={dataChanged}>
            <fields>
                <LGField name="countryCode" title="Code" width="50"/>
                <LGField name="countryName" title="Country"/>
                <LGField name="capital" title="Capital"/>
                <LGField name="continent" title="Continent"/>
            </fields>
            <gridComponents>
                <value>header</value>
                <value>filterEditor</value>
                <value>body</value>
                <ToolStrip ID="gridEditControls" width="100%" height="24">
                    <members>
                        <Label padding="5" ID="totalsLabel"/>
                        <LayoutSpacer width="*"/>
                        <ToolStripButton icon="[SKIN]/actions/edit.png" prompt="Edit selected record"
                                    click={function () {
                                            var record = countryList.getSelectedRecord();
                                            if (record == null) return;
                                                countryList.startEditing(countryList.data.indexOf(record));
                                            }}/>
                        <ToolStripButton icon="[SKIN]/actions/remove.png" prompt="Remove selected record"
                                    click="countryList.removeSelectedData()"/>
                    </members>
                </ToolStrip>
            </gridComponents>

        </ListGrid>
    </>, 
    document.getElementById(target)
);
