<%@ page import="java.lang.reflect.Method" %>
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<!doctype html>
<HTML><HEAD>
<STYLE>
.normal			{font-family:Verdana; font-size:12px;}
.pageHeader2	{font-family:Verdana; font-size:24px; font-weight:bold;}
</STYLE>
<TITLE>SmartClient Admin Console</TITLE>
</HEAD><BODY BGCOLOR='#DDDDDD' CLASS=normal STYLE="overflow:hidden">

<!-- load Isomorphic SmartClient -->
<isomorphic:loadISC modulesDir="system/development/" includeModules="AdminConsole,FileBrowser,Tools,ServerLogViewer,History,Scheduler,RealtimeMessaging,SystemSchema" skin="Tahoe"/>

<SCRIPT>
RPCManager.actionURL = Page.getAppDir() + "adminConsoleOperations.jsp";

<isomorphic:loadDS ID="Filesystem,dsStore"/>

isc.Notify.configureDefaultSettings({
    position: "T"
});

<%
    /*
        Disable the scheduling tab unless the scheduling module is loaded
        and a Quartz scheduler has been or can be initialized
     */
     boolean schedulerOperationsDisabled = true;
     try {
         Class dsClass = Class.forName("com.isomorphic.scheduler.QuartzBasicDataSource", false, getClass().getClassLoader());
         if (dsClass != null) {
             Method method = dsClass.getMethod("getScheduler");
             Object scheduler = method.invoke(null);
             if (scheduler != null) {
                 schedulerOperationsDisabled = false;
             }
         }
     } catch (Exception ignore) {
     }
%>

isc.AdminConsole.create({
    width: "100%",
    height: "100%",
    showScheduleManagerDisabled: <%=schedulerOperationsDisabled %>
});

</SCRIPT>

</BODY>
</HTML>
