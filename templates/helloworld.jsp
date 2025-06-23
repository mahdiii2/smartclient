<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HTML><HEAD>
	<isomorphic:loadISC/>
</HEAD><BODY>
<SCRIPT>

isc.IButton.create({
	title:"Hello",
	click:"isc.say('Hello World')"
})

</SCRIPT>
</BODY></HTML>
