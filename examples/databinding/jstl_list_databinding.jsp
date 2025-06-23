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
		SmartClient SDK - Custom DataSource Operations example (Simple ListGrid
		databinding with JSTL)
</TITLE></HEAD><isomorphic:loadISC skin="SmartClient"/>
<BODY BGCOLOR=#D3D3D3><SCRIPT>
<%

//--------------------------------------------
// hand-creation of some supplyItem beans
//--------------------------------------------
List supplyItems = new ArrayList();

SupplyItem one = new SupplyItem();
one.setItemID(Long.valueOf(1));
one.setItemName("foo");
one.setDescription("here's a description");
one.setSKU("1234");
one.setUnits("Ea");
supplyItems.add(one);

SupplyItem two = new SupplyItem();
two.setItemID(Long.valueOf(2));
two.setItemName("bar");
two.setDescription("here's another description");
two.setSKU("54321");
two.setUnits("Dozen");
supplyItems.add(two);

// expose the supplyItems Map to the pageContext so we can access via JSTL EL
pageContext.setAttribute("supplyItems", supplyItems);
%>

// load the supplyItem dataSource so we can databind the ListGrid on the client
<isomorphic:loadDS name="supplyItem"/>

<isomorphic:XML>

<ListGrid ID="dataGrid" left="100" top="100" width="600" dataSource="supplyItem">
    <data>
        <!-- foreach supplyItem in the supplyItems map -->
        <c:forEach var="supplyItem" items="${supplyItems}">
            <supplyItem>
                <itemID><c:out value="${supplyItem.itemID}"/></itemID>
                <SKU><c:out value="${supplyItem.SKU}"/></SKU>
                <category><c:out value="${supplyItem.category}"/></category>
                <itemName><c:out value="${supplyItem.itemName}"/></itemName>
                <description><c:out value="${supplyItem.description}"/></description>
                <unitCost><c:out value="${supplyItem.unitCost}"/></unitCost>
                <units><c:out value="${supplyItem.units}"/></units>
            </supplyItem>
        </c:forEach>
    </data>
</ListGrid>

</isomorphic:XML>

</SCRIPT></BODY></HTML>
<%@ page import="java.util.*" %>
<%@ page import="com.isomorphic.examples.*" %>
