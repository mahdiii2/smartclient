
//------------------------------------------------------------------------------
// END test case
//------------------------------------------------------------------------------
//--testFooterStart-- DO NOT CHANGE OR REMOVE THIS LINE - see TestRunnerFilter.java for comments
// 
// If you want to add code that's visible only to the HTML-framed version of the test file, add it below
// this comment block.  If you want the code to be visible in jsOnly mode _and_ HTML-framed version,
// add it above this comment block.

</SCRIPT>
</BODY>
</HTML>
<%!
public String isc_getShortURI(HttpServletRequest request) {
    String uri = request.getRequestURI();
    int slashIndex = uri.lastIndexOf("/");
    if(slashIndex != -1) uri = uri.substring(slashIndex+1);
    return uri;
}
%>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>

<%@ page import="com.isomorphic.base.*" %>
<%@ page import="com.isomorphic.util.*" %>
<%@ page import="com.isomorphic.js.*" %>
<%@ page import="com.isomorphic.servlet.*" %>
<%@ page import="com.isomorphic.datasource.*" %>
<%@ page import="com.isomorphic.io.*" %>
<%@ page import="com.isomorphic.rpc.*" %>
<%@ page import="com.isomorphic.xml.*" %>
<%@ page import="com.isomorphic.tools.*" %>
<%@ page import="com.isomorphic.log.*" %>
<%@ page import="com.isomorphic.collections.*" %>
<%@ page import="com.isomorphic.devenv.*" %>
<%@ page import="com.isomorphic.test.*" %>
