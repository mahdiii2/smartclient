import { ILogicalComponent } from './core/ILogicalComponent';

export class ExecuteQueryDataQuestionStepResult extends ILogicalComponent {
    IS_A_VIRTUAL_COMPONENT = true;

    static IS_CLASS = false;
static PROPERTY_TYPES = {"records":{"className":"Record","isArray":true},"step":{"className":"ExecuteQueryDataQuestionStep"},"totalRows":"Integer"};

}
