/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, LGField, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCategoryDSTransformRequest = function (dsRequest) {
    var records = [], listGridCriteria = listGrid.getFilterEditorCriteria();
    if (this.currentData != null && this.compareCriteria(listGridCriteria, this.currentCriteria) == 0) {
        records = this.currentData;
    } else {
        var resultSet = listGrid.data;
        if (resultSet != null && resultSet.allMatchingRowsCached()) {
            var categoryArray = [];
            for (var i = 0; i < resultSet.getLength(); i++) {
                categoryArray.push(resultSet.get(i).category);
            }
            var filteredCategory = [];
            categoryArray.forEach(element => {
                if (!filteredCategory.includes(element)) {
                    filteredCategory.push(element);
                }
            });
            for (var j = 0; j < filteredCategory.length; j++) {
                records.push({ category: filteredCategory[j] });
            }
            categoryDS.updateCurrentData(listGridCriteria, records);
        }
    }
    if (records.length != 0) {
        var dsResponse = {
            status: 0,
            data: records
        };
        categoryDS.processResponse(dsRequest.requestId, dsResponse);
    } else {
        supplyItem.fetchData(listGridCriteria, function (dsResponse) {
            categoryDS.updateCurrentData(listGridCriteria, dsResponse.data);
            categoryDS.processResponse(dsRequest.requestId, dsResponse);
        }, {
            operationType: 'fetch',
            groupBy: 'category'
        });
    }
    return dsRequest.data;
};
let onCategoryDSUpdateCurrentData = function (criteria, data) {
    this.currentCriteria = criteria;
    this.currentData = data;
};
let onListGridDataArrived = function (startRow, endRow) {
    var item = this.filterEditor.getEditFormItem('category');
    item.fetchData();
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="categoryDS" dataProtocol="clientCustom" title="categoryDS" clientOnly="true" transformRequest={onCategoryDSTransformRequest} updateCurrentData={onCategoryDSUpdateCurrentData}>
            <fields>
                <DSField name="category"/>
            </fields>
            <currentData></currentData>
            <currentCriteria></currentCriteria>
        </DataSource>

        <ListGrid ID="listGrid" dataSource="supplyItem" showFilterEditor="true" autoFetchData="true" width="800" height="450" showAllColumns="true" dataArrived={onListGridDataArrived}>
            <fields>
                <LGField name="category">
                    <filterEditorProperties autoFetchData="false" editorType="SelectItem" name="category" optionDataSource="categoryDS" valueField="category"/>
                </LGField>
                <LGField name="itemName"/>
                <LGField name="SKU"/>
            </fields>
        </ListGrid>
    </>,
    document.getElementById(target)
);
