isc.Canvas.create({
    ID: "container",
    width: "100%",
    height: "100%"
});

isc.RPCManager.loadScreen("dashboardStarterApp",function (screen) {
    container.addChild(dashboardStarterApp);
}, isc.RPCManager.ALL_GLOBALS);
