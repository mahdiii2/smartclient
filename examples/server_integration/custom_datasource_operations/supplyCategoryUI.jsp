<!--------------------------------------------------------------------
	SmartClient SDK
	Custom DataSource Operations Example (Tree bound to beans)

	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HEAD><TITLE>
		SmartClient SDK - Custom DataSource Operations example (Tree bound to beans)
</TITLE></HEAD><isomorphic:loadISC skin="SilverWave"/>
<BODY CLASS="pageBackground">
<SCRIPT>

// instantiate DataSource on the client only (this example explicitly bypasses
// ISC server-side DataSource management)
isc.DataSource.create({
    ID:"supplyCategory",
    fields: [
        {name: "categoryName", type:"text", primaryKey: true, title: "Item", length: 128},
        {name: "parentID", type:"text", hidden: true, foreignKey: "supplyCategory.categoryName", rootValue:"root"}
    ]
})

// Send all DSRequests to supplyCategoryOperations.jsp (in the same directory as this file) - look there
// for the server-side implementation of this example.
//
// Note: ISC provides generic APIs for processing RPC requests on the server.  You can process RPC
// requests in servlets, JSPs, and even filters.  We use a JSP here to make it easier to experiement
// with the code.
//
isc.RPCManager.actionURL = "supplyCategoryOperations.jsp";

// Create a tree bound to the supplyCategory DataSource defined above
isc.TreeGrid.create({
    ID: "boundTree",
    left: 100,
    top: 100,
    dataSource: supplyCategory
});

// load the top-level nodes into the tree
boundTree.fetchData();

</SCRIPT>
</BODY>
</HTML>
