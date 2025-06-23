import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface PromiseOutcomeProps {

/**
 * See {@link isc.PromiseOutcome.reason PromiseOutcome.reason}.
 */
reason?: any;

/**
 * See {@link isc.PromiseOutcome.status PromiseOutcome.status}.
 */
status?: string;

/**
 * See {@link isc.PromiseOutcome.value PromiseOutcome.value}.
 */
value?: any;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * PromiseOutcome wraps the SmartClient object
 * {@link isc.PromiseOutcome PromiseOutcome} for React, allowing you to import
 * PromiseOutcome for use in React JS and JSX.
 * @class
 */
declare class PromiseOutcome extends ILogicalComponent {
    props: AsComponentXML<PromiseOutcomeProps>;
}
