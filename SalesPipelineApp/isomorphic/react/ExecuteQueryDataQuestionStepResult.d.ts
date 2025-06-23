import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface ExecuteQueryDataQuestionStepResultProps {

/**
 * See {@link isc.ExecuteQueryDataQuestionStepResult.estimatedTotalRows ExecuteQueryDataQuestionStepResult.estimatedTotalRows}.
 */
estimatedTotalRows?: string;

/**
 * See {@link isc.ExecuteQueryDataQuestionStepResult.records ExecuteQueryDataQuestionStepResult.records}.
 */
records?: Record[];

/**
 * See {@link isc.ExecuteQueryDataQuestionStepResult.step ExecuteQueryDataQuestionStepResult.step}.
 */
step?: ExecuteQueryDataQuestionStep;

/**
 * See {@link isc.ExecuteQueryDataQuestionStepResult.totalRows ExecuteQueryDataQuestionStepResult.totalRows}.
 */
totalRows?: number;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * ExecuteQueryDataQuestionStepResult wraps the SmartClient object
 * {@link isc.ExecuteQueryDataQuestionStepResult ExecuteQueryDataQuestionStepResult} for React, allowing you to import
 * ExecuteQueryDataQuestionStepResult for use in React JS and JSX.
 * @class
 */
declare class ExecuteQueryDataQuestionStepResult extends ILogicalComponent {
    props: AsComponentXML<ExecuteQueryDataQuestionStepResultProps>;
}
