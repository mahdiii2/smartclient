<!--------------------------------------------------------------------
	SmartClient SDK
	Simple ListGrid/TreeGrid databiding with JSTL

	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>

<!-- include core JSTL taglibs -->
<%@ taglib uri="/WEB-INF/c.tld" prefix="c" %>

<!-- make sure EL is enabled for this page -->
<%@ page isELIgnored="false" %> 

<HEAD><TITLE>
		SmartClient SDK - Custom DataSource Operations example (Simple ListGrid/TreeGrid
		databinding with JSTL)
</TITLE></HEAD><isomorphic:loadISC skin="SmartClient"/>
<BODY BGCOLOR=#D3D3D3><SCRIPT>
<%

//--------------------------------------------
// hand-creation of some supplyCategory beans
//--------------------------------------------
List supplyCategories = new ArrayList();

// add root category
SupplyCategory root = new SupplyCategory();
root.setCategoryName("root");
supplyCategories.add(root);
      
// add two categories under root
SupplyCategory one = new SupplyCategory();
one.setCategoryName("one");
one.setParentID("root"); // SupplyCategories are linked by categoryName==parentID
supplyCategories.add(one);

SupplyCategory two = new SupplyCategory();
two.setCategoryName("two");
two.setParentID("root");
supplyCategories.add(two);

// add one more category nested under the "one" category
SupplyCategory three = new SupplyCategory();
three.setCategoryName("three");
three.setParentID("one");
supplyCategories.add(three);

// expose the supplyCategories Map to the pageContext so we can access via JSTL EL
pageContext.setAttribute("supplyCategories", supplyCategories);
%>

// load the supplyCategory dataSource so we can databind the TreeGrid on the client
<isomorphic:loadDS name="supplyCategory"/>

<isomorphic:XML>

<TreeGrid ID="dataTree" left="100" top="100" dataSource="supplyCategory">
    <data>
        <Tree modelType="parent" parentIdField="parentID" idField="categoryName"
              titleProperty="categoryName">
            <data xsi:type="xsd:List">
                <c:forEach var="supplyCategory" items="${supplyCategories}">
                <node>
                    <categoryName><c:out value="${supplyCategory.categoryName}"/></categoryName>       
                    <parentID><c:out value="${supplyCategory.parentID}"/></parentID>       
                </node>
                </c:forEach>
            </data>
        </Tree>
    </data>
</TreeGrid>

</isomorphic:XML>

</SCRIPT></BODY></HTML>
<%@ page import="java.util.*" %>
<%@ page import="com.isomorphic.examples.*" %>

