/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DVField, TileGrid, TileGridField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onPictureGetValueIcon = function (value) {
    return value;
};
let onLifeSpanFormatCellValue = function(value,record,field,viewer) {return 'Lifespan: ' + value;};
let onLifeSpanFormatValue = function (value, record, form, item) {
    return value + ' years';
};
let onStatusFormatValue = function (value, record, form, item) {
    var res = null;
    if (value == 'Endangered')
        res = 'endangered';
    else if (value == 'Threatened')
        res = 'threatened';
    else if (value == 'Not Endangered')
        res = 'notEndangered';
    else
        res = 'animalText';
    return '<span class=' + res + '>' + value + '</span>';
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <TileGrid ID="boundList" dataSource="animals" animateTileChange="true" tileConstructor="DynamicForm" tileWidth="250" tileHeight="150" width="100%" height="100%" autoFetchData="true">
        <fields>
            <DVField name="picture" title="picture" rowSpan="3" showTitle="false" canEdit="false" editorType="StaticTextItem" imageURLPrefix="../inlineExamples/tiles/images/" showValueIconOnly="true" valueIconHeight="148" valueIconWidth="120" getValueIcon={onPictureGetValueIcon}/>
            <DVField name="commonName" title="commonName" textBoxStyle="commonName" showTitle="false" editorType="StaticTextItem"/>
            <DVField name="lifeSpan" title="lifeSpan" formatCellValue={onLifeSpanFormatCellValue} showTitle="false" editorType="StaticTextItem" textBoxStyle="animalText" formatValue={onLifeSpanFormatValue}/>
            <DVField name="status" title="status" height="*" showTitle="false" editorType="StaticTextItem" formatValue={onStatusFormatValue}/>
        </fields>
        <tileProperties>
        	<overflow>hidden</overflow>
        	<height>150</height>
        	<width>200</width>
        </tileProperties>
    </TileGrid>,
    document.getElementById(target)
);
