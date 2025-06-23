/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, LGField, ListGrid, SearchForm, TextItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSearchKeyPress = function (item, form, keyName, characterValue) {
    if (keyName == 'Enter') {
        itemList.filterData({
            fieldName: 'itemName',
            operator: 'iContains',
            value: item.getEnteredValue()
        });
    }
};
let onSearchClick = function () {
    itemList.filterData({
        fieldName: 'itemName',
        operator: 'iContains',
        value: searchForm.getField('search').getValue()
    });
};
let onItemListCreateRecordComponent = function (record, colNum) {
    var form = isc.DynamicForm.create({
        dataSource: supplyItem,
        showPending: true,
        canEdit: false,
        numCols: 4,
        colWidths: [
            100,
            '*',
            100,
            '*'
        ],
        width: '100%',
        autoDraw: false,
        fields: [
            { name: 'itemName' },
            {
                name: 'unitCost',
                canEdit: true,
                changed: function (form, item, value) {
                    var selectedRecord = itemList.getSelectedRecord();
                    if (selectedRecord) {
                        itemList.setEditValues(itemList.getRowNum(selectedRecord), { unitCost: value });
                    }
                },
                icons: [
                    {
                        src: '[SKIN]/actions/save.png',
                        prompt: 'Save',
                        click: function (form, item) {
                            if (itemList.getSelectedRecord())
                                form.saveData();
                        }
                    },
                    {
                        src: '[SKIN]/pickers/refresh_picker.png',
                        prompt: 'Reorder',
                        width: 18,
                        height: 22,
                        enableWhen: {
                            fieldName: 'inStock',
                            operator: 'equals',
                            value: true
                        }
                    },
                    {
                        src: '[SKIN]/pickers/clear_picker.png',
                        prompt: 'Remove',
                        width: 18,
                        height: 22,
                        click: function (form, item) {
                            if (itemList.getSelectedRecord())
                                itemList.removeData(itemList.getSelectedRecord());
                        }
                    },
                    {
                        src: '[SKIN]/actions/plus.png',
                        prompt: 'Bulk Order',
                        visibleWhen: {
                            fieldName: 'units',
                            operator: 'inSet',
                            value: [
                                'Roll',
                                'Ream',
                                'Tube'
                            ]
                        }
                    }
                ]
            },
            {
                name: 'description',
                width: '*',
                colSpan: '*',
                height: 60
            }
        ],
        click: function () {
            itemList.selectSingleRecord(record);
        }
    });
    form.setValues(record);
    return form;
};
let onItemListUpdateRecordComponent = function (record, colNum, component, recordChanged) {
    component.setData(record);
    var editValues = itemList.getEditValues(record);
    if (editValues['unitCost'] != null) {
        component.setValue('unitCost', editValues['unitCost']);
    }
    component.markForRedraw();
    return component;
};
let onItemNameFormatCellValue = function () {
    return '';
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="10">
        <members>
            <SearchForm ID="searchForm" numCols="4" width="100%">
                <fields>
                    <TextItem showHintInField="true" name="search" title="Item name" wrapTitle="false" hint="Search" keyPress={onSearchKeyPress}/>
                    <ButtonItem title="Search" startRow="false" click={onSearchClick}/>
                </fields>
            </SearchForm>
            <ListGrid ID="itemList" dataSource="supplyItem" autoSaveEdits="false" showHeader="false" autoFetchData="true" showRecordComponents="true" recordComponentPosition="within" width="800" height="450" recordComponentPoolingMode="recycle" recordComponentHeight="100" createRecordComponent={onItemListCreateRecordComponent} updateRecordComponent={onItemListUpdateRecordComponent}>
                <fields>
                    <LGField name="itemName" formatCellValue={onItemNameFormatCellValue}/>
                </fields>
            </ListGrid>
        </members>
    </VLayout>,
    document.getElementById(target)
);
