/*============================================================
    "Graphite" theme programmatic settings
    Copyright 2003 and beyond, Isomorphic Software
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

    // Standard Framework icons - changes specific to this skin
    isc.Media.setStockIconGroupStates("header", ["Disabled", "Over"]);
    isc.Media.removeStockIcons(["Header_Drag"]);

    var useCSS3 = isc.Browser.useCSS3,
        useSpriting = isc.Browser.useSpriting;

        
// --------------------------------------
// isc.minimalistTextControlAppearance (new property, consulted below) 
// - Show minimalist drop down controls by default?
// When true, SelectItem and ComboBoxItems will appear with modern "flat" styling
// including inline picker icon rather than picker icon button.
// - Set to false to restore traditional appearance for these controls
// --------------------------------------
	if (isc.minimalistTextControlAppearance == null) {
		isc.minimalistTextControlAppearance = true;
	}

    if (useCSS3) {

        if (isc.Browser.isIE && isc.Browser.version >= 7 && !isc.Browser.isIE9) {
            isc.Canvas.setAllowExternalFilters(false);
            isc.Canvas.setNeverUseFilters(true);

            if (isc.Window) {
                isc.Window.addProperties({
                    modalMaskOpacity:null,
                    modalMaskStyle:"normal"
                });
                isc.Window.changeDefaults("modalMaskDefaults", { src:"[SKIN]opacity.png" });
            }
        }

        if (isc.RPCManager) {
            isc.RPCManager.addClassProperties({
                promptStyle:"cursor"
            });
        }

        //----------------------------------------
        // 1) Scrollbars
        //----------------------------------------

        isc.SimpleScrollThumb.addProperties({
            imageWidth:10, imageHeight:10,
            baseStyle:"scrollThumb",
            hSrc:"[SKIN]hthumb_grip.png",
            vSrc:"[SKIN]vthumb_grip.png"
        });

        isc.Scrollbar.addProperties({
            baseStyle:"scrollbar",
            btnSize:16,
            hSrc:"[SKIN]hscroll.png",
            hThumbClass:isc.HSimpleScrollThumb,
            showRollOver:true,
            thumbInset:0,
            thumbMinSize:20,
            thumbOverlap:2,
            vSrc:"[SKIN]vscroll.png",
            vThumbClass:isc.VSimpleScrollThumb
        });
        isc.Scrollbar.changeDefaults("trackImg", {
            name:"blank",
            baseStyleKey:"vertical",
            baseStyleMap:{
                "true": "vScrollTrack",
                "false": "hScrollTrack"
            },
            baseStyle:"scrollTrack"
        });
        isc.Scrollbar.changeDefaults("cornerImg", { name:"blank0", baseStyle:"scrollCorner" });

        if (isc.SpritedScrollbar && useSpriting) {
            isc.SpritedSimpleScrollThumb.addProperties({
                hSrc: "[SKINIMG]/blank.gif",
                vSrc: "[SKINIMG]/blank.gif",
                gripImgSuffix: "",
                redrawOnStateChange: true
            });
            isc.SpritedVSimpleScrollThumb.addProperties({
                imageStyle: "vScrollThumbGrip"
            });
            isc.SpritedHSimpleScrollThumb.addProperties({
                imageStyle: "hScrollThumbGrip"
            });

            isc.SpritedScrollbar.addProperties({
                hThumbClass:isc.SpritedHSimpleScrollThumb,
                vThumbClass:isc.SpritedVSimpleScrollThumb
            });
        }


        //----------------------------------------
        // 2) Buttons
        //----------------------------------------
        isc.Button.addProperties({
            height:22,
            baseStyle:"button"
        });

        // define IButton so examples that support the new SmartClient skin image-based
        // button will fall back on the CSS-based Button with this skin
        isc.ClassFactory.defineClass("IButton", "Button").addProperties({
            baseStyle:"buttonRounded"
        });
        isc.ClassFactory.defineClass("IAutoFitButton", "AutoFitButton").addProperties({
            baseStyle:"buttonRounded"
        });

        if (isc.IButton.markAsFrameworkClass != null) isc.IButton.markAsFrameworkClass();
        if (isc.IAutoFitButton.markAsFrameworkClass != null) isc.IAutoFitButton.markAsFrameworkClass();

        isc.ClassFactory.defineClass("HeaderMenuButton", "IButton").addProperties({
            baseStyle:"headerButton"
        });

        // Have IMenuButton be just a synonym for IMenuButton
        if (isc.MenuButton) {
            isc.ClassFactory.overwriteClass("IMenuButton", "MenuButton");

            if (isc.IMenuButton.markAsFrameworkClass != null) isc.IMenuButton.markAsFrameworkClass();

            isc.MenuButton.addProperties({
                // copy the header (.button) background-color to match when sort arrow is hidden
                baseStyle:"button"
            });

            if (isc.ITreeMenuButton) {
                isc.ClassFactory.overwriteClass("ITreeMenuButton", "TreeMenuButton");
                if (isc.ITreeMenuButton.markAsFrameworkClass != null) {
                    isc.ITreeMenuButton.markAsFrameworkClass();
                }
            }

        }

        if (isc.MenuButton) {
            isc.MenuButton.addProperties({
                baseStyle:"menuButton",
                iconHeight:4,
                iconWidth:7,
                menuButtonImage:"[SKIN]menu_button.png",
                menuButtonImageUp:"[SKIN]menu_button_up.png",
                showFocusedAsOver:true
            });
        }

        if (isc.IMenuButton) {
            isc.IMenuButton.addProperties({
                capSize:4,
                height:22,
                iconWidth:7,
                iconHeight:4,
                menuButtonImage:"[SKIN]menu_button.png",
                menuButtonImageUp:"[SKIN]menu_button_up.png",
                showFocused:true,
                showFocusedAsOver:true,
                src:"[SKIN]button/button.png",
                titleStyle:"buttonTitle",
                vertical:false,
                width:100
            });
        }

        if (isc.Menu) {
            isc.Menu.addProperties({
                bodyBackgroundColor:null,
                bodyStyleName:"gridBody",
                cellHeight:22,
                checkmarkDisabledImage:{src:"[SKIN]check_disabled.png", width:7, height:6},
                checkmarkImage:{src:"[SKIN]check.png", width:9, height:8},
                fastCellUpdates:false,
                iconBodyStyleName:"menuMain",
                shadowDepth:5,
                showEdges:false,
                showShadow:false,
                submenuDisabledImage:{src:"[SKIN]submenu_disabled.png", height:7, width:4},
                submenuImage:{src:"[SKIN]submenu.png", height:7, width:4},
                skinUsesCSSTransitions: true
            });

            isc.Menu.changeDefaults("iconFieldDefaults", {
                baseStyle:"menuIconField",
                width:24
            });

            isc.Menu.changeDefaults("titleFieldDefaults", {
                baseStyle: "menuTitleField"
            });
        }

        isc.Label.addProperties({
            showFocused:false
        });

        //----------------------------------------
        // 3) Resizebars
        //----------------------------------------
        // StretchImgSplitbar class renders as resize bar
        isc.StretchImgSplitbar.addProperties({
            capSize:10,
            showGrip:true,
            showOver:false
        });

        isc.Snapbar.addProperties({
            hBaseStyle:"hSplitbar",
            vBaseStyle:"vSplitbar",
            gripBreadth:3,
            gripLength:20,
            hSrc:"[SKIN]hsplit.png",
            items:[
                {name:"blank", width:"*", height:"*"}
            ],
            showClosedGrip:false,
            showDown:false,
            showDownGrip:false,
            showRollOver:false,
            vSrc:"[SKIN]vsplit.png",
            showRollOverGrip:false
        });

        if (isc.ListGrid) {
            isc.ListGrid.addProperties({
                alternateRecordStyles:true,
                alternateBodyStyleName:null,
                backgroundColor:null,
                cellHeight:22,
                checkboxFieldImageHeight:13,
                checkboxFieldImageWidth:13,
                editFailedCSSText:"color:FF6347;",
                errorIconSrc:"[SKINIMG]actions/exclamation.png",
                expansionFieldImageHeight:16,
                expansionFieldImageWidth:16,
                expansionFieldFalseImage:"[SKINIMG]/ListGrid/row_collapsed.png",
                expansionFieldTrueImage:"[SKINIMG]/ListGrid/row_expanded.png",
                expansionFieldImageWidth: 16,
                expansionFieldImageHeight: 16,
                groupIcon:"[SKINIMG]/ListGrid/group.png",
                groupIconPadding:3,
                groupLeadingIndent:1,
                showHeaderShadow:true,
                headerBackgroundColor:null,
                headerBaseStyle:"headerButton",
                headerHeight:23,
                headerMenuButtonIcon:"[SKINIMG]ListGrid/sort_descending.png",
                headerMenuButtonConstructor:"HeaderMenuButton",
                headerMenuButtonWidth:17,
                normalCellHeight:22,
                showHeaderMenuButton:true,
                sortAscendingImage:{src:"[SKINIMG]ListGrid/sort_ascending.png", width:9, height:6},
                sortDescendingImage:{src:"[SKINIMG]ListGrid/sort_descending.png", width:9, height:6},
                summaryRowHeight: 24, // should be cellHeight + top/bottom borders
                tallBaseStyle:"tallCell"
            });

            isc.ListGrid.changeDefaults("sorterDefaults", {
                baseStyle:"sorterButton",
                showRollOver:false
            });
        }

        if (isc.TreeGrid) {
            isc.TreeGrid.addProperties({
                alternateRecordStyles:false,
                folderIcon:"[SKIN]folder.png",
                manyItemsImage:"[SKIN]folder_file.png",
                nodeIcon:"[SKIN]file.png",
                normalBaseStyle:"treeCell",
                applyRowNumberStyle:false,
                openerIconSize:22,
                openerImage:"[SKIN]opener.png",
                sortAscendingImage:{src:"[SKINIMG]ListGrid/sort_ascending.png", width:9, height:6},
                sortDescendingImage:{src:"[SKINIMG]ListGrid/sort_descending.png", width:9, height:6},
                tallBaseStyle:"treeTallCell"
            });
        }

        if (isc.MultiSortPanel) {
            isc.MultiSortPanel.changeDefaults("levelUpButtonDefaults", {
                src: "[SKINIMG]TransferIcons/up.png",
                height: 22,
                width: 24
            });
            isc.MultiSortPanel.changeDefaults("levelDownButtonDefaults", {
                src: "[SKINIMG]TransferIcons/down.png",
                height: 22,
                width: 24
            });
        }

        if (isc.TabSet) {
            isc.TabSet.addProperties({
                closeTabIconSize:12,
                paneContainerClassName:"tabSetContainer",
                paneMargin:5,
                pickerButtonSize:20,
                touchPickerButtonSize:26,
                pickerButtonSrc:"[SKIN]picker.png",
                showScrollerRollOver:false,
                scrollerButtonSize:19,
                scrollerSrc:"[SKIN]scroll.png",
                showEdges:false,
                symmetricScroller:false,
                symmetricPickerButton:false,
                tabBarThickness:24,
                defaultTabHeight:24,
                useSimpleTabs:true,
                scrollerBackHMarginSize: 1,
                scrollerBackVMarginSize: 1,
                getScrollerBackImgName : function () {
                    return "blank1";
                },
                getScrollerForwardImgName : function () {
                    return "blank2";
                },
                tabPickerHMarginSize: 1,
                tabPickerVMarginSize: 1,
                getTabPickerSrc : function () {
                    return "[SKINIMG]/blank.gif";
                }
            });
            isc.TabSet.changeDefaults("scrollerDefaults", {
                renderStretchImgInTable: false
            });
            isc.TabSet.changeDefaults("scrollerBackImg", {
                baseStyleKey: "scrollerPosition",
                baseStyleMap: {
                    "top": "tabScrollerTopBack",
                    "right": "tabScrollerRightBack",
                    "bottom": "tabScrollerBottomBack",
                    "left": "tabScrollerLeftBack"
                },
                baseStyle: "tabScrollerBack"
            });
            isc.TabSet.changeDefaults("scrollerForwardImg", {
                baseStyleKey: "scrollerPosition",
                baseStyleMap: {
                    "top": "tabScrollerTopForward",
                    "right": "tabScrollerRightForward",
                    "bottom": "tabScrollerBottomForward",
                    "left": "tabScrollerLeftForward"
                },
                baseStyle: "tabScrollerForward"
            });
            isc.TabSet.changeDefaults("tabPickerDefaults", {
                baseStyle: "tabPicker",
                statelessImage: true,
                redrawOnStateChange: false
            });

            // In Netscape Navigator 4.7x, set the backgroundColor directly since the css
            // background colors are not reliable
            if (isc.Browser.isNav) {
                isc.TabSet.addProperties({paneContainerDefaults:{backgroundColor:"#FFFFFF"}});
            }

            isc.TabBar.addProperties({
                baseLineThickness:1,
                bottomStyleName:"tabBarBottom",
                layoutEndMargin:5,
                layoutStartMargin:5,
                leadingMargin:5,
                leftStyleName:"tabBarLeft",
                membersMargin:3,
                rightStyleName:"tabBarRight",
                styleName:"tabBar",
                topStyleName:"tabBarTop"
            });
        }

        if (isc.ImgTab) isc.ImgTab.addProperties({capSize:6});

        if (isc.Window) {
            isc.Window.addProperties({
                backgroundColor:null,
                bodyStyle:"windowBody",
                layoutBottomMargin:4,
                layoutLeftMargin:4,
                layoutRightMargin:4,
                layoutTopMargin:1,
                modalMaskOpacity:10,
                membersMargin:0,
                styleName:"windowBackground",
                showHeaderBackground:false,
                showFooter:false
            });

            isc.Window.changeDefaults("headerDefaults", {
                height:20,
                layoutMargin:0
            });

            isc.Window.changeDefaults("resizerDefaults", { src:"[SKIN]/Window/resizer.png" });

            isc.Window.changeDefaults("headerIconDefaults", {
                height:15,
                src:"[SKIN]/Window/headerIcon.png",
                width:15
            });

            isc.Window.changeDefaults("restoreButtonDefaults", {
                height:15,
                showDown:false,
                showRollOver:true,
                src:"[SKIN]/headerIcons/cascade.png",
                width:15
            });

            isc.Window.changeDefaults("closeButtonDefaults", {
                height:15,
                showDown:false,
                showRollOver:true,
                src:"[SKIN]/headerIcons/close.png",
                width:15
            });

            isc.Window.changeDefaults("maximizeButtonDefaults", {
                height:15,
                showDown:false,
                showRollOver:true,
                src:"[SKIN]/headerIcons/maximize.png",
                width:15
            });

            isc.Window.changeDefaults("minimizeButtonDefaults", {
                height:15,
                showDown:false,
                showRollOver:true,
                src:"[SKIN]/headerIcons/minimize.png",
                width:15
            });

            isc.Window.changeDefaults("toolbarDefaults", { buttonConstructor:"IButton" });

            if (isc.ColorPicker) {
                isc.ColorPicker.addProperties({
                    layoutMargin:2
                });
            }
        }

        if (isc.Dialog) {
            isc.Dialog.addProperties({
                bodyColor:"#FFFFFF",
                bodyStyle:"windowBody",
                leaveHeaderGap:true,

                layoutBottomMargin:4,
                layoutLeftMargin:4,
                layoutRightMargin:4,
                layoutTopMargin:1,
                modalMaskOpacity:10,
                membersMargin:0,
                styleName:"windowBackground",
                showHeaderBackground:false,
                showFooter:false
            });

            // even though Dialog inherits from Window, we need a separate changeDefaults block
            // because Dialog defines its own toolbarDefaults
            isc.Dialog.changeDefaults("toolbarDefaults", {
                buttonConstructor:"IButton",
                height:42, // 10px margins + 22px button
                membersMargin:10
            });

                        isc.Dialog.changeDefaults("bodyDefaults", {
                layoutTopMargin:10,
                layoutLeftMargin:15,
                layoutRightMargin:15,
                layoutBottomMargin:10
            });

            if (isc.Dialog.Warn && isc.Dialog.Warn.toolbarDefaults) {
                isc.addProperties(isc.Dialog.Warn.toolbarDefaults, {
                    buttonConstructor:"IButton",
                    height:42,
                    membersMargin:10
                });
            }

            // Modify the prompt dialog to show a header
            // In the css3-off mode header media is part of the background image, so
            // a header appears to show even though there's no true header widget.
            if (isc.Dialog.Prompt) {
                isc.addProperties(isc.Dialog.Prompt, {
                    showHeader:true,
                    showTitle:false,
                    showCloseButton:false,
                    bodyStyle:"windowBody"

                });
            }
            if (isc.Dialog.Warn) {
                if (isc.Browser.isTouch) isc.Dialog.Warn.showModalMask = true;
            }
            if (isc.Dialog.Prompt) {
                if (isc.Browser.isTouch) isc.Dialog.Prompt.showModalMask = true;
            }

        }

        // Dynamic form skinning
        if (isc.SectionHeader) {
            isc.SectionHeader.addProperties({
                icon:"[SKIN]/SectionHeader/opener.png"
            });
        }

        if (isc.FormItem) {
            isc.FormItem.addProperties({
                defaultIconSrc:"[SKIN]/DynamicForm/default_formItem_icon.png",
                errorIconSrc:"[SKINIMG]actions/exclamation.png",
                iconHeight:18,
                iconVAlign:"middle",
                iconWidth:18
            });
        }

        if (isc.TextItem) {
            if (isc.minimalistTextControlAppearance) {
                isc.TextItem.addProperties({
                    height:22,
                    showFocused:true,
                    textBoxStyle:"textItemLite"
                });
            } else {
                isc.TextItem.addProperties({
                    height:22,
                    showFocused:true
                });
            }
        }

        if (isc.TextAreaItem) {
            if (isc.minimalistTextControlAppearance) {
                isc.TextAreaItem.addProperties({
                    showFocused:true,
                    textBoxStyle:"textAreaItemLite"
                });
            } else {
                isc.TextAreaItem.addProperties({
                    showFocused:true
                });
            }
        }

		if (isc.SelectItem) {

			if (isc.minimalistTextControlAppearance) {
				isc.SelectItem.addProperties({
					showOver:true,
					updateTextBoxOnOver:false,
					updateControlOnOver:true,
					
					height:22,
					pickerIconSrc:"[SKIN]/pickers/comboBoxPickerLite.png",
					pickerIconWidth:16,
					pickerIconHeight:18,
					valueIconSize:12,
					showFocusedPickerIcon:false,
					textBoxStyle:"selectItemLiteText",
					controlStyle:"selectItemLiteControl"
				});
				
			} else {
			
				isc.SelectItem.addProperties({
					height:22,
					pickerIconSrc:"[SKIN]/pickers/comboBoxPicker.png",
					pickerIconWidth:18,
					valueIconSize:12,
					showFocusedPickerIcon:false,
					textBoxStyle:"selectItemText"
				});
			}
		}

        if (isc.MultiPickerItem) {
            isc.MultiPickerItem.addProperties({
                textBoxStyle:"selectItemLiteText", controlStyle:"selectItemLiteControl",
                width:150, 
                height:22, alwaysShowControlBox:true,
                showOver:true,
                showPickerIcon:true, 
                showFocusedPickerIcon:false,
                showFocused: true,
                updateTextBoxOnOver:false,
                updateControlOnOver:true,
                pickerIconSrc:"[SKIN]/pickers/comboBoxPickerLite.png",
                valueIconSize: 12,
                pickerIconWidth:16,
                pickerIconHeight:18
            });
        }

		if (isc.ComboBoxItem) {
			if (isc.minimalistTextControlAppearance) {
				
				isc.ComboBoxItem.addProperties({
					// we have 'showOver' explicitly set to true for the picker-icon
					// This will hilight the chevron as the user rolls over that icon only
					showOver:false,
					
					height:22,
					pickerIconSrc:"[SKIN]/pickers/comboBoxPickerLite.png",
					pickerIconWidth:16,
					pickerIconHeight:18,
					showFocusedPickerIcon:false,
					
					pendingTextBoxStyle:"selectItemLiteTextPending",
					textBoxStyle:"selectItemLiteText",
					controlStyle:"selectItemLiteControl"
				});
			
			} else {
				isc.ComboBoxItem.addProperties({
					height:22,
					pendingTextBoxStyle:"comboBoxItemPendingText",
					pickerIconSrc:"[SKIN]/pickers/comboBoxPicker.png",
					pickerIconWidth:18,
					showFocusedPickerIcon:false,
					textBoxStyle:"selectItemText"
				});
			}
		}

        // used by SelectItem and ComboBoxItem for flat list data
        if (isc.ScrollingMenu) {
            isc.ScrollingMenu.addProperties({
            shadowDepth:5,
            showShadow:false
            });
        }

        if (isc.PickListMenu) {
            isc.PickListMenu.addProperties({
                skinUsesCSSTransitions: true
            });
        }

        // used by SelectItem and ComboBoxItem for tree data
        if (isc.ScrollingTreeMenu) {
            isc.ScrollingTreeMenu.addProperties({
            shadowDepth:5,
            showShadow:false
            });
        }

        if (isc.PickTreeMenu) {
            isc.PickTreeMenu.addProperties({
                skinUsesCSSTransitions: true
            });
        }
        if (isc.DateItem) {
            isc.DateItem.addProperties({
                height:22,
                pickerIconHeight:14,
                pickerIconSrc:"[SKIN]/DynamicForm/date_control.png",
                pickerIconWidth:16
            });
			if (isc.minimalistTextControlAppearance) {
				isc.DateItem.addProperties({
					textBoxStyle:"textItemLite"
				});
                if (isc.NativeDateItem) {
                    isc.NativeDateItem.addProperties({
                        textBoxStyle:"textItemLite"
                    });
                }
                if (isc.NativeTimeItem) {
                    isc.NativeTimeItem.addProperties({
                        textBoxStyle:"textItemLite"
                    });
                }
                if (isc.NativeDatetimeItem) {
                    isc.NativeDatetimeItem.addProperties({
                        textBoxStyle:"textItemLite"
                    });
                }
			}
        }

        if (isc.SpinnerItem) {
			if (isc.minimalistTextControlAppearance) {
				isc.SpinnerItem.addProperties({
					height:22,
					textBoxStyle:"textItemLite",
					unstackedTextBoxStyle: "textItemLite"
				});
			} else {
				isc.SpinnerItem.addProperties({
					height:22,
					textBoxStyle:"selectItemText"
				});
			}
			
            isc.SpinnerItem.changeDefaults("increaseIconDefaults",
            {
                height:11,
                imgOnly:true,
                showDown:false,
                showFocused:false,
                src:"[SKIN]/DynamicForm/spinner_control_increase.png",
                width:16
            });

            isc.SpinnerItem.changeDefaults("decreaseIconDefaults",
            {
                height:11,
                imgOnly:true,
                showDown:false,
                showFocused:false,
                src:"[SKIN]/DynamicForm/spinner_control_decrease.png",
                width:16
            });
        }

        if (isc.PopUpTextAreaItem) {
            isc.PopUpTextAreaItem.addProperties({
                popUpIconHeight:16,
                popUpIconSrc:"[SKIN]/DynamicForm/text_control.gif",
                popUpIconWidth:16
            });
        }
        if (isc.ButtonItem && isc.IButton) {isc.ButtonItem.addProperties({
            showFocused:true,
            showFocusAsOver:false,
            buttonConstructor:isc.IButton,
            height:22
        })}


        if (isc.ToolbarItem && isc.IAutoFitButton) {
            isc.ToolbarItem.addProperties({
                buttonConstructor:isc.IAutoFitButton,
                buttonProperties:{ autoFitDirection:isc.Canvas.HORIZONTAL}
            });
        }

        if (isc.DateRangeDialog) {
            isc.DateRangeDialog.changeDefaults("headerIconProperties", { src:"[SKIN]/DynamicForm/date_control.png" });
        }

        if (isc.MiniDateRangeItem) {
            isc.MiniDateRangeItem.addProperties({"pickerIconSrc": "[SKIN]/DynamicForm/date_control.png"});
        }

        if (isc.DateChooser) {
            isc.DateChooser.addProperties({
                alternateWeekStyles:false,
                backgroundColor:null,
                baseNavButtonStyle:"dateChooserNavButton",
                baseWeekdayStyle:"dateChooserWeekday",
                baseWeekendStyle:"dateChooserWeekend",
                baseBottomButtonStyle:"dateChooserBorderedBottomButton",
                headerStyle:"dateChooserButton",
                nextMonthIcon:"[SKINIMG]/DateChooser/arrow_right.png",
                nextMonthIconHeight:16,
                nextMonthIconWidth:16,
                nextYearIcon:"[SKINIMG]/DateChooser/doubleArrow_right.png",
                nextYearIconHeight:16,
                nextYearIconWidth:16,
                prevMonthIcon:"[SKINIMG]/DateChooser/arrow_left.png",
                prevMonthIconHeight:16,
                prevMonthIconWidth:16,
                prevYearIcon:"[SKINIMG]/DateChooser/doubleArrow_left.png",
                prevYearIconHeight:16,
                prevYearIconWidth:16,
                showDoubleYearIcon:false,
                showEdges:false,
                skinImgDir:"images/DateChooser/",
                todayButtonHeight:20,
                weekendHeaderStyle:"dateChooserWeekendButton",
                styleName:"dateChooserBorder"
            });
            isc.DateChooser.changeDefaults("timeItemDefaults", {
                titleStyle: "customFormTitle"
            });
        }

        if (isc.ToolStrip) {
            isc.ToolStrip.addProperties({
                defaultLayoutAlign:"center",
                height:30
            });

            isc.ToolStrip.changeDefaults("formWrapperDefaults",{cellPadding:3});
        }

        if (isc.ToolStripMenuButton) {
                        isc.overwriteClass("ToolStripMenuButton", "MenuButton").addProperties({
                autoFit:true,
                baseStyle:"toolStripButton",
                height:22,
                labelVPad:0,
                showDown:true,
                showRollOver:true,
                showTitle:false
            });
        }

        if (isc.ToolStripButton) {
                        isc.overwriteClass("ToolStripButton", "Button").addProperties({
                autoFit:true,
                baseStyle:"toolStripButton",
                height:22,
                labelVPad:0,
                showTitle:false,
                showRollOver:true,
                showDown:true,
                title:null
            });
        }

        if (isc.EdgedCanvas) {
            isc.EdgedCanvas.addProperties({
                edgeSize:3,
                edgeImage: "[SKINIMG]edges/edge.png"
            })
        }

        if (isc.Slider) {
            isc.Slider.addProperties({
                hThumbStyle:"hSliderThumb",
                hTrackStyle:"hSliderTrack",
                thumbConstructor:"StatefulCanvas",
                thumbThickWidth:14,
                thumbThinWidth:14,
                trackConstructor:"StatefulCanvas",
                trackWidth:5,
                vThumbStyle:"vSliderThumb",
                vTrackStyle:"vSliderTrack",
                touchThumbThickWidth:30,
                touchThumbThinWidth:30,
                touchExtraThumbSpace:0,
                hValueStyle: "hSliderValue",
                vValueStyle: "vSliderValue",
                hLabelSpacing: 1,
                vLabelSpacing: 7,
                titleSpacing: 15,
                vTitleSpacing: 7,
                showActiveTrack: true,
                labelHeight: 22,
                padding: 1
            });
            isc.Slider.changeDefaults("thumbDefaults", {
                getCustomState : function () {
                    return (isc.Browser.isTouch ? "touch" : this.customState);
                }
            });
        }

        if (isc.TileGrid) {
            isc.TileGrid.addProperties({
                showEdges:false,
                styleName:null,
                valuesShowRollOver:true
            });
        }

        if (isc.Calendar) {
            isc.Calendar.changeDefaults("datePickerButtonDefaults", {
                showDown:false,
                showOver:false,
                src:"[SKIN]/DynamicForm/date_control.png"
            });

            isc.Calendar.changeDefaults("controlsBarDefaults", {
                height:10,
                layoutBottomMargin:10
            });

        }

        if (isc.FilterBuilder) {
            isc.FilterBuilder.changeDefaults("topOperatorFormDefaults", {
                width: 92
            });
        }

        if (isc.Hover) {
            isc.addProperties(isc.Hover.hoverCanvasDefaults, {
                shadowDepth:5,
                showShadow:false
            });
        }

        //indicate type of media used for various icon types
        isc.pickerImgType = "png";
        isc.transferImgType = "png";
        isc.headerImgType = "png";

        isc.Page.checkBrowserAndRedirect("[SKIN]/unsupported_browser.html");


        // Properties specific to the this skin:
        if (isc.SectionStack) {
            isc.SectionStack.addProperties({
                headerHeight:23
            });
        }
        if (isc.TabSet) {
            isc.TabSet.addProperties({
                tabBarThickness:26
            });
        }
        if (isc.Window) {
            isc.Window.addProperties({
                layoutBottomMargin:1,
                layoutLeftMargin:1,
                layoutRightMargin:2
            });
        }
        if (isc.Window) {
            isc.Window.changeDefaults("headerDefaults", {
                layoutMargin:1
            });
        }
        if (isc.Dialog) {
            isc.Dialog.addProperties({
                layoutBottomMargin:2,
                layoutLeftMargin:1,
                layoutRightMargin:1
            });
        }
    } else { // useCSS3 is false
//============================================================
//  Component Skinning
//============================================================
//   1) Scrollbars
//   2) Buttons
//   3) Resizebars
//   4) Sections & NavigationBar
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
//  18) TileList
//  19) CubeGrid
//  20) FilterBuilder
//  21) Printing
//  22) ToolStrip
//  23) SplitPane
//============================================================


    if(isc.Browser.isIE && isc.Browser.version >= 7 && !isc.Browser.isIE9) {
        isc.Canvas.setAllowExternalFilters(false);
        isc.Canvas.setNeverUseFilters(true);
        if(isc.Window) {
          isc.Window.addProperties({
                modalMaskOpacity:null,
                modalMaskStyle:"normal"
            });
            isc.Window.changeDefaults("modalMaskDefaults", { src : "[SKIN]opacity.png" });
        }
    }

    if(isc.RPCManager) {
        isc.RPCManager.addClassProperties({ promptStyle:"cursor" });
    }

//----------------------------------------
// 1) Scrollbars
//----------------------------------------
    isc.ScrollThumb.addProperties({
        capSize:2,
        vSrc:"[SKIN]vthumb.png",
        hSrc:"[SKIN]hthumb.png",
        showGrip:true,
        gripLength:10,
        gripBreadth:10,
		showRollOver: true,
		//showDown: true,
        backgroundColor:"transparent"
    })
    isc.Scrollbar.addProperties({
        btnSize:16,
        showRollOver:true,
        //showDown: true,
        thumbMinSize:20,
        thumbInset:0,
        thumbOverlap:2,
        backgroundColor:"#FFFFFF",
        vSrc:"[SKIN]vscroll.png",
        hSrc:"[SKIN]hscroll.png"
    })

    if (isc.SpritedScrollbar && useSpriting) {
        isc.SpritedScrollThumb.addProperties({
            showGrip: true,
            showRollOverGrip: false,
            showDownGrip: false,
            showRollOver: true,
            showDown: true,
            src: "[SKINIMG]/blank.gif",
            gripImgSuffix: ""
        });
        isc.SpritedVScrollThumb.addProperties({
            iconStyle: "vScrollThumbGrip",
            items: [{
                name: "blank1",
                width: "capSize",
                height: "capSize",
                baseStyle: "vScrollThumbStart"
            }, {
                name: "blank2",
                width: "*",
                height: "*",
                baseStyle: "vScrollThumbStretch"
            }, {
                name: "blank3",
                width: "capSize",
                height: "capSize",
                baseStyle: "vScrollThumbEnd"
            }]
        });
        isc.SpritedHScrollThumb.addProperties({
            iconStyle: "hScrollThumbGrip",
            items: [{
                name: "blank1",
                width: "capSize",
                height: "capSize",
                baseStyle: "hScrollThumbStart"
            }, {
                name: "blank2",
                width: "*",
                height: "*",
                baseStyle: "hScrollThumbStretch"
            }, {
                name: "blank3",
                width: "capSize",
                height: "capSize",
                baseStyle: "hScrollThumbEnd"
            }]
        });

        isc.SpritedScrollbar.changeDefaults("trackImg", {
            name: "blank5",
            baseStyleKey: "vertical",
            baseStyleMap: {
                "true": "vScrollTrackStretch",
                "false": "hScrollTrackStretch"
            },
            baseStyle:"scrollTrackStretch"
        });
        isc.SpritedScrollbar.changeDefaults("cornerImg", {
            name:"blank0",
            baseStyleKey: "vertical",
            baseStyleMap: {
                "true": "vScrollCorner",
                "false": "hScrollCorner"
            },
            baseStyle:"scrollCorner"
        });
    }


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
        height:22,
        width:100,
        capSize:4,
        vertical:false,
        titleStyle:"buttonTitle",
        showFocused:true,
        showFocusedAsOver:true
    });

    isc.defineClass("IAutoFitButton", "IButton").addProperties({
        autoFit: true,
        autoFitDirection: isc.Canvas.HORIZONTAL
    });
    if (isc.IButton.markAsFrameworkClass != null) isc.IButton.markAsFrameworkClass();
    if (isc.IAutoFitButton.markAsFrameworkClass != null) isc.IAutoFitButton.markAsFrameworkClass();


    isc.ImgButton.addProperties({
        showFocused: true,
        showFocusedAsOver:true

    });

    isc.defineClass("HeaderMenuButton", "Button").addProperties({
        baseStyle:"imgHeaderButton"
    });

	isc.Button.addProperties({
		height:22,
		showFocused: true,
		showFocusedAsOver: false
	});

	isc.Label.addProperties({
		showFocused: false
	});



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

    isc.Snapbar.addProperties({
        vSrc:"[SKIN]vsplit.png",
        hSrc:"[SKIN]hsplit.png",
        baseStyle:"splitbar",
	    /*items : [
    	    {name:"blank", width:"capSize", height:"capSize"},
    		{name:"blank", width:"*", height:"*"},
	    	{name:"blank", width:"capSize", height:"capSize"}
        ],*/
        items : [
    	    {name:"bg", width:"*", height:"*"}
        ],
        showDownGrip:false,
        showClosedGrip:false,
        showRollOver:false,
        showDown:false,
        gripBreadth:3,
        gripLength:20
        //capSize:8
    })


//----------------------------------------
// 4) Sections & NavigationBar
//----------------------------------------
    if (isc.SectionItem) {
        isc.SectionItem.addProperties({
            sectionHeaderClass:"ImgSectionHeader",
            height:24
        })
    }
    if (isc.SectionStack) {

        isc.SectionStack.addProperties({
            backgroundColor:null,
            sectionHeaderClass:"ImgSectionHeader",
            headerHeight:24
        })
        isc.ImgSectionHeader.changeDefaults("backgroundDefaults", {
            showRollOver:false,
            showDown:false,
            showDisabledIcon:false,
            showRollOverIcon:false,
            src:"[SKIN]SectionHeader/header.png",
            icon:"[SKIN]SectionHeader/opener.png",
			iconSize: 16,
            capSize:2,
            titleStyle:"imgSectionHeaderTitle",
            baseStyle:"imgSectionHeader",
            backgroundColor:"transparent"
        })
        isc.SectionHeader.addProperties({
            icon:"[SKIN]SectionHeader/opener.png",
			iconSize: 16
        })
    }


//----------------------------------------
// 5) Progressbars
//----------------------------------------
    if (isc.Progressbar) {
        isc.Progressbar.addProperties({
            horizontalItems: [
            {name:"h_start",size:2},
            {name:"h_stretch",size:0},
            {name:"h_end",size:2},
            {name:"h_empty_start",size:2},
            {name:"h_empty_stretch",size:0},
            {name:"h_empty_end",size:2}
            ],
            verticalItems: [
            {name:"v_empty_start",size:2},
            {name:"v_empty_stretch",size:0},
            {name:"v_empty_end",size:0},
            {name:"v_start",size:2},
            {name:"v_stretch",size:0},
            {name:"v_end",size:2}
            ],
            breadth:24,
            length : 300
        })
    }


//----------------------------------------
// 6) TabSets
//----------------------------------------
    if (isc.TabSet) {
        isc.TabSet.addProperties({
            tabBarThickness:26,
            scrollerButtonSize:19,
            pickerButtonSize:20,

            symmetricScroller:false,
            symmetricPickerButton:false,

            scrollerSrc:"[SKIN]scroll.png",
            pickerButtonSrc:"[SKIN]picker.png",

            closeTabIconSize:12,
            iconOrientation:"right",

            showEdges:false,
            paneContainerClassName:"tabSetContainer",

            paneMargin:5,

            showScrollerRollOver: false,
            defaultTabHeight:24
        });
        isc.TabSet.changeDefaults("paneContainerDefaults", {
            showEdges:false
        });
        isc.TabBar.addProperties({
            membersMargin:3,

            // keep the tabs from reaching the curved edge of the pane (regardless of align)
            layoutStartMargin:5,
            layoutEndMargin:5,

            styleName:"tabBar",
            leftStyleName:"tabBarLeft",
            topStyleName:"tabBarTop",
            rightStyleName:"tabBarRight",
            bottomStyleName:"tabBarBottom"
        });

        if (useSpriting) {
            isc.TabSet.addProperties({
                getScrollerBackImgName : function () {
                    return "blank1";
                },
                getScrollerForwardImgName : function () {
                    return "blank2";
                },
                getTabPickerSrc : function () {
                    return "[SKINIMG]/blank.gif";
                }
            });
            isc.TabSet.changeDefaults("scrollerBackImg", {
                baseStyleKey: "scrollerPosition",
                baseStyleMap: {
                    "top": "tabScrollerTopBackSprite",
                    "right": "tabScrollerRightBackSprite",
                    "bottom": "tabScrollerBottomBackSprite",
                    "left": "tabScrollerLeftBackSprite"
                },
                baseStyle: "tabScrollerBackSprite"
            });
            isc.TabSet.changeDefaults("scrollerForwardImg", {
                baseStyleKey: "scrollerPosition",
                baseStyleMap: {
                    "top": "tabScrollerTopForwardSprite",
                    "right": "tabScrollerRightForwardSprite",
                    "bottom": "tabScrollerBottomForwardSprite",
                    "left": "tabScrollerLeftForwardSprite"
                },
                baseStyle: "tabScrollerForwardSprite"
            });
            isc.TabSet.changeDefaults("tabPickerDefaults", {
                statelessImage: true,
                imageStyle: "tabPickerSprite",
                redrawOnStateChange: true
            });
        }
    }
    if (isc.ImgTab) {
        isc.ImgTab.addProperties({
            src:"[SKIN]tab.png",
            capSize:6,
            showRollOver:true,
            showDown:false,
            showDisabled:true,
            showDisabledIcon:false,
            titleStyle:"tabTitle"
        });
    }


//----------------------------------------
// 7) Windows
//----------------------------------------
    if (isc.Window) {

        isc._edgeOpacity = isc.Browser.isChrome ? 100 : 90;

        isc.Window.addProperties({
            edgeOpacity:isc._edgeOpacity,
            maskEdgeCenterOnly: isc._edgeOpacity < 100,
            // rounded frame edges
            showEdges:true,
            edgeImage: "[SKINIMG]Window/window.png",
            customEdges:null,
            edgeSize:3,
            edgeTop:23,
            edgeBottom:3,
			edgeOffsetTop:2,
			edgeOffsetRight:3,
			edgeOffsetBottom:3,
            showHeaderBackground:false, // part of edges
            showHeaderIcon:true,
            modalMaskOpacity:10,
            // clear backgroundColor and style since corners are rounded
            backgroundColor:null,
			border: null,
            styleName:"normal",
            edgeCenterBackgroundColor:"#FFFFFF",
            //bodyColor:null,
            bodyColor:"transparent",
            bodyStyle:"windowBody",

            layoutMargin:0,
            membersMargin:0,

            showFooter:false,

            showShadow:false,
            shadowDepth:5
        })

        isc.Window.changeDefaults("headerDefaults", {
            layoutMargin:0,
            height:21
        })
        isc.Window.changeDefaults("resizerDefaults", {
            src:"[SKIN]/Window/resizer.png"
        })

        isc.Window.changeDefaults("headerIconDefaults", {
            width:15,
            height:15,
            src:"[SKIN]/Window/headerIcon.png"
        })
        isc.Window.changeDefaults("restoreButtonDefaults", {
             src:"[SKIN]/headerIcons/cascade.png",
             showRollOver:true,
             showDown:false,
             width:15,
             height:15
        })
        isc.Window.changeDefaults("closeButtonDefaults", {
             src:"[SKIN]/headerIcons/close.png",
             showRollOver:true,
             showDown:false,
             width:15,
             height:15
        })
        isc.Window.changeDefaults("maximizeButtonDefaults", {
             src:"[SKIN]/headerIcons/maximize.png",
             showRollOver:true,
             width:15,
             height:15
        })
        isc.Window.changeDefaults("minimizeButtonDefaults", {
             src:"[SKIN]/headerIcons/minimize.png",
             showRollOver:true,
             showDown:false,
             width:15,
             height:15
        })
        isc.Window.changeDefaults("toolbarDefaults", {
            buttonConstructor: "IButton"
        })

        if (isc.ColorPicker) {
            isc.ColorPicker.addProperties({
                layoutMargin:0
            })
        }

//----------------------------------------
// 8) Dialogs
//----------------------------------------
        if (isc.Dialog) {
            isc.Dialog.addProperties({
                bodyColor:"transparent",
                hiliteBodyColor:"transparent"
            })
            // even though Dialog inherits from Window, we need a separate changeDefaults block
            // because Dialog defines its own toolbarDefaults
            isc.Dialog.changeDefaults("toolbarDefaults", {
                buttonConstructor: "IButton",
                height:42, // 10px margins + 22px button
                membersMargin:10
            })
            if (isc.Dialog.Warn && isc.Dialog.Warn.toolbarDefaults) {
                isc.addProperties(isc.Dialog.Warn.toolbarDefaults, {
                    buttonConstructor: "IButton",
                    height:42,
                    membersMargin:10
                })
            }
            if (isc.Dialog.Warn) {
                if (isc.Browser.isTouch) isc.Dialog.Warn.showModalMask = true;
            }
            if (isc.Dialog.Prompt) {
                if (isc.Browser.isTouch) isc.Dialog.Prompt.showModalMask = true;
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
        edgeImage: "[SKINIMG]Window/window.png",
        backgroundColor:"#FFFFFF",
        showShadow:false,
        shadowDepth:6,
        shadowOffset:5
    }
    if (isc.ButtonTable) {
        isc.ButtonTable.addProperties({
            backgroundColor:"#FFFFFF"
        })
    }
    if (isc.FormItem) {
        isc.FormItem.changeDefaults("pickerDefaults", isc.__pickerDefaults)
        isc.FormItem.addProperties({
            defaultIconSrc:"[SKIN]/DynamicForm/default_formItem_icon.png"
        });
    }
    if(isc.RelationItem) {
        isc.RelationItem.changeDefaults("removeButtonDefaults", {
            src: "[SKIN]DynamicForm/Remove_icon.png"
        });
    }

    if (isc.DateChooser) {
        isc.DateChooser.changeDefaults("dateGridDefaults", {
            headerButtonConstructor:"Button",
            headerButtonProperties:{showTitle:false}
        });

        isc.DateChooser.addProperties({
            alternateWeekStyles:false,
            backgroundColor:null,
            baseNavButtonStyle:"dateChooserNavButton",
            baseWeekdayStyle:"dateChooserWeekday",
            baseWeekendStyle:"dateChooserWeekend",
            baseBottomButtonStyle:"dateChooserBorderedBottomButton",
            bottomButtonConstructor:"Button",
            border:"1px solid #697186",
            headerHeight:24,
            headerStyle:"dateChooserButton",
            prevMonthIcon:"[SKIN]arrow_left.png",
            prevMonthIconWidth:16,
            prevMonthIconHeight:16,
            prevYearIcon:"[SKIN]doubleArrow_left.png",
            prevYearIconWidth:16,
            prevYearIconHeight:16,
            navButtonConstructor:"Button",
            nextMonthIcon:"[SKIN]arrow_right.png",
            nextMonthIconHeight:16,
            nextMonthIconWidth:16,
            nextYearIcon:"[SKIN]doubleArrow_right.png",
            nextYearIconHeight:16,
            nextYearIconWidth:16,
            shadowDepth:6,
            shadowOffset:5,
            showEdges:false,
            showDoubleYearIcon:false,
            showShadow:false,
            skinImgDir:"images/DateChooser/",
            todayButtonHeight:20,
            weekendHeaderStyle:"dateChooserWeekendButton"
        });
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
            cellHeight:22,
            fastCellUpdates:false,
            showShadow:false,
            shadowDepth:5,
            showEdges:false,
            submenuImage:{src:"[SKIN]submenu.png", height:7, width:4},
            submenuDisabledImage:{src:"[SKIN]submenu_disabled.png", height:7, width:4},
	        checkmarkImage:{src:"[SKIN]check.png", width:9, height:8},
	        checkmarkDisabledImage:{src:"[SKIN]check_disabled.png", width:7, height:6},
            bodyStyleName:"gridBody",
			iconBodyStyleName:"menuMain",
            bodyBackgroundColor:null
        });
        isc.Menu.changeDefaults("iconFieldDefaults", {
			width:24,
			baseStyle:"menuIconField"
		});
        isc.Menu.changeDefaults("titleFieldDefaults", {
            baseStyle: "menuTitleField"
        });
    }

    if (isc.MenuButton) {
        isc.MenuButton.addProperties({
			baseStyle: "menuButton",
            menuButtonImage:"[SKIN]menu_button.png",
            menuButtonImageUp:"[SKIN]menu_button_up.png",
            iconWidth:7,
            iconHeight:4,
            showFocusedAsOver:true
        });
    }
    if (isc.IMenuButton) {
        isc.IMenuButton.addProperties({
            src:"[SKIN]button/button.png",
            height:22,
            capSize:4,
            vertical:false,
            titleStyle:"buttonTitle",
            showFocused:true,
            showFocusedAsOver:true,

            menuButtonImage:"[SKIN]menu_button.png",
            menuButtonImageUp:"[SKIN]menu_button_up.png",
            iconWidth:7,
            iconHeight:4
        });
    }

	if (isc.SelectionTreeMenu) {
		isc.SelectionTreeMenu.addProperties({
			showIcons:false,
			showKeys:false,
            bodyStyleName:"treeMenuBody",
            bodyBackgroundColor:null
		});
	}

//----------------------------------------
// 11) Hovers
//----------------------------------------
    if (isc.Hover) {
        isc.addProperties(isc.Hover.hoverCanvasDefaults, {
            showShadow:false,
            shadowDepth:5
        })
    }


//----------------------------------------
// 12) ListGrids
//----------------------------------------
    if (isc.ListGrid) {
        isc.ListGrid.addProperties({
            alternateBodyStyleName:null,
            alternateRecordStyles:true,
            backgroundColor:null,
            bodyBackgroundColor:null,
            bodyStyleName:"gridBody",
            cellHeight:22,
            checkboxFieldImageHeight:13,
            checkboxFieldImageWidth:13,
            editFailedCSSText:"color:FF6347;",
            errorIconSrc:"[SKINIMG]actions/exclamation.png",
            expansionFieldFalseImage:"[SKINIMG]/ListGrid/row_collapsed.png",
            expansionFieldTrueImage:"[SKINIMG]/ListGrid/row_expanded.png",
            groupIcon:"[SKINIMG]/ListGrid/group.png",
            groupIconPadding:3,
            groupLeadingIndent:1,
            headerBackgroundColor:null,
            headerBarStyle:"headerBar",
            headerBaseStyle:"imgHeaderButton",
            headerHeight:23,
            headerMenuButtonConstructor:"HeaderMenuButton",
            headerMenuButtonIcon:"[SKINIMG]/ListGrid/sort_descending.png",
            headerMenuButtonIconHeight:6,
            headerMenuButtonIconWidth:9,
            headerMenuButtonWidth:17,
            headerTitleStyle:"headerTitle",
            normalCellHeight:22,
            showHeaderMenuButton:true,
            sortAscendingImage:{src:"[SKIN]sort_ascending.png", width:9, height:6},
            sortDescendingImage:{src:"[SKIN]sort_descending.png", width:9, height:6},
            summaryRowHeight: 24, // should be cellHeight + top/bottom borders
            summaryRowStyle:"gridSummaryCell",
			tallBaseStyle:"tallCell"
        });

        isc.ListGrid.changeDefaults("sorterDefaults", {
            baseStyle:"sorterButton",
            showRollOver:false
        });

        isc.ListGrid.changeDefaults("headerButtonDefaults", {
            showDown:false,
            showFocused:false
        });

        isc.ListGrid.changeDefaults("headerMenuButtonDefaults", {
            showDown:false
        });

        isc.ListGrid.changeDefaults("summaryRowDefaults", {
            bodyBackgroundColor:null,
            bodyStyleName:"summaryRowBody"
        });
    }

   if (isc.TreeGrid) {
        isc.TreeGrid.addProperties({
            alternateRecordStyles : false,
			tallBaseStyle: "treeTallCell",
			normalBaseStyle: "treeCell",
            applyRowNumberStyle:false,
            openerImage:"[SKIN]opener.png",
            sortAscendingImage:{src:"[SKINIMG]ListGrid/sort_ascending.png", width:9, height:6},
            sortDescendingImage:{src:"[SKINIMG]ListGrid/sort_descending.png", width:9, height:6}
        })
    }

    if (isc.MultiSortPanel) {
        isc.MultiSortPanel.changeDefaults("levelUpButtonDefaults", {
			src: "[SKINIMG]TransferIcons/up.png",
            height: 22,
            width: 24
		});
        isc.MultiSortPanel.changeDefaults("levelDownButtonDefaults", {
			src: "[SKINIMG]TransferIcons/down.png",
            height: 22,
            width: 24
		});
    }
//----------------------------------------
// 13) TreeGrids
//----------------------------------------
    if (isc.TreeGrid) {
        isc.TreeGrid.addProperties({
			openerIconSize: 22,
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
        defaultIconSrc:"[SKIN]/DynamicForm/default_formItem_icon.png",
        errorIconSrc : "[SKINIMG]actions/exclamation.png",
        iconHeight:18,
        iconWidth:18,
        iconVAlign:"middle"

    })}

	if (isc.TextItem) {
		if (isc.minimalistTextControlAppearance) {
			
			isc.TextItem.addProperties({
				height:22,
				showFocused:true,
				textBoxStyle:"textItemLite"
			});
		
		} else {
			isc.TextItem.addProperties({
				height:22,
				showFocused:true
			});
		}
	}
	
	if (isc.TextAreaItem) {
		if (isc.minimalistTextControlAppearance) {
		
			isc.TextAreaItem.addProperties({
				showFocused:true,
				textBoxStyle:"textAreaItemLite"
			});
		
		} else {
			isc.TextAreaItem.addProperties({
				showFocused:true
			});
		}
	}
	if (isc.SelectItem) {
		if (isc.minimalistTextControlAppearance) {
			isc.SelectItem.addProperties({
				showOver:true,
				updateTextBoxOnOver:false,
				updateControlOnOver:true,
				
				height:22,
				pickerIconSrc:"[SKIN]/pickers/comboBoxPickerLite.png",
				pickerIconWidth:16,
				pickerIconHeight:18,
				valueIconSize:12,
				showFocusedPickerIcon:false,
				textBoxStyle:"selectItemLiteText",
				controlStyle:"selectItemLiteControl"
			});
		
		} else {
		
			isc.SelectItem.addProperties({
				textBoxStyle:"selectItemText",
				showFocusedPickerIcon:false,
				pickerIconSrc:"[SKIN]/pickers/comboBoxPicker.png",
				height:22,
				pickerIconWidth:18,
				valueIconSize:12
			})
		}
	}
	
	if (isc.ComboBoxItem) {
		
		if (isc.minimalistTextControlAppearance) {
			
			isc.ComboBoxItem.addProperties({
				showOver:false,
				height:22,
				pendingTextBoxStyle:"selectItemLiteTextPending",
				pickerIconSrc:"[SKIN]/pickers/comboBoxPickerLite.png",
				pickerIconWidth:16,
				pickerIconHeight:18,
				showFocusedPickerIcon:false,
				controlStyle:"selectItemLiteControl",
				textBoxStyle:"selectItemLiteText"
			});
		} else {
			isc.ComboBoxItem.addProperties({
				textBoxStyle:"selectItemText",
				pendingTextBoxStyle:"comboBoxItemPendingText",
				showFocusedPickerIcon:false,
				pickerIconSrc:"[SKIN]/pickers/comboBoxPicker.png",
				height:22,
				pickerIconWidth:18
			})
		}
	}
	
	// used by SelectItem and ComboBoxItem for picklist
    if (isc.ScrollingMenu) {isc.ScrollingMenu.addProperties({
        showShadow:false,
        shadowDepth:5
    })}
    if (isc.DateItem) {
        isc.DateItem.addProperties({
            height:22,
            pickerIconWidth:16,
            pickerIconHeight:14,
            pickerIconSrc:"[SKIN]/DynamicForm/date_control.png"
        })
		if (isc.minimalistTextControlAppearance) {
			isc.DateItem.addProperties({
				textBoxStyle:"textItemLite"
			});
            if (isc.NativeDateItem) {
                isc.NativeDateItem.addProperties({
                    textBoxStyle:"textItemLite"
                });
            }
            if (isc.NativeTimeItem) {
                isc.NativeTimeItem.addProperties({
                    textBoxStyle:"textItemLite"
                });
            }
            if (isc.NativeDatetimeItem) {
                isc.NativeDatetimeItem.addProperties({
                    textBoxStyle:"textItemLite"
                });
            }
		}                
    }
    if (isc.SpinnerItem) {
		if (isc.minimalistTextControlAppearance) {
			isc.SpinnerItem.addProperties({
				height:22,
				textBoxStyle:"textItemLite",
				unstackedTextBoxStyle: "textItemLite"
			});
			
		} else {
			isc.SpinnerItem.addProperties({
				height:22,
				textBoxStyle:"selectItemText"
			});
		}
        isc.SpinnerItem.changeDefaults("increaseIconDefaults", {
            width:16,
            height:11,
            showFocused:true,
            showDown:true,
            imgOnly:true,
            src:"[SKIN]/DynamicForm/spinner_control_increase.png"
        })
        isc.SpinnerItem.changeDefaults("decreaseIconDefaults", {
            width:16,
            height:11,
            showFocused:true,
            showDown:true,
            imgOnly:true,
            src:"[SKIN]/DynamicForm/spinner_control_decrease.png"
        })
    }



    if (isc.PopUpTextAreaItem) {isc.PopUpTextAreaItem.addProperties({
        popUpIconSrc: "[SKIN]/DynamicForm/text_control.gif",
        popUpIconWidth:16,
        popUpIconHeight:16
    })}
    if (isc.ButtonItem && isc.IButton) {isc.ButtonItem.addProperties({
        showFocused:true,
        showFocusAsOver:false,
        buttonConstructor:isc.IButton,
        height:22
    })}

    if (isc.ToolbarItem && isc.IAutoFitButton) {isc.ToolbarItem.addProperties({
        buttonConstructor:isc.IAutoFitButton,
        buttonProperties: {
            autoFitDirection: isc.Canvas.BOTH
        }
    })}

    if(isc.DateRangeDialog) {
        isc.DateRangeDialog.changeDefaults("headerIconProperties", {
            src: "[SKIN]/DynamicForm/date_control.png"
        });
    }
    if (isc.MiniDateRangeItem) {
        isc.MiniDateRangeItem.addProperties({"pickerIconSrc": "[SKIN]/DynamicForm/date_control.png"});
    }


//----------------------------------------
// 15) Drag & Drop
//----------------------------------------
    // drag tracker drop shadow (disabled by default because many trackers are irregular shape)
    //isc.addProperties(isc.EH.dragTrackerDefaults, {
    //    showShadow:false,
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
            edgeSize:3,
            edgeImage: "[SKINIMG]edges/edge.png"
        })
    }


//----------------------------------------
// 17) Sliders
//----------------------------------------
    if (isc.Slider) {
        isc.Slider.addProperties({
            thumbThickWidth:14,
            thumbThinWidth:14,
            trackWidth:5,
            trackCapSize:2,
            thumbSrc:"thumb.png",
            trackSrc:"track.png"
        })
    }

//----------------------------------------
// 18) TileList
//----------------------------------------
    if (isc.TileGrid) {
        isc.TileGrid.addProperties({
            valuesShowRollOver: true,
            styleName:null,
            showEdges:true
        })
    }

// ----------------------------------------
// 19) CubeGrid
//----------------------------------------
    if (isc.CubeGrid) {
        isc.CubeGrid.addProperties({
            bodyStyleName:"cubeGridBody",
            alternateBodyStyleName:"alternateCubeGridBody"
        });
    }

// ----------------------------------------
// 20) FilterBuilder
//----------------------------------------
	if (isc.FilterBuilder) {
		isc.FilterBuilder.changeDefaults("addButtonDefaults", {
			showFocused: false
		});
		isc.FilterBuilder.changeDefaults("removeButtonDefaults", {
			showFocused: false
		});
        isc.FilterBuilder.changeDefaults("topOperatorFormDefaults", {
            width: 92
        });
	}

// -------------------------------------------
// 21) Printing
// -------------------------------------------
    if (isc.Calendar) {
        isc.Calendar.changeDefaults("datePickerButtonDefaults", {
            showDown:false,
            showOver : false,
            src:"[SKIN]/DynamicForm/date_control.png"
        });

        isc.Calendar.changeDefaults("controlsBarDefaults", {
            height:10,
            layoutTopMargin :5
        });
        isc.Calendar.changeDefaults("addEventButtonDefaults", {
            src:"[SKINIMG]actions/plus.png"
        });

    }

// -------------------------------------------
// 22) ToolStrip
// -------------------------------------------
    if(isc.ToolStrip) {
        isc.ToolStrip.addProperties({
            height:30,
            defaultLayoutAlign:"center",
			verticalStyleName:"toolStripVertical"
        })
    }

// -------------------------------------------
// ExampleViewPane - used in the feature explorer
// -------------------------------------------
    if (isc.ExampleViewPane) {
        isc.ExampleViewPane.addProperties({
            styleName:"normal"
        });
    }

    // specify where the browser should redirect if not supported
    isc.Page.checkBrowserAndRedirect("[SKIN]/unsupported_browser.html");

    } // end useCSS3 else block





    isc.Canvas.setProperties({
        // this skin uses custom scrollbars
        groupBorderCSS: "1px solid #165fa7",
        showCustomScrollbars: true
    });

//----------------------------------------
// 1) Scrollbars
//----------------------------------------
    isc.Canvas.addProperties({
        scrollbarSize:16
    });

    if (isc.SpritedScrollbar && useSpriting) {
        isc.Canvas.addProperties({
            scrollbarConstructor: "SpritedScrollbar"
        });
        isc.SpritedScrollbar.changeDefaults("startImg", {
            name: "blank1",
            baseStyleKey: "vertical",
            baseStyleMap: {
                "true": "vScrollStart",
                "false": "hScrollStart"
            },
            baseStyle:"scrollStart"
        });
        isc.SpritedScrollbar.changeDefaults("endImg", {
            name: "blank10",
            baseStyleKey: "vertical",
            baseStyleMap: {
                "true": "vScrollEnd",
                "false": "hScrollEnd"
            },
            baseStyle:"scrollEnd"
        });
    }

//----------------------------------------
// 3) Resizebars
//----------------------------------------

    isc.Layout.addProperties({
        resizeBarSize: 5,
        resizeBarClass: "Snapbar"
    });
    isc.overwriteClass("LayoutResizeBar", "LayoutResizeSnapbar");

//----------------------------------------
// 4) Sections & NavigationBar
//----------------------------------------
    if (isc.MiniNavControl) {
        isc.MiniNavControl.addProperties({
            src: isc.Browser.isIPhone ? "[SKIN]/miniNav.svg" : "[SKIN]/miniNav~2.png",
            showDisabled: true,
            upButtonSrc: null,
            downButtonSrc: null
        });
    }
    if (isc.NavigationBar) {
        isc.NavigationBar.addProperties({
            skinUsesCSSTransitions: true,
            leftButtonIcon: "[SKINIMG]NavigationBar/back_arrow~2.png"
        });
        isc.NavigationBar.changeDefaults("leftButtonDefaults", {
            iconWidth: 14,
            iconHeight: 24,
            iconSpacing: 7,
            showRTLIcon: true
        });
        isc.NavigationBar.changeDefaults("titleLabelDefaults", {
            margin: 0
        });

        if (isc.Browser.isIPhone || isc.Browser.isIPad) {
            isc.NavigationBar.addProperties({
                leftButtonIcon: "[SKINIMG]NavigationBar/back_arrow.svg"
            });
        }
    }
    if (isc.NavigationButton) {
        isc.NavigationButton.addProperties({
            padding: 0,
            showDown: true,
            showDownIcon: true
        });
    }

//----------------------------------------
// 6) TabSets
//----------------------------------------
    if (isc.TabBar) {
        isc.TabBar.addProperties({
            baseLineThickness: 3
        });
        isc.TabBar.changeDefaults("baseLineDefaults", {
            _constructor: "Canvas",
            backgroundColor: "#767F92"
        });
        isc.TabBar.changeDefaults("tabDefaults", {
            showFocusOutline: false
        });
    }

//----------------------------------------
// 9) Pickers
//----------------------------------------
    if (isc.ColorItem) {
                isc.ColorItem.addProperties({
            showEmptyPickerIcon: true
        });
        isc.ColorItem.changeDefaults("pickerIconDefaults", {
            showRTL: true
        });
    }

//----------------------------------------
// 10) Menus
//----------------------------------------
    if (isc.Menu) {
        isc.Menu.addProperties({
            styleName: "menuBorder",
            iconFillSpaceStyleName: "menuFill"
        });
    }

//----------------------------------------
// 12) ListGrids
//----------------------------------------
    if (isc.ListGrid) {
        isc.ListGrid.addProperties({
            expansionFieldImageShowRTL: true
        });

        if (useSpriting) {
            isc.ListGrid.addProperties({
                booleanBaseStyle: "checkbox",
                booleanTrueImage: "blank",
                booleanFalseImage: "blank",
                booleanPartialImage: "blank",
                printBooleanBaseStyle: "printCheckbox",
                printBooleanTrueImage: "[SKINIMG]/DynamicForm/checked.png",
                printBooleanFalseImage: "[SKINIMG]/DynamicForm/unchecked.png",
                printBooleanPartialImage: "[SKINIMG]/DynamicForm/partialcheck.png",
                booleanImageWidth: 13,
                booleanImageHeight: 13
            });

            // TreeGrid does not support booleanBaseStyle.
            if (isc.TreeGrid) {
                isc.TreeGrid.addProperties({
                    booleanTrueImage: "[SKINIMG]/DynamicForm/checked.png",
                    booleanFalseImage: "[SKINIMG]/DynamicForm/unchecked.png",
                    booleanPartialImage: "[SKINIMG]/DynamicForm/partialcheck.png"
                });
            }
        }
    }

//----------------------------------------
// 14) Form controls
//----------------------------------------
    if (isc.FormItem) {
        isc.FormItem.addProperties({
            showRTL: true
        });
    }

    if (isc.CheckboxItem) {
        isc.CheckboxItem.addProperties({
            checkedImage: "[SKINIMG]/DynamicForm/checked.png",
            uncheckedImage: "[SKINIMG]/DynamicForm/unchecked.png",
            unsetImage: "[SKINIMG]/DynamicForm/unsetcheck.png",
            partialSelectedImage: "[SKINIMG]/DynamicForm/partialcheck.png",
            valueIconWidth: 13,
            valueIconHeight: 13,
            showValueIconOver: false,
            showValueIconFocused: false
        });
        if (useSpriting) {
            isc.CheckboxItem.addProperties({
                checkedImage: "blank",
                uncheckedImage: "blank",
                unsetImage: "blank",
                partialSelectedImage: "blank",
                booleanBaseStyle: "checkbox",
                printCheckedImage: "[SKINIMG]/DynamicForm/checked.png",
                printUncheckedImage: "[SKINIMG]/DynamicForm/unchecked.png",
                printUnsetImage: "[SKINIMG]/DynamicForm/unsetcheck.png",
                printPartialSelectedImage: "[SKINIMG]/DynamicForm/partialcheck.png",
                printBooleanBaseStyle: "printCheckbox"
            });
        }
    }

    if (isc.ComboBoxItem) {
        isc.ComboBoxItem.addProperties({
            pickListTallBaseStyle: "tallPickListCell",
            showFocusedPickerIcon: false
        });
        isc.ComboBoxItem.changeDefaults("pickerIconDefaults", {
            showOver: true,
            showRTL: true
        });
        isc.ComboBoxItem.changeDefaults("separateValuesListDefaults", {
            showOverAsSelected: false
        });
        if (useSpriting) {
            isc.ComboBoxItem.addProperties({
                pickerIconSrc: "blank",
                pickerIconStyle: "comboBoxItemPickerCell"
            });
			if (isc.minimalistTextControlAppearance) {
				isc.ComboBoxItem.changeDefaults("pickerIconDefaults", {
					baseStyle: "comboBoxItemPickerLite"
				});
			} else {
				isc.ComboBoxItem.changeDefaults("pickerIconDefaults", {
					baseStyle: "comboBoxItemPicker"
				});
			}
        }
        if (!isc.Browser.isIE || isc.Browser.isIE11) {
            isc.ComboBoxItem.changeDefaults("pickerSearchFormDefaults", {
                height: 30
            });
            isc.ComboBoxItem.changeDefaults("pickerSearchFieldDefaults", {
                textBoxStyle: "pickerSearchBox",
                icons: [{
                    name: "search",
                    inline: true,
                    imgOnly: true,
                    src: "[SKINIMG]DynamicForm/search_icon~2.png",
                    width: 14,
                    height: 15,
                    showRTL: true,
                    click : function (form, item, icon) {
                        item.focusInItem();
                    }
                }]
            });
        }
    }

    if (isc.MultiComboBoxItem) {
        isc.MultiComboBoxItem.addProperties({
            pendingButtonStyle: useCSS3 ? "buttonRoundedPending" : "stretchImgButtonPending",
            deselectedButtonStyle: useCSS3 ? "buttonRoundedDeselected" : "stretchImgButtonDeselected"
        });
        isc.MultiComboBoxItem.changeDefaults("buttonDefaults", {
            icon: "[SKIN]DynamicForm/drop.png",
            iconWidth: 12,
            iconHeight: 12,
            iconSize: 12
        });
    }

    if (isc.PickListMenu) {
        isc.PickListMenu.addProperties({
            showOverAsSelected: false
        });
    }

    if (isc.PickTreeItem) {
        isc.PickTreeItem.addProperties({
            pendingButtonStyle: "menuButtonPending"
        });
        isc.PickTreeItem.changeDefaults("buttonDefaults", {
            height: 21
        });
    }

    if (isc.SelectItem) {
        isc.SelectItem.addProperties({
            pickListTallBaseStyle: "tallPickListCell",
            showFocusedPickerIcon: false
        });
        isc.SelectItem.changeDefaults("pickerIconDefaults", {
            showOver: true,
            showRTL: true
        });
        isc.SelectItem.changeDefaults("separateValuesListDefaults", {
            showOverAsSelected: false
        });
        if (useSpriting) {
            isc.SelectItem.addProperties({
                pickerIconSrc: "blank",
                pickerIconStyle: "comboBoxItemPickerCell"
            });
			if (isc.minimalistTextControlAppearance) {
				isc.SelectItem.changeDefaults("pickerIconDefaults", {
					baseStyle: "comboBoxItemPickerLite"
				});
			
			} else {
				isc.SelectItem.changeDefaults("pickerIconDefaults", {
					baseStyle: "comboBoxItemPicker"
				});
			}        }
    }

    if (isc.SpinnerItem) {
        isc.SpinnerItem.changeDefaults("increaseIconDefaults", {
            width:16,
            height:11,
            showOver:true,
            showFocused:true,
            showFocusedWithItem:false,
            showRTL:true
        });
        isc.SpinnerItem.changeDefaults("decreaseIconDefaults", {
            width:16,
            height:11,
            showOver:true,
            showFocused:true,
            showFocusedWithItem:false,
            showRTL:true
        });

        isc.SpinnerItem.changeDefaults("unstackedIncreaseIconDefaults", {
            src: "[SKIN]/DynamicForm/unstacked_spinner_plus.png",
            width: 36,
            height: 22,
            showFocused: true,
            showRTL: true
        });
        isc.SpinnerItem.changeDefaults("unstackedDecreaseIconDefaults", {
            src: "[SKIN]/DynamicForm/unstacked_spinner_minus.png",
            width: 36,
            height: 22,
            showFocused: true,
            showRTL: true
        });

        if (useSpriting) {
            isc.SpinnerItem.changeDefaults("increaseIconDefaults", {
                src:"blank",
                baseStyle:"spinnerItemIncrease"
            });
            isc.SpinnerItem.changeDefaults("decreaseIconDefaults", {
                src:"blank",
                baseStyle:"spinnerItemDecrease"
            });

            isc.SpinnerItem.changeDefaults("unstackedIncreaseIconDefaults", {
                src: "blank",
                baseStyle: "unstackedSpinnerItemIncrease"
            });
            isc.SpinnerItem.changeDefaults("unstackedDecreaseIconDefaults", {
                src: "blank",
                baseStyle: "unstackedSpinnerItemDecrease"
            });
        }
    }

    if (isc.RelativeDateItem) {
        isc.RelativeDateItem.changeDefaults("pickerIconDefaults", {
            neverDisable: false,
            src: "[SKIN]/DynamicForm/date_control.png"
        });
    }

    if (isc.RichTextEditor) {
        isc.RichTextEditor.addProperties({
            showEdges:false,
            styleName:"richTextEditorBorder"
        });
    }

//----------------------------------------
// 17) Sliders
//----------------------------------------
    if (isc.Slider) {
        isc.Slider.changeDefaults("rangeLabelDefaults", {
            showDisabled: true
        });
        isc.Slider.changeDefaults("valueLabelDefaults", {
            showDisabled: true
        });
    }

// -------------------------------------------
// 21) Printing
// -------------------------------------------
    if (isc.PrintWindow) {
        isc.PrintWindow.changeDefaults("printButtonDefaults", {
            height: 17
        });
    }

// -------------------------------------------
// 23) SplitPane
// -------------------------------------------
    if (isc.SplitPanePagedPanel) {
        isc.SplitPanePagedPanel.addProperties({
            skinUsesCSSTransitions: true
        });
    }
    if (isc.SplitPaneSidePanel) {
        isc.SplitPaneSidePanel.addProperties({
            skinUsesCSSTransitions: true
        });
    }
    if (isc.SplitPane) {
        isc.SplitPane.changeDefaults("backButtonDefaults", {
            icon: "[SKINIMG]NavigationBar/back_arrow~2.png",
            iconWidth: 14,
            iconHeight: 24,
            iconSpacing: 7,
            showRTLIcon: true
        });
        if (isc.Browser.isIPhone || isc.Browser.isIPad) {
            isc.SplitPane.changeDefaults("backButtonDefaults", {
                icon: "[SKINIMG]NavigationBar/back_arrow.svg"
            });
        }

        isc.SplitPane.changeDefaults("detailTitleLabelDefaults", {
            baseStyle: "detailPaneTitle"
        });
        isc.SplitPane.changeDefaults("listTitleLabelDefaults", {
            baseStyle: "listPaneTitle"
        });
    }

// -------------------------------------------
// 24) Drawing
// -------------------------------------------
    if (isc.Gauge) {
        isc.Gauge.addProperties({
            fontSize: 11
        });
        isc.Gauge.changeDefaults("valueLabelDefaults", {
            fontFamily: "Arial",
            fontWeight: "normal",
            lineColor: "#000000"
        });
    }


    if (isc.TourWindow) {
        isc.TourWindow.addProperties({
            // covers some text that sits in the background 
            layoutLeftMargin:0
        });
    }

    isc.Class.modifyFrameworkDone();
}   // end loadSkin()

isc.loadSkin()

