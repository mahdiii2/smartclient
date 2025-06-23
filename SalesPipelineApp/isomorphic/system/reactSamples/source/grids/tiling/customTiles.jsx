import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, TileGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let getCellStyle = function (value, field, record, viewer) {
    if      (value == "Endangered")     return "endangered";
    else if (value == "Threatened")     return "threatened";
    else if (value == "Not Endangered") return "notEndangered";
    else                                return "animalText";
}

// override getTile() to add a "remove" button
let getTile = function (record) {
    var tile = this.Super("getTile", arguments);
    if (!tile.children) {
        // passed record may be an index
        record = this.getTileRecord(tile);
        tile.addChild(this.getRemoveButton(record));
    }
    return tile;
}
    
let getRemoveButton = function (record) {
    var removeButton = isc.ImgButton.create({
        src: "[SKINIMG]/TabSet/close.png",
        showHover: true,
        prompt: "Remove tile",
        size: 15,
        showFocused: false,
        showRollOver: false,
        snapTo: "TR",
        showDown: false,
        margin: 2,
        tileGrid: this,
        record: record,
        click : function () {
            animals.removeData(this.record);
        }
    });
    return removeButton;
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <TileGrid ID="boundList" tileWidth="150" tileHeight="225" width="100%" height="100%" dataSource="animals"
                    autoFetchData="true" animateTileChange="true" detailViewerProperties={ { rowHeight: 22 } }
                    getTile={getTile} getRemoveButton={getRemoveButton}>
            <fields>
                <LGField name="picture" cellStyle="animalImage"/>
                <LGField name="commonName" cellStyle="commonName"/>
                <LGField name="lifeSpan" cellStyle="animalText" formatCellValue="return 'Lifespan: ' + value;"/>
                <LGField name="status" getCellStyle={getCellStyle}/>
            </fields>
        </TileGrid>

    </>,
    document.getElementById(target)
);
