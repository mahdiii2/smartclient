/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Img, Menu, MenuButton, MenuItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onVisibleCheckIf = function(target,menu,item) {return widget.isVisible()};
let onVisibleClick = function(target,item,menu,colNum) {return widget.isVisible() ? widget.animateHide('fade') : widget.animateShow('fade')};
let onSizeEnableIf = function(target,menu,item) {return widget.isVisible()};
let onSmallCheckIf = function(target,menu,item) {return widget.width == 50};
let onSmallClick = function(target,item,menu,colNum) {return widget.animateResize(50,50)};
let onMediumCheckIf = function(target,menu,item) {return widget.width == 100};
let onMediumClick = function(target,item,menu,colNum) {return widget.animateResize(100,100)};
let onLargeCheckIf = function(target,menu,item) {return widget.width == 200};
let onLargeClick = function(target,item,menu,colNum) {return widget.animateResize(200,200)};
let onMoveEnableIf = function(target,menu,item) {return widget.isVisible()};
let onUpClick = function(target,item,menu,colNum) {return widget.animateMove(widget.getLeft(),widget.getTop()-20)};
let onRightClick = function(target,item,menu,colNum) {return widget.animateMove(widget.getLeft()+20,widget.getTop())};
let onDownClick = function(target,item,menu,colNum) {return widget.animateMove(widget.getLeft(),widget.getTop()+20)};
let onLeftClick = function(target,item,menu,colNum) {return widget.animateMove(widget.getLeft()-20,widget.getTop())};
let onResetClick = function(target,item,menu,colNum) {widget.animateRect(200,75,100,100);widget.animateShow('fade')};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <MenuButton menu="mainMenu" title="Widget" ID="mainMenuButton" width="150"/>

        <Img src="[SAMPLE]other/yinyang.gif" title="widget" width="100" height="100" ID="widget" left="200" top="75">
            <contextMenu ID="mainMenu" width="150">
                <data>
                    <MenuItem title="Visible" checkIf={onVisibleCheckIf} click={onVisibleClick}/>
                    <MenuItem isSeparator="true"/>
                    <MenuItem title="Size" enableIf={onSizeEnableIf}>
                        <submenu ID="sizeMenu" width="150" autoDraw="false">
                            <data>
                                <MenuItem title="Small" checkIf={onSmallCheckIf} click={onSmallClick}/>
                                <MenuItem title="Medium" checkIf={onMediumCheckIf} click={onMediumClick}/>
                                <MenuItem title="Large" checkIf={onLargeCheckIf} click={onLargeClick}/>
                            </data>
                        </submenu>
                    </MenuItem>
                    <MenuItem title="Move" enableIf={onMoveEnableIf}>
                        <submenu ID="moveMenu" width="150" autoDraw="false">
                            <data>
                                <MenuItem title="Up" click={onUpClick}/>
                                <MenuItem title="Right" click={onRightClick}/>
                                <MenuItem title="Down" click={onDownClick}/>
                                <MenuItem title="Left" click={onLeftClick}/>
                            </data>
                        </submenu>
                    </MenuItem>
                    <MenuItem isSeparator="true"/>
                    <MenuItem title="Reset" icon="[SAMPLE]other/yinyang.gif" iconWidth="20" iconHeight="20" click={onResetClick}/>
                </data>
            </contextMenu>
        </Img>
    </>,
    document.getElementById(target)
);
