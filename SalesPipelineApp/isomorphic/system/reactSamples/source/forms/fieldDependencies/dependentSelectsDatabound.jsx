/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onCategoryNameChanged = function(form,item,value) {return form.clearValue('itemName');};
let onItemNameGetPickListFilterCriteria = function () {
    var category = this.form.getValue('categoryName');
    return { category: category };
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm numCols="4" width="500" top="25" autoDraw="true">
        <fields>
            <SelectItem optionDataSource="supplyCategory" name="categoryName" title="Category" changed={onCategoryNameChanged}/>
            <SelectItem optionDataSource="supplyItem" name="itemName" title="Item" getPickListFilterCriteria={onItemNameGetPickListFilterCriteria}/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
