import React from 'react';
import { StaticTextItem, StaticTextItemProps } from './StaticTextItem';
import { AsComponentXML } from './core/ReactComponent';


declare interface MultiPickerItemProps extends StaticTextItemProps {

/**
 * See {@link isc.MultiPickerItem.getOptionCriteria() MultiPickerItem.getOptionCriteria()}.
 */
getOptionCriteria?: Function;

/**
 * See {@link isc.MultiPickerItem.canSelectFolders MultiPickerItem.canSelectFolders}.
 */
canSelectFolders?: boolean;

/**
 * See {@link isc.MultiPickerItem.textMatchStyle MultiPickerItem.textMatchStyle}.
 */
textMatchStyle?: string;

/**
 * See {@link isc.MultiPickerItem.cascadeSelection MultiPickerItem.cascadeSelection}.
 */
cascadeSelection?: boolean;

/**
 * See {@link isc.MultiPickerItem.showSelectionList MultiPickerItem.showSelectionList}.
 */
showSelectionList?: boolean;

/**
 * See {@link isc.MultiPickerItem.expansionWidth MultiPickerItem.expansionWidth}.
 */
expansionWidth?: number;

/**
 * See {@link isc.MultiPickerItem.shuttleHeight MultiPickerItem.shuttleHeight}.
 */
shuttleHeight?: number;

/**
 * See {@link isc.MultiPickerItem.filterIconSrc MultiPickerItem.filterIconSrc}.
 */
filterIconSrc?: string;

/**
 * See {@link isc.MultiPickerItem.optionDataSource MultiPickerItem.optionDataSource}.
 */
optionDataSource?: DataSource;

/**
 * See {@link isc.MultiPickerItem.selectAllButtonTitle MultiPickerItem.selectAllButtonTitle}.
 */
selectAllButtonTitle?: string;

/**
 * See {@link isc.MultiPickerItem.sortDirection MultiPickerItem.sortDirection}.
 */
sortDirection?: string;

/**
 * See {@link isc.MultiPickerItem.pickListWidth MultiPickerItem.pickListWidth}.
 */
pickListWidth?: number;

/**
 * See {@link isc.MultiPickerItem.filterHint MultiPickerItem.filterHint}.
 */
filterHint?: string;

/**
 * See {@link isc.MultiPickerItem.expandIconSrc MultiPickerItem.expandIconSrc}.
 */
expandIconSrc?: string;

/**
 * See {@link isc.MultiPickerItem.filterIconWidth MultiPickerItem.filterIconWidth}.
 */
filterIconWidth?: number;

/**
 * See {@link isc.MultiPickerItem.includeSelectedParents MultiPickerItem.includeSelectedParents}.
 */
includeSelectedParents?: boolean;

/**
 * See {@link isc.MultiPickerItem.displayField MultiPickerItem.displayField}.
 */
displayField?: string;

/**
 * See {@link isc.MultiPickerItem.selectedSelectionListTitle MultiPickerItem.selectedSelectionListTitle}.
 */
selectedSelectionListTitle?: string;

/**
 * See {@link isc.MultiPickerItem.multiple MultiPickerItem.multiple}.
 */
multiple?: boolean;

/**
 * See {@link isc.MultiPickerItem.filterPickListOnKeypress MultiPickerItem.filterPickListOnKeypress}.
 */
filterPickListOnKeypress?: boolean;

/**
 * See {@link isc.MultiPickerItem.optionOperationId MultiPickerItem.optionOperationId}.
 */
optionOperationId?: string;

/**
 * See {@link isc.MultiPickerItem.deriveUniqueValues MultiPickerItem.deriveUniqueValues}.
 */
deriveUniqueValues?: boolean;

/**
 * See {@link isc.MultiPickerItem.showSelectionLabel MultiPickerItem.showSelectionLabel}.
 */
showSelectionLabel?: boolean;

/**
 * See {@link isc.MultiPickerItem.pickListFetchDelay MultiPickerItem.pickListFetchDelay}.
 */
pickListFetchDelay?: number;

/**
 * See {@link isc.MultiPickerItem.canExpand MultiPickerItem.canExpand}.
 */
canExpand?: boolean;

/**
 * See {@link isc.MultiPickerItem.shuttleWidth MultiPickerItem.shuttleWidth}.
 */
shuttleWidth?: number;

/**
 * See {@link isc.MultiPickerItem.initialSort MultiPickerItem.initialSort}.
 */
initialSort?: SortSpecifier[];

/**
 * See {@link isc.MultiPickerItem.expandedPickListFields MultiPickerItem.expandedPickListFields}.
 */
expandedPickListFields?: ListGridField[];

/**
 * See {@link isc.MultiPickerItem.getValueFieldName() MultiPickerItem.getValueFieldName()}.
 */
getValueFieldName?: Function;

/**
 * See {@link isc.MultiPickerItem.deselectAllButtonTitle MultiPickerItem.deselectAllButtonTitle}.
 */
deselectAllButtonTitle?: string;

/**
 * See {@link isc.MultiPickerItem.showFilterForm MultiPickerItem.showFilterForm}.
 */
showFilterForm?: boolean;

/**
 * See {@link isc.MultiPickerItem.collapseIconSrc MultiPickerItem.collapseIconSrc}.
 */
collapseIconSrc?: string;

/**
 * See {@link isc.MultiPickerItem.pickListFields MultiPickerItem.pickListFields}.
 */
pickListFields?: ListGridField[];

/**
 * See {@link isc.MultiPickerItem.sortField MultiPickerItem.sortField}.
 */
sortField?: string | string[] | number;

/**
 * See {@link isc.MultiPickerItem.optionFilterContext MultiPickerItem.optionFilterContext}.
 */
optionFilterContext?: DSRequest;

/**
 * See {@link isc.MultiPickerItem.filterIconHeight MultiPickerItem.filterIconHeight}.
 */
filterIconHeight?: number;

/**
 * See {@link isc.MultiPickerItem.selectionStyle MultiPickerItem.selectionStyle}.
 */
selectionStyle?: string;

/**
 * See {@link isc.MultiPickerItem.valueField MultiPickerItem.valueField}.
 */
valueField?: string;

/**
 * See {@link isc.MultiPickerItem.optionCriteria MultiPickerItem.optionCriteria}.
 */
optionCriteria?: Criteria;

/**
 * See {@link isc.MultiPickerItem.selectAllWhileFiltered MultiPickerItem.selectAllWhileFiltered}.
 */
selectAllWhileFiltered?: string;

/**
 * See {@link isc.MultiPickerItem.pickListHeight MultiPickerItem.pickListHeight}.
 */
pickListHeight?: number;

/**
 * See {@link isc.MultiPickerItem.expansionHeight MultiPickerItem.expansionHeight}.
 */
expansionHeight?: number;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * MultiPickerItem wraps the SmartClient widget class
 * {@link isc.MultiPickerItem MultiPickerItem} for React, allowing you to import
 * MultiPickerItem for use in React JS and JSX.
 * @class
 * @extends StaticTextItem
 */
declare class MultiPickerItem extends StaticTextItem {
    props: AsComponentXML<MultiPickerItemProps>;
}
