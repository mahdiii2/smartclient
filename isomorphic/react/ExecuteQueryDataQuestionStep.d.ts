import React from 'react';
import { DataQuestionStep, DataQuestionStepProps } from './DataQuestionStep';
import { AsComponentXML } from './core/ReactComponent';


declare interface ExecuteQueryDataQuestionStepProps extends DataQuestionStepProps {

/**
 * See {@link isc.ExecuteQueryDataQuestionStep.type ExecuteQueryDataQuestionStep.type}.
 */
type?: string;

/**
 * See {@link isc.ExecuteQueryDataQuestionStep.validatedMakeQueryStepResult ExecuteQueryDataQuestionStep.validatedMakeQueryStepResult}.
 */
validatedMakeQueryStepResult?: MakeQueryDataQuestionStepResult;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * ExecuteQueryDataQuestionStep wraps the SmartClient object
 * {@link isc.ExecuteQueryDataQuestionStep ExecuteQueryDataQuestionStep} for React, allowing you to import
 * ExecuteQueryDataQuestionStep for use in React JS and JSX.
 * @class
 */
declare class ExecuteQueryDataQuestionStep extends DataQuestionStep {
    props: AsComponentXML<ExecuteQueryDataQuestionStepProps>;
}
