import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ComboBoxItem, DynamicForm } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let pickListProps = {
    pickListProperties: {
        canHover: true,
        showHover: true,
        cellHoverHTML : function (record) {
            return record.description ? record.description : "[no description]";
        },
        formatCellValue : function (value, record, field, viewer) {
            var descStr = record.description ? record.description : "[no descripton]";
            var styleStr = "font-family:arial;font-size:11px;white-space:nowrap;overflow:hidden;";                                  
            var retStr = "<table>" +
                "<tr><td ><span style='" + styleStr + "width:170px;float:left'>" + record.itemName + "<span></td>" +
                "<td align='right'><span style='" + styleStr + "width:50px;float:right;font-weight:bold'>" + record.unitCost + "<span></td></tr>" +
                "<tr><td colSpan=2><span style='" + styleStr + "width:220px;float:left'>" + descStr + "</span></td></tr></table>";
            return retStr;
        }
    }
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm ID="testForm" width="500" >
            <ComboBoxItem {...pickListProps} name="itemName" title="Item Name" valueField="itemID"
                addUnknownValues="false" optionDataSource="supplyItem" width="250"
                pickListCellHeight="50"
            />
        </DynamicForm>
    </>, 
    document.getElementById(target)
);
