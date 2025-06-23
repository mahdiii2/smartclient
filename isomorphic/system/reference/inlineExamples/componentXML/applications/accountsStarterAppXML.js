isc.Canvas.create({
    ID: "container",
    width: "100%",
    height: "100%"
});

isc.RPCManager.loadScreen("accountsStarterApp",function (screen) {
    container.addChild(accountsStarterApp);
    isc.RPCManager.cacheScreens(["invoiceLinesView","orderLinesView"]);
}, isc.RPCManager.ALL_GLOBALS);
