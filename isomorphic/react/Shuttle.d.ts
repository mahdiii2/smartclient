import React from 'react';
import { HLayout, HLayoutProps } from './HLayout';
import { AsComponentXML } from './core/ReactComponent';


declare interface ShuttleProps extends HLayoutProps {

/**
 * See {@link isc.Shuttle.deselectAllButtonHeight Shuttle.deselectAllButtonHeight}.
 */
deselectAllButtonHeight?: number;

/**
 * See {@link isc.Shuttle.sourceGridTitle Shuttle.sourceGridTitle}.
 */
sourceGridTitle?: string;

/**
 * See {@link isc.Shuttle.fetchOperation Shuttle.fetchOperation}.
 */
fetchOperation?: string;

/**
 * See {@link isc.Shuttle.sortDirection Shuttle.sortDirection}.
 */
sortDirection?: string;

/**
 * See {@link isc.Shuttle.selectedValues Shuttle.selectedValues}.
 */
selectedValues?: string[] | number[];

/**
 * See {@link isc.Shuttle.valueField Shuttle.valueField}.
 */
valueField?: string;

/**
 * See {@link isc.Shuttle.selectAllButtonIcon Shuttle.selectAllButtonIcon}.
 */
selectAllButtonIcon?: string;

/**
 * See {@link isc.Shuttle.sortField Shuttle.sortField}.
 */
sortField?: string | string[] | number;

/**
 * See {@link isc.Shuttle.selectionUpdated() Shuttle.selectionUpdated()}.
 */
selectionUpdated?: Function;

/**
 * See {@link isc.Shuttle.getSelectedRecords() Shuttle.getSelectedRecords()}.
 */
getSelectedRecords?: Function;

/**
 * See {@link isc.Shuttle.deselectButtonWidth Shuttle.deselectButtonWidth}.
 */
deselectButtonWidth?: number;

/**
 * See {@link isc.Shuttle.selectButtonWidth Shuttle.selectButtonWidth}.
 */
selectButtonWidth?: number;

/**
 * See {@link isc.Shuttle.targetGridTitle Shuttle.targetGridTitle}.
 */
targetGridTitle?: string;

/**
 * See {@link isc.Shuttle.incompleteDataWarning Shuttle.incompleteDataWarning}.
 */
incompleteDataWarning?: string;

/**
 * See {@link isc.Shuttle.deselectButtonHeight Shuttle.deselectButtonHeight}.
 */
deselectButtonHeight?: number;

/**
 * See {@link isc.Shuttle.fields Shuttle.fields}.
 */
fields?: ListGridField[];

/**
 * See {@link isc.Shuttle.setSelectedByValue() Shuttle.setSelectedByValue()}.
 */
setSelectedByValue?: Function;

/**
 * See {@link isc.Shuttle.selectButtonIcon Shuttle.selectButtonIcon}.
 */
selectButtonIcon?: string;

/**
 * See {@link isc.Shuttle.getValueFieldName() Shuttle.getValueFieldName()}.
 */
getValueFieldName?: Function;

/**
 * See {@link isc.Shuttle.selectRecords() Shuttle.selectRecords()}.
 */
selectRecords?: Function;

/**
 * See {@link isc.Shuttle.selectAllButtonWidth Shuttle.selectAllButtonWidth}.
 */
selectAllButtonWidth?: number;

/**
 * See {@link isc.Shuttle.initialSort Shuttle.initialSort}.
 */
initialSort?: SortSpecifier[];

/**
 * See {@link isc.Shuttle.deselectAllButtonWidth Shuttle.deselectAllButtonWidth}.
 */
deselectAllButtonWidth?: number;

/**
 * See {@link isc.Shuttle.getSelectedValues() Shuttle.getSelectedValues()}.
 */
getSelectedValues?: Function;

/**
 * See {@link isc.Shuttle.filterContext Shuttle.filterContext}.
 */
filterContext?: DSRequest;

/**
 * See {@link isc.Shuttle.deselectRecords() Shuttle.deselectRecords()}.
 */
deselectRecords?: Function;

/**
 * See {@link isc.Shuttle.valuesFetchInProgress() Shuttle.valuesFetchInProgress()}.
 */
valuesFetchInProgress?: Function;

/**
 * See {@link isc.Shuttle.dataSource Shuttle.dataSource}.
 */
dataSource?: DataSource;

/**
 * See {@link isc.Shuttle.clearSelection() Shuttle.clearSelection()}.
 */
clearSelection?: Function;

/**
 * See {@link isc.Shuttle.data Shuttle.data}.
 */
data?: Record[];

/**
 * See {@link isc.Shuttle.selectedRecords Shuttle.selectedRecords}.
 */
selectedRecords?: ListGridRecord;

/**
 * See {@link isc.Shuttle.selectAllButtonHeight Shuttle.selectAllButtonHeight}.
 */
selectAllButtonHeight?: number;

/**
 * See {@link isc.Shuttle.selectButtonHeight Shuttle.selectButtonHeight}.
 */
selectButtonHeight?: number;

/**
 * See {@link isc.Shuttle.deselectAllButtonIcon Shuttle.deselectAllButtonIcon}.
 */
deselectAllButtonIcon?: string;

/**
 * See {@link isc.Shuttle.implicitCriteria Shuttle.implicitCriteria}.
 */
implicitCriteria?: Criteria;

/**
 * See {@link isc.Shuttle.loadingPlaceholderAttribute Shuttle.loadingPlaceholderAttribute}.
 */
loadingPlaceholderAttribute?: string;

/**
 * See {@link isc.Shuttle.valuesFetchComplete() Shuttle.valuesFetchComplete()}.
 */
valuesFetchComplete?: Function;

/**
 * See {@link isc.Shuttle.textMatchStyle Shuttle.textMatchStyle}.
 */
textMatchStyle?: string;

/**
 * See {@link isc.Shuttle.setImplicitCriteria() Shuttle.setImplicitCriteria()}.
 */
setImplicitCriteria?: Function;

/**
 * See {@link isc.Shuttle.deselectButtonIcon Shuttle.deselectButtonIcon}.
 */
deselectButtonIcon?: string;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * Shuttle wraps the SmartClient widget class
 * {@link isc.Shuttle Shuttle} for React, allowing you to import
 * Shuttle for use in React JS and JSX.
 * @class
 * @extends HLayout
 */
declare class Shuttle extends HLayout {
    props: AsComponentXML<ShuttleProps>;
}
