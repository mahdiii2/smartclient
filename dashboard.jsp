<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <script>window.isomorphicDir = "isomorphic/";</script>

    <script>window.isomorphic_simpleNames = false;</script>

    <!-- SmartClient modules -->
    <script src="isomorphic/system/modules/ISC_Core.js"></script>
    <script src="isomorphic/system/modules/ISC_Foundation.js"></script>
    <script src="isomorphic/system/modules/ISC_Containers.js"></script>
    <script src="isomorphic/system/modules/ISC_Grids.js"></script>
    <script src="isomorphic/system/modules/ISC_Forms.js"></script>
    <script src="isomorphic/system/modules/ISC_DataBinding.js"></script>
    <script src="isomorphic/system/modules/ISC_Drawing.js"></script>

    <!-- Shiva skin -->
    <script src="isomorphic/skins/Shiva/load_skin.js"></script>

    <!-- DataSources -->
    <isomorphic:loadDS ID="pipelineDS"/>
    <isomorphic:loadDS ID="forecastDS"/>
    <isomorphic:loadDS ID="employeeDS"/>
    <isomorphic:loadDS ID="officeDS"/>
    <isomorphic:loadDS ID="customerDS"/>


    <style>
        html,body{height:100%;margin:0;overflow:hidden;background:#f2f2f2;font-family:Helvetica,Arial,sans-serif}
        .statusWon{background:#f37000!important;color:#000!important}
        .statusLost{background:#d60000!important;color:#fff!important}
        .statusPot{background:#199f4b!important;color:#fff!important}
    </style>
    <title>Sales Dashboard</title>
</head>
<body>
<script>
isc.Page.setEvent("load", function(){

    loadDS(["pipelineDS","forecastDS","employeeDS","officeDS","customerDS"], init);

    function loadDS(list, callback){
        if(list.length===0){
            if(callback) callback();
            return;
        }
        var id=list.shift();
        isc.DataSource.load(id, function(){ loadDS(list, callback); });
    }

    function init(){

    var filterForm = isc.DynamicForm.create({
        ID:"filterForm", width:350, numCols:3, colWidths:["*",50,"*"],
      fields: [
    {
        name: "officeCode",
        title: "Office",
        editorType: "SelectItem",
        optionDataSource: "officeDS",
        valueField: "officeCode",
        displayField: "city"
    },
    {
        name: "salesRep",
        title: "Sales Rep",
        editorType: "SelectItem",
        optionDataSource: "employeeDS",
        valueField: "employeeNumber",
        displayField: "firstName"
    },
    {
        name: "dateRange",
        title: "Date Range",
        editorType: "DateRangeItem"
    }
],

        itemChanged:applyFilters
    });

    var summaryPanel = isc.HLayout.create({
        ID:"summaryPanel", membersMargin:20,
        members:[
            isc.Label.create({contents:"Total Pipeline: <b>$0</b>"}),
            isc.Label.create({contents:"Orders Won: <b>$0</b>"}),
            isc.Label.create({contents:"Orders Lost: <b>$0</b>"})
        ]
    });

    var pipelineByRepChart = isc.FacetChart.create({
        ID:"pipelineByRepChart",
        chartType:"Column",
        valueProperty:"value",
        facets:[{id:"salesman", title:"Sales Rep"}],
        height:250,
        showLegend:false,
        title:"Pipeline by Rep"
    });

    var pipelineByStatusChart = isc.FacetChart.create({
        ID:"pipelineByStatusChart",
        chartType:"Pie",
        valueProperty:"value",
        facets:[{id:"status", title:"Status"}],
        height:250,
        showDataPoints:true,
        title:"Pipeline by Status"
    });

    var pipelineGrid = isc.ListGrid.create({
        ID:"pipelineGrid",
        dataSource:"pipelineDS",
        autoFetchData:false,
        width:"100%", height:"*",
        alternateRecordStyles:true,
        cellStyleGenerator:function(rec,row,col){
            if(this.getFieldName(col)!=="status") return null;
            return rec.status==="Won" ? "statusWon" :
                   rec.status==="Lost" ? "statusLost" : "statusPot";
        }
    });

    isc.VLayout.create({
        width:"100%", height:"100%",
        membersMargin:10, padding:10,
        members:[
            isc.HLayout.create({height:60, membersMargin:10, members:[filterForm, summaryPanel]}),
            isc.HLayout.create({height:"40%", membersMargin:10, members:[pipelineByRepChart, pipelineByStatusChart]}),
            pipelineGrid
        ]
    });

    function applyFilters(){
        var crit = filterForm.getValuesAsCriteria();
        fetchAndDisplay(crit);
    }

    function fetchAndDisplay(criteria){
        var pipelineDS = isc.DataSource.get("pipelineDS");
        var processData = function(resp){
            var data = resp.data || [];
            pipelineGrid.setData(data);
            var repTotals = {}, statusTotals = {};
            var total=0, won=0, lost=0;
            data.forEach(function(r){
                var val = r.potentialValue || 0;
                total += val;
                if(r.status === "Won")  won += val;
                if(r.status === "Lost") lost += val;
                repTotals[r.salesman] = (repTotals[r.salesman]||0) + val;
                statusTotals[r.status] = (statusTotals[r.status]||0) + val;
            });
            var repData = [];
            for(var rep in repTotals) repData.push({salesman:rep, value:repTotals[rep]});
            pipelineByRepChart.setData(repData);
            var statusData = [];
            for(var st in statusTotals) statusData.push({status:st, value:statusTotals[st]});
            pipelineByStatusChart.setData(statusData);
            var fmt = function(v){return isc.NumberUtil.format(v,"$#,##0.00");};
            summaryPanel.getMember(0).setContents("Total Pipeline: <b>"+fmt(total)+"</b>");
            summaryPanel.getMember(1).setContents("Orders Won: <b>"+fmt(won)+"</b>");
            summaryPanel.getMember(2).setContents("Orders Lost: <b>"+fmt(lost)+"</b>");
        };
        if (pipelineDS) {
            pipelineDS.fetchData(criteria, processData);
        } else {
            isc.DataSource.load("pipelineDS", function(ds){
                if (ds) ds.fetchData(criteria, processData);
            });
        }
    }

        fetchAndDisplay({});
    }
});
</script>
</body>
</html>
