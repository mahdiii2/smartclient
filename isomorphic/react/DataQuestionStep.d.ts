import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface DataQuestionStepProps {

/**
 * See {@link isc.DataQuestionStep.type DataQuestionStep.type}.
 */
type?: string;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * DataQuestionStep wraps the SmartClient object
 * {@link isc.DataQuestionStep DataQuestionStep} for React, allowing you to import
 * DataQuestionStep for use in React JS and JSX.
 * @class
 */
declare class DataQuestionStep extends ILogicalComponent {
    props: AsComponentXML<DataQuestionStepProps>;
}
