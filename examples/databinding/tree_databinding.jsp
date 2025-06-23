<!--------------------------------------------------------------------
	SmartClient SDK
	Tree Data Binding example

	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HEAD><TITLE>
		SmartClient SDK - Tree Data Binding example
</TITLE><isomorphic:loadISC skin="SmartClient"/></HEAD>
<BODY BGCOLOR=#D3D3D3><SCRIPT>


// load datasource
<isomorphic:loadDS ID="employees" />


// create treeGrid bound to this datasource
TreeGrid.create({
	ID:"employeeTree",
	left:50, top:50, width:700, height:500,
	dataSource:"employees",
	fields:[
		{name:"Name", treeField:true},
		{name:"Job"},
		{name:"Email"}
	]
});


// fetch top-level nodes to populate treeGrid
employeeTree.fetchData();



</SCRIPT>
</BODY></HTML>
