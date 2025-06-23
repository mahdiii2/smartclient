isc.VLayout.create({
  ID: "salesDashboard",
  width:"100%", height:"100%",
  membersMargin:10, layoutMargin:10,
  members:[
    isc.Label.create({
      contents:"Sales Pipeline Dashboard",
      height:30, align:"center",
      styleName:"dashboardTitle"
    }),
    isc.TabSet.create({
      tabs:[
        { title:"Forecast", pane: makeForecastPane() },
        { title:"Pipeline", pane: makePipelinePane() }
      ]
    })
  ]
}).draw();

function makeForecastPane(){
  return isc.VLayout.create({
    members:[
      isc.ListGrid.create({
        dataSource: forecastDS, // must exist
        autoFetchData: true,
        height:200,
        fields:[
          {name:"month"},
          {name:"actual", title:"Actual Sales"},
          {name:"target", title:"Target Sales"}
        ]
      })
    ]
  });
}

function makePipelinePane(){
  return isc.ListGrid.create({
    dataSource: pipelineDS, // must exist
    autoFetchData: true,
    width:"100%", height:"100%",
    fields:[
      {name:"dateRaised",     title:"Date Raised"},
      {name:"customer",       title:"Customer",    displayField:"customerName"},
      {name:"potentialValue", title:"Value"},
      {name:"chance",         title:"Win %"},
      {name:"status"},
      {name:"salesman",       title:"Sales Rep",   displayField:"employeeName"}
    ]
  });
}
