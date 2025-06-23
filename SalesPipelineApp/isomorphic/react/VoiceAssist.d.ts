import React from 'react';
import { ILogicalComponent } from './core/ILogicalComponent';
import { AsComponentXML } from './core/ReactComponent';


declare interface VoiceAssistProps {

/**
 * See {@link isc.VoiceAssist.autoStopDelay VoiceAssist.autoStopDelay}.
 */
autoStopDelay?: number;

/**
 * See {@link isc.VoiceAssist.cancelPhrases VoiceAssist.cancelPhrases}.
 */
cancelPhrases?: string[];

/**
 * See {@link isc.VoiceAssist.voiceKey VoiceAssist.voiceKey}.
 */
voiceKey?: string;

/**
 * See {@link isc.VoiceAssist.language VoiceAssist.language}.
 */
language?: string;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * VoiceAssist wraps the non-rendered SmartClient class
 * {@link isc.VoiceAssist VoiceAssist} for React, allowing you to import
 *  VoiceAssist for use in React JS and JSX.
 * @class
 * @extends ILogicalComponent
 */
declare class VoiceAssist extends ILogicalComponent {
    props: AsComponentXML<VoiceAssistProps>;
}
