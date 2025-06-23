import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface CreateDashboardComponentDataQuestionStepProps {

/**
 * See {@link isc.CreateDashboardComponentDataQuestionStep.type CreateDashboardComponentDataQuestionStep.type}.
 */
type?: string;

/**
 * See {@link isc.CreateDashboardComponentDataQuestionStep.description CreateDashboardComponentDataQuestionStep.description}.
 */
description?: string;

/**
 * See {@link isc.CreateDashboardComponentDataQuestionStep.componentType CreateDashboardComponentDataQuestionStep.componentType}.
 */
componentType?: string;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * CreateDashboardComponentDataQuestionStep wraps the SmartClient object
 * {@link isc.CreateDashboardComponentDataQuestionStep CreateDashboardComponentDataQuestionStep} for React, allowing you to import
 * CreateDashboardComponentDataQuestionStep for use in React JS and JSX.
 * @class
 */
declare class CreateDashboardComponentDataQuestionStep extends ILogicalComponent {
    props: AsComponentXML<CreateDashboardComponentDataQuestionStepProps>;
}
