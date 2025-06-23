import React from 'react';
import { DataQuestionStep, DataQuestionStepProps } from './DataQuestionStep';
import { AsComponentXML } from './core/ReactComponent';


declare interface ValidateQueryDataQuestionStepProps extends DataQuestionStepProps {

/**
 * See {@link isc.ValidateQueryDataQuestionStep.type ValidateQueryDataQuestionStep.type}.
 */
type?: string;

/**
 * See {@link isc.ValidateQueryDataQuestionStep.makeQueryStepResult ValidateQueryDataQuestionStep.makeQueryStepResult}.
 */
makeQueryStepResult?: MakeQueryDataQuestionStepResult;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * ValidateQueryDataQuestionStep wraps the SmartClient object
 * {@link isc.ValidateQueryDataQuestionStep ValidateQueryDataQuestionStep} for React, allowing you to import
 * ValidateQueryDataQuestionStep for use in React JS and JSX.
 * @class
 */
declare class ValidateQueryDataQuestionStep extends DataQuestionStep {
    props: AsComponentXML<ValidateQueryDataQuestionStepProps>;
}
