<!--------------------------------------------------------------------
	SmartClient SDK
	Spring Hello World Example

	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HTML><HEAD>
	<isomorphic:loadISC/>

<STYLE>
	.headerText {font-family:Verdana,Helvetica,sans-serif; font-size:12px; font-weight:bold; color:black;}
</STYLE><TITLE>
	Isomorphic SmartClient Spring Hello World Example
</TITLE></HEAD><BODY bgcolor=lightblue>

This example demonstrates a simple SmartClient RPC (Remote Procedure Call) DMI (Direct Method
Invocation) integration with the Spring Framework.  This works just like the simple
Client/Server Communication example "Get Timestamp" - available here: 
<a href='../../server_integration/generic_rpc_operations/getTimeStamp.jsp'>Get Timestamp
Example</a>.  The only difference is that this example invokes a method on a Spring-managed bean.
<p>
To see all the code/configuration involved, take a look at these files in the SDK:
<ul>
<li>/WEB-INF/web.xml - contains registration of the Spring initialization servlet - this is
standard spring configuration.
<li>/WEB-INF/applicationContext.xml - contains the configuration of the HelloWorld bean that
we call into via DMI here.
<li>/examples/spring/helloWorld/helloWorld.jsp - the source to this page - containts the
client-side code.
<li>/examples/spring/helloWorld/HelloWorld.java - the implementation of
com.isomorphic.examples.spring.HelloWorld bean that's registered in applicationContext.xml.
<li>/shared/app/springExamples.app.xml - SmartClient configuration file that registers
HelloWorld as a DMI-invocable bean and lists the methods that may be called on this bean from
the client (for security reasons).
</ul>
See also the DMI documentation in the SmartClient reference (search for 'DMI').

<SCRIPT>
// This loads the DMI stubs from the /shared/app/springExamples.app.xml file.  This allows
// us to call helloWorld.sayHello() below.
<isomorphic:loadDMIStubs name="springExamples"/>

isc.DynamicForm.create({
    top: 300,
    ID: "helloForm",
    fields: [
        {name: "name", title: "Your name"},
        {name: "sayHello", type: "button", title: "Say Hello!", 
         click: function () {
             // DMI protocol - the ServerObject declared in the .app.xml is available here as a
             // global because we loaded it via the 'loadDMIStubs' tag, and all methods
             // described in the <visibleMethods> block of the ServerObject can be called
             // directly.  The second argument is an optional callback - in this case we take
             // the server response and simply update the contents of the label declared below
             // with whatever the server returns.
             helloWorld.sayHello(helloForm.getValue('name'), "helloLabel.setContents(data)");
         }
        }
    ]
});

Label.create({
    ID: "helloLabel",
    top: 400,
    width: 400,
	contents:"Server response goes here..."
});

</SCRIPT></BODY>
</HTML>