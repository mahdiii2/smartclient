import { HLayout } from './HLayout';

export class Shuttle extends HLayout {
    static ISC_CLASS_NAME = 'Shuttle';
    
    static IS_CLASS = true;
static PROPERTY_TYPES = {"deselectAllButtonHeight":"Integer","selectedValues":[{"className":"String","isArray":true},{"className":"Number","isArray":true}],"sortField":["String",{"className":"String","isArray":true},"Integer"],"deselectButtonWidth":"Integer","selectButtonWidth":"Integer","deselectButtonHeight":"Integer","fields":{"className":"ListGridField","isArray":true},"selectAllButtonWidth":"Integer","initialSort":{"className":"SortSpecifier","isArray":true},"deselectAllButtonWidth":"Integer","filterContext":{"className":"DSRequest","isProperties":true},"dataSource":{"className":"DataSource"},"data":{"className":"Record","isArray":true},"selectedRecords":{"className":"ListGridRecord"},"selectAllButtonHeight":"Integer","selectButtonHeight":"Integer","implicitCriteria":{"className":"Criteria"}};
static CHILD_TYPE_MAPPING = {"ListGridField":"fields","DataSource":"dataSource"};

}
