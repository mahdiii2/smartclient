import { StaticTextItem } from './StaticTextItem';

export class MultiPickerItem extends StaticTextItem {
    static ISC_CLASS_NAME = 'MultiPickerItem';
    
    static IS_CLASS = true;
static PROPERTY_TYPES = {"canSelectFolders":"Boolean","cascadeSelection":"Boolean","showSelectionList":"Boolean","expansionWidth":"Integer","shuttleHeight":"Integer","optionDataSource":{"className":"DataSource"},"pickListWidth":"Integer","filterIconWidth":"Integer","includeSelectedParents":"Boolean","multiple":"Boolean","filterPickListOnKeypress":"boolean","deriveUniqueValues":"Boolean","showSelectionLabel":"Boolean","pickListFetchDelay":"Integer","canExpand":"Boolean","shuttleWidth":"Integer","initialSort":{"className":"SortSpecifier","isArray":true},"expandedPickListFields":{"className":"ListGridField","isArray":true},"showFilterForm":"boolean","pickListFields":{"className":"ListGridField","isArray":true},"sortField":["String",{"className":"String","isArray":true},"Integer"],"optionFilterContext":{"className":"DSRequest","isProperties":true},"filterIconHeight":"Integer","optionCriteria":{"className":"Criteria"},"pickListHeight":"Integer","expansionHeight":"Integer"};

}
