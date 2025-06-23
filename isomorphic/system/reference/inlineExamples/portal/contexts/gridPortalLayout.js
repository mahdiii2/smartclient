isc.ListPalette.create({
    ID: "listPalette",
    width: 150,
    leaveScrollbarGap: false,
  
    fields: [
        {name: "title", title: "DataSource Name"}
    ],

    // specify paletteNodes that will create ListGrids bound to specific DataSources
    data: [{
        title: "Animals", 
        type: "ListGrid", 
        defaults: {
            dataSource: "animals",
            autoFetchData: true,
            showFilterEditor: true,
            useAllDataSourceFields: true
        }
    },{
        title: "Supply Categories", 
        type: "ListGrid", 
        defaults: {
            dataSource: "supplyCategory",
            autoFetchData: true,
            showFilterEditor: true,
            useAllDataSourceFields: true
        }
    },{
        title: "Supply Items", 
        type: "ListGrid", 
        defaults: {
            dataSource: "supplyItem",
            autoFetchData: true,
            showFilterEditor: true,
            useAllDataSourceFields: true
        }
    }]
});

isc.EditPane.create({
    ID: "editPane",
    extraPalettes: isc.HiddenPalette.create({
        data: [
           { title: "ListGridField", type: "ListGridField" }
        ]
    })
});

// Make the new editPane the default Edit Context for the palette,
// to support double-clicking on paletteNodes to create them.
listPalette.setDefaultEditContext(editPane);
editPane.setDefaultPalette(listPalette);

// Add a PortalLayout to the editPane
var editNode = editPane.addFromPaletteNode({
    type: "PortalLayout",
    defaults: {
        width: "100%",
        height: "100%",
        canResizePortlets: true
    }
});
editPane.getEditContext().defaultParent = editNode;

isc.VLayout.create({
    ID: "vLayout",
    width: "100%",
    height: "100%",
    membersMargin: 10,
    members: [
        isc.HLayout.create({
            ID: "hLayout",
            membersMargin: 20,
            width: "100%",
            height: "100%",
            members: [
                listPalette,
                editPane
            ]
        })
    ]
});


// This button will destroy the Edit Portal and then recreate it from saved state.
isc.IButton.create({
    ID: "destroyAndRecreateButton",
    title: "Destroy and Recreate",
    autoFit: true,
    layoutAlign: "right",

    destroyAndRecreateEditPane : function () {
        // We save the editPane node data in a variable
        var paletteNodes = editPane.serializeAllEditNodes();

        // Animate the disappearance of the editPane, since otherwise
        // everything happens at once.
        editPane.animateFade(0, function () {
            // Once the animation is finished, destroy all the nodes
            editPane.destroyAll();

            // Then add them back from the serialized form
            editPane.addPaletteNodesFromXML(paletteNodes, null, null, function () {
                // Once complete, reset the editContext defaultParent so double-clicks
                // will add new nodes within the PortalLayout.
                // PortalLayout is assumed to be the first node under root.
                var editTree = this.getEditNodeTree(),
                    rootNode = this.getRootEditNode(),
                    childNodes = editTree.getChildren(rootNode),
                    portalLayoutEditNode = (childNodes && childNodes.length > 0 ? childNodes[0] : null)
                ;
                editPane.getEditContext().defaultParent = portalLayoutEditNode;
            });

            // And make us visible again
            editPane.setOpacity(100);
        }, 2000, "smoothEnd");
    },

    click : function () {
        this.destroyAndRecreateEditPane();
    }
});

// This inserts the button into the overall layout for the example.
vLayout.addMember(destroyAndRecreateButton, 0);
