import React from 'react';
import { AsyncOperationResult, AsyncOperationResultProps } from './AsyncOperationResult';
import { AsComponentXML } from './core/ReactComponent';


declare interface DataQuestionResultProps extends AsyncOperationResultProps {



children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * DataQuestionResult wraps the SmartClient object
 * {@link isc.DataQuestionResult DataQuestionResult} for React, allowing you to import
 * DataQuestionResult for use in React JS and JSX.
 * @class
 */
declare class DataQuestionResult extends AsyncOperationResult {
    props: AsComponentXML<DataQuestionResultProps>;
}
