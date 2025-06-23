
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HStack, DynamicForm, FormItem, TextItem, FileItem, ButtonItem, VLayout, SubmitItem, HLayout, IButton, TileGrid, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var firstTime = true;

let onFormItemClick = function () {
    this.form.saveData("if(dsResponse.status>=0) uploadForm.editNewRecord()");
};

let onSearchFormSubmit = function () {
    mediaTileGrid.fetchData(this.getValuesAsCriteria(), null, {textMatchStyle:"substring"});
};

let onViewAsTilesClick = function(){
    showTileGrid();
};

let onViewAsListClick = function(){
    showListGrid();
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

        <HStack membersMargin="10" width="100%">
            <members>
                <DynamicForm ID="uploadForm" dataSource="mediaLibrary" width="300">
                    <fields>
                        <TextItem name="title" required="true"/>
                        <FileItem type="imageFile" name="image" hint="Maximum file size is 5 MiB" multiple="false"/>
                        <ButtonItem type="button" title="Save" click={onFormItemClick}/>
                    </fields>
                </DynamicForm>
                <VLayout ID="mainLayout" width="500" height="250">
                    <members>
                        <DynamicForm ID="searchForm" numCols="3" colWidths="60,200,*" saveOnEnter="true" width="100%" submit={onSearchFormSubmit}>
                            <fields>
                                <TextItem type="text" name="title" title="Title" width="*"/>
                                <SubmitItem type="SubmitItem" name="search" title="Search" startRow="false" endRow="false"/>
                            </fields>
                        </DynamicForm>
                        <HLayout membersMargin="5" ID="buttons" width="500" padding="5">
                            <members>
                                <IButton radioGroup="views" actionType="checkbox" icon="[ISO_DOCS_SKIN]/images/silkicons/application_view_tile.png" autoFit="true" title="View as Tiles" ID="viewAsTiles" value="true" click={onViewAsTilesClick}/>
                                <IButton radioGroup="views" actionType="checkbox" icon="[ISO_DOCS_SKIN]/images/silkicons/application_view_detail.png" autoFit="true" title="View as List" ID="viewAsList" click={onViewAsListClick}/>
                            </members>
                        </HLayout>
                        <TileGrid ID="mediaTileGrid" dataSource="mediaLibrary" tileWidth="100" tileHeight="150" width="100%" height="224" autoFetchData="true"/>
                        <ListGrid ID="mediaListGrid" dataSource="mediaLibrary" alternateRecordStyles="true" width="100%" height="224"/>
                    </members>
                </VLayout>
            </members>
        </HStack>

    </>,
    document.getElementById(target)
);

viewAsTiles.click();

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
