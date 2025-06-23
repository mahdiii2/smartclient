<!doctype html>
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>

<html>
<head><title>
        Skin Tester
</title>
</head>

<body style="overflow:hidden;">

<!-- preload material-icons -->
<link rel="preload" as="font" href="https://fonts.gstatic.com/s/materialicons/v81/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2" type="font/woff2" crossorigin="anonymous">

<!-- get the skin from the URL -->
<%
String skin = request.getParameter("skin");
if (skin == null || "".equals(skin)) skin = "Tahoe";
%>

<isomorphic:loadISC includeModules="RichTextEditor,FileLoader,Analytics,Calendar,SkinUtil,Tools,Charts" skin="<%=skin%>" />

<script>

<isomorphic:loadDS ID='registeredFonts' />

// ============================================================================================
// This tool is a simple helper that shows many framework widgets at one time and enables 
// external CSS and JavaScript to be tested against a user-skin created in the Skin Editor, 
// while still being able to continue editing the SASS templated part of the skin in the 
// Skin Editor.  See comments below to understand how to wire this custom code into your 
// skin proper, so it's available in your projects and applications.
// 
// If your Skin Editor is in a different environment (ie, it's online), export your skin with 
// its latest changes and extract it into your local skins directory.  If your Skin Editor is 
// local, you don't need to export your skin at this point - as you make changes in the Skin 
// Editor, just save them and then refresh your skinTester page.  
//
// USAGE 
// - pass the name of your custom skin in the URL: skinTester.jsp?skin=yourCustomSkinName
// - you can also specify density in the URL, by setting sizeIncrease and fontIncrease to 
//   integer values, like &sizeIncrease=6&fontIncrease=2
//
// Make custom JS and CSS changes in the ./custom.js and ./custom.css files in the same dir as 
// this file and refresh the skinTester page to see your changes applied.
//
// When you're happy with your custom JS and CSS changes, you can apply them to your skin.  To  
// do this, the skin needs to exist on disk - so, if you haven't already, first export the skin 
// to a zip using the Skin Editor's "Export" button and extract it to your skins directory - then:
//
// 1) copy the custom.js content to your skin's load_skin.js, inserting it right before the 
// call to isc.Class.modifyFrameworkDone() at the bottom of the loadSkin function.
// 
// 2) copy your custom.css file to your skin directory.  Custom CSS overrides the CSS in the 
// skin's skin_styles.css, so your custom file must be loaded after that file.  In load_skin.js, 
// find the code that loads skin_styles.css and, in its callback right before 
// isc.FontLoader.loadCustomFonts() is called, add a call to load your custom CSS file, 
// something like:
//
// var cssLoaded = isc.Page.loadStyleSheet("[SKIN]/skin_styles.css", theWindow, 
//                 "isc.Page.loadStyleSheet('[SKIN]/custom.css', theWindow); isc.FontLoader.loadCustomFonts()");
//
// 3) if you want to apply a framework-wide "density", which resizes widgets and fonts 
// consistently across your application, that needs to be done after all of your 
// JS and CSS modifications have been applied.  You can call isc.Canvas.resizeControls() 
// and resizeFonts() right before isc.Class.modifyFrameworkDone() is called at the bottom of 
// the loadSkin() function.
//
// Once those changes are made, you can make further custom changes directly in your skin dir,
// where you can test them against your projects, or continue to use this tool and copy your 
// changes over manually.
// ============================================================================================


// make sure the dataSources used by the Skin Editor Preview Pane have been loaded
var ds = isc.DS.get("sp_employee");
if (!ds) isc.createSkinEditorDataSources();

// these are the names of panes with test components, from the Skin Editor Preview
var paneNames = ["Grids", "FormItems", "Buttons", "Widgets", "Tabs", "Windows", "Calendars", "Timelines"];

// add CubeGrid and Charts panes if those widgets are available
if (isc.CubeGrid) paneNames.add("Cubes");
if (isc.FacetChart) paneNames.add("Charts");

// main layout
var layout;

// load the custom CSS file
isc.FileLoader.loadCSSFile("custom.css");

// load the custom JS file and then start the utility
isc.FileLoader.loadJSFile(["./custom.js"], function () { startUtil(); });

// if you want to apply density, it must be applied after all CSS and JavaScript have been 
// loaded, but before any widgets are created.  You can set sizeIncrease and fontIncrease  
// values here manually, or pass them in the URL, and code in the startUtil() method below will 
// pick up and apply the settings.
var sizeIncrease = null;
var fontIncrease = null;

function startUtil () {
    // if sizeIncrease or fontIncrease were specified above or passed in the URL, apply them 
    // now, before creating any widgets.
    sizeIncrease = sizeIncrease || isc.params.sizeIncrease;
    fontIncrease = fontIncrease || isc.params.fontIncrease;
    // To apply these density settings permanently to your skin, make calls to resizeControls() 
    // and resizeFonts() in your load_skin.js, as the very last code, right before 
    // isc.Class.modifyFrameworkDone() is called.
    if (sizeIncrease) isc.Canvas.resizeControls(parseInt(sizeIncrease));
    if (fontIncrease) isc.Canvas.resizeFonts(parseInt(fontIncrease));

    // draw a bunch of widgets on-screen, all the Test Panes from the Skin Editor - the following 
    // does not demonstrate efficient code, but rather creates and draws a wide array of widgets 
    // all at once in order to show an overview of the styles across various widgets and states
    var layout = isc.VLayout.create({ ID: "mainLayout", width: "100%", height: "100%", 
        overflow: "auto", membersMargin: 50 });

    for (var i=0; i<paneNames.length; i++) {
        var methodName = "get" + paneNames[i] + "Pane";
        var pane = isc[methodName]();
        pane.setHeight(1);
        pane.setOverflow("visible");
        pane.moveTo(-10000, -10000);
        if (!pane.isDrawn()) pane.draw();
        pane.show();
        layout.addMember(pane);
        if (paneNames[i] == "FormItems") {
            // force the FormItems pane to resize to content
            pane.getMember(1).setHeight(1);
            pane.getMember(1).setOverflow("visible");
            pane.reflowNow();
        }
    }
}

</script>

</body></html>
<%@ page import="com.isomorphic.util.*" %>