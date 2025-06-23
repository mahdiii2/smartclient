
function createUI () {

    var hLayout = isc.HLayout.create({
        ID: "hLayout",
        membersMargin: 15,
        members:[
            isc.TreeGrid.create({
                ID: "employeeTree",
                width: 525,
                height: 400,
                dataSource: employeesCO,
                nodeIcon: "[SAMPLE]icons/16/person.png",
                folderIcon: "[SAMPLE]icons/16/person.png",
                showOpenIcons: false,
                showDropIcons: false,
                closedIconSuffix: "",
                autoFetchData: true,
                dataFetchMode: "local",
                loadDataOnDemand: false,
                showSelectedIcons: true,
                showAllColumns: true,
                autoOpenTree: "all",
                fields: [
                    {name: "name", width: "40%", title:"Name"},
                    {name: "job"},
                    {name: "salary"}
                ],
                dynamicProperties: {
                    canEdit: { operator: "or",
                              criteria: [
                                  { fieldName: "auth.roles", operator:"contains", value:"CEO" },
                                  { fieldName: "auth.roles", operator:"contains", value:"HR" }
                              ]
                             }
                }
            }),
            isc.VLayout.create({
                membersMargin: 15,
                members: [
                    isc.IButton.create({
                        title: "Remove Employee",
                        width: 200, 
                        visibleWhen: { fieldName: "auth.roles", operator:"regexp", value:"CEO" },
                        enableWhen: { fieldName: "employeeTree.anySelected", operator:"equals", value:true },
                        click: function () {
                            employeeTree.removeData(employeeTree.getSelectedRecord());
                        }
                    }),
                    isc.IButton.create({
                        title: "Cheater Remove Employee",
                        width: 200,
                        enableWhen: { fieldName: "employeeTree.anySelected", operator:"equals", value:true },
                        click: function () {
                            employeeTree.removeData(employeeTree.getSelectedRecord());
                        }
                    }),
                ]
            })
        ]
    });
    return hLayout;
}
