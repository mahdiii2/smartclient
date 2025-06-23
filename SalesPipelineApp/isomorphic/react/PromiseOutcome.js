import { ILogicalComponent } from './core/ILogicalComponent';

export class PromiseOutcome extends ILogicalComponent {
    IS_A_VIRTUAL_COMPONENT = true;

    static IS_CLASS = false;
static PROPERTY_TYPES = {"reason":"Any","value":"Any"};

}
