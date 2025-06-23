

isc.TabSet.create({
    ID: "tabSet",
    tabBarPosition: "top",
    width: "100%",
    height: "100%",
    tabs: [
        { title: "Dashboard Starter App", name:"Dashboard Starter App", pane: isc.Canvas.create({width:"100%", height:"100%"}) },
        { title: "Issue Tracking App", name:"Issue Tracking App (Simple)", pane: isc.Canvas.create({width:"100%", height:"100%"}) },
        { title: "Order Management App", name:"Order Management Starter App", pane: isc.Canvas.create({width:"100%", height:"100%"}) },
        { title: "Accounts Starter App", name:"Accounts Starter App", pane: isc.Canvas.create({width:"100%", height:"100%"}) }
    ],
    tabSelected : function (tabNum, tabPane, ID, tab, name) {
        if (!tabPane.children) {
            this.loadSampleApp(tab.name, tabPane);
        }
    },    
    loadSampleApp: function(name, tabPane) {
        isc.Reify.loadProject(name, function (project, projects, rpcResponse) {
            var message = isc.RPCManager.getLoadProjectErrorMessage(rpcResponse);
            if (message) { 
                isc.warn(message); 
                return; 
            }
            tabPane.addChild(project.createScreen(project.screens[0].ID));
        },
        {
            userName:"reifySample",
            password:"tryReify",
            serverURL:"https://create-test.reify.com",
            willHandleError: true,
            verifyAsError: true,
            verifyDataSources: true
        });
    }
});

