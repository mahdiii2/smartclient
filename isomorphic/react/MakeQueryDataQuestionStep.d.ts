import React from 'react';
import { DataQuestionStep, DataQuestionStepProps } from './DataQuestionStep';
import { AsComponentXML } from './core/ReactComponent';


declare interface MakeQueryDataQuestionStepProps extends DataQuestionStepProps {

/**
 * See {@link isc.MakeQueryDataQuestionStep.queryPurpose MakeQueryDataQuestionStep.queryPurpose}.
 */
queryPurpose?: string;

/**
 * See {@link isc.MakeQueryDataQuestionStep.type MakeQueryDataQuestionStep.type}.
 */
type?: string;

/**
 * See {@link isc.MakeQueryDataQuestionStep.queryDescription MakeQueryDataQuestionStep.queryDescription}.
 */
queryDescription?: string;

/**
 * See {@link isc.MakeQueryDataQuestionStep.dataSourceName MakeQueryDataQuestionStep.dataSourceName}.
 */
dataSourceName?: string;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * MakeQueryDataQuestionStep wraps the SmartClient object
 * {@link isc.MakeQueryDataQuestionStep MakeQueryDataQuestionStep} for React, allowing you to import
 * MakeQueryDataQuestionStep for use in React JS and JSX.
 * @class
 */
declare class MakeQueryDataQuestionStep extends DataQuestionStep {
    props: AsComponentXML<MakeQueryDataQuestionStepProps>;
}
