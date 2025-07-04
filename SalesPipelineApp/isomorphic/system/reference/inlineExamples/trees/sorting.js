isc.TreeGrid.create({
    ID: "employeeTree",
    width: 500,
    height: 400,
    dataSource: "employees",
    nodeIcon:"[SAMPLE]icons/16/person.png",
    folderIcon:"[SAMPLE]icons/16/person.png",
    showOpenIcons:false,
    showDropIcons:false,
    closedIconSuffix:"",
    autoFetchData:true,
    showSelectedIcons:true,
    autoOpenTree: "all",
    dataProperties:{
        loadDataOnDemand:false
    },
    fields: [
        {name: "Name"},
        {name: "Job"},
        {name: "Salary", formatCellValue: "isc.NumberUtil.format(value, '\u00A4,0.00')"}
    ]
});
