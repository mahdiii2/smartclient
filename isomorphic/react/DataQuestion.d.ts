import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface DataQuestionProps {

/**
 * See {@link isc.DataQuestion.prevStepResults DataQuestion.prevStepResults}.
 */
prevStepResults?: DataQuestionStepResult[];

/**
 * See {@link isc.DataQuestion.settings DataQuestion.settings}.
 */
settings?: DataQuestionSettings;

/**
 * See {@link isc.DataQuestion.ID DataQuestion.ID}.
 */
ID?: string;

/**
 * See {@link isc.DataQuestion.userAIRequest DataQuestion.userAIRequest}.
 */
userAIRequest?: UserAIRequest;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * DataQuestion wraps the SmartClient object
 * {@link isc.DataQuestion DataQuestion} for React, allowing you to import
 * DataQuestion for use in React JS and JSX.
 * @class
 */
declare class DataQuestion extends ILogicalComponent {
    props: AsComponentXML<DataQuestionProps>;
}
