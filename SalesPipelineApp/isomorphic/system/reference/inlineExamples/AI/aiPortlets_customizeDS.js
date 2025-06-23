isc.logWarn("DOING IT:" + window.animals);
// Add informational context to DataSources to simplify natural language querying of AI server. 
// This could be applied directly in the ds.xml source
if (window.animals) {
    animals.title = "Animals of the world";
    animals.description = "A DataSource containing information about animals of the world";
}
if (window.supplyItem) {
    supplyItem.title = "Office Supplies";
    supplyItem.description = "Catalog of available wholesale Office Supplies";
}
if (window.supplyCategory) {
    supplyCategory.title = "Office Supply categories";
    supplyCategory.description = "Hierarchy of categories for Office Supplies";
}

if (window.worldDS) {
    worldDS.title="Countries of the world";
}