import { ILogicalComponent } from './core/ILogicalComponent';

export class FixDashboardComponentDataQuestionStep extends ILogicalComponent {
    IS_A_VIRTUAL_COMPONENT = true;

    static IS_CLASS = false;
static PROPERTY_TYPES = {"prevValidateDashboardComponentStepResults":{"className":"ValidateDashboardComponentDataQuestionStepResult","isArray":true},"createDashboardComponentStep":{"className":"CreateDashboardComponentDataQuestionStep"}};

}
