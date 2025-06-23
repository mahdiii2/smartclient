<%-- START /shared/jsp/evalJavaHeader.jsp --%>
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<%
    Logger log = new Logger("com.isomorphic.DevConsoleEval"); 
    RequestContext context = RequestContext.instance(request, response);
    RPCManager rpc;
    try {
        rpc = new RPCManager(request, response, out);
    } catch (ClientMustResubmitException e) { 
        return; 
    }
%>
<%-- END /shared/jsp/evalJavaHeader.jsp --%>
