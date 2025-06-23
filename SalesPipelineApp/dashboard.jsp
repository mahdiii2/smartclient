<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard Starter App</title>

  <!-- 1) SmartClient bootstrapping -->
  <script>window.isomorphicDir = "isomorphic/";</script>

  <script src="isomorphic/system/modules/ISC_Core.js"></script>
  <script src="isomorphic/system/modules/ISC_Foundation.js"></script>
  <script src="isomorphic/system/modules/ISC_Containers.js"></script>
  <script src="isomorphic/system/modules/ISC_Grids.js"></script>
  <script src="isomorphic/system/modules/ISC_Forms.js"></script>
  <script src="isomorphic/system/modules/ISC_DataBinding.js"></script>
  <script src="isomorphic/system/modules/ISC_Drawing.js"></script>
  <!-- 2) Skin (after modules) -->
  <script src="isomorphic/skins/Shiva/load_skin.js"></script>

  <!-- DataSources -->
  <isomorphic:loadDS ID="pipelineDS"/>
  <isomorphic:loadDS ID="forecastDS"/>
  <isomorphic:loadDS ID="employeeDS"/>
  <isomorphic:loadDS ID="officeDS"/>
  <isomorphic:loadDS ID="customerDS"/>

  <style>
    html,body{height:100%;margin:0;overflow:hidden;background:#f2f2f2;font-family:Helvetica,Arial,sans-serif}
    .appHeader{background:#f2f2f2;font-size:28px;font-weight:600;line-height:46px;text-align:center;color:#444}
    .card{border:1px solid #ccc;border-radius:8px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.08)}
    .kpi-value{font-size:1.8em;margin-top:6px}.kpi-green{color:#009a32}.kpi-red{color:#c40000}
    .section-header{font-size:1.2em;font-weight:600;color:#444;margin:8px 0 4px}
    .statusWon{background:#f37000!important;color:#000!important}
    .statusLost{background:#d60000!important;color:#fff!important}
    .statusPot{background:#199f4b!important;color:#fff!important}
  </style>
</head>
<body>
<script>
// -------- run once all modules + DOM are ready --------
isc.Page.setEvent("load", function () {
  loadDS(["pipelineDS","forecastDS","employeeDS","officeDS","customerDS"], buildUI);

  function loadDS(list, callback){
    if(list.length===0){
      if(callback) callback();
      return;
    }
    var id=list.shift();
    isc.DataSource.load(id, function(){ loadDS(list, callback); });
  }

  function buildUI () {

    // KPI placeholder
    var kpiPlaceholder = isc.Canvas.create({ID:"kpiPlaceholder", autoDraw:false});

    // ---------- Dashboard (forecast grid) ----------
    var forecastHeader = isc.Label.create({
      contents:"Sales Forecast Statistics", styleName:"section-header"
    });
    var forecastGrid = isc.ListGrid.create({
      dataSource:"forecastDS", autoFetchData:true,
      showGridSummary:true, gridSummaryFunction:"sum",
      alternateRecordStyles:true, width:"100%",
      fields:[
        {name:"month", width:60},
        {name:"salespersonName", title:"Sales Rep"},
        {name:"target",  formatCellValue:v=>isc.NumberUtil.format(v,"$#,##0")},
        {name:"actual",  formatCellValue:v=>isc.NumberUtil.format(v,"$#,##0")}
      ]
    });
    var dashboardPane = isc.VLayout.create({
      width:"100%", height:"100%",
      layoutMargin:12, membersMargin:10,
      members:[kpiPlaceholder, forecastHeader, forecastGrid]
    });

    // ---------- Pipeline (filter + grid) ----------
    var pGrid = isc.ListGrid.create({
      dataSource:"pipelineDS", autoFetchData:true,
      alternateRecordStyles:true, width:"100%", height:"*",
      cellStyleGenerator:(rec,row,col)=>{
        if(pGrid.getFieldName(col)!=="status") return null;
        return rec.status==="Won" ? "statusWon"
             : rec.status==="Lost" ? "statusLost" : "statusPot";
      },
      fields:[
        {name:"dateRaised", formatCellValue:v=>isc.DateUtil.format(v,"MM/dd/yyyy")},
        {name:"customerName", title:"Customer"},
        {name:"comments"},
        {name:"chance", formatCellValue:v=>isc.NumberUtil.format(v,"##0.00'%'")},
        {name:"status"},
        {name:"salesRepName", title:"Sales Rep"},
        {name:"potentialValue", title:"Potential Value",
          formatCellValue:v=>isc.NumberUtil.format(v,"$#,##0.00")}
      ]
    });
    var filterForm = isc.DynamicForm.create({
      numCols:8, cellPadding:2, width:"100%",
      fields:[{
        name:"view", type:"radioGroup", vertical:false, defaultValue:"all",
        valueMap:{all:"All", won:"Won", lost:"Lost", potential:"Potential"},
        changed(form,item,val){
          var crit=null;
          if(val==="won")       crit={status:"Won"};
          else if(val==="lost") crit={status:"Lost"};
          else if(val==="potential")
                               crit={status:["Bidding","On Hold","Delayed"]};
          pGrid.setCriteria(crit); pGrid.fetchData();
        }
      }]
    });
    var pipelinePane = isc.VLayout.create({
      width:"100%", height:"100%",
      layoutMargin:12, membersMargin:10,
      members:[filterForm, pGrid]
    });

    // ---------- Navigation ----------
    var navTree = isc.Tree.create({
      modelType:"children",
      root:{children:[{id:"dashboard",title:"Dashboard"},{id:"pipeline",title:"Pipeline"}]}
    });
    var nav = isc.TreeGrid.create({
      width:180, showHeader:false, data:navTree, animateFolders:false,
      nodeClick(node){tabSet.selectTab(node.id==="dashboard"?0:1);}
    });
    var tabSet = isc.TabSet.create({
      width:"100%", height:"100%",
      tabs:[
        {title:"Dashboard", pane:dashboardPane},
        {title:"Pipeline",  pane:pipelinePane}
      ]
    });

    isc.VLayout.create({
      width:"100%", height:"100%",
      members:[
        isc.HLayout.create({
          height:50, styleName:"appHeader",
          members:[
            isc.Img.create({src:"logo.png",width:36,height:36,layoutAlign:"center"}),
            isc.LayoutSpacer.create({width:"*"}),
            isc.Label.create({contents:"Dashboard Starter App",styleName:"appHeader"}),
            isc.LayoutSpacer.create({width:"*"})
          ]
        }),
        isc.HLayout.create({width:"100%", height:"*", members:[nav, tabSet]})
      ]
    });

    // ---------- compute KPI row ----------
    isc.DataSource.get("pipelineDS").fetchData({}, function (resp) {
      var total=0, won=0, lost=0;
      resp.data.forEach(r=>{
        total+=r.potentialValue;
        if(r.status==="Won")  won += r.potentialValue;
        if(r.status==="Lost") lost+= r.potentialValue;
      });
      var fmt=v=>isc.NumberUtil.format(v,"$#,##0.00");
      var cards=[
        {t:"Pipeline Potential", v:fmt(total)},
        {t:"Orders Won",        v:fmt(won),  cls:"kpi-green"},
        {t:"Orders Lost",       v:fmt(lost), cls:"kpi-red"}
      ].map(k=>isc.Canvas.create({
            width:"*", styleName:"card", padding:10,
            contents:`<div style="font-weight:600;font-size:1.1em">${k.t}</div>
                      <div class="kpi-value ${k.cls||''}">${k.v}</div>`
      }));
      dashboardPane.replaceMember(0,
        isc.HLayout.create({width:"100%", height:110, membersMargin:15, members:cards})
      );
    });
  }
});
</script>
</body>
</html>
