
var typeMenu = {
    _constructor: "Menu",
    autoDraw: false,
    showShadow: true,
    shadowDepth: 10,
    data: [
        {title: "Document", keyTitle: "Ctrl+D", icon: "[SAMPLE]icons/16/document_plain_new.png"},
        {title: "Picture", keyTitle: "Ctrl+P", icon: "[SAMPLE]icons/16/folder_out.png"},
        {title: "Email", keyTitle: "Ctrl+E", icon: "[SAMPLE]icons/16/disk_blue.png"}
    ]
};

function getRibbonButton (title, props) {
    return isc.RibbonButton.create(isc.addProperties({
            title: title,
            autoDraw: false,
            icon: "pieces/48/cube_blue.png",
            click: "isc.say(this.title + ' button clicked');"
        }, props)
    );
}

isc.RibbonGroup.create({
    ID: "fileGroup",
    title: "File (vertical icons)",
    numRows: 2,
    colWidths: [ 40, "*" ],
    titleAlign: "left",
    controls: [
        getRibbonButton("New", {vertical: true, menu: typeMenu, showMenuIconOver: false }),
        getRibbonButton("Open", { vertical: true, icon: "pieces/48/cube_green.png" }),
        getRibbonButton("Save", { vertical: true, icon: "pieces/48/star_yellow.png" }),
        getRibbonButton("Save As", { vertical: true, menu: typeMenu, icon: "pieces/48/pawn_red.png" })
    ],
    autoDraw: false
});


isc.RibbonGroup.create({
    ID: "editGroup",
    title: "Editing Tools",
    numRows: 2,
    colWidths: [ 40, "*" ],
    controls: [
        getRibbonButton("Edit", { vertical: false, icon: "pieces/16/star_yellow.png" }),
        getRibbonButton("Copy", { vertical: false, icon: "pieces/16/pawn_white.png" }),
        getRibbonButton("Undo", { vertical: false, menu: typeMenu, showMenuIconOver: false, icon: "pieces/16/star_grey.png" }),
        getRibbonButton("Redo", { vertical: false, menu: typeMenu, icon: "pieces/16/piece_green.png" })
    ],
    autoDraw: false
});

isc.RibbonGroup.create({
    ID: "insertGroup",
    title: "Insert",
    numRows: 2,
    colWidths: [ 40, "*" ],
    controls: [
        getRibbonButton("Picture", { vertical: true, menu: typeMenu, icon: "pieces/48/cube_blue.png" }),
        getRibbonButton("Video", { vertical: true, menu: typeMenu, icon: "pieces/16/pawn_yellow.png" }),
        getRibbonButton("Link", { vertical: false, icon: "pieces/16/piece_red.png" }),
        getRibbonButton("Other", { vertical: false, icon: "pieces/16/star_blue.png" })
    ],
    autoDraw: false
});

isc.RibbonBar.create({
    ID: "ribbonBar",
    groupTitleAlign: "center",
    groupTitleOrientation: "top"
});

ribbonBar.addGroup(fileGroup, 0);
ribbonBar.addGroup(editGroup, 1);
ribbonBar.addGroup(insertGroup, 2);
