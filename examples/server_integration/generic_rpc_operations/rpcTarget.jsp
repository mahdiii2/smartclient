<%@ page import="java.util.Date" %>
<%@ page import="com.isomorphic.rpc.*" %>
<%
RPCManager rpc;
try {
    // instantiate the RPCManager that parses the encoded data sent by the client
    rpc = new RPCManager(request, response, out);
} catch (ClientMustResubmitException cmre) {
    // Workaround IE bug - see the RPC API docs for a more detailed explanation
    return;
}
    
// grab the data that the client sent.  Since you can send arbitrary JS collections from the
// browser, getData() returns a Java Object that you need to cast to whatever type you actually
// sent.  In this case, since we sent a JS Date, we'll get a java.util.Date.  For the type
// conversion table, see the client-side RPCRequest API docs.
Date clientDate = (Date)rpc.getData();               
   
System.out.println("+++++++++++++++++++++++++++++++++++++++++++++");
System.out.println("Current client time: " + clientDate.toString());
System.out.println("+++++++++++++++++++++++++++++++++++++++++++++");

// send back our own time as the response
rpc.send(new Date());

%>

