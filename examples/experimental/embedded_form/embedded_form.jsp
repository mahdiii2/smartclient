<!--------------------------------------------------------------------
	SmartClient SDK
	Grid Embedded Form Example

	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>


<HTML><HEAD><TITLE>Embedded Form Example</TITLE>
<isomorphic:loadISC skin="SmartClient"/>
</HEAD><BODY BGCOLOR=#8080FF>
<SCRIPT>

<isomorphic:loadDS name="supplyItem"/>

Label.create({
	left:50, top:30, width:600,
	contents:"Instructions:<ul>" +
		"<li>Select an entry in the grid below and click the 'Show Embedded Form' button to bring up the inline form (you can also double-click a record).</li>"+
		"<li>Press the 'Cancel' button on the form or the 'Hide Embedded Form' button to dismiss the inline form.</li>"+
		"</ul>"
});

isc.ListGrid.create({
	ID:"itemList",
	left:50, top:150, width:500, height:400,
	dataSource:"supplyItem",
	alternateRecordStyles:true,
	useAllDataSourceFields:true,
    recordDoubleClick: "showFormBtn.click()"
});
itemList.fetchData();

// listGrid.openRecordEditor() example
isc.IButton.create({
	ID:"showFormBtn",
	left:50, top:580, width:150,
	title:"Show Embedded Form",
	click:function () {
		var r = itemList.getSelectedRecord();
		if (r) {
			itemList.openRecordEditor(r);
			hideFormBtn.lastOpenedRecord = r;
		}
	}
});

// listGrid.closeRecord() example
isc.IButton.create({
	ID:"hideFormBtn",
	left:50, top:610, width:150,
	title:"Hide Embedded Form",
	click:function () {
		if (this.lastOpenedRecord) {
			itemList.closeRecord(this.lastOpenedRecord);
			this.lastOpenedRecord = null;
		}
	}
});

</SCRIPT>
</BODY>
</HTML>
