<!-----------------------------------------------------------------------------------
    SmartClient SDK
    HibernateTransaction  example.  This example shows how to use a user-written class 
    (a servlet in the usual case, but we provide this example as a JSP for easy  
    modification) to add transaction management to a batch of DSRequests sent by the
    client using request queueing.  More generally, it shows how your own server-side 
    code can intervene in the normal SmartClient logic flow, and gives examples of 
    using the SmartClient server's RPC API.

    Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
------------------------------------------------------------------------------------>

<%@ page import="java.util.*" %>
<%@ page import="com.isomorphic.rpc.RPCManager" %>
<%@ page import="com.isomorphic.hibernate.HibernateTransaction" %>
<%@ page import="com.isomorphic.datasource.DSRequest" %>
<%@ page import="org.hibernate.Transaction" %>

<% 

RPCManager rpcManager = new RPCManager(request, response);

HibernateTransaction.startTransaction(rpcManager);
boolean rolledBack = false;

for (Iterator i = rpcManager.getRequests().iterator(); i.hasNext(); ) {
    Object requestObj = i.next();
    if(requestObj instanceof DSRequest) {  // If it isn't a DSRequest, just ignore it
        DSRequest dsRequest = (DSRequest)requestObj;
        try {
            rpcManager.send(dsRequest, dsRequest.execute());
        } catch(Exception e) {
            e.printStackTrace();
            HibernateTransaction.rollbackTransaction(rpcManager);
            rpcManager.sendFailure(dsRequest, e);
            // Although it does no harm to try to commit a rolled-back transaction, we get 
            // a scary-looking exception in the log; so just remember that we rolled back so
            // we don't try to commit
            rolledBack = true;
            // The transaction has failed - stop right now
            break;
        }
    }
}

if (!rolledBack) HibernateTransaction.commitTransaction(rpcManager);

%>