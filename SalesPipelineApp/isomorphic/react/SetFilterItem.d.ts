import React from 'react';
import { MultiPickerItem, MultiPickerItemProps } from './MultiPickerItem';
import { AsComponentXML } from './core/ReactComponent';


declare interface SetFilterItemProps extends MultiPickerItemProps {

/**
 * See {@link isc.SetFilterItem.expandedPickListFields SetFilterItem.expandedPickListFields}.
 */
expandedPickListFields?: ListGridField[];

/**
 * See {@link isc.SetFilterItem.toggleUseUnselectedValuesOnSelectAll SetFilterItem.toggleUseUnselectedValuesOnSelectAll}.
 */
toggleUseUnselectedValuesOnSelectAll?: boolean;

/**
 * See {@link isc.SetFilterItem.selectionStyle SetFilterItem.selectionStyle}.
 */
selectionStyle?: string;

/**
 * See {@link isc.SetFilterItem.pickListFields SetFilterItem.pickListFields}.
 */
pickListFields?: ListGridField[];

/**
 * See {@link isc.SetFilterItem.sourceList SetFilterItem.sourceList}.
 */
sourceList?: Record[] | Tree | ResultSet;

/**
 * See {@link isc.SetFilterItem.unselectedOperator SetFilterItem.unselectedOperator}.
 */
unselectedOperator?: string;

/**
 * See {@link isc.SetFilterItem.selectedOperator SetFilterItem.selectedOperator}.
 */
selectedOperator?: string;

/**
 * See {@link isc.SetFilterItem.deriveUniqueValues SetFilterItem.deriveUniqueValues}.
 */
deriveUniqueValues?: boolean;

/**
 * See {@link isc.SetFilterItem.setUseUnselectedValues() SetFilterItem.setUseUnselectedValues()}.
 */
setUseUnselectedValues?: Function;

/**
 * See {@link isc.SetFilterItem.useUnselectedValues SetFilterItem.useUnselectedValues}.
 */
useUnselectedValues?: boolean;

/**
 * See {@link isc.SetFilterItem.canExpand SetFilterItem.canExpand}.
 */
canExpand?: boolean;

/**
 * See {@link isc.SetFilterItem.defaultUseUnselectedValues SetFilterItem.defaultUseUnselectedValues}.
 */
defaultUseUnselectedValues?: boolean;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * SetFilterItem wraps the SmartClient widget class
 * {@link isc.SetFilterItem SetFilterItem} for React, allowing you to import
 * SetFilterItem for use in React JS and JSX.
 * @class
 * @extends MultiPickerItem
 */
declare class SetFilterItem extends MultiPickerItem {
    props: AsComponentXML<SetFilterItemProps>;
}
