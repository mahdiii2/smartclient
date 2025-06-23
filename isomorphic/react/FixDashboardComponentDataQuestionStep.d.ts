import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface FixDashboardComponentDataQuestionStepProps {

/**
 * See {@link isc.FixDashboardComponentDataQuestionStep.prevValidateDashboardComponentStepResults FixDashboardComponentDataQuestionStep.prevValidateDashboardComponentStepResults}.
 */
prevValidateDashboardComponentStepResults?: ValidateDashboardComponentDataQuestionStepResult[];

/**
 * See {@link isc.FixDashboardComponentDataQuestionStep.createDashboardComponentStep FixDashboardComponentDataQuestionStep.createDashboardComponentStep}.
 */
createDashboardComponentStep?: CreateDashboardComponentDataQuestionStep;

/**
 * See {@link isc.FixDashboardComponentDataQuestionStep.type FixDashboardComponentDataQuestionStep.type}.
 */
type?: string;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * FixDashboardComponentDataQuestionStep wraps the SmartClient object
 * {@link isc.FixDashboardComponentDataQuestionStep FixDashboardComponentDataQuestionStep} for React, allowing you to import
 * FixDashboardComponentDataQuestionStep for use in React JS and JSX.
 * @class
 */
declare class FixDashboardComponentDataQuestionStep extends ILogicalComponent {
    props: AsComponentXML<FixDashboardComponentDataQuestionStepProps>;
}
