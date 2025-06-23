/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, Canvas, CheckboxItem, ComboBoxItem, DateItem, DetailViewer, DynamicForm, HTMLPane, IButton, LGField, Label, ListGrid, Menu, MenuItem, PickTreeItem, SearchForm, SectionStack, SectionStackSection, SpinnerItem, SplitPane, TabSet, TextAreaItem, TextItem, TreeGrid, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSavebtnClick = function(form,item) {return editForm.saveData()};
let onAddNewItemClick = function () {
    itemList.selection.deselectAll();
    itemDetailTabs.selectTab(1);
    itemList.updateDetails();
};
let onShowDetailsClick = function(target,item,menu,colNum) {itemDetailTabs.selectTab(0); itemList.updateDetails()};
let onEditItemClick = function(target,item,menu,colNum) {itemDetailTabs.selectTab(1); itemList.updateDetails()};
let onDeleteItemClick = function(target,item,menu,colNum) {itemList.removeSelectedData(); itemDetailTabs.clearDetails()};
let onCategoryTreeSelectionUpdated = function (record, recordList) {
    if (categoryTree.getSelectedRecord() == null) {
        itemList.setData([]);
        itemDetailTabs.clearDetails();
    }
};
let onCategoryTreeNodeClick = function (categoryTree, node, recordNum) {
    if (categoryTree.isSelected(node)) {
        findForm.findItems(node.categoryName);
    }
};
let onCategoryTreeVisibilityChanged = function (isVisible) {
    if (isVisible) {
        itemDetailTabs.selectTab(0);
        itemDetailTabs.clearDetails();
    }
};
let onFindFormFindItems = function (categoryName) {
    var findValues;
    if (this.getValue('findInCategory') && categoryTree.selection.anySelected()) {
        if (categoryName == null)
            categoryName = categoryTree.getSelectedRecord().categoryName;
        findValues = { category: categoryName };
        isc.addProperties(findValues, this.getValues());
    } else if (categoryName == null) {
        findValues = this.getValues();
    } else {
        findValues = { category: categoryName };
    }
    itemList.filterData(findValues);
    itemDetailTabs.clearDetails();
    if (pageLayout.currentPane == 'navigation')
        pageLayout.showListPane();
};
let onFindButtonClick = function() {return findForm.findItems();};
let onItemListRecordClick = function(viewer,record,recordNum,field,fieldNum,value,rawValue,editedRecord) {return this.updateDetails()};
let onItemListCellContextClick = function(record,rowNum,colNum) {return itemListMenu.showContextMenu()};
let onItemListCellChanged = function(record,newValue,oldValue,rowNum,colNum,grid) {return this.updateDetails()};
let onItemListSelectionUpdated = function (record, recordList) {
    if (itemList.getSelectedRecord() == null) {
        var categoryNode = categoryTree.getSelectedRecord();
        if (categoryNode != null) {
            findForm.findItems(categoryNode.categoryName);
        } else {
            itemDetailTabs.clearDetails();
        }
    }
};
let onItemListUpdateDetails = function () {
    if (!isc.Browser.isDesktop && (itemDetailTabs.tabs == null || itemDetailTabs.tabs.length == 0)) {
        addTabs(itemDetailTabs);
    }
    var record = this.getSelectedRecord();
    if (record == null)
        return itemDetailTabs.clearDetails();
    if (itemDetailTabs.getSelectedTabNumber() == 0) {
        itemViewer.setData(record);
    } else {
        itemDetailTabs.updateTab('editTab', editForm);
        editForm.editRecord(record);
    }
    if (pageLayout.currentPane == 'list')
        pageLayout.showDetailPane();
};
let onNextShipmentShowIf = function(list,field,fieldNum) {return false};
let onItemDetailTabsTabSelected = function () {
    if (pageLayout.currentPane == 'detail') {
        itemList.updateDetails();
    }
};
let onItemDetailTabsClearDetails = function () {
    var selectedTab = this.getSelectedTabNumber();
    if (selectedTab == 0) {
        itemViewer.setData();
    } else if (selectedTab == 1) {
        if (categoryTree.getSelectedRecord() != null) {
            this.updateTab('editTab', editForm);
            editForm.editNewRecord({ category: categoryTree.getSelectedRecord().categoryName });
        } else {
            this.updateTab('editTab', editorMessage);
        }
    }
};

function addTabs(tabSet) {
    tabSet.addTab({
        title: 'View',
        pane: itemViewer,
        ID: 'viewTab',
        width: 70,
        icon: '[SAMPLE]demoApp/icon_view.png'
    });
    tabSet.addTab({
        title: 'Edit',
        pane: editForm,
        ID: 'editTab',
        width: 70,
        icon: '[SAMPLE]demoApp/icon_edit.png'
    });
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Label contents="Select a record to edit, or a category to insert a new record into" align="center" title="editorMessage" ID="editorMessage" width="100%" height="100%" autoDraw="false"/>

        <DetailViewer ID="itemViewer" dataSource="supplyItem" emptyMessage="Select an item to view its details" width="100%" margin="5" autoDraw="false"/>

        <DynamicForm ID="editForm" dataSource="supplyItem" numCols="4" colWidths="80,200,100,200" cellPadding="5" autoFocus="false" width="650" margin="5" useAllDataSourceFields="true" autoDraw="false">
            <fields>
                <TextItem name="SKU"/>
                <TextAreaItem name="description" width="200" rowSpan="3"/>
                <PickTreeItem dataSource="supplyCategory" canSelectParentItems="true" emptyMenuMessage="No Sub Categories" name="category"/>
                <SpinnerItem step="0.01" name="unitCost"/>
                <CheckboxItem name="inStock"/>
                <DateItem useTextField="true" name="nextShipment" wrapTitle="false"/>
                <ButtonItem name="savebtn" title="Save Item" align="center" width="100" colSpan="4" click={onSavebtnClick}/>
            </fields>
        </DynamicForm>

        <Menu ID="itemListMenu" autoDraw="false">
            <data>
                <MenuItem title="Add New Item" icon="[SAMPLE]demoApp/icon_add.png" click={onAddNewItemClick}/>
                <MenuItem isSeparator="true"/>
                <MenuItem title="Show Details" icon="[SAMPLE]demoApp/icon_view.png" click={onShowDetailsClick}/>
                <MenuItem title="Edit Item" icon="[SAMPLE]demoApp/icon_edit.png" click={onEditItemClick}/>
                <MenuItem title="Delete Item" icon="[SAMPLE]demoApp/icon_delete.png" click={onDeleteItemClick}/>
            </data>
        </Menu>

        <SplitPane navigationTitle="Categories" listTitle="Items" detailTitle="Item Details" showLeftButton="false" showRightButton="false" ID="pageLayout" width="100%" height="100%" autoDraw="true">
            <navigationPane>
                <SectionStack visibilityMode="multiple" animateSections="true" ID="navigationPane" width="280" autoDraw="false">
                    <sections>
                        <SectionStackSection autoShow="true" showHeader="false">
                            <items>
                                <TreeGrid ID="categoryTree" dataSource="supplyCategory" showHeader="false" canAcceptDroppedRecords="true" autoDraw="false" selectionUpdated={onCategoryTreeSelectionUpdated} nodeClick={onCategoryTreeNodeClick} visibilityChanged={onCategoryTreeVisibilityChanged}/>
                            </items>
                        </SectionStackSection>
                        <SectionStackSection title="Instructions" autoShow="true" hidden="false">
                            <items>
                                <HTMLPane contentsURL={isc.Page.getIsomorphicDocsDir() + '/inlineExamples/demoApp/demoApp_helpText.html'} ID="helpCanvas" styleName="defaultBorder" padding="10" overflow="auto" autoDraw="false"/>
                            </items>
                        </SectionStackSection>
                    </sections>
                </SectionStack>
            </navigationPane>
            <listPane>
                <VLayout ID="listPane" autoDraw="false">
                    <members>
                        <Canvas ID="findPane" height="60" styleName="defaultBorder" overflow="auto" autoDraw="false">
                            <childComponents>
                                <SearchForm ID="findForm" dataSource="supplyItem" numCols="6" cellPadding="4" left="130" top="10" autoDraw="false" findItems={onFindFormFindItems}>
                                    <fields>
                                        <TextItem name="SKU"/>
                                        <ComboBoxItem optionDataSource="supplyItem" name="itemName" pickListWidth="250"/>
                                        <CheckboxItem defaultValue="true" name="findInCategory" title="Use category" shouldSaveValue="false"/>
                                    </fields>
                                </SearchForm>
                                <IButton icon="[SAMPLE]demoApp/icon_find.png" iconWidth="16" title="Find" ID="findButton" width="80" left="25" top="16" autoDraw="false" click={onFindButtonClick}/>
                            </childComponents>
                        </Canvas>
                        <ListGrid ID="itemList" dataSource="supplyItem" modalEditing="true" canEdit="true" selectionType="single" canDragRecordsOut="true" hoverWidth="200" hoverHeight="20" useAllDataSourceFields="true" autoDraw="false" recordClick={onItemListRecordClick} cellContextClick={onItemListCellContextClick} cellChanged={onItemListCellChanged} selectionUpdated={onItemListSelectionUpdated} updateDetails={onItemListUpdateDetails}>
                            <fields>
                                <LGField name="itemName" title="Name" showHover="true"/>
                                <LGField name="unitCost" editorType="SpinnerItem" format="¤,0.00" autoFitWidthApproach="both" autoFitWidth="true">
                                    <editorProperties step="0.01"/>
                                </LGField>
                                <LGField name="SKU" canEdit="false" autoFitWidthApproach="value" autoFitWidth="true"/>
                                <LGField name="description" showHover="true"/>
                                <LGField name="category" canEdit="false" autoFitWidthApproach="value" autoFitWidth="true"/>
                                <LGField name="units" canEdit="false" autoFitWidthApproach="both" autoFitWidth="true"/>
                                <LGField name="inStock" width="55" align="center"/>
                                <LGField name="nextShipment" showIf={onNextShipmentShowIf}/>
                            </fields>
                        </ListGrid>
                    </members>
                </VLayout>
            </listPane>
            <detailPane>
                <VLayout ID="detailPane" autoDraw="false">
                    <members>
                        <TabSet ID="itemDetailTabs" autoDraw="false" tabSelected={onItemDetailTabsTabSelected} clearDetails={onItemDetailTabsClearDetails}/>
                    </members>
                </VLayout>
            </detailPane>
        </SplitPane>
    </>,
    document.getElementById(target)
);

if (isc.Browser.isDesktop)
    addTabs(itemDetailTabs);
findForm.getItem('itemName').addProperties({
    getPickListFilterCriteria: function () {
        var criteria = this.Super('getPickListFilterCriteria', arguments);
        if (this.form.getValue('findInCategory') && categoryTree.selection.anySelected()) {
            criteria.category = categoryTree.getSelectedRecord().categoryName;
        }
        return criteria;
    }
});
categoryTree.fetchData();
