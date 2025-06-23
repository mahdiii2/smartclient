
// this is the SVG file containing the <symbol> tags used in this sample
var spriteFile = "[ISOMORPHIC]system/reference/inlineExamples/svg/mediaPlayer.svg";
// the special prefix "sprite:svg:" causes the browser to access the spriteFile svg file to 
// re-<use> the template <symbol> tags defined there
var spritePrefix = "sprite:svg:" + spriteFile;

// colors and stroke-widths to use when "colorize" is passed to getImage() below
var colors = [ "none", "red", "orange", "blue", "lightblue", "green", "lightgreen", "grey", "lightgrey" ];
var strokeWidths = [ 0, 0.5, 1, 1.5, 2, 2.5, 3 ];


// function to create an isc.Img with an SVG symbol from mediaPlayer.svg
function getImage (id, widgetSize, imageSize, imageType, colorize, outline, props) {
    props = props || {};

    // "svgIcon" is the default CSS class for SVGs, provided with SmartClient skins
    if (props.cssClass == null) props.cssClass = "svgIcon";
    // should the cssClass be applied in the src string?  If not, it's applied as this.baseStyle 
    if (props.classInSrc == null) props.classInSrc = false;

    // properties for the new isc.Img instance
    var imgProps = {
        ID: "icon_" + (Math.random() * 1000) + "_" + id,
        click: "isc.say('Clicked " + id + "')",
        border: "1px solid lightgrey",
        autoDraw: false,
        // show stateful styles
        showRollOver: true,
        showDown: true
    };

    // add some settings if passed in 
    if (widgetSize) imgProps.width = imgProps.height = parseInt(widgetSize);
    if (imageSize) imgProps.imageWidth = imgProps.imageHeight = parseInt(imageSize);
    imgProps.imageType = imageType || "center";

    // source for the images
    imgProps.src = spritePrefix + "#" + id + ";";
    
    // append stateful cssClass to the src, or apply it to baseStyle if props.classInSrc is not true
    if (props.cssClass) {
        if (props.classInSrc) imgProps.src += "cssClass:" + props.cssClass + ";";
        else imgProps.baseStyle = props.cssClass;
    }

    if (colorize) {
        // apply random fill (bg) and stroke (border) colors, and stroke-width
        if (!outline) imgProps.src += "fill:" + colors[Math.floor(Math.random() * 9)] + ";";
        imgProps.src += "stroke:" + colors[Math.floor(Math.random() * 9)] + ";";
        imgProps.src += "stroke-width:" + strokeWidths[Math.floor(Math.random() * 6)] + "px;";
    }
    if (outline) {
        // draw un-filled shapes
        imgProps.src += "fill:none;";
    }
    
    if (props.srcObject) {
        // use a src object with separate sprite-config strings for states
        var prefix = spritePrefix + "#" + id + ";cssClass:" + props.cssClass;

        imgProps.src = {
            _base: prefix + ";",
            Over: prefix + "Over;",
            Down: prefix + "Down;"
        }
    }

    return isc.Img.create(imgProps);
}

// render a series of isc.Img widgets, one showing each of the template graphics available in 
// the mediaPlayer.svg test file - various options available
function getMediaPlayerImages (widgetSize, imageSize, imageType, colorize, outline, props) {
    return isc.HLayout.create({
        autoDraw: false,
        height: 1, overflow: "visible", defaultLayoutAlign: "center", membersMargin: 10,
        members: [
            getImage("icon-first", widgetSize, imageSize, imageType, colorize, outline, props),
            getImage("icon-previous", widgetSize, imageSize, imageType, colorize, outline, props),
            getImage("icon-backward", widgetSize, imageSize, imageType, colorize, outline, props),
            getImage("icon-play", widgetSize, imageSize, imageType, colorize, outline, props),
            getImage("icon-pause", widgetSize, imageSize, imageType, colorize, outline, props),
            getImage("icon-stop", widgetSize, imageSize, imageType, colorize, outline, props),
            getImage("icon-forward", widgetSize, imageSize, imageType, colorize, outline, props),
            getImage("icon-next", widgetSize, imageSize, imageType, colorize, outline, props),
            getImage("icon-last", widgetSize, imageSize, imageType, colorize, outline, props),
            getImage("icon-eject", widgetSize, imageSize, imageType, colorize, outline, props),
            // append a close icon for the layout as a whole
            isc.Img.create({ src: "[SKINIMG]actions/remove.png", width: 24, height: 24, autoDraw: false,
                click : function () {
                    var canvas = this.parentElement;
                    canvas.delayCall("destroy");
                    canvas = null;
                }
            })
        ]
    })
}

isc.VLayout.create({
    ID: "svgLayout", 
    top: 50, overflow: "visible",
    layoutMargin: 10,
    membersMargin: 10,
    autoDraw: true
});

// centered images with standard skin-appropriate styling (.svgIcon class), at various sizes
svgLayout.addMember(getMediaPlayerImages(20, 16, "center"));
svgLayout.addMember(getMediaPlayerImages(24, 20, "center"));
svgLayout.addMember(getMediaPlayerImages(30, 24, "center"));
svgLayout.addMember(getMediaPlayerImages(36, 32, "center"));
svgLayout.addMember(getMediaPlayerImages(52, 48, "center"));

// stretched images using random fill and stroke colors and stroke-width
svgLayout.addMember(getMediaPlayerImages(80, null, "stretch", true, false));

// form that provides a picker for some custom styles and a button to create some new SVG instances in those styles
var df = isc.DynamicForm.create({
    numCols: 6,
    items: [
        { 
            name: "cssClass", title: "CSS Class", wrapTitle: false,
            defaultValue: "svgIcon",
            valueMap: { 
                "svgIcon": "Skin default (svgIcon)", 
                "svgForestFill": "Forest (green, filled)",
                "svgFloridaOutline": "Florida (orange, outline)"
            }
        },
        { 
            name: "createButtons", title: "Create Icons", type: "button", width: "*", 
            startRow: false, endRow: false,
            click : function () {
                var form = this.form;
                svgLayout.addMember(getMediaPlayerImages(30, 24, "center", null, null, {cssClass: form.getValue("cssClass") }));
            }
        }
    ]
});


