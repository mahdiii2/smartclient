import { IBaseComponent } from './core/IBaseComponent';

export class AnswerEngineOperation extends IBaseComponent {
    static ISC_CLASS_NAME = 'AnswerEngineOperation';
    
    static IS_CLASS = true;
static PROPERTY_TYPES = {"dataQuestion":{"className":"DataQuestion"},"dataSources":{"className":"DataSource","isArray":true},"maxRecordsPerQuery":"Integer","currentStep":{"className":"DataQuestionStep"}};

}
