/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, Img } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onImgContainerDragStart = function () {
    this.startScrollLeft = this.getScrollLeft();
    this.startScrollTop = this.getScrollTop();
};
let onImgContainerDragMove = function () {
    var newScrollLeft = Math.max(0, this.startScrollLeft - isc.EventHandler.lastEvent.x + isc.EventHandler.mouseDownEvent.x), newScrollTop = Math.max(0, this.startScrollTop - isc.EventHandler.lastEvent.y + isc.EventHandler.mouseDownEvent.y);
    this.scrollTo(newScrollLeft, newScrollTop);
};
let onImgContainerDragStop = function () {
    var innerContentWidth = this.getInnerContentWidth(), scrollLeft = this.getScrollLeft(), clampedScrollLeft = Math.max(innerContentWidth, Math.min(scrollLeft, this.getScrollWidth() - 2 * innerContentWidth + img.padding));
    scrollTop = this.getScrollTop(), clampedScrollTop = Math.max(innerContentWidth, Math.min(scrollTop, this.getScrollHeight() - 2 * innerContentWidth));
    if (scrollLeft != clampedScrollLeft || scrollTop != clampedScrollTop) {
        this.animateScroll(clampedScrollLeft, clampedScrollTop);
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Canvas ID="imgContainer" width="200" height="200" left="50" top="50" overflow="hidden" canDrag="true" showEdges="true" dragAppearance="none" autoDraw="false" dragStart={onImgContainerDragStart} dragMove={onImgContainerDragMove} dragStop={onImgContainerDragStop}/>

        <Img imageType="normal" title="img" ID="img" padding="20" cursor="all-scroll" autoDraw="false"/>
    </>,
    document.getElementById(target)
);

img.setBorder(imgContainer.getInnerContentWidth() + 'px solid transparent');
imgContainer.addChild(img);
var imgURL = img.getImgURL('[SAMPLE]other/cpu.jpg');
var domImage = new Image();
domImage.onload = function () {
    img.setSrc(imgURL);
    imgContainer.draw();
    var innerContentWidth = imgContainer.getInnerContentWidth();
    imgContainer.scrollTo(innerContentWidth, innerContentWidth);
};
domImage.src = imgURL;
