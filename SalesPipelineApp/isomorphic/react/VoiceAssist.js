import { ILogicalComponent } from './core/ILogicalComponent';

export class VoiceAssist extends ILogicalComponent {
    static ISC_CLASS_NAME = 'VoiceAssist';

    static IS_CLASS = true;
static PROPERTY_TYPES = {"autoStopDelay":"Integer","cancelPhrases":{"className":"String","isArray":true}};

}
