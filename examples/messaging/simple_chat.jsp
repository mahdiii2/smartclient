<!--------------------------------------------------------------------
	SmartClient Real-Time Messaging option
	Simple Chat example
	
	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->


<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HTML><HEAD><TITLE>
	SmartClient Messaging option - Simple Chat example
</TITLE>
<isomorphic:loadISC includeModules="RealtimeMessaging"/>
<SCRIPT>
// Evaluation SDK doesn't support messaging on Safari
if (isc.Browser.isSafari && isc.Browser.safariVersion < 412) {
    alert("Messaging subsystem not currently supported on Safari\n" +
          "If you are interested in licensing this functionality for Safari, please contact" +
          " Isomorphic Software Support at http://forums.smartclient.com");
    window.location = "../../";
}
</SCRIPT>
</HEAD><BODY bgcolor=tan MARGINHEIGHT=0 MARGINWIDTH=0 LEFTMARGIN=0 TOPMARGIN=0>
<TABLE WIDTH=100% CELLSPACING=0 CELLPADDING=5 BORDER=0><TR><TD CLASS=pageHeader BGCOLOR=WHITE>
	SmartClient Messaging option - Simple Chat example
</TD><TD CLASS=pageHeader ALIGN=RIGHT BGCOLOR=WHITE>
	<A HREF=../../>Return to SDK Index</A>
</TD></TR></TABLE><TABLE WIDTH=100% CELLSPACING=0 CELLPADDING=0 BORDER=0><TR>
<TD BGCOLOR=336666><IMG SRC=images/blank.gif WIDTH=1 HEIGHT=4></TD></TR></TABLE>
<SCRIPT>



<isomorphic:XML>

<Canvas
	ID='chatLog'
	left='50' top='50'
	width='500' height='200'
	overflow='auto'
	backgroundColor='white'
	border='2px solid gray'
	contents='Chat Session&lt;br&gt;Open this page in multiple client browsers for multi-user chat.'
/>

<DynamicForm
	ID='chatForm'
	left='50' top='275'
>
	<fields>
		<field
			name='user'
			title='User name'
            required='true'
		/>
		<field
			name='msg'
			title='Message'
			editorType='textArea'
			width='400' height='50'
		/>
		<field
			editorType='button'
			colSpan='*'
			align='center'
			title='Send'
			click='sendChatMessage()'
		/>
	</fields>
</DynamicForm>

</isomorphic:XML>


function sendChatMessage() {
    // Ensure the required 'user' field is not empty
    if (!chatForm.validate()) return;
    
    var userName = chatForm.getValue('user'),
        messageText = chatForm.getValue('msg');

    // If no message was entered, avoid sending an empty message to the server.
    if (!messageText) return;
        
	// assemble the message
	var message =	'<b>' +
					userName +
					':</b> ' +
					messageText +
					'<br><br>';
					
	// and send it to the chatChannel
	Messaging.send('chatChannel', message, "callback(rpcResponse)");
}


function callback(rpcResponse) {
    if (rpcResponse.status != isc.RPCResponse.STATUS_SUCCESS) {
        isc.say("Unable to send message");
    }
}

// receive messages from the chatChannel and add them to the chatLog
Messaging.subscribe("chatChannel", "chatLog.setContents(data + chatLog.contents)");


</SCRIPT></BODY></HTML>