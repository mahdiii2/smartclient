import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface FixDashboardComponentDataQuestionStepResultProps {

/**
 * See {@link isc.FixDashboardComponentDataQuestionStepResult.step FixDashboardComponentDataQuestionStepResult.step}.
 */
step?: FixDashboardComponentDataQuestionStep;

/**
 * See {@link isc.FixDashboardComponentDataQuestionStepResult.jsCode FixDashboardComponentDataQuestionStepResult.jsCode}.
 */
jsCode?: string;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * FixDashboardComponentDataQuestionStepResult wraps the SmartClient object
 * {@link isc.FixDashboardComponentDataQuestionStepResult FixDashboardComponentDataQuestionStepResult} for React, allowing you to import
 * FixDashboardComponentDataQuestionStepResult for use in React JS and JSX.
 * @class
 */
declare class FixDashboardComponentDataQuestionStepResult extends ILogicalComponent {
    props: AsComponentXML<FixDashboardComponentDataQuestionStepResultProps>;
}
