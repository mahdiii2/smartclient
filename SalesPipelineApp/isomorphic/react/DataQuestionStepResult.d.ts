import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface DataQuestionStepResultProps {

/**
 * See {@link isc.DataQuestionStepResult.step DataQuestionStepResult.step}.
 */
step?: DataQuestionStep;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * DataQuestionStepResult wraps the SmartClient object
 * {@link isc.DataQuestionStepResult DataQuestionStepResult} for React, allowing you to import
 * DataQuestionStepResult for use in React JS and JSX.
 * @class
 */
declare class DataQuestionStepResult extends ILogicalComponent {
    props: AsComponentXML<DataQuestionStepResultProps>;
}
