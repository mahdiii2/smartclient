<!--------------------------------------------------------------------
	SmartClient SDK
	Multi-Tenant Demo Application (JS code)

	Copyright 2024 Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>

<HTML><HEAD><TITLE>SmartClient Demo Application</TITLE>
<!--  -->
<isomorphic:loadISC includeModules="Charts" skin="Tahoe"/>
</HEAD><BODY CLASS="pageBackground" STYLE="overflow:hidden">

</STYLE>
<SCRIPT>
isc.setAutoDraw(false);

// Load DataSources
// ---------------------------------------------------------------------

<isomorphic:loadDS name="ord_Product"/>
<isomorphic:loadDS name="ord_ProductLine"/>
<isomorphic:loadDS name="ord_Order"/>
<isomorphic:loadDS name="ord_OrderLine"/>
<isomorphic:loadDS name="ord_Customer"/>

// Set the density to Spacious:
isc.Canvas.resizeFonts(2);
isc.Canvas.resizeControls(4);

</SCRIPT>

<!--  Pick up application UI and logic from the .js UI file
  ======================================================================
-->
<script src="orderManagementJS.js"></script>
</BODY>
</HTML>
