var availableDataSourceNames = ["worldDS", "animals", "supplyItem", "supplyCategory"];

var premadeExamples = [{
    imgFilename: "animals-list-sketch.jpg",
    identifier: "premadeAnimalsListSketch",
    description: "'Animals' list"
}, {
    imgFilename: "countries-of-the-world-bar-graph-sketch.jpg",
    identifier: "premadeCountriesChartSketch",
    description: "'Countries' chart"
}];

var imgDir = isc.Page.getIsomorphicDocsDir()+"exampleImages/";
var choices = {};
for (var i = 0; i < premadeExamples.length; ++i) {
    premadeExamples[i].imgURL = isc.Page.getImgURL("AI/" + premadeExamples[i].imgFilename, imgDir);
    choices[premadeExamples[i].identifier] = "Pre-made example: " + premadeExamples[i].description;
}
choices.custom = "Custom sketch";

var initialPortalPaletteNode = {
    type: "PortalLayout",
    defaults: {
        width: "100%",
        height: "100%",
        numColumns: 1,
        canResizePortlets: true
    }
};

var editPane = isc.EditPane.create({
    width: "100%",
    height: "100%"
});
var editNode = editPane.addFromPaletteNode(initialPortalPaletteNode);
editPane.getEditContext().defaultParent = editNode;
var nodes = new Array(availableDataSourceNames.length);
for (var i = 0; i < availableDataSourceNames.length; ++i) {
    nodes[i] = {
        type: "DataSource",
        loadID: availableDataSourceNames[i],
        loadParents: true
    };
}
editPane.addFromPaletteNodes(nodes);

function generateUI(sketchPrompt, additionalText, callback) {
    var userAIRequest;
    if (sketchPrompt) {
        userAIRequest = sketchPrompt;
        if (additionalText) {
            userAIRequest.additionalMessages = [{content: additionalText}];
        }
    } else {
        userAIRequest = {prompt: additionalText};
    }

    var buildRequest = {
        userAIRequest: userAIRequest,
        availableDataSourceNames: availableDataSourceNames
    };

    isc.AI.buildDataBoundUI(buildRequest, function (buildResponse) {
        if (buildResponse.type != "success") {
            var wasCanceled = buildResponse.type == "canceled";
            if (!wasCanceled) isc.warn("Failed to generate UI code: " + buildResponse.errorMessage);
            if (callback != null) callback(wasCanceled);
            return;
        }

        var aiPortletPaletteNode = {
            type: "CodeStringPortlet",
            defaults: {
                destroyOnClose:true,
                title: "AI-Generated View",
                codeString: buildResponse.jsCode
            }
        };
        editPane.addFromPaletteNode(aiPortletPaletteNode);
        if (callback != null) callback();
    });
}

var designerWindow = isc.Window.create({
    title: "AI-Assisted UI Designer",
    autoSize: true,
    width: 700,
    minWidth: 200,
    minHeight: 175,
    showCloseButton: false,
    canDragReposition: true,
    canDragResize: true,
    animateMinimize: true
});

var designerForm = isc.DynamicForm.create({
    autoDraw: false,
    width: "100%",
    numCols: 1,
    fields: [{
        name: "choice",
        width: "100%",
        showTitle: false,
        value: "custom",
        valueMap: choices,
        change : function (form, item, choice, oldChoice) {
            var choiceIsBlank = !choice,
                customSketchField = form.getField("_customSketch"),
                premadeExampleImgField = form.getField("_premadeExampleImg");

            customSketchField.hide();
            premadeExampleImgField.hide();

            if (choice == "custom") {
                customSketchField.show();
                form.setValue("additionalText", form.getValue("oldAdditionalText"));
            } else {
                var premadeExample = premadeExamples.find("identifier", choice);
                if (premadeExample != null) {
                    if (oldChoice == "custom") form.setValue("additionalText", form.getValue("oldAdditionalText"));
                    premadeExampleImgField.show();
                    premadeExampleImgField.setValue(premadeExample.imgURL);
                    form.setValue("additionalText", null);
                }
            }

            form.getField("_generateUIButton").setDisabled(choiceIsBlank);
        }
    }, {
        name: "_premadeExampleImg",
        visible: false,
        type: "image",
        imageWidth: 512,
        imageHeight: 384,
        showTitle: false,
        canEdit: false,
        readOnlyDisplay: "static"
    }, {
        name: "_customSketch",
        type: "canvas",
        width: "100%",
        showTitle: false,
        createCanvas : function () {
            var drawPane = this.drawPane = isc.DrawPane.create({
                width: 512, // 512x512 is the size of the image given to GPT-4V in "low" fidelity mode (the default)
                height: 512,
                showEdges: true,
                backgroundColor: "#fff",
                // Public Domain blue pencil cursor from: http://www.rw-designer.com/cursor-detail/59283
                cursor: "url(" + isc.Page.getImgURL("other/blue-pencil.cur") + "), crosshair",
                canDrag: true,
                dragStart : function () {
                    this.Super("dragStart", arguments);
                    if (this != isc.EH.dragTarget) return;
                    this._freehandDrawPath = isc.DrawPath.create({
                        drawPane: this,
                        lineColor: "#000",
                        lineWidth: 4,
                        points: [[this.getOffsetX(), this.getOffsetY()]]
                    });
                },
                dragMove : function () {
                    this.Super("dragMove", arguments);
                    var freehandDrawPath = this._freehandDrawPath;
                    if (freehandDrawPath) {
                        var points = freehandDrawPath.points.duplicate();
                        points.add([this.getOffsetX(), this.getOffsetY()]);
                        freehandDrawPath.setPoints(points);
                    }
                },
                dragStop : function () {
                    delete this._freehandDrawPath;
                    this.Super("dragStop", arguments);
                }
            });

            function makeDrawImage(src, width, height) {
                return isc.DrawImage.create({
                    drawPane: drawPane,
                    src: src,
                    width: width,
                    height: height,
                    canDrag: true,
                    keepInParentRect: true,
                    knobs: ["resize"]
                });
            }

            var getUserMedia;
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                getUserMedia = function (constraints, successCallback, errorCallback) {
                    navigator.mediaDevices.getUserMedia(constraints)
                        .then(successCallback, errorCallback);
                };
            } else {
                getUserMedia = (navigator.getUserMedia ||
                                navigator.webkitGetUserMedia ||
                                navigator.mozGetUserMedia ||
                                navigator.msGetUserMedia);
                if (getUserMedia) getUserMedia = getUserMedia.bind(navigator);
            }

            var userMediaSupported = !!getUserMedia;

            function getFittedRectangleDimensions(srcWidth, srcHeight, destWidth, destHeight) {
                var minScale = Math.min(destWidth/srcWidth, destHeight/srcHeight);
                return {
                    width: Math.floor(minScale * srcWidth),
                    height: Math.floor(minScale * srcHeight)
                };
            }

            var takeAPictureDialog;
            if (userMediaSupported) {
                var dims = getFittedRectangleDimensions(drawPane.getInnerWidth(), 0.75 * drawPane.getInnerWidth(), drawPane.getInnerWidth(), drawPane.getInnerHeight()),
                    previewWidth = dims.width,
                    previewHeight = dims.height;

                var previewer = isc.Canvas.create({
                    autoDraw: false,
                    width: previewWidth,
                    height: previewHeight,
                    getInnerHTML : function () {
                        var id = this.getID();
                        return (
                            "<canvas id='" + id + "_htmlcanvas' style='position:absolute;z-index:1' width='" + previewWidth + "' height='" + previewHeight + "'></canvas>" +
                            "<video id='" + id + "_htmlvideo' style='position:absolute;width:" + previewWidth + "px;height:" + previewHeight + "px;z-index:2'>Video playback not supported.</video>"
                        );
                    },
                    getCanvasHandle : function () {
                        return this.ns.Element.get(this.getID() + "_htmlcanvas");
                    },
                    getVideoHandle : function () {
                        return this.ns.Element.get(this.getID() + "_htmlvideo");
                    },
                    draw : function () {
                        this.pause();
                        return this.Super("draw", arguments);
                    },
                    drawn : function () {
                        var _this = this;

                        var videoHandle = this.getVideoHandle();
                        if (videoHandle && videoHandle.play) {
                            getUserMedia(
                                {video: true},
                                function (stream) {
                                    videoHandle.srcObject = stream;
                                    _this.play();
                                },
                                function (err) {
                                    takeAPictureDialog.hide();
                                    form.getField("_takeAPictureButton").disable();
                                    isc.warn("getUserMedia() failed: " + err);
                                }
                            );
                        }
                    },
                    redrawOnResize: false,
                    sizeMayChangeOnRedraw: false,
                    _playing: false,
                    isPlaying : function () {
                        return !!this._playing;
                    },
                    pause : function () {
                        var videoHandle = this.getVideoHandle();
                        if (videoHandle && videoHandle.pause) {
                            videoHandle.pause();
                        }
                        this._playing = false;
                    },
                    play : function () {
                        if (this._playing) return;
                        var videoHandle = this.getVideoHandle();
                        if (videoHandle && videoHandle.play) {
                            videoHandle.play();
                            this._playing = true;
                        }
                    },
                    makeStillPhotoDrawImage : function () {
                        // https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API/Taking_still_photos
                        var canvasHandle = this.getCanvasHandle(),
                            videoHandle = this.getVideoHandle();
                        if (canvasHandle && canvasHandle.getContext && videoHandle) {
                            var width = videoHandle.videoWidth;
                            if (width == null || width == 0) {
                                width = previewWidth;
                            }
                            var height = videoHandle.videoHeight;
                            if (height == null || height == 0) {
                                height = Math.floor(0.75 * width);
                            }
                            var dims = getFittedRectangleDimensions(width, height, previewWidth - 2, previewHeight - 2);
                            width = dims.width;
                            height = dims.height;

                            canvasHandle.width = width;
                            canvasHandle.height = height;
                            var context = canvasHandle.getContext("2d");
                            context.fillStyle = drawPane.backgroundColor;
                            context.fillRect(0, 0, canvasHandle.width, canvasHandle.height);
                            context.drawImage(videoHandle, 0, 0, width, height);
                            return makeDrawImage(canvasHandle.toDataURL("image/jpeg"), width, height);
                        }
                    }
                });

                takeAPictureDialog = isc.Dialog.create({
                    autoDraw: false,
                    title: "Take a Picture",
                    message: "Click <q>Take Picture</q> to take and insert the picture.",
                    defaultWidth: previewWidth,
                    buttons: [
                        {title: "Take Picture", click : "this.parentElement.creator.takePictureClick()"},
                        // use CANCEL_BUTTON_TITLE rather than CANCEL because Feature Explorer
                        // sets the topElement to the featureExplorer widget
                        {title: isc.Dialog.CANCEL_BUTTON_TITLE, click : "this.parentElement.creator.cancelClick()"}
                    ],
                    createChildren : function () {
                        this.Super("createChildren", arguments);
                        this.body.addMember(previewer, 1);
                    },
                    hide : function () {
                        previewer.pause();
                        this.Super("hide", arguments);
                    },
                    show : function () {
                        this.Super("show", arguments);
                        previewer.play();
                    },
                    takePictureClick : function () {
                        previewer.makeStillPhotoDrawImage();
                        this.hide();
                    }
                });
            }

            var form = isc.DynamicForm.create({
                numCols: 1,
                fields: [{
                    type: "UploadItem",
                    shouldSaveValue: false, // the selected file is only read on the client side
                    title: "Select a Picture From Your Computer",
                    titleOrientation: "top",
                    width: 170,
                    cellHeight: 80,
                    colSpan: 1,
                    accept: "image/*",
                    disabled: !(window.HTMLInputElement && "files" in HTMLInputElement.prototype &&
                                window.FileReader &&
                                window.HTMLImageElement && "decode" in HTMLImageElement.prototype),
                    changed : function () {
                        var fileInputHandle = this.getDataElement(),
                            files;
                        try {
                            files = fileInputHandle.files;
                        } catch (err) {
                            isc.warn("Failed to obtain access to the selected file(s): " + err);
                        }
                        if (files) {
                            for (var i = 0; i < files.length; ++i) {
                                var file = files[i];
                                if (!file) continue;
                                var fileReader = new FileReader;
                                fileReader.addEventListener("load", function () {
                                    var img = new Image;
                                    img.src = fileReader.result;
                                    img.decode()
                                        .then(function () {
                                            var dims = getFittedRectangleDimensions(img.width, img.height, drawPane.getInnerWidth(), drawPane.getInnerHeight());
                                            makeDrawImage(fileReader.result, dims.width, dims.height);
                                        },
                                        function (err) {
                                            isc.warn("Failed to decode the selected image file: " + err);
                                        });
                                }, false);
                                fileReader.readAsDataURL(file);
                            }
                        }
                    }
                }, {
                    name: "_takeAPictureButton",
                    type: "button",
                    title: "Take &amp; Insert a Picture&hellip;",
                    width: 170,
                    cellHeight: 60,
                    visible: userMediaSupported,
                    click : function () {
                        if (!takeAPictureDialog.isDrawn()) takeAPictureDialog.draw();
                        takeAPictureDialog.show();
                    }
                }, {
                    type: "button",
                    title: "Erase the Sketch",
                    width: 170,
                    click : function () {
                        drawPane.destroyItems();
                    }
                }]
            });

            return isc.HLayout.create({
                width: "100%",
                height: "100%",
                members: [drawPane, form]
            });
        }
    }, {
        name: "oldAdditionalText",
        visible: false
    }, {
        name: "additionalText",
        type: "textArea",
        width: "100%",
        title: "Additional Descriptive Text to Give the AI",
        titleOrientation: "top"
    }, {
        name: "_generateUIButton",
        type: "button",
        title: "Generate UI",

        click : function (form, generateUIButton) {
            var choice = form.getValue("choice"),
                additionalText = form.getValue("additionalText");

            function processDataURL(dataURL) {
                var getSketchPrompt = function () {
                    if (!dataURL) return;
                    var prefix = "data:";
                        infix = ";base64,";

                    var infixPos = dataURL.indexOf(infix);
                    if (dataURL.indexOf(prefix) != 0 || (infixPos = dataURL.indexOf(infix, prefix.length)) < 0) {
                        isc.warn("Invalid data URL");
                        return;
                    }

                    var base64EncodedData = dataURL.substring(infixPos + infix.length),
                        contentType;
                    if (dataURL.indexOf("image/jpeg", prefix.length) == prefix.length) {
                        contentType = "jpegImage";
                    } else if (dataURL.indexOf("image/png", prefix.length) == prefix.length) {
                        contentType = "pngImage";
                    } else {
                        isc.warn("Unhandled data URL MIME type: " + dataURL.substring(prefix.length, infixPos));
                        return;
                    }
                    return {prompt: base64EncodedData, promptType: contentType};
                };
                var sketchPrompt = getSketchPrompt();

                if (!sketchPrompt && !additionalText) {
                    isc.warn("Please either draw or describe the UI that you would like to be generated.");
                    return;
                }

                designerWindow.minimize();
                form.disable();
                generateUI(sketchPrompt, additionalText, function (wasCanceled) {
                    form.enable();
                    if (wasCanceled) designerWindow.restore();
                });
            }

            if (choice == "custom") {
                var drawPane = form.getField("_customSketch").drawPane;
                if (drawPane == null) {
                    isc.warn("Could not access the DrawPane");
                    return;
                }

                if (drawPane.drawItems.isEmpty()) {
                    processDataURL(null);
                } else {
                    drawPane.getDataURL(processDataURL, "png");
                }
            } else {
                var premadeExample = premadeExamples.find("identifier", choice);
                if (premadeExample == null) {
                    isc.warn("Unhandled choice: " + choice);
                    return;
                }

                var premadeExampleImgField = form.getField("_premadeExampleImg");
                // access the IMG element of the field's handle
                var handle = premadeExampleImgField.getHandle(),
                    imgElems = handle && handle.getElementsByTagName("img"),
                    imgElem = imgElems && imgElems[0];
                if (imgElem == null || !imgElem.complete) {
                    isc.warn("Failed to access the the pre-made sketch. It might not have fully downloaded.");
                    return;
                }

                var canvas = document.createElement("canvas");
                if (!("getContext" in canvas)) {
                    isc.warn("Your browser appears not to support HTML &lt;canvas&gt;.");
                    return;
                }
                canvas.width = imgElem.naturalWidth;
                canvas.height = imgElem.naturalHeight;
                canvas.getContext("2d").drawImage(imgElem, 0, 0);
                processDataURL(canvas.toDataURL("image/jpeg"));
            }
        }
    }]
});

designerWindow.addItem(designerForm);
