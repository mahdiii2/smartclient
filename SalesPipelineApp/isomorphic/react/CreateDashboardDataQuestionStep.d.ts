import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface CreateDashboardDataQuestionStepProps {

/**
 * See {@link isc.CreateDashboardDataQuestionStep.createDashboardComponentSteps CreateDashboardDataQuestionStep.createDashboardComponentSteps}.
 */
createDashboardComponentSteps?: CreateDashboardComponentDataQuestionStep[];

/**
 * See {@link isc.CreateDashboardDataQuestionStep.type CreateDashboardDataQuestionStep.type}.
 */
type?: string;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * CreateDashboardDataQuestionStep wraps the SmartClient object
 * {@link isc.CreateDashboardDataQuestionStep CreateDashboardDataQuestionStep} for React, allowing you to import
 * CreateDashboardDataQuestionStep for use in React JS and JSX.
 * @class
 */
declare class CreateDashboardDataQuestionStep extends ILogicalComponent {
    props: AsComponentXML<CreateDashboardDataQuestionStepProps>;
}
