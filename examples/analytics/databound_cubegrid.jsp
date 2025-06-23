<!--------------------------------------------------------------------
	SmartClient Analytics option
	Databound CubeGrid example
	
	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->


<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>

<HTML><HEAD><TITLE>
	SmartClient Analytics option - Databound CubeGrid example
</TITLE>
<isomorphic:loadISC includeModules="Analytics" skin="SmartClient" runat="server"/>
</HEAD><BODY background=../../isomorphic/skins/SmartClient/images/grid.gif MARGINHEIGHT=0 MARGINWIDTH=0 LEFTMARGIN=0 TOPMARGIN=0>
<TABLE WIDTH=100% CELLSPACING=0 CELLPADDING=5 BORDER=0><TR><TD CLASS=pageHeader BGCOLOR=WHITE>
	SmartClient Analytics option - Databound CubeGrid example
</TD><TD CLASS=pageHeader ALIGN=RIGHT BGCOLOR=WHITE>
	<A HREF=../../>Return to SDK Index</A>
</TD></TR></TABLE><TABLE WIDTH=100% CELLSPACING=0 CELLPADDING=0 BORDER=0><TR>
<TD BGCOLOR=336666><IMG SRC=images/blank.gif WIDTH=1 HEIGHT=4></TD></TR></TABLE>

<!-- load the facets from an external file -->
<SCRIPT SRC="productRevenue_facets.js"></SCRIPT>

<SCRIPT>

//======================================================================
//	Load the productRevenue dataSource
//======================================================================
<isomorphic:loadDS name="productRevenue"/>


//======================================================================
//	Create a CubeGrid (multidimensional grid) component
//======================================================================
CubeGrid.create({
	ID:"report",

	// data configuration
	facets:         productRevenue_facets, // defined in file productRevenue_facets.js
	dataSource:     "productRevenue",      // defined in datasource file productRevenue.ds.xml
	valueProperty:  "value",
	cellIdProperty: "cellID",
	hiliteProperty: "_hilite",

	// initial facet layout
	rowFacets:        ["Products"],
	columnFacets:     ["Time"],
	fixedFacetValues: {Regions:"sum", Scenarios:"Budget"},

	// position and sizing
	left:50, top:300,
	width:600,
	height:300,
	
	// hover tips
	canHover:true,
	cellHoverHTML:"if (record != null) return 'cell value: '+record.value+'<br>cell ID: '+record.cellID;",
	hoverProperties:{width:150, height:20},

	// misc settings for this application
	canCollapseFacets:true,
	canMinimizeFacets:true,
	autoSelectValues:"both",	// both, cols, row, none
	rowHeaderGridMode:true,
	hideEmptyFacetValues:false,
	alternateRecordStyles:false,
	canMoveFacets:true,
	canSortData:false,
	canSortFacets:false,
	canCloseColumns:false,
	canMinimizeColumns:false,
    canReorderFields:false
    
});

//======================================================================
// User interface components for describing / manipulating facet position
// ======================================================================

// Create a label to show what facets are currently being displayed in the
// CubeGrid.
Label.create({
    ID:"reportLabel",
    top:250, left:75,
    width:500, height:30,
    wrap:false, overflow:"visible", padding:5,
    backgroundColor:"white", border:"1px solid black;",
    align:"center", valign:"center"
    // Note - we set up contents dynamically in updateLabels()
})


//======================================================================
// Create a subclass of Menu for manipulating facets
//======================================================================
ClassFactory.defineClass("FacetMenu", "Menu");

// All facet menus have the same basic set of items - set these up on init
// FacetMenus should be initialized with 2 properties:
//  "cubeGrid"    a pointer to a CubeGrid
//  "facetId"     the ID property for the facet for which this is a menu
FacetMenu.addProperties({
    initWidget : function () {
        var cubeGridId = this.cubeGrid.getID();
        this.data = [
            // Items to explicitly add facet to rows / columns
            {   title:"Add To Row Facets", 
                enableIf:"!" + cubeGridId + ".rowFacets.contains('" + this.facetId + "')",
                click:"addToRowFacets('" + this.facetId + "');"
            },
            {   title:"Add To Column Facets", 
                enableIf:"!" + cubeGridId+ ".columnFacets.contains('" + this.facetId + "')",
                click:"addToColumnFacets('" + this.facetId + "');"                
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
                    Menu.create({
                        autoDraw:false,
                		canSelectParentItems:true,        
                        data:Tree.create({
                            modelType:"parent",
                            childrenProperty:"childNodes",
                            data:this.cubeGrid.getFacet(this.facetId).values
                    }),
                    itemClick:"fixFacetValue('" + facetId + "', item.id)"
            	})
            }
            
        ];
        
        return this.Super("initWidget", arguments);
    }
});

// Simple helper methods for adding to programmatically pivoting and fixing facet values.
// These methods will show a warn dialog if the user attempts to remove the last facet from
// either axis
function addToColumnFacets(facetId) {
    var cubeGrid = report;
    // If this is the only rowFacet, we can't make it a column facet
    if (cubeGrid.rowFacets.length == 1 && cubeGrid.rowFacets.contains(facetId)) {
        warn("Unable to add " + facetId + " to column facets.<br>" +
             "This would remove the only row-facet for this cubeGrid.");
        return;
    }
    cubeGrid.addColumnFacet(facetId);
}

function addToRowFacets(facetId) {
    var cubeGrid = report;
    // If this is the only rowFacet, we can't make it a column facet
    if (cubeGrid.columnFacets.length == 1 && cubeGrid.columnFacets.contains(facetId)) {
        warn("Unable to add " + facetId + " to row facets.<br>" +
             "This would remove the only column-facet for this cubeGrid.");
        return;
    }
    cubeGrid.addRowFacet(facetId);
}

function fixFacetValue(facetId, facetValue) {
    var cubeGrid = report,
        inCols = cubeGrid.columnFacets.contains(facetId),
        inRows = cubeGrid.rowFacets.contains(facetId);
    // If this is the only rowFacet, or column facet we can't fix it
    if ((cubeGrid.columnFacets.length == 1 && inCols) ||
        (cubeGrid.rowFacets.length == 1 && inRows)) {
        warn("Unable to fix value for " + facetId + ".<br>" +
             "This would remove the only " + (inRows ? "row" : "column") + "-facet for this cubeGrid.");
        return;
    }
    
    cubeGrid.setFixedFacetValue(facetId,facetValue);
}

//======================================================================
// Create a subclass of MenuButton which supports facet manipulation via
// drag & drop
//======================================================================
ClassFactory.defineClass("FacetMenuButton", "MenuButton");

// Set defaults on MenuButton class to avoid re-setting properties on each instance
FacetMenuButton.addProperties({
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
VLayout.create({
    top:75, left:50, width:175,
    ID:"MenuButtonStack",
    membersMargin:20
})

// Create the FacetMenuButtons, and FacetMenus for each facet
for (var i = 0; i < facetIds.length; i++) {
    var facetId = facetIds[i];
    
    MenuButtonStack.addMember(
        FacetMenuButton.create({
            // title for this button set up below by updateLabels()
    
            autoDraw:false,
        	ID:facetId + "Button",
        
            // Initialize a FacetMenu instance for the 'Regions' facet
            // - initWidget for this class will make use of the 'cubeGrid' and 'facetId' properties
            //   to instantiate the menu with appropriate menu items.
            // Note - we re-use this menu as a context menu below, referring to it by it's ID.
        	menu: FacetMenu.create({
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
ListGrid.create({
    ID:"RowFacetList",
    top:75, left:250,
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
        if (isc.EventHandler.dragTarget.dragType == "facet") return true;
        return false;            
    },

    // Override drop to add / reorder facets in the CubeGrid
    drop: function () {
        if (isc.EventHandler.dragTarget.dragType == "facet") {
            // which row did the drop occur over?
            var index = this.getEventRow();
            if (index == -1) index = 0;
            if (index == -2) index = this.data.getLength();
            
            // rather than updating this list's data, add the data to the cubeGrid rowFacets
            // and we'll get updated by observation
            report.addRowFacet(isc.EventHandler.dragTarget.facetId, index)
        
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
ListGrid.create({
    ID:"ColFacetList",
    top:75, left:450,
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
        if (isc.EventHandler.dragTarget.dragType == "facet") return true;
        return false;            
    },
    
    drop: function () {
        if (isc.EventHandler.dragTarget.dragType == "facet") {
            var index = this.getEventRow();
            if (index == -1) index = 0;
            if (index == -2) index = this.data.getLength();
            
            report.addColumnFacet(isc.EventHandler.dragTarget.facetId, index)
        
        }
    },
    dragStart : function () {
        if (this.Super('dragStart')) {
            this.facetId = this.getSelectedRecord().id;
        }
    }
    
});

//======================================================================
// Functions to update the various UI components when the CubeGrid facets
// are rearranged
//======================================================================

// A function to update the records displayed in the two ListGrids
function updateLists() {

    // Update the data for each ListGrid based on the rowFacets / columnFacets arrays
    // for the CubeGrid
    var data = [];
    for (var i = 0; i < report.rowFacets.length; i++) {
        data[i] = report.getFacet(report.rowFacets[i]);
    }
    RowFacetList.setData(data)
    
    data = [];
    for (var j = 0; j < report.columnFacets.length; j++) {
        data[j] = report.getFacet(report.columnFacets[j]);
    }
    ColFacetList.setData(data)
}

// A function to update the UI when facets are added / removed from the row or column headers
// Updates the menu-button titles and the Label for the CubeGrid as a whole
function updateLabels() {    
    
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
    
    // update the title displayed above the CubeGrid
    var fixedValueString;
    for (var j in fixedFacetValueTitles) {
        if (fixedValueString == null) fixedValueString = "";
        else fixedValueString += ", ";
        fixedValueString += j + ": <i>'" + fixedFacetValueTitles[j] + "'</i>";
    }
    
    if (fixedValueString == null) fixedValueString = "none"
    reportLabel.setContents("<B>Report - fixed values: " + fixedValueString + "</B>")

}


// Add handler methods to the CubeGrid to call the methods to update the Page UI 
// when the facets are rearranged
report.addProperties({	
	facetAdded : function (facetId) {
        updateLists();
        updateLabels();
	},
        
    facetMoved : function (facetId) {
        updateLists();
        updateLabels();
    }
});

Page.observe(report, "setFixedFacetValue", "updateLists(); updateLabels();");

// Do an initial update of the UI so it's all correct to start with.
updateLists();
updateLabels();
</SCRIPT>
</BODY>
</HTML>