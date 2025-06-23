import { ILogicalComponent } from './core/ILogicalComponent';

export class DataQuestionSettings extends ILogicalComponent {
    IS_A_VIRTUAL_COMPONENT = true;

    static IS_CLASS = false;
static PROPERTY_TYPES = {"dataSourceNames":{"className":"GlobalId","isArray":true},"maxFixAttempts":"Integer"};

}
