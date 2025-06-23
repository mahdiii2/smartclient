<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isc" %>
<HTML><HEAD><TITLE><%=isc_getShortURI(request)%></TITLE>
<%
    String skin = request.getParameter("skin");
    if (skin == null) skin = "standard";

    String remote = request.getParameter("remote");
    if (remote == null) remote = "false";
    if (remote != "false") {
%>
<script>    
        window.isc_remoteDebug = true;
</script>        
<%        
    }
%>
<SCRIPT>
window.isc_useSimpleNames = false;
var isc = {};
isc.isReifySDK = true;
</SCRIPT>
<isomorphic:loadISC includeModules="FileLoader,Drawing,Analytics,AI,SalesForce,History,Tools"
                    skin="<%=skin%>"/>
</HEAD><BODY>
<%
    RequestContext context = RequestContext.instance(this, request, response, out);
    // testStart() is normally called by TestRunner wrapper logic, but there are cases where
    // .test files call the server before the TestRunner init() block runs.  They shouldn't,
    // but it can happen when someone writes generated tests scripts.
    AdminConsole.testStart(context.requestPath, new ArrayList<String>(), new HashMap());
%>
<SCRIPT>

//--testHeaderEnd-- DO NOT CHANGE OR REMOVE THIS LINE - see TestRunnerFilter.java for comments
// 
// If you want to add code that's visible only to the HTML-framed version of the test file, add it above
// this comment block.  If you want the code to be visible in jsOnly mode _and_ HTML-framed version,
// add it below this comment block.
//------------------------------------------------------------------------------
// START test case
//------------------------------------------------------------------------------
