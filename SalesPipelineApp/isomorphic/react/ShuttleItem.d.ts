import React from 'react';
import { CanvasItem, CanvasItemProps } from './CanvasItem';
import { AsComponentXML } from './core/ReactComponent';


declare interface ShuttleItemProps extends CanvasItemProps {

/**
 * See {@link isc.ShuttleItem.valueField ShuttleItem.valueField}.
 */
valueField?: string;

/**
 * See {@link isc.ShuttleItem.width ShuttleItem.width}.
 */
width?: number | string;

/**
 * See {@link isc.ShuttleItem.displayField ShuttleItem.displayField}.
 */
displayField?: string;

/**
 * See {@link isc.ShuttleItem.height ShuttleItem.height}.
 */
height?: number | string;

/**
 * See {@link isc.ShuttleItem.optionDataSource ShuttleItem.optionDataSource}.
 */
optionDataSource?: DataSource;

/**
 * See {@link isc.ShuttleItem.shuttleFields ShuttleItem.shuttleFields}.
 */
shuttleFields?: ListGridField[];


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * ShuttleItem wraps the SmartClient widget class
 * {@link isc.ShuttleItem ShuttleItem} for React, allowing you to import
 * ShuttleItem for use in React JS and JSX.
 * @class
 * @extends CanvasItem
 */
declare class ShuttleItem extends CanvasItem {
    props: AsComponentXML<ShuttleItemProps>;
}
