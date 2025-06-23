import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface DataQuestionSettingsProps {

/**
 * See {@link isc.DataQuestionSettings.applicationPurpose DataQuestionSettings.applicationPurpose}.
 */
applicationPurpose?: string;

/**
 * See {@link isc.DataQuestionSettings.dataSourceNames DataQuestionSettings.dataSourceNames}.
 */
dataSourceNames?: string[];

/**
 * See {@link isc.DataQuestionSettings.maxFixAttempts DataQuestionSettings.maxFixAttempts}.
 */
maxFixAttempts?: number;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * DataQuestionSettings wraps the SmartClient object
 * {@link isc.DataQuestionSettings DataQuestionSettings} for React, allowing you to import
 * DataQuestionSettings for use in React JS and JSX.
 * @class
 */
declare class DataQuestionSettings extends ILogicalComponent {
    props: AsComponentXML<DataQuestionSettingsProps>;
}
