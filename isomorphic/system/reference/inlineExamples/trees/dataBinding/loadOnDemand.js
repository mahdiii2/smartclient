isc.TreeGrid.create({
    ID: "employeeTree",
    dataSource: "employees",
    autoFetchData: true,

    // customize appearance
    width: 500,
    height: 400,
    nodeIcon:"[SAMPLE]icons/16/person.png",
    folderIcon:"[SAMPLE]icons/16/person.png",
    showOpenIcons:false,
    showDropIcons:false,
    showSelectedIcons:true,
    closedIconSuffix:""
});
