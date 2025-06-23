import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface MakeQueryDataQuestionStepResultProps {

/**
 * See {@link isc.MakeQueryDataQuestionStepResult.step MakeQueryDataQuestionStepResult.step}.
 */
step?: MakeQueryDataQuestionStep;

/**
 * See {@link isc.MakeQueryDataQuestionStepResult.dsRequestProperties MakeQueryDataQuestionStepResult.dsRequestProperties}.
 */
dsRequestProperties?: DSRequest;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * MakeQueryDataQuestionStepResult wraps the SmartClient object
 * {@link isc.MakeQueryDataQuestionStepResult MakeQueryDataQuestionStepResult} for React, allowing you to import
 * MakeQueryDataQuestionStepResult for use in React JS and JSX.
 * @class
 */
declare class MakeQueryDataQuestionStepResult extends ILogicalComponent {
    props: AsComponentXML<MakeQueryDataQuestionStepResultProps>;
}
