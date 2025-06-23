<!doctype html>
<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>

<html>
<head><title>
        Theme Editor PreviewPane
</title>
</head>

<body style="overflow:hidden;">

<!-- preload material-icons -->
<link rel="preload" as="font" href="https://fonts.gstatic.com/s/materialicons/v81/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2" type="font/woff2" crossorigin="anonymous">

<%
String skin = request.getParameter("theme");
if (skin == null || "".equals(skin)) skin = "Tahoe";

String skinToolsDir = request.getRequestURI();
skinToolsDir = skinToolsDir.replaceFirst("[^\\/]*$", "");

String isomorphicURI = (String)request.getAttribute("isomorphicURI");
if (isomorphicURI != null) skinToolsDir = isomorphicURI + "../tools/skinTools/";

String locationDir = skinToolsDir + "../visualBuilder/sampleDS";

if (isomorphicURI != null) {
%>
<isomorphic:loadModules isomorphicURI="<%=isomorphicURI%>" modulesDir="system/development/" 
                        includeModules="RichTextEditor,FileLoader,Analytics,Calendar,SkinUtil,Tools,Charts"/>
<%
} else {
%>
<isomorphic:loadModules modulesDir="system/development/" 
                        includeModules="RichTextEditor,FileLoader,Analytics,Calendar,SkinUtil,Tools,Charts"/>
<%
}
%>
<script>

<isomorphic:loadDS ID='registeredFonts' />

// disallow this iframe from stealing focus from main app - this hurts user workflow
window.isc_suppressFocus = true; 

var skin = "<%=skin%>";

var skinPath = isc.Page.getIsomorphicDir() + "skins/" + skin;
if (!isc.Browser.isIE) {
    isc.FileLoader.loadCSSFile(skinPath + "/skin_styles_editor.css");
} else {
    isc.FileLoader.loadCSSFile(skinPath + "/skin_styles.css");
}
isc.FileLoader.markSkinCSSLoaded(skin);
isc.FontLoader.loadRegisteredFonts();
isc.FileLoader.loadSkinJS(skin, function () {
    // apply density changes
    if (isc.params && isc.params.density) {
        var density = isc.Canvas.skinDensityMap[isc.params.density];
        if (density != null) {
            // do the size increase here - the font-increase is special for this use-case,
            // applied in a custom fashion in skinEditor.jsp
            if (density.fontIncrease != null) {
                //isc.Canvas.resizeTextPadding(null, density.fontIncrease);
            }
            if (density.sizeIncrease != null) {
                // we want icon-sizes to scale up for "controls" relationships
                isc.Canvas.autoResizeIcons = true;
                isc.Canvas.resizeControls(density.sizeIncrease);

                // Skin Editor doesn't use Canvas.resizefonts() to scale fonts - but we still
                // want the framework to think fonts have been scaled officially, so that
                // SVGs can use the fontIncrease to auto-scale sizes from src-strings
                isc.Canvas.fontIncrease = density.fontIncrease;

                // we don't want to scale fonts themselves, but we do want to scale 
                // icon-sizes for "fonts" relationships
                isc.Canvas.resizeIcons("fonts", density.fontIncrease);
            }
        }
    }
    // onload handler
    startUtil();
});

function unloadSkinStyles () {
    var ssHandler = isc.StyleSheetHandler.create({});
    ssHandler.loadSkinStyleSheet(true);
    if (ssHandler.styleSheet) {
        ssHandler.unload();
    }
    ssHandler.destroy();
}

//isc.parseSkinURLParams(4, 2);
function showPane(paneName, backgroundColor) {
    // make sure the dataSources have been loaded if this method runs after changing density
    var ds = isc.DS.get("sp_employee");
    if (!ds) isc.createSkinEditorDataSources();
    
    var methodName = "get" + paneName + "Pane";
    var pane = isc[methodName]();
    if (pane == null) isc.say("Unknown preview type: " + paneName);
    if (window.currentPane) window.currentPane.hide();
    window.currentPane = pane;
    if (backgroundColor) window.currentPane.setBackgroundColor(backgroundColor);
    // re-apply disabled state
    if (window.window.currentDisabledState != null) showDisabledState(window.currentDisabledState);
    window.currentPane.show();
        var layout = window.currentPane;
    if (!isc.isA.FlowLayout(layout)) layout = layout.getMember(1);
    if (layout.reLayout) layout.reLayout();
    if (this.paneChangedCallback) this.paneChangedCallback(window.currentPane);
}
function showDisabledState(disable) {
    window.currentDisabledState = disable;
    isc.Menu.hideAllMenus();
    if (window.currentPane) window.currentPane.setDisabled(disable);
}
function startUtil () {
    if (isc.params.startView) showPane(isc.params.startView, isc.params.bgColor);
    if (window.parent && window.parent.appState && window.parent.appState.previewLoadComplete) {
        // let the themeEditor know the preview has finished loading (styles can be changed)
        window.parent.appState.previewLoadComplete();
        // allow the previewPane to take focus again
        window.isc_suppressFocus = false; 
    }
}
window.onbeforeunload = function () {
    window.currentPane = null;
    isc.FontLoader.unloadRegisteredFonts();
};

</script>

</body></html>
<%@ page import="com.isomorphic.util.*" %>