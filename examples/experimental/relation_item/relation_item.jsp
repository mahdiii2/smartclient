<!--------------------------------------------------------------------
	SmartClient SDK
    Relation Item Example

	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>

<HTML><HEAD><TITLE>Relation Item Example</TITLE>
<isomorphic:loadISC skin="SmartClient"/>
</HEAD><BODY BGCOLOR=#8080FF>
<SCRIPT>

<isomorphic:loadDS name="supplyCategory"/>
<isomorphic:loadDS name="supplyItem"/>

ListGrid.create({
    ID: "grid",
    dataSource: "supplyCategory",
    width: 500,
    height: 300,
    recordClick: "form.editSelectedData(grid)"
}).filterData();

DynamicForm.create({
    ID: "form",
    top: 310,
    width: 500,
    dataSource: "supplyCategory",
    useAllDataSourceFields: true,
    fields : [
        { name: "categoryName", title: "Items", dataSource: "supplyItem" }
    ]
});


</SCRIPT>
</BODY>
</HTML>
