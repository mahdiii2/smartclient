/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DynamicForm, FileItem, HLayout, HStack, IButton, ListGrid, SubmitItem, TextItem, TileGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSaveClick = function () {
    this.form.saveData('if(dsResponse.status>=0) uploadForm.editNewRecord()');
};
let onSearchFormSubmit = function () {
    mediaTileGrid.fetchData(this.getValuesAsCriteria(), null, { textMatchStyle: 'substring' });
};
let onViewAsTilesClick = function () {
    showTileGrid();
};
let onViewAsListClick = function () {
    showListGrid();
};

var firstTime = true;
function showTileGrid() {
    mediaListGrid.hide();
    mediaTileGrid.show();
}
function showListGrid() {
    if (firstTime) {
        firstTime = false;
        mediaListGrid.setData(mediaTileGrid.getData());
    }
    mediaTileGrid.hide();
    mediaListGrid.show();
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack membersMargin="10" width="100%">
        <members>
            <DynamicForm ID="uploadForm" dataSource="mediaLibraryJPA" width="300" autoDraw="false">
                <fields>
                    <TextItem name="title"/>
                    <FileItem name="image" hint="Maximum file size is 5 MiB"/>
                    <ButtonItem title="Save" click={onSaveClick}/>
                </fields>
            </DynamicForm>
            <VLayout ID="mainLayout" width="500" height="250" autoDraw="false">
                <members>
                    <DynamicForm ID="searchForm" numCols="3" colWidths="60,200,*" saveOnEnter="true" width="100%" autoDraw="false" submit={onSearchFormSubmit}>
                        <fields>
                            <TextItem name="title" title="Title" width="*"/>
                            <SubmitItem name="search" title="Search" startRow="false" endRow="false"/>
                        </fields>
                    </DynamicForm>
                    <HLayout membersMargin="5" ID="buttons" width="500" padding="5" autoDraw="false">
                        <members>
                            <IButton radioGroup="views" actionType="checkbox" icon="[ISO_DOCS_SKIN]/images/silkicons/application_view_tile.png" autoFit="true" title="View as Tiles" ID="viewAsTiles" autoDraw="false" value="true" click={onViewAsTilesClick}/>
                            <IButton radioGroup="views" actionType="checkbox" icon="[ISO_DOCS_SKIN]/images/silkicons/application_view_detail.png" autoFit="true" title="View as List" ID="viewAsList" autoDraw="false" click={onViewAsListClick}/>
                        </members>
                    </HLayout>
                    <TileGrid ID="mediaTileGrid" dataSource="mediaLibraryJPA" tileWidth="100" tileHeight="150" width="100%" height="224" autoFetchData="true" autoDraw="false"/>
                    <ListGrid ID="mediaListGrid" dataSource="mediaLibraryJPA" width="100%" height="224" autoDraw="false"/>
                </members>
            </VLayout>
        </members>
    </HStack>,
    document.getElementById(target)
);

viewAsTiles.click();
