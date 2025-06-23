<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HTML><HEAD>
	<isomorphic:loadISC/>
    <!--if you uncomment these lines, the loaded Reify application will use the live, 
        SQL-based DataSources from your SDK, and be able to persistently save data.-->
    <!--
        <script><isomorphic:loadDS ID="supplyItem,supplyCategory"/></script>
    -->
</HEAD><BODY>
<SCRIPT>

isc.VLayout.create({
    ID:"mainLayout",
    padding:10,
    layoutMargin: 5,
    defaultLayoutAlign:"center",
    width:"100%", height:"100%"
});

isc.Reify.loadProject("Supply Catalog", // Enter the name of your real Reify project here
    function (project, projects, rpcResponse) {
        var message = isc.RPCManager.getLoadProjectErrorMessage(rpcResponse);
        if (message) {
            isc.warn(message); 
            return; 
        }
        if (rpcResponse.status == 0) {
            var screen = project.createScreen(project.screens[0].ID);
            mainLayout.addMember(screen);
            
            var message = "Project '"+project.projectName+"' loaded from https://create.reify.com";

            if (project.dataSources != null && project.dataSources.length != 0) message += "<P>Data derived from Reify mock dataSources.";
            else message += "<P>Data derived from live DataSources.";
            
            isc.notify(message, null, null,
                        {autoFitMaxWidth:400,canDismiss: true,  appearMethod: "fade", disappearMethod: "fade", position: "C" });

        }
    },  {
        // Enter your real Reify.com username and password here
        userName: "reifySample",
        password: "tryReify",
        serverURL: "https://create.reify.com",
        willHandleError: true
    }
);
</SCRIPT>
</BODY></HTML>
