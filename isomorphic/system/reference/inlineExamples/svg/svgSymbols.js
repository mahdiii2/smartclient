
// this is the SVG file containing the <symbol> tags used in this sample
var spriteFile = "[ISOMORPHIC]system/reference/inlineExamples/svg/chat.svg";

// the special prefix "sprite:svg:" causes the browser to access the spriteFile svg file to 
// re-<use> the template <symbol> tags defined there
var spritePrefix = "sprite:svg:" + spriteFile;


// function to create an isc.Img with an SVG symbol from chat.svg
function getImage (src, title) {
    // properties for the new isc.Img instance
    var imgProps = {
        border: "1px solid lightgrey",
        autoDraw: false,
        // show rollover states
        showRollOver: true,
        width: 40, height: 40,
        imageWidth: 32, imageHeight: 32,
        imageType: "center",
        src: src
    };

    // strip the full path(s) from the src and show it as a hover
    if (isc.isA.String(src)) {
        imgProps.prompt = "sprite:svg:" + src.replace(spritePrefix, "chat.svg");
    } else if (isc.isAn.Object(src)) {
        var obj = isc.addProperties({}, src);
        for (var key in obj) {
            obj[key] = "sprite:svg:" + obj[key].replace(spritePrefix, "chat.svg");
        }
        imgProps.prompt = isc.JSON.encode(obj).replace(/\n/g, '<br>');
    }
    imgProps.prompt = title + "<br><br>" + imgProps.prompt;

    return isc.Img.create(imgProps);
}

isc.HLayout.create({
    layoutMargin: 20,
    membersMargin: 20,
    members: [
        // normal symbol, color set in the svg, no statefulness
        getImage(spritePrefix + "#chat_grey", "Single Image, not stateful"),
        
        // two different symbols, by id
        getImage({ 
            _base: spritePrefix + "#chat_grey;",
            Over: spritePrefix + "#chat_red;"
        }, "Two different images by id"),
        
        // two different symbols, "chat_grey" and "chat_grey_Over", via statefulId:true, which 
        // appends "_{State}" to the base symbolId
        getImage(spritePrefix + "#chat_grey;statefulId:true;", "Two different images by 'statefulId'"),

        // the following images use a symbol with its "fill" attribute set to "currentColor", 
        // which is a special value that applies the current CSS color to the image - the color 
        // can be specified via "color:{color};" or a stateful cssClass in the src string, 
        // or inherited from the CSS-cascade of the element the image is displayed in.

        // one symbol used for two states, each with a custom color
        getImage({ 
            _base: spritePrefix + "#chat;color:grey;",
            Over: spritePrefix + "#chat;color:red;"
        }, "One symbol, two src-strings, each with a custom color"),
        
        // one symbol used for two states, each with a custom cssClass
        getImage({ 
            _base: spritePrefix + "#chat;cssClass:chatGrey;",
            Over: spritePrefix + "#chat;cssClass:chatRed;"
        }, "One symbol, two src-strings, each with a custom cssClass"),
        
        // one symbol with a stateful cssClass
        getImage(spritePrefix + "#chat;cssClass:chatStyle;", "One symbol, stateful cssClass"),
        
        // one symbol that inherits colors from the baseStyle on its container Img - also shows 
        // how to specify an inline image-size in the src - the other examples set 
        // Img.imageWidth/Height to achieve the same goal
        isc.Img.create({
            width: 40, height: 40, border: "1px solid lightgrey",
            showRollOver: true,
            baseStyle: "chatStyle",
            src: spritePrefix + "#chat;size:32,32;",
            prompt: "One symbol, stateful Img.baseStyle<br><br>sprite:svg:chat.svg#chat;size:32,32;"
        })
    ]

});
