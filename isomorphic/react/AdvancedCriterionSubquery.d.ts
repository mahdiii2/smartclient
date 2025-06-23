import React from 'react';
import { DSRequest, DSRequestProps } from './DSRequest';
import { AsComponentXML } from './core/ReactComponent';


declare interface AdvancedCriterionSubqueryProps extends DSRequestProps {

/**
 * See {@link isc.AdvancedCriterionSubquery.queryOutput AdvancedCriterionSubquery.queryOutput}.
 */
queryOutput?: string;

/**
 * See {@link isc.AdvancedCriterionSubquery.queryFK AdvancedCriterionSubquery.queryFK}.
 */
queryFK?: string;

/**
 * See {@link isc.AdvancedCriterionSubquery.criteria AdvancedCriterionSubquery.criteria}.
 */
criteria?: Criteria;

/**
 * See {@link isc.AdvancedCriterionSubquery.summaryFunctions AdvancedCriterionSubquery.summaryFunctions}.
 */
summaryFunctions?: Object;

/**
 * See {@link isc.AdvancedCriterionSubquery.canEmbedSQL AdvancedCriterionSubquery.canEmbedSQL}.
 */
canEmbedSQL?: boolean;

/**
 * See {@link isc.AdvancedCriterionSubquery.operationId AdvancedCriterionSubquery.operationId}.
 */
operationId?: string;

/**
 * See {@link isc.AdvancedCriterionSubquery.dataSource AdvancedCriterionSubquery.dataSource}.
 */
dataSource?: string;

/**
 * See {@link isc.AdvancedCriterionSubquery.groupBy AdvancedCriterionSubquery.groupBy}.
 */
groupBy?: string[];


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * AdvancedCriterionSubquery wraps the SmartClient object
 * {@link isc.AdvancedCriterionSubquery AdvancedCriterionSubquery} for React, allowing you to import
 * AdvancedCriterionSubquery for use in React JS and JSX.
 * @class
 */
declare class AdvancedCriterionSubquery extends DSRequest {
    props: AsComponentXML<AdvancedCriterionSubqueryProps>;
}
