<!--------------------------------------------------------------------
	SmartClient SDK
	ListGrid/TreeGrid Load on Demand from XML source using XPath selectors 

	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>

<!-- include core JSTL taglibs -->
<%@ taglib uri="/WEB-INF/c.tld" prefix="c" %>

<!-- make sure EL is enabled for this page -->
<%@ page isELIgnored="false" %> 

<HEAD><TITLE>
		SmartClient SDK - Custom DataSource Operations example (ListGrid/TreeGrid Load on
		Demand from XML source using XPath selectors)
</TITLE></HEAD><isomorphic:loadISC skin="SmartClient"/>
<BODY BGCOLOR=#D3D3D3><SCRIPT>

// send all RPC operations to xmlOperations.jsp
RPCManager.actionURL = "xmlOperations.jsp";

<isomorphic:loadDS name="supplyItem"/>
<isomorphic:loadDS name="supplyCategory"/>

<isomorphic:XML>
<TreeGrid ID="dataTree" left="100" top="100" dataSource="supplyCategory"/>
<ListGrid ID="dataGrid" left="100" top="250" width="500" dataSource="supplyItem"/>
</isomorphic:XML>

dataTree.fetchData();
dataGrid.fetchData();

</SCRIPT></BODY></HTML>
