/*============================================================
    "SmartClient" theme programmatic settings
    SmartClient v5.5
    Copyright 2001-2007, Isomorphic Software
============================================================*/


isc.loadSkin = function (theWindow) {
    if (theWindow == null) theWindow = window;

//----------------------------------------
// Register skin
//----------------------------------------
    var currentSkin = isc.setCurrentSkin({
        // name is autoderived to be the containing folder
        name: "autoDetect"
    });


//----------------------------------------
// Load skin style sheet(s)
//----------------------------------------
    isc.Page.loadStyleSheet("[SKIN]/skin_styles.css", theWindow)

    isc.Class.modifyFrameworkStart();

    // -----------------------------------------------------   
    // Standard Framework icons - changes specific to this skin
    // Action icons
    isc.Media.setStockIconStates(['Add', 'Back', 'Edit', 'Forward'], []);
    isc.Media.removeStockIcons(['Accept','Color_swatch', 'Exlamation', 'Plus', 'Print', 'Text_linespacing']);

    // Header icons
    isc.Media.removeStockIconGroup("header");

//============================================================
//  Component Skinning
//============================================================
//   1) Scrollbars
//   2) Buttons
//   3) Resizebars
//   4) Sections
//   5) Progressbars
//   6) TabSets
//   7) Windows
//   8) Dialogs
//   9) Pickers
//  10) Menus
//  11) Hovers
//  12) ListGrids
//  13) TreeGrids
//  14) Form controls
//  15) Drag & Drop
//  16) Edges
//  17) Sliders
//============================================================


//----------------------------------------
// 1) Scrollbars
//----------------------------------------
    isc.Canvas.addProperties({
        showCustomScrollbars:true
    });

    if(isc.Browser.isIE && isc.Browser.version >= 7 && !isc.Browser.isIE9) {
        isc.Canvas.setAllowExternalFilters(false);
        isc.Canvas.setNeverUseFilters(true);
        if(isc.Window) {
          isc.Window.addProperties({
                modalMaskOpacity:null,
                modalMaskStyle:"normal"
            });
            isc.Window.changeDefaults("modalMaskDefaults", { src : "[SKIN]opacity.png" });

            // Dialog (prompt) shows no header in edge media - ensure message is centered.
            isc.Dialog.changeDefaults("bodyDefaults",
                {layoutTopMargin:15, layoutLeftMargin:15, layoutRightMargin:15, layoutBottomMargin:15});
            isc.Dialog.changeDefaults("messageStackDefaults",
                {layoutMargin:10, layoutBottomMargin:10});

            isc.addProperties(isc.Dialog.Prompt.bodyDefaults,
                {layoutTopMargin:15, layoutBottomMargin:15, layoutLeftMargin:15, layoutRightMargin:15});
            isc.addProperties(isc.Dialog.Prompt.messageStackDefaults,
                {layoutMargin:10, layoutBottomMargin:10});

        }
    }

    isc.ScrollThumb.addProperties({
        capSize:9
    })
    isc.Scrollbar.addProperties({
        allowThumbDownState:true,
        thumbMinSize:19,
        thumbOverlap:0
    })


//----------------------------------------
// 2) Buttons
//----------------------------------------

    // "IButton" is the new standard button class for SmartClient applications. Application
    // code should use IButton instead of Button for all standalone buttons. Other skins may
    // map IButton directly to Button, so this single class will work everywhere. Button remains
    // for internal and advanced uses (eg if you need to mix both CSS-based and image-based
    // standalone buttons in the same application).
    isc.defineClass("IButton", "StretchImgButton").addProperties({
        src:"[SKIN]button/button.png",
        height:20,
        width:100,
        capSize:6,
        vertical:false,
        titleStyle:"headerTitle"
    });

    isc.defineClass("IAutoFitButton", "IButton").addProperties({
        autoFit: true,
        autoFitDirection: isc.Canvas.HORIZONTAL
    });
    if (isc.IButton.markAsFrameworkClass != null) isc.IButton.markAsFrameworkClass();
    if (isc.IAutoFitButton.markAsFrameworkClass != null) isc.IAutoFitButton.markAsFrameworkClass();


    if (isc.IMenuButton) {
        isc.IMenuButton.addProperties({
            src:"[SKIN]button/button.png",
            capSize:6,
            vertical:false,
            titleStyle:"headerTitle"
        });
        if (isc.IMenuButton.markAsFrameworkClass != null) isc.IMenuButton.markAsFrameworkClass();

    }



//----------------------------------------
// 3) Resizebars
//----------------------------------------
    // StretchImgSplitbar class renders as resize bar with
    // end caps, body, grip
    isc.StretchImgSplitbar.addProperties({
        // modify vSrc / hSrc for custom appearance
        //vSrc:"[SKIN]vsplit.gif",
        //hSrc:"[SKIN]hsplit.gif",
        capSize:10,
        showGrip:true
    })

    // ImgSplitbar renders as resizebar with resize grip only
    isc.ImgSplitbar.addProperties({
        // modify these properties for custom appearance
        //vSrc:"[SKIN]vgrip.png",
        //hSrc:"[SKIN]hgrip.png",
        //showDown:true,
        //styleName:"splitbar"
    })
    isc.Layout.addProperties({
        resizeBarSize:10,
        // Use the Snapbar as a resizeBar by default - subclass of Splitbar that
        // shows interactive (closed/open) grip images
        // Other options include the Splitbar, StretchImgSplitbar or ImgSplitbar
        resizeBarClass:"Snapbar"
    })
    isc.overwriteClass("LayoutResizeBar", "LayoutResizeSnapbar");


//----------------------------------------
// 4) Sections
//----------------------------------------
    if (isc.SectionItem) {
        isc.SectionItem.addProperties({
            sectionHeaderClass:"ImgSectionHeader",
            height:23
        })
    }
    if (isc.SectionStack) {
        isc.SectionStack.addProperties({
            sectionHeaderClass:"ImgSectionHeader",
            headerHeight:23
        })
        isc.ImgSectionHeader.changeDefaults("backgroundDefaults", {
            showRollOver:false,
            showDown:false,
            showDisabledIcon:true,
            src:"[SKIN]SectionHeader/header.png",
            icon:"[SKIN]SectionHeader/opener.png",
            capSize:6,
            titleStyle:"imgSectionHeaderTitle",
            baseStyle:"imgSectionHeader"   // could set backgroundColor here instead
        })
    }


//----------------------------------------
// 5) Progressbars
//----------------------------------------
    if (isc.Progressbar) {
        isc.Progressbar.addProperties({
            horizontalItems: [
            {name:"bar_start",size:3},
            {name:"bar_stretch",size:0},
            {name:"bar_end",size:4},
            {name:"empty_start",size:2},
            {name:"empty_stretch",size:0},
            {name:"empty_end",size:2}
            ],
            breadth:12
        })
    }


//----------------------------------------
// 6) TabSets
//----------------------------------------
    if (isc.TabSet) {
        isc.TabSet.addProperties({
            tabBarThickness:28,
            paneContainerClassName:"normal",
            showPaneContainerEdges:true
        });
        isc.TabSet.changeDefaults("paneContainerDefaults", {
            edgeSize:4,
            edgeImage:"[SKIN]/rounded/raised/FFFFFF/4.png",
            backgroundColor:"#C7C7C7"
        })
        isc.TabBar.addProperties({
            // keep the tabs from reaching the curved edge of the pane (regardless of align)
            layoutStartMargin:10,
            layoutEndMargin:10,

            // have the baseline overlap the top edge of the TabSet, using rounded media
            baseLineSrc:"[SKIN]baseline.png",
            baseLineThickness:4,
            baseLineCapSize:0
        })
    }
    if (isc.ImgTab) {
        isc.ImgTab.addProperties({
            src:"[SKIN]tab.png",
            showRollOver:true,
                        titleStyle:"tabTitle",
            capSize:4
        })
    }


//----------------------------------------
// 7) Windows
//----------------------------------------
    if (isc.Window) {

        isc.Window.addProperties({
            // rounded frame edges
            showEdges:true,
            customEdges:["T","B","L","R"],
            edgeSize:6,
            edgeImage:"[SKIN]/rounded/frame/A3B2CC/6.png",
            // clear backgroundColor and style since corners are rounded
            backgroundColor:null,

            styleName:"normal",
            edgeCenterBackgroundColor:"white",
            bodyColor:"white",
            // to float the header over the top edge and make it transparent:
            /*
                edgeOffsetTop:0,
                showHeaderBackground:false,
                headerStyle:null,
                hiliteHeaderStyle:null,
            */

            layoutMargin:0,
            membersMargin:0,
            showFooter:false,
            showShadow:true,
            shadowDepth:6
        })

        isc.Window.changeDefaults("headerDefaults", {
            layoutMargin:2,
            height:24,
            top:6
        })
        isc.Window.changeDefaults("headerIconDefaults", {
            width:16,
            height:16,
            layoutAlign:"center",
            src:"[SKIN]/Window/headerIcon.png"
        })
        isc.Window.changeDefaults("restoreButtonDefaults", {
             src:"[SKIN]/Window/restore.png",
             showRollOver:true,
             width:18,
             height:18
        })
        isc.Window.changeDefaults("closeButtonDefaults", {
             src:"[SKIN]/Window/close.png",
             showRollOver:true,
             width:18,
             height:18
        })
        isc.Window.changeDefaults("maximizeButtonDefaults", {
             src:"[SKIN]/Window/maximize.png",
             showRollOver:true,
             width:18,
             height:18
        })
        isc.Window.changeDefaults("minimizeButtonDefaults", {
             src:"[SKIN]/Window/minimize.png",
             showRollOver:true,
             width:18,
             height:18
        })
        isc.Window.changeDefaults("toolbarDefaults", {
            buttonConstructor: "IButton"
        })

//----------------------------------------
// 8) Dialogs
//----------------------------------------
        if (isc.Dialog) {
            // even though Dialog inherits from Window, we need a separate changeDefaults block
            // because Dialog defines its own toolbarDefaults
            isc.Dialog.changeDefaults("toolbarDefaults", {
                buttonConstructor: "IButton",
                height:40, // 10px margins + 20px button
                membersMargin:10
            })
            if (isc.Dialog.Warn && isc.Dialog.Warn.toolbarDefaults) {
                isc.addProperties(isc.Dialog.Warn.toolbarDefaults, {
                    buttonConstructor: "IButton",
                    height:40,
                    membersMargin:10
                })
            }
        }

    } // end isc.Window


//----------------------------------------
// 9) Pickers
//----------------------------------------
    // add bevels and shadows to all pickers
    isc.__pickerDefaults = {
        showEdges:true,
        edgeSize:6,
        edgeImage:"[SKIN]/rounded/frame/FFFFFF/6.png",
        //edgeShowCenter: true, // not available for ridge edges
        backgroundColor:"#C7C7C7",
        showShadow:true,
        shadowDepth:6,
        shadowOffset:5
    }
    if (isc.FormItem) {
        isc.FormItem.changeDefaults("pickerDefaults", isc.__pickerDefaults)
    }
    if (isc.DateChooser) {
        isc.DateChooser.addProperties(isc.__pickerDefaults, {
            showDoubleYearIcon:false,
            skinImgDir:"images/DateChooser/"
        })

    }
    if (isc.MultiFilePicker) {
        isc.MultiFilePicker.addProperties({
            backgroundColor:"#C7C7C7"
        })
    }
    if (isc.RelationPicker) {
        isc.RelationPicker.addProperties({
            backgroundColor:"#C7C7C7"
        })
    }



//----------------------------------------
// 10) Menus
//----------------------------------------
    if (isc.Menu) {
        isc.Menu.addProperties({
            // Increase cellHeight to accomodate text + borders in "over" state.
            cellHeight:25,
            showShadow:true,
            shadowDepth:5,
            showEdges:true,
            edgeSize:4,
            edgeImage:"[SKIN]/square/raised/FFFFFF/4.png",
            edgeShowCenter:true,
            // get rid of everything that could occlude center segment:
            // borders around table
            tableStyle:"normal",
            // XXX unreachable from CSS
            bodyBackgroundColor:"transparent"
            // also: non-rollover cell styles for menu need to avoid setting bgColor
            // for square/tinted edges only:
            //edgeBackgroundColor:"#fff0ff"
        }
    )}


//----------------------------------------
// 11) Hovers
//----------------------------------------
    if (isc.Hover) {
        isc.addProperties(isc.Hover.hoverCanvasDefaults, {
            showShadow:true,
            shadowDepth:5
        })
    }


//----------------------------------------
// 12) ListGrids
//----------------------------------------
    if (isc.HiliteRule) {
        isc.HiliteRule.changeDefaults("hiliteFormDefaults", {
            colWidths: [60, 60, 60, 60, 60, 44]
        });
    }

    if (isc.ListGrid) {
        isc.ListGrid.addProperties({
            // Render header buttons out as StretchImgButtons
            headerButtonConstructor:"StretchImgButton",
            sorterConstructor:"StretchImgButton",
            headerMenuButtonConstructor:"StretchImgButton",

            backgroundColor:"#CCCCCC",
            headerBackgroundColor:"#CCCCCC",
            headerHeight:21,
            headerBaseStyle:"headerButton",	// bgcolor tint and borders
            headerTitleStyle:"headerTitle",

            headerBarStyle:"headerBar",
            bodyStyleName:"gridBody",

            summaryRowStyle:"gridSummaryCell",
            groupSummaryStyle:"groupSummaryCell",

            headerMenuButtonBaseStyle:"headerButton",
            headerMenuButtonTitleStyle:"headerTitle",

            expansionFieldImageWidth : 16,
            expansionFieldImageHeight : 16

            //,groupIcon:"[SKINIMG]/TreeGrid/folder.png"
        })
        isc.ListGrid.changeDefaults("sorterDefaults", {
            capSize:5, // scaling down from 12; using GIFs
            labelHPad:4, // arrow image needs to overlap the end caps to fit
            // baseStyle / titleStyle is auto-assigned from headerBaseStyle
            src:"[SKIN]ListGrid/header.gif"
        })
        isc.ListGrid.changeDefaults("headerButtonDefaults", {
            capSize:5, // scaling down from 12; using GIFs
            // baseStyle / titleStyle is auto-assigned from headerBaseStyle
            src:"[SKIN]ListGrid/header.gif"
        })
        isc.ListGrid.changeDefaults("headerMenuButtonDefaults", {
            capSize:5,
            labelHPad:4,
            src:"[SKIN]ListGrid/header.gif"
        })
        isc.ListGrid.changeDefaults("summaryRowDefaults", {
            bodyBackgroundColor:null,
            bodyStyleName:"summaryRowBody"
        });

    }

//----------------------------------------
// 13) TreeGrids
//----------------------------------------
    if (isc.TreeGrid) {
        isc.TreeGrid.addProperties({
            folderIcon:"[SKIN]folder.png",
            nodeIcon:"[SKIN]file.png",
            manyItemsImage:"[SKIN]folder_file.png"
        })
    }
    if (isc.ColumnTree) {
        isc.ColumnTree.addProperties({
            folderIcon:"[SKIN]folder.png",
            nodeIcon:"[SKIN]file.png"
        });
    }


//----------------------------------------
// 14) Form controls
//----------------------------------------
    if (isc.FormItem) {isc.FormItem.addProperties({
        defaultIconSrc:"[SKIN]/controls/helper_control.gif",
        iconHeight:18,
        iconWidth:18,
        iconVAlign:"middle"
    })}

    if (isc.TextItem) {isc.TextItem.addProperties({
        height:isc.Browser.isSafari ? 22 : 20
    })}

    if (isc.SelectItem) {isc.SelectItem.addProperties({
        pickerIconSrc:"[SKIN]/controls/dropdown_control_inside.gif",
        height:20,
        valueIconSize:14
    })}

    if (isc.ComboBoxItem) {isc.ComboBoxItem.addProperties({
        pickerIconSrc:"[SKIN]/controls/dropdown_control.gif",
        pendingTextBoxStyle:"comboBoxItemPendingText",
        height:20, // pickerIcon automatically sizes to this height
        pickerIconWidth:17,
        textBoxStyle:"textItem"
    })}
    // used by SelectItem and ComboBoxItem for picklist
    if (isc.ScrollingMenu) {isc.ScrollingMenu.addProperties({
        border:"1px solid #606060",
        showShadow:true,
        shadowDepth:5
    })}
    if (isc.DateItem) {
        isc.DateItem.addProperties({
            pickerIconWidth:19,
            pickerIconHeight:16,
            pickerIconSrc:"[SKIN]/controls/date_control.png"
        })
    }
    if (isc.ColorItem) {
        isc.ColorItem.addProperties({
            showEmptyPickerIcon: true
        });
    }
    if (isc.SpinnerItem) {
        isc.SpinnerItem.addProperties({
            height:20
        });
        isc.SpinnerItem.changeDefaults("increaseIconDefaults", {
            width:17,
            height:10,
            showFocused:true,
            src:"[SKIN]/controls/spinner_control_increase.gif"
        });
        isc.SpinnerItem.changeDefaults("decreaseIconDefaults", {
            width:17,
            height:10,
            showFocused:true,
            src:"[SKIN]/controls/spinner_control_decrease.gif"
        });
        isc.SpinnerItem.changeDefaults("unstackedIncreaseIconDefaults", {
            src:"[SKIN]/controls/spinner_control_increase.gif",
            showFocused:true
        });
        isc.SpinnerItem.changeDefaults("unstackedDecreaseIconDefaults", {
            src:"[SKIN]/controls/spinner_control_decrease.gif",
            showFocused:true
        });
    }
    if (isc.PopUpTextAreaItem) {isc.PopUpTextAreaItem.addProperties({
        popUpIconSrc: "[SKIN]/controls/text_control.gif",
        popUpIconWidth:16,
        popUpIconHeight:16
    })}
    if (isc.ButtonItem && isc.IButton) {isc.ButtonItem.addProperties({
        buttonConstructor:isc.IButton
    })}

    if (isc.ToolbarItem && isc.IAutoFitButton) {isc.ToolbarItem.addProperties({
        buttonConstructor:isc.IAutoFitButton,
        buttonProperties: {
            autoFitDirection: isc.Canvas.BOTH
        }
    })}

    if (isc.RelativeDateItem) {
        isc.RelativeDateItem.changeDefaults("pickerIconDefaults", {
            neverDisable: false
        });
    }



//----------------------------------------
// 15) Drag & Drop
//----------------------------------------
    // drag tracker drop shadow (disabled by default because many trackers are irregular shape)
    //isc.addProperties(isc.EH.dragTrackerDefaults, {
    //    showShadow:true,
    //    shadowDepth:4
    //});
    // drag target shadow and opacity
    isc.EH.showTargetDragShadow = true;
    isc.EH.targetDragOpacity = 50;



//----------------------------------------
// 16) Edges
//----------------------------------------
    // default edge style serves as a pretty component frame/border - just set showEdges:true
    if (isc.EdgedCanvas) {
        isc.EdgedCanvas.addProperties({
            edgeSize:6,
            edgeImage:"[SKIN]/rounded/frame/FFFFFF/6.png"
        })
    }


//----------------------------------------
// 17) Sliders
//----------------------------------------
    if (isc.Slider) {
        isc.Slider.addProperties({
            thumbThickWidth:24,
            thumbThinWidth:14,
            trackWidth:6,
            trackCapSize:6,
            thumbSrc:"thumb.png",
            trackSrc:"track.png"
        });
        isc.Slider.changeDefaults("rangeLabelDefaults", {
            showDisabled: true
        });
        isc.Slider.changeDefaults("valueLabelDefaults", {
            showDisabled: true
        });
    }

// ----------------------------------------
// 18) Calendar
//----------------------------------------
    if (isc.Calendar) {
        isc.Calendar.changeDefaults("datePickerButtonDefaults", {
            showDown:false,
            showOver : false,
            src:"[SKIN]/DynamicForm/date_control.png"
        });
    }


    // specify where the browser should redirect if not supported
    isc.Page.checkBrowserAndRedirect("[SKIN]/unsupported_browser.html");

    isc.Class.modifyFrameworkDone();

}   // end loadSkin()

isc.loadSkin()

