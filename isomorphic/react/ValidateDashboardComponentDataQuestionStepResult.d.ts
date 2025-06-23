import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface ValidateDashboardComponentDataQuestionStepResultProps {

/**
 * See {@link isc.ValidateDashboardComponentDataQuestionStepResult.step ValidateDashboardComponentDataQuestionStepResult.step}.
 */
step?: ValidateDashboardComponentDataQuestionStep;

/**
 * See {@link isc.ValidateDashboardComponentDataQuestionStepResult.nodes ValidateDashboardComponentDataQuestionStepResult.nodes}.
 */
nodes?: PaletteNode[];


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * ValidateDashboardComponentDataQuestionStepResult wraps the SmartClient object
 * {@link isc.ValidateDashboardComponentDataQuestionStepResult ValidateDashboardComponentDataQuestionStepResult} for React, allowing you to import
 * ValidateDashboardComponentDataQuestionStepResult for use in React JS and JSX.
 * @class
 */
declare class ValidateDashboardComponentDataQuestionStepResult extends ILogicalComponent {
    props: AsComponentXML<ValidateDashboardComponentDataQuestionStepResultProps>;
}
