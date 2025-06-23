<!--
  ________________________________________________________________________________
  
  	Isomorphic SmartClient Simple Client/Server Communication Example
	
	Copyright 2001 and beyond Isomorphic Software, Inc.  All rights reserved. 
	Not for use or distribution without a license.
	Contact info@isomorphic.com or http://www.isomorphic.com for more information.
  ________________________________________________________________________________
  
-->

<!-- Load isomorphic XML tags for a Java server -->
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HTML><HEAD>
	<isomorphic:loadISC/>

<STYLE>
	.headerText {font-family:Verdana,Helvetica,sans-serif; font-size:12px; font-weight:bold; color:black;}
</STYLE><TITLE>
	Isomorphic Software Simple Client/Server Communication example
</TITLE></HEAD><BODY bgcolor=lightblue>



This example demonstrates a simple client/server communication interaction using ISC's built-in
HTTP-based transparent communication subsystem (RPC).  When you press the "Get Current Server Time" button
below, the client asks the server for the current time and updates a label with the time returned by
the server.
<p>
At it's lowest level the ISC RPC system has two main parts:
<li> An XML-based serialization engine that allows the client to serialize arbitrary JavaScript
collections for transmission to the server (where this collections object is reconstituted as a Java
Collections object).  This serialization engine is also used to pass arbitrary Java Collections from
the server to the client as a response to the request.
<li> HTTP-based client-server RPC mechanism for transparently passing the serialized data from the
client to the server.
<p>
Effectively the above defines a simple data pump.  ISC's databinding layer builds on top of this
simple functionality to provide e.g. intelligent data pre-fetch for a scrolling ListGrid.
<p>
The files needed to reproduce this example are located in
<webRoot>/examples/server_integration/generic_rpc_operations and /shared/app.  To
take a closer look at what's involved, start with the source for this JSP and then look at
GetTimeStampDMI.java for the server-side piece of the RPC DMI mechanism.  Take a look at
/shared/app/bultin.app.xml for the serverObject mapping that describes how GetTimeStampDMI.java
gets called for this request.
<p>
The RPC system can send an arbitrary number of requests to the server in one HTTP request.
See the client and server RPC APIs in the reference docs for a full description of what's
possible.  Also see the DMI APIs under Client Reference/RPC/DMI in the reference docs.

<!-- Begin example code -->
<SCRIPT>

//
// this is the label that displays server results.
//
Label.create({
    ID: "timeLabel",
    position: "relative",
    width: 400,
	contents:"Click below to fetch the current time..."
});

//
// Clicking on this button sends the current browser time to the server (rpcTarget.jsp) where it
// logged to the console.
//
Button.create({
    title: "Get Current Server Time",
    position: "relative",
    width: 150,
    click: function () {
        //
        // The first argument is the name of the application file that contains the
        // serverObject describing the server-side endpoint of the DMI - this file is
        // shared/app/example.app.xml in the SDK webRoot.
        //
        // The second argument is the ID or className of the serverObject in the .app.xml file.
        // 
        // The third argument is the method name that we want to invoke.
        //
        // The fourth argument is the argument to the method (you can specify as many arguments
        // as you want - see the documentation for DMI under Client Reference/RPC in the
        // reference docs.
        // 
        // The last argument is the callback we want called when the server replies.  In this
        // case, the server is going to send us a Date back and we want to se the contents of the
        // timeLabel Label with that date.
        //
        DMI.call("example", "GetTimeStampDMI", "getTimeStamp", new Date(), "timeLabel.setContents(data)");
    }
});


</SCRIPT>
</BODY>
</HTML>
