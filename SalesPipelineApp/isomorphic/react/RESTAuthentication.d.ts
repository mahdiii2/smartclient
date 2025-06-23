import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface RESTAuthenticationProps {

/**
 * See {@link isc.RESTAuthentication.authToken RESTAuthentication.authToken}.
 */
authToken?: string;

/**
 * See {@link isc.RESTAuthentication.password RESTAuthentication.password}.
 */
password?: string;

/**
 * See {@link isc.RESTAuthentication.authHeader RESTAuthentication.authHeader}.
 */
authHeader?: string;

/**
 * See {@link isc.RESTAuthentication.username RESTAuthentication.username}.
 */
username?: string;

/**
 * See {@link isc.RESTAuthentication.type RESTAuthentication.type}.
 */
type?: string;

/**
 * See {@link isc.RESTAuthentication.dataSource RESTAuthentication.dataSource}.
 */
dataSource?: DataSource;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * RESTAuthentication wraps the SmartClient object
 * {@link isc.RESTAuthentication RESTAuthentication} for React, allowing you to import
 * RESTAuthentication for use in React JS and JSX.
 * @class
 */
declare class RESTAuthentication extends ILogicalComponent {
    props: AsComponentXML<RESTAuthenticationProps>;
}
