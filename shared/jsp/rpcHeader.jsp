<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %><%@ taglib uri="http://www.smartclient.com/taglib" prefix="isc" %><%
RPCManager rpc;
try {
    rpc = new RPCManager(request, response, out);
//    if("off".equals(request.getParameter("logging"))) rpc.log.setLevel(Logger.OFF);
} catch (ClientMustResubmitException e) { 
    return; 
}

for (Iterator i = rpc.getRequests().iterator(); i.hasNext();) {
    Object rpcObject = (Object) i.next();
    RPCRequest rpcRequest = null;
    DSRequest dsRequest = null;
    if (rpcObject instanceof RPCRequest) rpcRequest = (RPCRequest)rpcObject;
    else dsRequest = (DSRequest)rpcObject;

%>