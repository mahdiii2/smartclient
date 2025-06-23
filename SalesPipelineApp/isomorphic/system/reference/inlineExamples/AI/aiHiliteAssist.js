var grid = isc.ListGrid.create({
    width: "100%", height: "100%",
    dataSource: "worldDS", autoFetchData: true, dataFetchMode: "local",
    sortField: "capital",

    canHiliteViaAI: true,
    hiliteViaAIMode: "aiAssist"
});
