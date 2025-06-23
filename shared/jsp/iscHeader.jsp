<!DOCTYPE HTML>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isc" %>
<HTML><HEAD><TITLE><%=isc_getShortURI(request)%></TITLE>
<%
    String skin = request.getParameter("skin");
    if (skin == null) skin = "Enterprise";
%>
<isomorphic:loadISC skin="<%=skin%>"/>
</HEAD><BODY>
<%
    RequestContext context = RequestContext.instance(this, request, response, out);        
    Logger log = context.staticLog;
%>

