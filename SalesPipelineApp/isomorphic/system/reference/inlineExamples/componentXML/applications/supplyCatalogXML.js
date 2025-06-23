isc.Canvas.create({
    ID: "container",
    width: "100%",
    height: "100%"
});

isc.RPCManager.loadScreen("supplyCatalog",function (screen) {
    container.addChild(supplyCatalog);
}, isc.RPCManager.ALL_GLOBALS);
