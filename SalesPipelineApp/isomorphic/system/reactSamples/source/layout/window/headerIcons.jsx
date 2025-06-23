import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ImgButton, Window, TileLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

const CustomImgButton = SC.defineClass("CustomImgButton", ImgButton);
isc.CustomImgButton.addProperties({
    width:16,
    height:14,
    autoDraw:false,
    layoutAlign:"center",
    showDown:false,
    showRollOver:true,
    click:function () {
        isc.say("Control " + this.src + " clicked");
        return false;
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <TileLayout tileWidth="200" tileHeight="150" width="100%" height="100%" tilesPerLine="3"
            tiles={[
                <Window width="200" height="150" title="Title" 
                    headerControls={[
                    "headerLabel", 
                    <CustomImgButton ID="arrowDown" src="[SKIN]/headerIcons/arrow_down.png"/>, 
                    <CustomImgButton ID="arrowLeft" src="[SKIN]/headerIcons/arrow_left.png"/>, 
                    <CustomImgButton ID="arrowRight" src="[SKIN]/headerIcons/arrow_right.png"/>, 
                    <CustomImgButton ID="arrowUp" src="[SKIN]/headerIcons/arrow_up.png"/>, 
                    <CustomImgButton ID="calculator" src="[SKIN]/headerIcons/calculator.png"/>, 
                    <CustomImgButton ID="cart" src="[SKIN]/headerIcons/cart.png"/>]}/>,
                <Window width="200" height="150" title="Title" 
                    headerControls={["headerLabel", 
                    <CustomImgButton ID="cascade" src="[SKIN]/headerIcons/cascade.png"/>, 
                    <CustomImgButton ID="clipboard" src="[SKIN]/headerIcons/clipboard.png"/>, 
                    <CustomImgButton ID="clock" src="[SKIN]/headerIcons/clock.png"/>, 
                    <CustomImgButton ID="close" src="[SKIN]/headerIcons/close.png"/>, 
                    <CustomImgButton ID="comment" src="[SKIN]/headerIcons/comment.png"/>, 
                    <CustomImgButton ID="document" src="[SKIN]/headerIcons/document.png"/>]}/>,
                <Window width="200" height="150" title="Title" 
                    headerControls={["headerLabel", 
                    <CustomImgButton ID="doubleArrowDown" src="[SKIN]/headerIcons/double_arrow_down.png"/>, 
                    <CustomImgButton ID="doubleArrowLeft" src="[SKIN]/headerIcons/double_arrow_left.png"/>, 
                    <CustomImgButton ID="doubleArrowRight" src="[SKIN]/headerIcons/double_arrow_right.png"/>, 
                    <CustomImgButton ID="doubleArrowUp" src="[SKIN]/headerIcons/double_arrow_up.png"/>, 
                    <CustomImgButton ID="favourite" src="[SKIN]/headerIcons/favourite.png"/>, 
                    <CustomImgButton ID="find" src="[SKIN]/headerIcons/find.png"/>]}/>,
                <Window width="200" height="150" title="Title" 
                    headerControls={["headerLabel", 
                    <CustomImgButton ID="home" src="[SKIN]/headerIcons/home.png"/>, 
                    <CustomImgButton ID="mail" src="[SKIN]/headerIcons/mail.png"/>, 
                    <CustomImgButton ID="minus" src="[SKIN]/headerIcons/minus.png"/>, 
                    <CustomImgButton ID="plus" src="[SKIN]/headerIcons/plus.png"/>, 
                    <CustomImgButton ID="maximize" src="[SKIN]/headerIcons/maximize.png"/>, 
                    <CustomImgButton ID="minimize" src="[SKIN]/headerIcons/minimize.png"/>]}/>,
                <Window width="200" height="150" title="Title" 
                    headerControls={["headerLabel", 
                    <CustomImgButton ID="person" src="[SKIN]/headerIcons/person.png"/>, 
                    <CustomImgButton ID="pinDown" src="[SKIN]/headerIcons/pin_down.png"/>, 
                    <CustomImgButton ID="pinLeft" src="[SKIN]/headerIcons/pin_left.png"/>, 
                    <CustomImgButton ID="print" src="[SKIN]/headerIcons/print.png"/>, 
                    <CustomImgButton ID="refresh" src="[SKIN]/headerIcons/refresh.png"/>, 
                    <CustomImgButton ID="help" src="[SKIN]/headerIcons/help.png"/>]}/>,
                <Window width="200" height="150" title="Title" 
                    headerControls={["headerLabel", 
                    <CustomImgButton ID="refreshThin" src="[SKIN]/headerIcons/refresh_thin.png"/>, 
                    <CustomImgButton ID="save" src="[SKIN]/headerIcons/save.png"/>, 
                    <CustomImgButton ID="settings" src="[SKIN]/headerIcons/settings.png"/>, 
                    <CustomImgButton ID="transfer" src="[SKIN]/headerIcons/transfer.png"/>, 
                    <CustomImgButton ID="trash" src="[SKIN]/headerIcons/trash.png"/>, 
                    <CustomImgButton ID="zoom" src="[SKIN]/headerIcons/zoom.png"/>]}/>
            ]}/>
        
    </>,
    document.getElementById(target)
);
