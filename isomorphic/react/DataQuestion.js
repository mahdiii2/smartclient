import { ILogicalComponent } from './core/ILogicalComponent';

export class DataQuestion extends ILogicalComponent {
    IS_A_VIRTUAL_COMPONENT = true;

    static IS_CLASS = false;
static PROPERTY_TYPES = {"prevStepResults":{"className":"DataQuestionStepResult","isArray":true},"settings":{"className":"DataQuestionSettings"},"userAIRequest":{"className":"UserAIRequest"}};

}
