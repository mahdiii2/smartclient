isc.Canvas.create({
    ID: "container",
    width: "100%",
    height: "100%"
});

isc.RPCManager.loadScreen("issueTrackingApp",function (screen) {
    container.addChild(issueTrackingApp);
    isc.RPCManager.cacheScreens("historyScreen");
}, isc.RPCManager.ALL_GLOBALS);
