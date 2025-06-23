import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface CreateDashboardComponentDataQuestionStepResultProps {

/**
 * See {@link isc.CreateDashboardComponentDataQuestionStepResult.step CreateDashboardComponentDataQuestionStepResult.step}.
 */
step?: CreateDashboardComponentDataQuestionStep;

/**
 * See {@link isc.CreateDashboardComponentDataQuestionStepResult.jsCode CreateDashboardComponentDataQuestionStepResult.jsCode}.
 */
jsCode?: string;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * CreateDashboardComponentDataQuestionStepResult wraps the SmartClient object
 * {@link isc.CreateDashboardComponentDataQuestionStepResult CreateDashboardComponentDataQuestionStepResult} for React, allowing you to import
 * CreateDashboardComponentDataQuestionStepResult for use in React JS and JSX.
 * @class
 */
declare class CreateDashboardComponentDataQuestionStepResult extends ILogicalComponent {
    props: AsComponentXML<CreateDashboardComponentDataQuestionStepResultProps>;
}
