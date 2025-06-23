import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface ValidateDashboardComponentDataQuestionStepProps {

/**
 * See {@link isc.ValidateDashboardComponentDataQuestionStep.type ValidateDashboardComponentDataQuestionStep.type}.
 */
type?: string;

/**
 * See {@link isc.ValidateDashboardComponentDataQuestionStep.createDashboardComponentStepResult ValidateDashboardComponentDataQuestionStep.createDashboardComponentStepResult}.
 */
createDashboardComponentStepResult?: CreateDashboardComponentDataQuestionStepResult;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * ValidateDashboardComponentDataQuestionStep wraps the SmartClient object
 * {@link isc.ValidateDashboardComponentDataQuestionStep ValidateDashboardComponentDataQuestionStep} for React, allowing you to import
 * ValidateDashboardComponentDataQuestionStep for use in React JS and JSX.
 * @class
 */
declare class ValidateDashboardComponentDataQuestionStep extends ILogicalComponent {
    props: AsComponentXML<ValidateDashboardComponentDataQuestionStepProps>;
}
