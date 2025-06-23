import React from 'react';
import { IBaseComponent } from './core/IBaseComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface AnswerEngineOperationProps {

/**
 * See {@link isc.AnswerEngineOperation.dataQuestion AnswerEngineOperation.dataQuestion}.
 */
dataQuestion?: DataQuestion;

/**
 * See {@link isc.AnswerEngineOperation.dataSources AnswerEngineOperation.dataSources}.
 */
dataSources?: DataSource[];

/**
 * See {@link isc.AnswerEngineOperation.maxRecordsPerQuery AnswerEngineOperation.maxRecordsPerQuery}.
 */
maxRecordsPerQuery?: number;

/**
 * See {@link isc.AnswerEngineOperation.currentStep AnswerEngineOperation.currentStep}.
 */
currentStep?: DataQuestionStep;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * AnswerEngineOperation wraps the SmartClient widget class
 * {@link isc.AnswerEngineOperation AnswerEngineOperation} for React, allowing you to import
 * AnswerEngineOperation for use in React JS and JSX.
 * @class
 * @extends IBaseComponent
 */
declare class AnswerEngineOperation extends IBaseComponent {
    props: AsComponentXML<AnswerEngineOperationProps>;
}
