isc.Canvas.create({
    ID: "container",
    width: "100%",
    height: "100%"
});

isc.RPCManager.loadScreen("orderManagementApp",function (screen) {
    container.addChild(orderManagementApp);
    isc.RPCManager.cacheScreens("orderLinesSubset");
}, isc.RPCManager.ALL_GLOBALS);
