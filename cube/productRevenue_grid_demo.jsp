<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HTML manifest="cube-cache.manifest">
<HEAD>
<meta name="apple-mobile-web-app-capable" content="yes">
<STYLE>
	.headerText {font-family:Verdana,Helvetica,sans-serif; font-size:12px; font-weight:bold; color:black;}
</STYLE><TITLE>
	SmartClient Multidimensional DataSource Demo
</TITLE></HEAD><BODY bgcolor=lightblue>

<SCRIPT SRC=../isomorphic/system/modules/ISC_Containers.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Core.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Foundation.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Grids.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_DataBinding.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Drawing.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Charts.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Analytics.js></SCRIPT>
<SCRIPT SRC=../isomorphic/skins/Simplicity/load_skin.js></SCRIPT>


<SCRIPT>

// In iPad set the initial zoom level to 1.0 and disable scaling.
// In iPhone, set to large enough to view the app as a whole (but allow the user to scale so
// they can zoom in and make text readable!).
if (isc.Browser.isMobileWebkit) {
    if (isc.Browser.isHandset) {
        isc.Page.updateViewport(null, 700);
    } else {
        isc.Page.updateViewport(1.0, null, null, false);
    }
}


// Multidimensional Datasource Demo - facet definitions

// Copyright 2000 and beyond, Isomorphic Software, Inc. (www.smartclient.com) 
// All rights reserved.

var productRevenue_facets = [

	{
		id:"Regions",
		title:"Region",
		values:[
			{id:"North", title:"North"},
			{id:"South", title:"South"},
			{id:"East", title:"East"},
			{id:"West", title:"West"},
			{id:"sum", title:"All Regions", isSum:true}
		]
	},

	{
		id:"Scenarios",
		title:"Scenario",
		dontSum:true,
		values:[
			{id:"Actual", title:"Actual", canEdit:false},
			{id:"Budget", title:"Budget"}
		]
	},

	{
		id:"Time",
		title:"Time",
		isTree:true,
		showParentsLast:true,
		collapsed:true,
		width:150,
		values:[
			{id:"sum", title:"All Years", collapsed:false},
			{id:"2004", parentId:"sum", title:"2004"},
			{id:"2003", parentId:"sum", title:"2003"},
			{id:"2002", parentId:"sum", title:"2002"},
			{id:"Q4-2004", parentId:"2004", title:"Q4-2004"},
			{id:"Q3-2004", parentId:"2004", title:"Q3-2004"},
			{id:"Q2-2004", parentId:"2004", title:"Q2-2004"},
			{id:"Q1-2004", parentId:"2004", title:"Q1-2004"},
			{id:"Q4-2003", parentId:"2003", title:"Q4-2003"},
			{id:"Q3-2003", parentId:"2003", title:"Q3-2003"},
			{id:"Q2-2003", parentId:"2003", title:"Q2-2003"},
			{id:"Q1-2003", parentId:"2003", title:"Q1-2003"},
			{id:"Q4-2002", parentId:"2002", title:"Q4-2002"},
			{id:"Q3-2002", parentId:"2002", title:"Q3-2002"},
			{id:"Q2-2002", parentId:"2002", title:"Q2-2002"},
			{id:"Q1-2002", parentId:"2002", title:"Q1-2002"},
			{id:"12/1/2004", parentId:"Q4-2004", title:"12/1/2004"},
			{id:"11/1/2004", parentId:"Q4-2004", title:"11/1/2004"},
			{id:"10/1/2004", parentId:"Q4-2004", title:"10/1/2004"},
			{id:"9/1/2004", parentId:"Q3-2004", title:"9/1/2004"},
			{id:"8/1/2004", parentId:"Q3-2004", title:"8/1/2004"},
			{id:"7/1/2004", parentId:"Q3-2004", title:"7/1/2004"},
			{id:"6/1/2004", parentId:"Q2-2004", title:"6/1/2004"},
			{id:"5/1/2004", parentId:"Q2-2004", title:"5/1/2004"},
			{id:"4/1/2004", parentId:"Q2-2004", title:"4/1/2004"},
			{id:"3/1/2004", parentId:"Q1-2004", title:"3/1/2004"},
			{id:"2/1/2004", parentId:"Q1-2004", title:"2/1/2004"},
			{id:"1/1/2004", parentId:"Q1-2004", title:"1/1/2004"},
			{id:"12/1/2003", parentId:"Q4-2003", title:"12/1/2003"},
			{id:"11/1/2003", parentId:"Q4-2003", title:"11/1/2003"},
			{id:"10/1/2003", parentId:"Q4-2003", title:"10/1/2003"},
			{id:"9/1/2003", parentId:"Q3-2003", title:"9/1/2003"},
			{id:"8/1/2003", parentId:"Q3-2003", title:"8/1/2003"},
			{id:"7/1/2003", parentId:"Q3-2003", title:"7/1/2003"},
			{id:"6/1/2003", parentId:"Q2-2003", title:"6/1/2003"},
			{id:"5/1/2003", parentId:"Q2-2003", title:"5/1/2003"},
			{id:"4/1/2003", parentId:"Q2-2003", title:"4/1/2003"},
			{id:"3/1/2003", parentId:"Q1-2003", title:"3/1/2003"},
			{id:"2/1/2003", parentId:"Q1-2003", title:"2/1/2003"},
			{id:"1/1/2003", parentId:"Q1-2003", title:"1/1/2003"},
			{id:"12/1/2002", parentId:"Q4-2002", title:"12/1/2002"},
			{id:"11/1/2002", parentId:"Q4-2002", title:"11/1/2002"},
			{id:"10/1/2002", parentId:"Q4-2002", title:"10/1/2002"},
			{id:"9/1/2002", parentId:"Q3-2002", title:"9/1/2002"},
			{id:"8/1/2002", parentId:"Q3-2002", title:"8/1/2002"},
			{id:"7/1/2002", parentId:"Q3-2002", title:"7/1/2002"},
			{id:"6/1/2002", parentId:"Q2-2002", title:"6/1/2002"},
			{id:"5/1/2002", parentId:"Q2-2002", title:"5/1/2002"},
			{id:"4/1/2002", parentId:"Q2-2002", title:"4/1/2002"},
			{id:"3/1/2002", parentId:"Q1-2002", title:"3/1/2002"},
			{id:"2/1/2002", parentId:"Q1-2002", title:"2/1/2002"},
			{id:"1/1/2002", parentId:"Q1-2002", title:"1/1/2002"}
		]
	},
	
	{
		id:"Products",
		title:"Products",
		isTree:true,
		showParentsLast:true,
		canMinimize:true,
        minimized:true,
		collapsed:true,
		width:150,
		values:[
			{id:"sum", title:"All Products", collapsed:false, canEdit:false},
			{id:"ProdFamily4", parentId:"sum", title:"ProdFamily4", canEdit:false},
			{id:"ProdFamily3", parentId:"sum", title:"ProdFamily3", canEdit:false},
			{id:"ProdFamily2", parentId:"sum", title:"ProdFamily2", canEdit:false},
			{id:"ProdFamily1", parentId:"sum", title:"ProdFamily1", collapsed:false, canEdit:false},
			{id:"ProdGroup6", parentId:"ProdFamily4", title:"ProdGroup6", canEdit:false},
			{id:"ProdGroup5", parentId:"ProdFamily4", title:"ProdGroup5", canEdit:false},
			{id:"ProdGroup4", parentId:"ProdFamily3", title:"ProdGroup4", canEdit:false},
			{id:"ProdGroup3", parentId:"ProdFamily2", title:"ProdGroup3", canEdit:false},
			{id:"ProdGroup2", parentId:"ProdFamily1", title:"ProdGroup2", canEdit:false},
			{id:"ProdGroup1", parentId:"ProdFamily1", title:"ProdGroup1", canEdit:false},
			{id:"Prod50", parentId:"ProdGroup6", title:"Prod50"},
			{id:"Prod49", parentId:"ProdGroup6", title:"Prod49"},
			{id:"Prod48", parentId:"ProdGroup6", title:"Prod48"},
			{id:"Prod47", parentId:"ProdGroup6", title:"Prod47"},
			{id:"Prod46", parentId:"ProdGroup6", title:"Prod46"},
			{id:"Prod45", parentId:"ProdGroup6", title:"Prod45"},
			{id:"Prod44", parentId:"ProdGroup6", title:"Prod44"},
			{id:"Prod43", parentId:"ProdGroup5", title:"Prod43"},
			{id:"Prod42", parentId:"ProdGroup5", title:"Prod42"},
			{id:"Prod41", parentId:"ProdGroup5", title:"Prod41"},
			{id:"Prod40", parentId:"ProdGroup5", title:"Prod40"},
			{id:"Prod39", parentId:"ProdGroup5", title:"Prod39"},
			{id:"Prod38", parentId:"ProdGroup5", title:"Prod38"},
			{id:"Prod37", parentId:"ProdGroup5", title:"Prod37"},
			{id:"Prod36", parentId:"ProdGroup5", title:"Prod36"},
			{id:"Prod35", parentId:"ProdGroup5", title:"Prod35"},
			{id:"Prod34", parentId:"ProdGroup5", title:"Prod34"},
			{id:"Prod33", parentId:"ProdGroup5", title:"Prod33"},
			{id:"Prod32", parentId:"ProdGroup5", title:"Prod32"},
			{id:"Prod31", parentId:"ProdGroup5", title:"Prod31"},
			{id:"Prod30", parentId:"ProdGroup5", title:"Prod30"},
			{id:"Prod29", parentId:"ProdGroup5", title:"Prod29"},
			{id:"Prod28", parentId:"ProdGroup5", title:"Prod28"},
			{id:"Prod27", parentId:"ProdGroup5", title:"Prod27"},
			{id:"Prod26", parentId:"ProdGroup5", title:"Prod26"},
			{id:"Prod25", parentId:"ProdGroup5", title:"Prod25"},
			{id:"Prod24", parentId:"ProdGroup5", title:"Prod24"},
			{id:"Prod23", parentId:"ProdGroup4", title:"Prod23"},
			{id:"Prod22", parentId:"ProdGroup3", title:"Prod22"},
			{id:"Prod21", parentId:"ProdGroup3", title:"Prod21"},
			{id:"Prod20", parentId:"ProdGroup3", title:"Prod20"},
			{id:"Prod19", parentId:"ProdGroup3", title:"Prod19"},
			{id:"Prod18", parentId:"ProdGroup3", title:"Prod18"},
			{id:"Prod17", parentId:"ProdGroup2", title:"Prod17"},
			{id:"Prod16", parentId:"ProdGroup2", title:"Prod16"},
			{id:"Prod15", parentId:"ProdGroup2", title:"Prod15"},
			{id:"Prod14", parentId:"ProdGroup2", title:"Prod14"},
			{id:"Prod13", parentId:"ProdGroup2", title:"Prod13"},
			{id:"Prod12", parentId:"ProdGroup1", title:"Prod12"},
			{id:"Prod11", parentId:"ProdGroup1", title:"Prod11"},
			{id:"Prod10", parentId:"ProdGroup1", title:"Prod10"},
			{id:"Prod09", parentId:"ProdGroup1", title:"Prod09"},
			{id:"Prod08", parentId:"ProdGroup1", title:"Prod08"},
			{id:"Prod07", parentId:"ProdGroup1", title:"Prod07"},
			{id:"Prod06", parentId:"ProdGroup1", title:"Prod06"},
			{id:"Prod05", parentId:"ProdGroup1", title:"Prod05"},
			{id:"Prod04", parentId:"ProdGroup1", title:"Prod04"},
			{id:"Prod03", parentId:"ProdGroup1", title:"Prod03"},
			{id:"Prod02", parentId:"ProdGroup1", title:"Prod02"},
			{id:"Prod01", parentId:"ProdGroup1", title:"Prod01", minimized:false}
		]
	}
];


//======================================================================
//	Load the productRevenue dataSource and mark it valid for offline storage
//======================================================================

<isomorphic:loadDS name="productRevenue"/>
productRevenue.useOfflineStorage = true;

//======================================================================
//	Create custom context menu items
//======================================================================

var reportMenuItems = [
	{title:"Adjust", enableIf:"false"},
	{
		title:"Copy",
		click:"Log.logWarn('COPY from cells '+Log.echoAll(report.getSelectedCells()))",
		enableIf:"report.anyCellSelected()"
	},
	{
		title:"Paste",
		click:"Log.logWarn('PASTE into cells '+Log.echoAll(report.getSelectedCellIds()))",
		enableIf:"report.anyCellSelected()"
	},
	{title:"Chart", enableIf:"false"},
	{title:"Guidance", enableIf:"false"},
	{title:"Attach", enableIf:"false"},
	{title:"Currency", enableIf:"false"},
	{title:"Apply Seasonality", enableIf:"false"},
	{title:"Apply Formula", enableIf:"false"}
];


//======================================================================
//	Create the CubeGrid (multidimensional grid) component
//======================================================================
isc.CubeGrid.create({
    ID:"report",
    
    // Don't draw this CubeGrid - it will be written into a Layout with the facet-control
    // UI components
    autoDraw:false,
    cellHeight:30,
    width:"100%",

    bodyBackgroundColor:"white",

    // data configuration
    facets:         productRevenue_facets, // defined above
    dataSource:     "productRevenue",      // defined in datasource file productRevenue.ds.xml
    valueProperty:  "value",
    cellIdProperty: "cellID",
    hiliteProperty: "_hilite",

    // initial facet layout
    rowFacets:        ["Regions", "Products"],
    columnFacets:     ["Time"],
    fixedFacetValues: {Scenarios:"Budget"},

    // hover tips
    canHover:true,
    cellHoverHTML:"if (record != null) return 'cell value: '+record.value+'<br>cell ID: '+record.cellID;",
    hoverProperties:{width:150, height:20},

    enableCharting:            true,
    chartConstructor:"BarChart",
    chartType:"Line",
    showFacetValueContextMenus:    true,
    showFacetContextMenus:        true,
    showCellContextMenus:        true,
    valueTitle:"Sales",

    // misc settings for this application
    canCollapseFacets:true,
    canMinimizeFacets:true,
    autoSelectValues:"both",    // both, cols, row, none
    rowHeaderGridMode:true,
	canPivot:true,
    canMoveFacets:true
    
});


//======================================================================
// Create a subclass of Menu for manipulating facets
//======================================================================
isc.ClassFactory.defineClass("FacetMenu", "Menu");

// All facet menus have the same basic set of items - set these up on init
// FacetMenus should be initialized with 2 properties:
//  "cubeGrid"    a pointer to a CubeGrid
//  "facetId"     the ID property for the facet for which this is a menu
isc.FacetMenu.addMethods({
    initWidget : function () {
        var cubeGridId = this.cubeGrid.getID();
        this.data = [
            // Items to explicitly add facet to rows / columns
            {   title:"Add To Row Facets", 
                enableIf:"!" + cubeGridId + ".rowFacets.contains('" + this.facetId + "')",
                click:"report.addToRowFacets('" + this.facetId + "');"
            },
            {   title:"Add To Column Facets", 
                enableIf:"!" + cubeGridId+ ".columnFacets.contains('" + this.facetId + "')",
                click:"report.addToColumnFacets('" + this.facetId + "');"                
            },
            
            // Fix facetValue submenu - 
            // When a facetValue is 'fixed', every cell displayed in the cube grid will match
            // the specified value in the appropriate facet.
            {   title:"Fix " + this.facetId + " value",
                submenu:
                    // Note - the data in this submenu is taken directly from the appropriate 
                    // facet's value tree object.  
                    // Whenever a menu's data array is set to a tree object, a hierachical set 
                    // of submenus will be auto-generated to represent this tree.
                    isc.Menu.create({
                        autoDraw:false,
                        canSelectParentItems:true,        
                        data:isc.Tree.create({
                            modelType:"parent",
                            // xxx Note (Not to be included in source version):
                            // We have to set the childrenProperty to something other than 'children',
                            // as the children property will be written onto the facet value objects,
                            // and when the facet values are later uesd to intantiate buttons in 
                            // the headers of the CubeGrid, the entire subtree of facetValues is 
                            // instantiated as a subtree of children within every Button in the header.
                            childrenProperty:"childNodes",
                            data:this.cubeGrid.getFacet(this.facetId).values
                    }),
                    itemClick:"report.fixFacetValue('" + facetId + "', item.id)"
                })
            }
            
        ];
        
        return this.Super("initWidget", arguments);
    }
});


// Add some simple helper methods to the report for programmatically pivoting and fixing facet 
// values.
// These methods will show a warn dialog if the user attempts to remove the last facet from
// either axis
report.addMethods({
    addToColumnFacets : function (facetId) {
        // If this is the only rowFacet, we can't make it a column facet
        if (this.rowFacets.length == 1 && this.rowFacets.contains(facetId)) {
            isc.warn("Unable to add " + facetId + " to column facets.<br>" +
                     "This would remove the only row-facet for this cubeGrid.");
            return;
        }
        this.addColumnFacet(facetId);
    },
    
    addToRowFacets : function (facetId) {

        // If this is the only rowFacet, we can't make it a column facet
        if (this.columnFacets.length == 1 && this.columnFacets.contains(facetId)) {
            isc.warn("Unable to add " + facetId + " to row facets.<br>" +
                     "This would remove the only column-facet for this cubeGrid.");
            return;
        }
        this.addRowFacet(facetId);
    },
    
    fixFacetValue : function (facetId, facetValue) {
        // If this is the only rowFacet, or column facet we can't fix it
        if ((this.columnFacets.length == 1 && this.columnFacets.contains(facetId)) ||
            (this.rowFacets.length == 1 && this.rowFacets.contains(facetId))) {
            isc.warn("Unable to fix value for " + facetId + ".<br>" +
                     "This would remove the only column-facet for this cubeGrid.");
            return;
        }
        
        this.setFixedFacetValue(facetId,facetValue);
    }
});
//======================================================================
// Create a subclass of MenuButton which supports facet manipulation via
// drag & drop
//======================================================================
isc.ClassFactory.defineClass("FacetMenuButton", "MenuButton");

// Set defaults on MenuButton class to avoid re-setting properties on each instance
isc.FacetMenuButton.addProperties({
    width:175,
    canDrag:true,
    canDrop:true,
    dragType:"facet",
    prompt:"Drag to desired facet position, or click to display menu."
});


//======================================================================
// create Menus / MenuButtons for each facet
//======================================================================

var facetIds = ["Regions", "Scenarios", "Time", "Products"]

// Use a VLayout to stack the menu buttons one above another
isc.VLayout.create({
    width:175,
    ID:"menuButtonStack",
    membersMargin:20,
    autoDraw:false
})

// Create the FacetMenuButtons, and FacetMenus for each facet
for (var i = 0; i < facetIds.length; i++) {
    var facetId = facetIds[i];
    
    menuButtonStack.addMember(
        isc.FacetMenuButton.create({
            // title for this button set up below by updateLabels()
    
            autoDraw:false,
            ID:facetId + "Button",
        
            // Initialize a FacetMenu instance for the 'Regions' facet
            // - initWidget for this class will make use of the 'cubeGrid' and 'facetId' properties
            //   to instantiate the menu with appropriate menu items.
            // Note - we re-use this menu as a context menu below, referring to it by it's ID.
            menu: isc.FacetMenu.create({
                ID:facetId + "Menu",
                width: 175,
                cubeGrid:report,
                facetId:facetId
            }),
        
            facetId:facetId   // cubeGrid detects dropped components with facetId property
        })
    );
}    

//======================================================================
// Create 2 ListGrids as an alternative UI for drag-rearranging facets
//======================================================================

// RowFacet ListGrid - displays the facets displayed as rows
// allows drag and drop manipulation of facets
isc.ListGrid.create({
    ID:"rowFacetList",
    autoDraw:false,
    left:190,
    width:150, height:150,

    canSort:false, showSortArrow:"none", leaveScrollbarGap:false,
    selectionType:"single",

    fields:[{title:"Row Facets", name:"title"}],
    
    // On a context click on a record, show the appropriate menu
    cellContextClick : function (record, rowNum, colNum) {
        // the appropriate menus are named "RegionsMenu", etc.
        var menu = window[record.id + "Menu"];
        menu.showContextMenu();
        return false;
    },
        
    canReorderRecords:true,
    canDragRecordsOut:true,
    canAcceptDroppedRecords:true,
    
    // We're going to override default ListGrid drag and drop behavior to support
    // - dragging the facet menu-buttons into the ListGrid
    // - dragging the records directly from the ListGrid to the CubeGrid header bars
    // - updating the CubeGrid header bars whenever drag and drop of records occurs
    
    // To enable dragging records to the cubeGrid headers, set dragType to facet
    dragType:"facet",

    // Allow anything with dragType facet to drop onto us
    willAcceptDrop : function () {
        if (isc.Event.getDragTarget().dragType == "facet") return true;
        return false;            
    },

    // override 'transferDragData' - disallow dragging the last facet from this
    // axis
    transferDragData : function () {
        var selection = this.getDragData();
        if (selection.length == this.data.getLength()) {
            isc.warn("Unable to shift all row facets onto columns - cubeGrid requires at least "
                    + "one facet on each axis.");
            return null;
        }
        return this.Super("transferDragData", arguments);
    },

    // Override recordDrop to add / reorder facets in the CubeGrid
    recordDrop : function (dropRecords, targetRecord, dropIndex, sourceWidget) {
        if (sourceWidget.dragType == "facet") {
            // rather than updating this list's data, add the data to the cubeGrid rowFacets
            // and we'll get updated by observation
            report.addRowFacet(sourceWidget.facetId, dropIndex)
        }
    },
    
    // Override dragStart to set up the 'facetId' on this object, so if the user drags to the
    // CubeGrid header bar, the CubeGrid knows which facet is being dragged from the
    // dragTarget's 'facetId'
    dragStart : function () {
        if (this.Super('dragStart')) {
            this.facetId = this.getSelectedRecord().id;
        }
    }
      
});

// ColumnFacet ListGrid
// (Basically the same as the RowFacet ListGrid above, but displays the facets displayed as Columns)
isc.ListGrid.create({
    ID:"colFacetList",
    autoDraw:false,
    left:355,
    width:150, height:150,

    canSort:false, showSortArrow:"none", leaveScrollbarGap:false,
    selectionType:"single",
    
    fields:[{title:"Column facets", name:"title"}],

    // On a context click on a record, show the appropriate menu
    cellContextClick : function (record, rowNum, colNum) {
        var menu = window[record.id + "Menu"];
        menu.showContextMenu();
        return false;
    },
    
    canReorderRecords:true,
    canDragRecordsOut:true,
    canAcceptDroppedRecords:true,

    // We're going to override default ListGrid drag and drop behavior to support
    // - dragging the facet menu-buttons into the ListGrid
    // - dragging the records directly from the ListGrid to the CubeGrid header bars
    // - updating the CubeGrid header bars whenever drag and drop of records occurs
    
    dragType:"facet",
    
    willAcceptDrop : function () {
        if (isc.Event.getDragTarget().dragType == "facet") return true;
        return false;            
    },
    
    // override 'transferDragData' - disallow dragging the last facet from this
    // axis
    transferDragData : function () {
        var selection = this.getDragData();
        if (selection.length == this.data.getLength()) {
            isc.warn("Unable to shift all column facets onto rows - cubeGrid requires at least "
                    + "one facet on each axis.");
            return null;
        }
        return this.Super("transferDragData", arguments);
    },
    
    // Override recordDrop to add / reorder facets in the CubeGrid
    recordDrop : function (dropRecords, targetRecord, dropIndex, sourceWidget) {
        if (sourceWidget.dragType == "facet") {
            // rather than updating this list's data, add the data to the cubeGrid rowFacets
            // and we'll get updated by observation
            report.addColumnFacet(sourceWidget.facetId, dropIndex)
        }
    },
    dragStart : function () {
        if (this.Super('dragStart')) {
            this.facetId = this.getSelectedRecord().id;
        }
    }
    
});

// ==========================================================
// Offline support
// ==========================================================

report.addProperties({
    goingOffline : function () {
        if (this.fadeTimer) {
            isc.Timer.clear(this.fadeTimer);
        }
        offlineInfo.setOpacity(100);
        offlineInfo.setContents("<font color='red'><b>You are now offline");
    },
    goingOnline : function () {
        offlineInfo.setContents("<font color='green'><b>You are now online");
        offlineInfo.setBackgroundColor(null);
        var _this = this;
        if (this.fadeTimer) {
            isc.Timer.clear(this.fadeTimer);
        }
        this.fadeTimer = isc.Timer.setTimeout(function () {
            _this.fadeLabel();
        }, 3000);
    },
    offlineResponse : function () {
        offlineWarning.show();
        var _this = this;
        this.fadeWarnTimer = isc.Timer.setTimeout(function () {
            _this.fadeWarning();
        }, 2000);
    },
    fadeLabel : function () {
        if (offlineInfo.opacity == null) offlineInfo.opacity = 100;
        offlineInfo.setOpacity(offlineInfo.opacity - 5);
        if (offlineInfo.opacity > 0) {
            this.fadeTimer = isc.Timer.setTimeout(this.ID + ".fadeLabel()", 50);
        }
    },
    fadeWarning : function () {
        if (offlineWarning.opacity == null) offlineWarning.opacity = 100;
        offlineWarning.setOpacity(offlineWarning.opacity - 5);
        if (offlineWarning.opacity > 0) {
            this.fadeWarnTimer = isc.Timer.setTimeout(this.ID + ".fadeWarning()", 50);
        } else {
            offlineWarning.hide();
            offlineWarning.setOpacity(100);
        }
    }
});

isc.Button.create({
    ID: "offlineToggle",
    title: "Go Offline",
    width: 100,
    click: function () {
        if (this.title == "Go Offline") {
            isc.Offline.goOffline();
            report.setOffline(true);
            this.setTitle("Go Online");
        } else {
            isc.Offline.goOnline();
            report.setOffline(false);
            this.setTitle("Go Offline");
        }
    }
});

isc.Label.create({
    ID: "offlineInfo",
    width: 100,
    height: 30,
    align: "center"
});

isc.Label.create({
    ID: "offlineWarning",
    width: 100,
    height: 30,
    backgroundColor: "#ffff00",
    contents: "Some data could not be fetched because you are offline",
    align: "center"
});
offlineWarning.hide();


isc.VLayout.create({
    ID: "offlineStack",
    left: 520,
    members: [
        offlineToggle,
        offlineInfo,
        offlineWarning
    ]
});

// Combine the controls into a single canvas for easy UI management
isc.Canvas.create({
    ID:"controlCanvas",
    autoDraw:false,
    height:150,
    width:800,
    overflow:"hidden",
    layoutAlign:"center",
    children:[
        menuButtonStack,
        rowFacetList,
        colFacetList,
        offlineStack
    ]
})

//======================================================================
// Functions to update the various UI components when the CubeGrid facets
// are rearranged
//======================================================================

isc.Page.addClassMethods({
    // A function to update the records displayed in the two ListGrids
    updateLists : function () {
    
        // Update the data for each ListGrid based on the rowFacets / columnFacets arrays
        // for the CubeGrid
        var data = [];
        for (var i = 0; i < report.rowFacets.length; i++) {
            data[i] = report.getFacet(report.rowFacets[i]);
        }
        rowFacetList.setData(data)
        
        data = [];
        for (var j = 0; j < report.columnFacets.length; j++) {
            data[j] = report.getFacet(report.columnFacets[j]);
        }
        colFacetList.setData(data)
    },
    
    // A function to update the UI when facets are added / removed from the row or column headers
    // Updates the menu-button titles and the Label for the CubeGrid as a whole
    updateLabels : function () {    
        
        // Get the titles for the fixed facet values
        var fixedFacetValueTitles = {};
        for (var i in report.fixedFacetValues) {
            fixedFacetValueTitles[i] = report.getFacetValue(i, report.fixedFacetValues[i]).title;
        }
        
        // update the titles of the menu-buttons to reflect whether each facet is fixed, or displayed
        // in columns or rows.
        
        // we have the set of facet IDs globally as facetIds
        for (var i = 0; i < facetIds.length; i++) {
            var facetId = facetIds[i],
                // is this facet fixed at some value?
                displayType = fixedFacetValueTitles[facetId];
            
            // if not fixed, are we visible in rows, or in columns?
            if (displayType == null) 
                displayType = (report.columnFacets.contains(facetId) ? "in columns" : "in rows");
            
            // get a pointer to the button to update
            var menuButton = window[facetId + "Button"];
            menuButton.setTitle("<b>" + facetId + "</b>: [" + displayType + "]");
        }
    }
})    

// Add handler methods to the CubeGrid to call the methods to update the Page UI 
// when the facets are rearranged
report.addMethods({
    facetAdded : function (facetId) {
        isc.Page.updateLists();
        isc.Page.updateLabels();
    },
        
    facetMoved : function (facetId) {
        isc.Page.updateLists();
        isc.Page.updateLabels();
    }
});

isc.Page.observe(report, "setFixedFacetValue", "isc.Page.updateLists(); isc.Page.updateLabels();");

// Do an initial update of the UI so it's all correct to start with.
isc.Page.updateLists();
isc.Page.updateLabels();


// Display the CubeGrid and controls in a layout
isc.VLayout.create({
    height:"100%", width:"100%",
    membersMargin:20,
    layoutMargin:10,
    autoDraw:true,
    members:[
        controlCanvas,
        report
    ]
})

</SCRIPT>
</BODY></HTML>
