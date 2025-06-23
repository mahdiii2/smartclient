import { MultiPickerItem } from './MultiPickerItem';

export class SetFilterItem extends MultiPickerItem {
    static ISC_CLASS_NAME = 'SetFilterItem';
    
    static IS_CLASS = true;
static PROPERTY_TYPES = {"expandedPickListFields":{"className":"ListGridField","isArray":true},"toggleUseUnselectedValuesOnSelectAll":"Boolean","pickListFields":{"className":"ListGridField","isArray":true},"sourceList":[{"className":"Record","isArray":true},{"className":"Tree"},{"className":"ResultSet"}],"deriveUniqueValues":"Boolean","useUnselectedValues":"Boolean","canExpand":"Boolean","defaultUseUnselectedValues":"Boolean"};

}
