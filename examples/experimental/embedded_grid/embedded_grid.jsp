<!--------------------------------------------------------------------
	SmartClient SDK
	Grid Embedded Grid Example

	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>


<HTML><HEAD><TITLE>Embedded Grid Example</TITLE>
<isomorphic:loadISC skin="SmartClient"/>
</HEAD><BODY BGCOLOR=#8080FF>
<SCRIPT>

<isomorphic:loadDS name="supplyItem"/>
<isomorphic:loadDS name="supplyCategory"/>


Label.create({
	left:50, top:30, width:600,
	contents:"Instructions:<ul>" +
		"<li>Select an entry in the grid below and click the 'Show Detail Grid' button to bring up	the inline grid (you can also double-click a record).</li>"+
		"<li>Press the 'Hide Detail Grid' to dismiss the inline grid.</li>"+
		"</ul>"
});

isc.ListGrid.create({
	ID:"categoryList",
	left:50, top:150, width:600, height:400,
	dataSource:"supplyCategory",
	alternateRecordStyles:true,
    recordDoubleClick: "showDetailBtn.click()"
});
categoryList.fetchData();

isc.IButton.create({
	ID:"showDetailBtn",
	left:50, top:580, width:150,
	title:"Show Detail Grid",
	click:function () {
		var r = categoryList.getSelectedRecord();
		if (r) {
			categoryList.openRecordDetailGrid(r,supplyItem);
			hideDetailBtn.lastOpenedRecord = r;
		}
	}
});
// listGrid.closeRecord() example
isc.IButton.create({
	ID:"hideDetailBtn",
	left:50, top:610, width:150,
	title:"Hide Detail Grid",
	click:function () {
		if (this.lastOpenedRecord) {
			categoryList.closeRecord(this.lastOpenedRecord);
			this.lastOpenedRecord = null;
		}
	}
});

</SCRIPT>
</BODY>
</HTML>
