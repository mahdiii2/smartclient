isc.TreeGrid.create({
    ID: "employeeTree",
    dataSource: "employeesOpenNodes",
    autoFetchData: true,
    dataProperties: {
        openProperty: "IsOpen",
        childrenProperty: "DirectReports"
    },

    // customize appearance
    width: 500,
    height: 400,
    nodeIcon: "[SAMPLE]icons/16/person.png",
    folderIcon: "[SAMPLE]icons/16/person.png",
    showOpenIcons: false,
    showDropIcons: false,
    showSelectedIcons:true,
    closedIconSuffix: ""
});
