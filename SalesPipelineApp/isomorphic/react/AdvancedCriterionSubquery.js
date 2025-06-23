import { DSRequest } from './DSRequest';

export class AdvancedCriterionSubquery extends DSRequest {
    IS_A_VIRTUAL_COMPONENT = true;

    static IS_CLASS = false;
static PROPERTY_TYPES = {"criteria":{"className":"Criteria"},"summaryFunctions":{"className":"Object"},"canEmbedSQL":"Boolean","groupBy":{"className":"String","isArray":true}};

}
