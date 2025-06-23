var ds = isc.DataSource.get("countryDS");

isc.VLayout.create({
	ID:"layout",
	width:"100%", height:250,
	membersMargin: 5,
	members: [
		isc.HLayout.create({
			ID:"buttonLayout",
			width:"*", height:1,
			membersMargin: 10,
			members: [
				isc.IButton.create({
				    ID: "formulaButton",
				    autoFit: true,
				    title: "Show Formula Builder",
				    click : "countryList.addFormulaField({fieldWidth: 120})"
				}),
				isc.IButton.create({
				    ID: "summaryButton",
				    autoFit: true,
				    title: "Show Summary Builder",
				    click : "countryList.addSummaryField({fieldWidth: 120})"
				}),
				isc.IButton.create({
				    ID: "stateButton",
				    autoFit: true,
				    title: "Re-create from State",
				    click : function () {
				        var fieldState = countryList.getFieldState();
						countryList.destroy();
						isc.Timer.setTimeout(function () {
							recreateListGrid(fieldState);
						}, 100);
				    }
				})
			]
		})
	]
});

recreateListGrid();

function recreateListGrid(fieldState) {
	var grid = isc.ListGrid.create({
	    ID: "countryList",
	    width:"100%", height:"*",
	    headerButtonProperties: {showFocusedAsOver: true},

	    dataSource: ds,
	    autoFetchData: true,
	    canAddFormulaFields: true,
	    canAddSummaryFields: true,
	    fields:[
	        {name:"countryCode", title:"Flag", width:70, type:"image", imageURLPrefix:"flags/24/",
	            imageURLSuffix:".png"
	        },
	        {name:"countryName", title:"Country", width: 200},
	        {name:"capital", title:"Capital", width: 200},
	        {name:"population", title:"Population", width: 130},
	        {name:"area", title:"Area (km&sup2;)", width: 130},
	        {name:"gdp", format: ",0", width: 130}
	    ],
		fieldState: fieldState
	});
    layout.addMember(grid);
}
