import { ILogicalComponent } from './core/ILogicalComponent';

export class RESTAuthentication extends ILogicalComponent {
    IS_A_VIRTUAL_COMPONENT = true;

    static IS_CLASS = false;
static PROPERTY_TYPES = {"dataSource":{"className":"DataSource"}};
static CHILD_TYPE_MAPPING = {"DataSource":"dataSource"};

}
